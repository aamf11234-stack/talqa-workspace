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
    passTypeIdentifier:  "pass.clinic.tlgaads.com",
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
    const signerOptions: Record<string, string> = {
      wwdr:       certs.wwdr,
      signerCert: certs.cert,
      signerKey:  certs.key,
    };
    if (certs.passphrase) signerOptions["signerKeyPassphrase"] = certs.passphrase;

    const pass = new PKPass(
      {
        "pass.json":   Buffer.from(JSON.stringify(passJson)),
        "icon.png":    ICON,
        "icon@2x.png": ICON_2X,
        "icon@3x.png": ICON_3X,
      },
      signerOptions,
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

/* ── GET /api/wallet/csr  (iPhone-friendly download page) ── */
router.get("/csr", (_req, res) => {
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

  const b64 = Buffer.from(csr).toString("base64");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>تحميل ملف CSR</title>
<style>
  body{margin:0;background:#050D1A;color:#fff;font-family:-apple-system,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100svh;padding:24px;box-sizing:border-box;text-align:center}
  h1{font-size:22px;font-weight:800;margin:0 0 8px}
  p{font-size:14px;color:rgba(255,255,255,0.5);margin:0 0 32px;line-height:1.6}
  a{display:inline-block;background:linear-gradient(135deg,#0EA5E9,#0284C7);color:#fff;font-weight:800;font-size:17px;padding:18px 36px;border-radius:16px;text-decoration:none;box-shadow:0 8px 32px rgba(14,165,233,0.4)}
  .note{margin-top:24px;font-size:12px;color:rgba(255,255,255,0.3);max-width:280px;line-height:1.6}
</style></head>
<body>
  <div style="font-size:48px;margin-bottom:16px">🔐</div>
  <h1>ملف CSR — تلقا للعيادات</h1>
  <p>ارفع هذا الملف على Apple Developer<br>لإنشاء شهادة Apple Wallet</p>
  <a href="data:application/octet-stream;base64,${b64}" download="pass-csr.pem">⬇️ تحميل pass-csr.pem</a>
  <p class="note">بعد التحميل: افتح Apple Developer → Choose File → اختر pass-csr.pem من التنزيلات</p>
</body></html>`);
});

/* ── GET /api/wallet/status ─────────────────────────────── */
router.get("/status", (_req, res) => {
  const ready = getCerts() !== null;
  res.json({
    ready,
    passTypeId: "pass.clinic.tlgaads.com",
    teamId:     "V96R57F6T3",
    domain:     "clinic.tlgaads.com",
    secrets_needed: ready ? [] : ["APPLE_CERT_PEM", "APPLE_KEY_PEM", "APPLE_WWDR_PEM", "APPLE_KEY_PASSPHRASE"],
  });
});

export default router;
