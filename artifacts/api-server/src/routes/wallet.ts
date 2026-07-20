import { Router } from "express";
import { PKPass } from "passkit-generator";
import { deflateSync } from "zlib";
import { logger } from "../lib/logger";

const router = Router();

/* ── Minimal PNG generator (no deps) ───────────────────────
   Generates a solid-colour PNG from raw bytes using built-in
   zlib. Used to embed the required icon.png inside the pass. */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c;
  }
  return t;
})();

function crc32(buf: Buffer): number {
  let crc = 0xffffffff;
  for (const b of buf) crc = CRC_TABLE[(crc ^ b) & 0xff]! ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const t    = Buffer.from(type, "ascii");
  const body = Buffer.concat([t, data]);
  const crc  = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function solidPng(w: number, h: number, r: number, g: number, b: number): Buffer {
  const sig  = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = chunk("IHDR", Buffer.from([
    0, 0, 0, w,   // width  (4 bytes big-endian)
    0, 0, 0, h,   // height (4 bytes big-endian)
    8,            // bit depth
    2,            // color type: RGB
    0, 0, 0,      // compression, filter, interlace
  ]));
  const rows: Buffer[] = [];
  for (let y = 0; y < h; y++) {
    const row = Buffer.alloc(1 + w * 3);
    row[0] = 0; // filter: None
    for (let x = 0; x < w; x++) {
      row[1 + x * 3 + 0] = r;
      row[1 + x * 3 + 1] = g;
      row[1 + x * 3 + 2] = b;
    }
    rows.push(row);
  }
  const idat = chunk("IDAT", deflateSync(Buffer.concat(rows)));
  const iend = chunk("IEND", Buffer.alloc(0));
  return Buffer.concat([sig, ihdr, idat, iend]);
}

/* Solid #007AFF (Apple blue) — required icon sizes */
const ICON    = solidPng(29, 29, 0, 122, 255);
const ICON_2X = solidPng(58, 58, 0, 122, 255);
const ICON_3X = solidPng(87, 87, 0, 122, 255);

/* ── Certificate loader ─────────────────────────────────── */
function getCerts() {
  const cert       = process.env["APPLE_CERT_PEM"];
  const key        = process.env["APPLE_KEY_PEM"];
  const wwdr       = process.env["APPLE_WWDR_PEM"];
  const passphrase = process.env["APPLE_KEY_PASSPHRASE"] ?? "";
  if (!cert || !key || !wwdr) return null;
  return { cert, key, wwdr, passphrase };
}

/* ── POST /api/wallet/pass ──────────────────────────────── */
router.post("/pass", async (req, res) => {
  const certs = getCerts();
  if (!certs) {
    res.status(503).json({
      error:   "certificates_missing",
      message: "Apple Wallet certificates are not configured yet.",
    });
    return;
  }

  const {
    patientName  = "مريض",
    patientId    = "PT-0001",
    clinicName   = "عيادة الشفاء الطبية",
    bloodType    = "O+",
    insurance    = "بوبا",
    daysValid    = 7,
  } = (req.body ?? {}) as Record<string, string | number>;

  /* Expiry */
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + Number(daysValid));
  const expiryISO   = expiry.toISOString();
  const expiryLabel = expiry.toLocaleDateString("ar-SA", {
    day: "numeric", month: "long", year: "numeric",
  });

  const passJson = {
    formatVersion:       1,
    passTypeIdentifier:  "pass.com.talqatech.clinic",
    serialNumber:        `${String(patientId)}-${Date.now()}`,
    teamIdentifier:      "V96R57F6T3",
    organizationName:    String(clinicName),
    description:         "بطاقة مريض رقمية — تلقا للعيادات",
    logoText:            String(clinicName),

    backgroundColor: "rgb(6,16,30)",
    foregroundColor: "rgb(255,255,255)",
    labelColor:      "rgb(0,180,216)",

    expirationDate: expiryISO,

    generic: {
      primaryFields: [
        { key: "name",  label: "المريض",    value: String(patientName) },
      ],
      secondaryFields: [
        { key: "id",    label: "رقم المريض", value: String(patientId) },
        { key: "blood", label: "فصيلة الدم", value: String(bloodType) },
      ],
      auxiliaryFields: [
        { key: "clinic",    label: "العيادة",  value: String(clinicName) },
        { key: "insurance", label: "التأمين",  value: String(insurance)  },
      ],
      backFields: [
        { key: "expiry",   label: "تنتهي الصلاحية", value: expiryLabel },
        {
          key: "warning", label: "تنبيه مهم",
          value: `بطاقتك صالحة لـ ${daysValid} أيام فقط.\nجدّد موعدك قبل ${expiryLabel} حتى لا تنتهي.`,
        },
        { key: "app", label: "تطبيق العيادة", value: "clinic.tlgaads.com/clinic-demo/" },
      ],
    },

    barcodes: [{
      message:         String(patientId),
      format:          "PKBarcodeFormatQR",
      messageEncoding: "iso-8859-1",
      altText:         String(patientId),
    }],
  };

  try {
    const pass = new PKPass(
      {
        "pass.json":   Buffer.from(JSON.stringify(passJson)),
        "icon.png":    ICON,
        "icon@2x.png": ICON_2X,
        "icon@3x.png": ICON_3X,
      },
      {
        wwdr:                certs.wwdr,
        signerCert:          certs.cert,
        signerKey:           certs.key,
        signerKeyPassphrase: certs.passphrase,
      },
    );

    const buf = pass.getAsBuffer();

    res.set({
      "Content-Type":        "application/vnd.apple.pkpass",
      "Content-Disposition": `attachment; filename="talqa-patient-card.pkpass"`,
      "Content-Length":      String(buf.length),
      "Cache-Control":       "no-cache, no-store",
    });
    res.send(buf);

    logger.info({ patientId, patientName }, "wallet pass generated ok");
  } catch (err) {
    logger.error({ err }, "wallet pass generation failed");
    res.status(500).json({ error: "generation_failed", message: String(err) });
  }
});

/* ── GET /api/wallet/csr  (temp — download CSR on iPhone) ── */
router.get("/csr", (_req, res) => {
  // CSR generated by OpenSSL on the server — upload this to Apple Developer
  const csr = `-----BEGIN CERTIFICATE REQUEST-----
MIICxDCCAawCAQAwfzEiMCAGCSqGSIb3DQEJARYTYWRtaW5AdGFscWF0ZWNoLmNv
bTEiMCAGA1UEAwwZcGFzcy5jb20udGFscWF0ZWNoLmNsaW5pYzETMBEGA1UECwwK
Vjk2UjU3RjZUMzETMBEGA1UECgwKVGFscWEgVGVjaDELMAkGA1UEBhMCU0EwggEi
MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCzEnrbYn/axVTpwrySzXmd7+my
mBbsC0QubprjSSIwPNTmjWEmllYHFJOysJ9HOYBmpNTkKzpmA1vBw8mAkqhXEWjE
8OnN4EpYrrkwwhTQEMUqTH3VZe87x3dljlhTr+IH4djUkOj2eB71CykyW84tphk0
E1KJn/xRXVMN4fNjNub4UoFqdMIrKGPcuojt/R5PnL0LevG6WB7O7iPF5UF0Vcjo
bBySGCd5DnqYQqoKsScSap12OFBhyw4THTkOrZiXDGqAQsf56Eix/B2uf6wRfIaw
QOMAbq0/4a3A1ussji9ME8ykyHe8jnwZ8s6+r2Kp8j+qCPhTan3Z5Q1igCjlAgMB
AAGgADANBgkqhkiG9w0BAQsFAAOCAQEAOscSIhCQ5M6SrMWXSjpnnhFXDDcR4nXg
9PEULK0A5kSjKg3InYMpuJLXOUGP8pC50f3NpjmbTIfQ30jv3YdVJY34eYzpJaHE
uGkHp4W+lz6brxmBFgG9f9lmusAaOpuzsvaNd2eiZ6zZfkiYMiXccfKLld9AAHKz
NAf++sYcTCSqL8G/t4MwRaoBwjDzbENiidlumIEupjZOCiWlpIttm9phqqf1eyJS
lg6f6kl6spF6p10ocHR8Q88pu+SQy5NarvxCe9wkxjMn58hAfi1uhvCZYiHm9NAo
wvS8qSg1xJMZiXEpOXHH6lWD/vTuGL3258NtgtvmGV8mfdKIMl6JqQ==
-----END CERTIFICATE REQUEST-----`;

  res.set({
    "Content-Type":        "application/x-pem-file",
    "Content-Disposition": 'attachment; filename="pass-csr.pem"',
  });
  res.send(csr);
});

/* ── GET /api/wallet/status ─────────────────────────────── */
router.get("/status", (_req, res) => {
  const ready = getCerts() !== null;
  res.json({
    ready,
    passTypeId: "pass.com.talqatech.clinic",
    teamId:     "V96R57F6T3",
    domain:     "clinic.tlgaads.com",
    secrets_needed: ready ? [] : ["APPLE_CERT_PEM", "APPLE_KEY_PEM", "APPLE_WWDR_PEM", "APPLE_KEY_PASSPHRASE"],
  });
});

export default router;
