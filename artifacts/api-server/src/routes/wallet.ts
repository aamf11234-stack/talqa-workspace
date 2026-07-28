import { Router } from "express";
import { PKPass } from "passkit-generator";
import { deflateSync } from "zlib";
import { readFileSync } from "fs";
import { join } from "path";
import { logger } from "../lib/logger";

const router = Router();

/* ── PNG generators (no deps) ──────────────────────────────
   All built with raw bytes + built-in zlib.                 */
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

/* Base PNG builder — correct 4-byte big-endian dimensions */
function makePng(
  w: number, h: number,
  getPixel: (x: number, y: number) => [number, number, number],
): Buffer {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const wBuf = Buffer.alloc(4); wBuf.writeUInt32BE(w);
  const hBuf = Buffer.alloc(4); hBuf.writeUInt32BE(h);
  const ihdr = chunk("IHDR", Buffer.concat([wBuf, hBuf, Buffer.from([8, 2, 0, 0, 0])]));
  const rows: Buffer[] = [];
  for (let y = 0; y < h; y++) {
    const row = Buffer.alloc(1 + w * 3);
    row[0] = 0;
    for (let x = 0; x < w; x++) {
      const [r, g, b] = getPixel(x, y);
      row[1 + x * 3]     = Math.min(255, Math.max(0, r));
      row[1 + x * 3 + 1] = Math.min(255, Math.max(0, g));
      row[1 + x * 3 + 2] = Math.min(255, Math.max(0, b));
    }
    rows.push(row);
  }
  const idat = chunk("IDAT", deflateSync(Buffer.concat(rows)));
  const iend = chunk("IEND", Buffer.alloc(0));
  return Buffer.concat([sig, ihdr, idat, iend]);
}

/* Solid colour */
function solidPng(w: number, h: number, r: number, g: number, b: number): Buffer {
  return makePng(w, h, () => [r, g, b]);
}

/* Bilinear 4-corner gradient — creates beautiful diagonal sweeps */
function gradientPng(
  w: number, h: number,
  tl: [number,number,number],
  tr: [number,number,number],
  bl: [number,number,number],
  br: [number,number,number],
): Buffer {
  return makePng(w, h, (x, y) => {
    const tx = x / Math.max(1, w - 1);
    const ty = y / Math.max(1, h - 1);
    return [
      Math.round(tl[0]*(1-tx)*(1-ty) + tr[0]*tx*(1-ty) + bl[0]*(1-tx)*ty + br[0]*tx*ty),
      Math.round(tl[1]*(1-tx)*(1-ty) + tr[1]*tx*(1-ty) + bl[1]*(1-tx)*ty + br[1]*tx*ty),
      Math.round(tl[2]*(1-tx)*(1-ty) + tr[2]*tx*(1-ty) + bl[2]*(1-tx)*ty + br[2]*tx*ty),
    ];
  });
}

/* ══════════════════════════════════════════════════════════════
   TLQA Aurora Strip — near-BLACK base so neon orbs pop hard
   ─────────────────────────────────────────────────────────────
   Layer stack (per-pixel):
   1. Near-black base (#080614 → #1e1b4b) — left to right
   2. Sine-wave shimmer bands (aurora feel)
   3. Diagonal scanlines @ 45° — subtle texture
   4. Violet neon orb   — top-right   (dominant glow)
   5. Indigo soft orb   — bottom-left
   6. Bright white spark — top-left corner
   7. Magenta accent orb — center-top  (extra dimension)
══════════════════════════════════════════════════════════════ */
function tlqaAuroraStrip(w: number, h: number): Buffer {
  const PI = Math.PI;
  return makePng(w, h, (x, y) => {
    const tx = x / Math.max(1, w - 1);
    const ty = y / Math.max(1, h - 1);

    // 1. Near-black base → dark indigo
    let r =  8 + tx * 22;   //   8 → 30
    let g =  6 + tx * 21;   //   6 → 27
    let b = 20 + tx * 55;   //  20 → 75

    // 2. Aurora shimmer
    const aw1 = (Math.sin(ty * PI * 5 - 0.8) + 1) * 0.5;
    const aw2 = (Math.sin(ty * PI * 2.5 + 1.2) + 1) * 0.5;
    const aurora = aw1 * aw2 * 0.5;
    r += aurora * 30;   g += aurora * 10;   b += aurora * 100;

    // 3. Diagonal scanlines
    const line = (x + y) % 16 < 1.2 ? 0.18 : 0;
    r += line * 60;   g += line * 40;   b += line * 140;

    // 4. Vivid violet neon orb — top-right (main hero glow)
    const d1 = Math.sqrt((x - w * 0.78) ** 2 + (y - h * 0.22) ** 2);
    const o1 = Math.max(0, 1 - d1 / (w * 0.38)) ** 1.8;
    r += o1 * 140;   g += o1 *  40;   b += o1 * 255;

    // 5. Indigo orb — bottom-left
    const d2 = Math.sqrt((x - w * 0.14) ** 2 + (y - h * 0.82) ** 2);
    const o2 = Math.max(0, 1 - d2 / (w * 0.28)) ** 2;
    r += o2 *  70;   g += o2 *  40;   b += o2 * 210;

    // 6. White spark — top-left corner
    const d3 = Math.sqrt((x - w * 0.06) ** 2 + (y - h * 0.15) ** 2);
    const o3 = Math.max(0, 1 - d3 / (w * 0.12)) ** 3;
    r += o3 * 230;   g += o3 * 200;   b += o3 * 255;

    // 7. Magenta accent — center-top (depth layer)
    const d4 = Math.sqrt((x - w * 0.50) ** 2 + (y - h * 0.10) ** 2);
    const o4 = Math.max(0, 1 - d4 / (w * 0.22)) ** 2.5;
    r += o4 * 180;   g += o4 *  30;   b += o4 * 160;

    return [
      Math.min(255, Math.max(0, Math.round(r))),
      Math.min(255, Math.max(0, Math.round(g))),
      Math.min(255, Math.max(0, Math.round(b))),
    ];
  });
}

/* ══════════════════════════════════════════════════════════════
   TLQA Signal-Bars Logo Mark
   ─────────────────────────────────────────────────────────────
   4 rounded bars of increasing height, gradient purple→white
   (تلقا = استقبال = signal reception)
   Background matches pass backgroundColor so it's seamless.
══════════════════════════════════════════════════════════════ */
function tlqaSignalLogo(w: number, h: number): Buffer {
  const BG: [number, number, number] = [8, 6, 20]; // matches pass bg
  const barW = Math.round(w * 0.062);  // ~10px @ 160w
  const gap   = Math.round(w * 0.038); //  ~6px gap
  const totalW = 4 * barW + 3 * gap;
  const startX = Math.floor((w - totalW) / 2);
  const bottom = h - Math.floor(h * 0.10);
  const avail  = bottom - Math.floor(h * 0.06);
  const heights = [
    Math.round(avail * 0.32),
    Math.round(avail * 0.52),
    Math.round(avail * 0.72),
    Math.round(avail * 0.94),
  ];
  // Gradient: purple → lavender → white
  const barColors: [number, number, number][] = [
    [110,  80, 230],
    [150, 120, 255],
    [195, 165, 255],
    [255, 255, 255],
  ];
  const radius = Math.floor(barW / 2);

  return makePng(w, h, (x, y) => {
    for (let i = 0; i < 4; i++) {
      const bx   = startX + i * (barW + gap);
      const barH = heights[i]!;
      const topY = bottom - barH;
      if (x < bx || x >= bx + barW) continue;
      if (y < topY || y > bottom) continue;
      const relX = x - bx;
      const relY = y - topY;
      // Rounded top cap
      if (relY < radius) {
        const dist = Math.sqrt((relX - radius + 0.5) ** 2 + (relY - radius) ** 2);
        if (dist > radius - 0.5) continue;
      }
      return barColors[i]!;
    }
    return BG;
  });
}

/* ── AI-generated strip images (loaded from assets) ─────── */
const ASSETS = join(__dirname, "../assets");
const STRIP_CARD    = readFileSync(join(ASSETS, "strip_card.png"));
const STRIP_CARD_2X = readFileSync(join(ASSETS, "strip_card@2x.png"));
const STRIP_APPT    = readFileSync(join(ASSETS, "strip_appt.png"));
const STRIP_APPT_2X = readFileSync(join(ASSETS, "strip_appt@2x.png"));
const BG_APPT       = readFileSync(join(ASSETS, "appt_bg.png"));
const BG_APPT_2X    = readFileSync(join(ASSETS, "appt_bg@2x.png"));
const STRIP_BD      = readFileSync(join(ASSETS, "strip_browndose.jpg"));

/* ── Icons — brand indigo ────────────────────────────────── */
const ICON    = solidPng(29, 29, 99, 102, 241);
const ICON_2X = solidPng(58, 58, 99, 102, 241);
const ICON_3X = solidPng(87, 87, 99, 102, 241);

/* ── Certificate loader ─────────────────────────────────── */
function getCerts() {
  const cert       = process.env["APPLE_CERT_PEM"];
  const key        = process.env["APPLE_KEY_PEM"];
  const wwdr       = process.env["APPLE_WWDR_PEM"];
  const passphrase = process.env["APPLE_KEY_PASSPHRASE"] ?? "";
  if (!cert || !key || !wwdr) return null;
  return { cert, key, wwdr, passphrase };
}

/* ── shared pass builder ────────────────────────────────── */
async function buildPass(
  passJson: object,
  filename: string,
  certs: NonNullable<ReturnType<typeof getCerts>>,
  res: import("express").Response,
  images: Record<string, Buffer> = {},
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const signerOptions: any = {
    wwdr:       certs.wwdr,
    signerCert: certs.cert,
    signerKey:  certs.key,
  };
  if (certs.passphrase) signerOptions.signerKeyPassphrase = certs.passphrase;

  const pass = new PKPass(
    {
      "pass.json":   Buffer.from(JSON.stringify(passJson)),
      "icon.png":    ICON,
      "icon@2x.png": ICON_2X,
      "icon@3x.png": ICON_3X,
      ...images,
    },
    signerOptions,
  );

  const buf = pass.getAsBuffer();
  res.set({
    "Content-Type":        "application/vnd.apple.pkpass",
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Content-Length":      String(buf.length),
    "Cache-Control":       "no-cache, no-store",
  });
  res.send(buf);
}

/* ── shared pass builder for patient card ───────────────── */
async function handlePatientPass(
  params: Record<string, string | number>,
  certs: NonNullable<ReturnType<typeof getCerts>>,
  res: import("express").Response,
) {
  const {
    patientName = "مريض",
    patientId   = "PT-0001",
    clinicName  = "تلقا العيادات",
    bloodType   = "O+",
    insurance   = "بوبا",
    daysValid   = 30,
  } = params;

  const expiry = new Date();
  expiry.setDate(expiry.getDate() + Number(daysValid));
  const expiryLabel = expiry.toLocaleDateString("ar-SA", { day: "numeric", month: "long", year: "numeric" });

  const passJson = {
    formatVersion:      1,
    passTypeIdentifier: "pass.clinic.tlgaads.com",
    serialNumber:       `card-${String(patientId)}-${Date.now()}`,
    teamIdentifier:     "V96R57F6T3",
    organizationName:   String(clinicName),
    description:        "بطاقة مريض رقمية",
    logoText:           String(clinicName),

    /* ── تصميم محسّن: خلفية داكنة راقية مع تمييز أزرق ── */
    backgroundColor: "rgb(5, 14, 26)",
    foregroundColor: "rgb(255, 255, 255)",
    labelColor:      "rgb(0, 180, 216)",

    expirationDate: expiry.toISOString(),

    generic: {
      primaryFields: [
        { key: "name", label: "اسم المريض", value: String(patientName) },
      ],
      secondaryFields: [
        { key: "blood", label: "فصيلة الدم", value: String(bloodType),  textAlignment: "PKTextAlignmentLeft" },
        { key: "id",    label: "رقم الملف",   value: String(patientId),  textAlignment: "PKTextAlignmentRight" },
      ],
      auxiliaryFields: [
        { key: "clinic",    label: "العيادة",        value: String(clinicName), textAlignment: "PKTextAlignmentLeft" },
        { key: "insurance", label: "التأمين الصحي",  value: String(insurance),  textAlignment: "PKTextAlignmentRight" },
      ],
      backFields: [
        { key: "expiry",  label: "صلاحية البطاقة",   value: expiryLabel },
        { key: "note",    label: "تنبيه",             value: `جدّد موعدك قبل ${expiryLabel} للحفاظ على بطاقتك.` },
        { key: "hipaa",   label: "الخصوصية",          value: "بياناتك محمية وفق معايير HIPAA · ISO 27001 · NDMO" },
        { key: "app",     label: "تطبيق العيادة",     value: "clinic.tlgaads.com/clinic-demo/" },
      ],
    },

    barcodes: [{
      message:         String(patientId),
      format:          "PKBarcodeFormatQR",
      messageEncoding: "iso-8859-1",
      altText:         `ملف المريض: ${String(patientId)}`,
    }],
  };

  try {
    await buildPass(passJson, "talqa-patient-card.pkpass", certs, res, {
      "strip.png":    STRIP_CARD,
      "strip@2x.png": STRIP_CARD_2X,
    });
    logger.info({ patientId, patientName }, "patient card generated ok");
  } catch (err) {
    logger.error({ err }, "patient card generation failed");
    res.status(500).json({ error: "generation_failed", message: String(err) });
  }
}

/* ── POST /api/wallet/pass  (legacy) ────────────────────── */
router.post("/pass", async (req, res) => {
  const certs = getCerts();
  if (!certs) { res.status(503).json({ error: "certificates_missing" }); return; }
  await handlePatientPass(req.body ?? {}, certs, res);
});

/* ── GET /api/wallet/pass  (Safari-compatible) ──────────── */
router.get("/pass", async (req, res) => {
  const certs = getCerts();
  if (!certs) { res.status(503).json({ error: "certificates_missing" }); return; }
  await handlePatientPass(req.query as Record<string, string>, certs, res);
});

/* ── shared appointment pass builder ────────────────────── */
async function handleAppointmentPass(
  params: Record<string, string>,
  certs: NonNullable<ReturnType<typeof getCerts>>,
  res: import("express").Response,
) {
  const {
    patientName  = "مريض",
    patientId    = "PT-0001",
    doctorName   = "د. سارة المطيري",
    specialty    = "طب عام",
    clinicName   = "تلقا العيادات",
    apptDate     = "الجمعة، ٢٠ يوليو",
    apptTime     = "١٠:٣٠ ص",
    roomNumber   = "غرفة ٣",
    apptId       = "APT-0001",
  } = params;

  /* expiry = يوم الموعد + ١ يوم */
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 2);

  const passJson = {
    formatVersion:      1,
    passTypeIdentifier: "pass.clinic.tlgaads.com",
    serialNumber:       `appt-${apptId}-${Date.now()}`,
    teamIdentifier:     "V96R57F6T3",
    organizationName:   String(clinicName),
    description:        `موعد طبي — ${String(doctorName)}`,
    logoText:           String(clinicName),

    /* ── Event Ticket: بنفسجي فاخر مع خلفية AI ── */
    backgroundColor: "rgb(10, 4, 28)",
    foregroundColor: "rgb(255, 255, 255)",
    labelColor:      "rgb(180, 160, 255)",

    expirationDate: expiry.toISOString(),

    eventTicket: {
      primaryFields: [
        { key: "doctor", label: "الطبيب المعالج", value: String(doctorName) },
      ],
      secondaryFields: [
        { key: "date",    label: "التاريخ",     value: String(apptDate),   textAlignment: "PKTextAlignmentLeft" },
        { key: "time",    label: "الوقت",        value: String(apptTime),   textAlignment: "PKTextAlignmentRight" },
      ],
      auxiliaryFields: [
        { key: "specialty", label: "التخصص",     value: String(specialty),  textAlignment: "PKTextAlignmentLeft" },
        { key: "room",      label: "الغرفة",      value: String(roomNumber), textAlignment: "PKTextAlignmentRight" },
      ],
      backFields: [
        { key: "patient", label: "المريض",          value: String(patientName) },
        { key: "clinic",  label: "العيادة",          value: String(clinicName) },
        { key: "id",      label: "رقم الموعد",       value: String(apptId) },
        { key: "note",    label: "تعليمات",           value: "يرجى الحضور قبل ١٥ دقيقة. أحضر هويتك وبطاقة التأمين." },
        { key: "cancel",  label: "إلغاء أو تغيير",   value: "تواصل مع الاستقبال قبل ٢٤ ساعة على الأقل." },
        { key: "app",     label: "تطبيق العيادة",    value: "clinic.tlgaads.com/clinic-demo/" },
      ],
    },

    barcodes: [{
      message:         `${String(apptId)}|${String(patientId)}|${String(apptTime)}`,
      format:          "PKBarcodeFormatQR",
      messageEncoding: "iso-8859-1",
      altText:         `موعد رقم: ${String(apptId)}`,
    }],
  };

  try {
    await buildPass(passJson, `talqa-appointment-${apptId}.pkpass`, certs, res, {
      "background.png":    BG_APPT,
      "background@2x.png": BG_APPT_2X,
      "strip.png":         STRIP_APPT,
      "strip@2x.png":      STRIP_APPT_2X,
    });
    logger.info({ apptId, patientName, doctorName }, "appointment pass generated ok");
  } catch (err) {
    logger.error({ err }, "appointment pass generation failed");
    res.status(500).json({ error: "generation_failed", message: String(err) });
  }
}

/* ── POST /api/wallet/appointment  (legacy) ─────────────── */
router.post("/appointment", async (req, res) => {
  const certs = getCerts();
  if (!certs) { res.status(503).json({ error: "certificates_missing" }); return; }
  await handleAppointmentPass(req.body ?? {}, certs, res);
});

/* ── GET /api/wallet/appointment  (Safari-compatible) ───── */
router.get("/appointment", async (req, res) => {
  const certs = getCerts();
  if (!certs) { res.status(503).json({ error: "certificates_missing" }); return; }
  await handleAppointmentPass(req.query as Record<string, string>, certs, res);
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

/* ══════════════════════════════════════════════════════════
   Brown Dose Loyalty Pass
   GET /api/wallet/browndose?name=...&points=...&tier=...
════════════════════════════════════════════════════════════ */
router.get("/browndose", async (req, res) => {
  const certs = getCerts();
  if (!certs) {
    /* No Apple cert → serve unsigned pkpass (iOS shows preview) */
    return serveBrownDoseUnsigned(req.query as Record<string, string>, res);
  }

  const {
    name   = "عبدالإله علي",
    points = "480",
    tier   = "كلاسيك",
    serial = `BD-${Date.now()}`,
  } = req.query as Record<string, string>;

  const passJson = {
    formatVersion:      1,
    passTypeIdentifier: "pass.clinic.tlgaads.com",   // reuse registered cert
    serialNumber:       serial,
    teamIdentifier:     "V96R57F6T3",
    organizationName:   "كافيهك",
    description:        "بطاقة ولاء كافيهك",
    logoText:           "كافيهك",

    backgroundColor: "rgb(26, 8, 4)",
    foregroundColor: "rgb(255, 255, 255)",
    labelColor:      "rgb(196, 120, 58)",

    storeCard: {
      headerFields: [
        { key: "points", label: "POINTS", value: String(points), textAlignment: "PKTextAlignmentRight" },
      ],
      primaryFields: [
        { key: "name", label: "CARDHOLDER", value: String(name) },
      ],
      secondaryFields: [
        { key: "tier",   label: "LEVEL",    value: String(tier) },
        { key: "branch", label: "BRANCHES", value: "الرياض", textAlignment: "PKTextAlignmentRight" },
      ],
      auxiliaryFields: [
        { key: "member", label: "MEMBER SINCE", value: "٢٠٢٤" },
        { key: "next",   label: "TO SILVER",    value: `${Math.max(0, 700 - Number(points))} نقطة`, textAlignment: "PKTextAlignmentRight" },
      ],
      backFields: [
        { key: "info",    label: "عن البطاقة",  value: "تجمع النقاط تلقائياً مع كل طلب. ١٥ نقطة = ١ ريال خصم." },
        { key: "redeem",  label: "كيف أستبدل",  value: "اعرض الرمز عند الصندوق أو استخدم التطبيق." },
        { key: "web",     label: "الموقع",       value: "كافيهك" },
        { key: "support", label: "الدعم",        value: "966551378531+" },
        { key: "terms",   label: "الشروط",       value: "النقاط لا تنتهي · قابلة للإهداء · سارية في جميع الفروع." },
      ],
    },

    barcodes: [{
      message:         String(serial),
      format:          "PKBarcodeFormatQR",
      messageEncoding: "iso-8859-1",
      altText:         `#${String(serial)}`,
    }],

    locations: [
      { longitude: 46.6753, latitude: 24.7136, relevantText: "تلقا — الرياض" },
    ],
    maxDistance: 500,
  };

  try {
    await buildPass(passJson, "browndose-loyalty.pkpass", certs, res, {
      "strip.png":    STRIP_BD,
      "strip@2x.png": STRIP_BD,
    });
    logger.info({ name, points, tier }, "browndose pass generated ok");
  } catch (err) {
    logger.error({ err }, "browndose pass generation failed");
    res.status(500).json({ error: "generation_failed", message: String(err) });
  }
});

/* Fallback: unsigned pkpass (no cert) — iOS shows partial preview */
async function serveBrownDoseUnsigned(
  params: Record<string, string>,
  res: import("express").Response,
) {
  // Use JSZip-compatible approach via raw ZIP bytes
  const { name = "عبدالإله علي", points = "480", tier = "كلاسيك", serial = `BD-${Date.now()}` } = params;

  const passJson = {
    formatVersion: 1,
    passTypeIdentifier: "pass.sa.browndose.loyalty",
    serialNumber: serial,
    teamIdentifier: "BROWNDOSE1",
    organizationName: "كافيهك",
    description: "بطاقة ولاء كافيهك",
    logoText: "كافيهك",
    backgroundColor: "rgb(26, 8, 4)",
    foregroundColor: "rgb(255, 255, 255)",
    labelColor: "rgb(196, 120, 58)",
    storeCard: {
      headerFields:    [{ key: "points", label: "POINTS",     value: String(points) }],
      primaryFields:   [{ key: "name",   label: "CARDHOLDER", value: String(name)   }],
      secondaryFields: [{ key: "tier",   label: "LEVEL",      value: String(tier)   }],
    },
    barcodes: [{ message: String(serial), format: "PKBarcodeFormatQR", messageEncoding: "iso-8859-1" }],
  };

  // Build a minimal ZIP manually (no signing)
  const { createZip } = await import("../lib/minizip");
  const buf = await createZip({
    "pass.json":  Buffer.from(JSON.stringify(passJson)),
    "icon.png":   solidPng(29, 29, 26, 8, 4),
    "icon@2x.png":solidPng(58, 58, 26, 8, 4),
    "strip.png":  STRIP_BD,
    "strip@2x.png": STRIP_BD,
    "manifest.json": Buffer.from(JSON.stringify({ "pass.json": "0", "icon.png": "0", "icon@2x.png": "0" })),
    "signature":  Buffer.alloc(0),
  });

  res.set({
    "Content-Type":        "application/vnd.apple.pkpass",
    "Content-Disposition": 'attachment; filename="browndose-loyalty.pkpass"',
    "Content-Length":      String(buf.length),
    "Cache-Control":       "no-cache, no-store",
  });
  res.send(buf);
}

/* ══════════════════════════════════════════════════════════
   تلقا تك – Premium Business Card Pass  v2
   GET /api/wallet/tlqa?name=...&role=...
   ─────────────────────────────────────────────────────────
   Strip: bilinear gradient — near-black top-left →
          rich indigo bottom-right (diagonal sweep)
   Background: #04020e — ultra-dark purple-black
   Labels: brand indigo #818CF8
════════════════════════════════════════════════════════════ */
router.get("/tlqa", async (req, res) => {
  const {
    name   = "زائر تلقا",
    role   = "عميل محتمل",
    serial = `TQ-${Date.now()}`,
  } = req.query as Record<string, string>;

  /* ── Aurora strip — near-black base, neon orbs pop ── */
  const STRIP_TQ    = tlqaAuroraStrip(375, 98);
  const STRIP_TQ_2X = tlqaAuroraStrip(750, 196);

  /* ── Signal-bars logo mark (تلقا = استقبال) ── */
  const LOGO    = tlqaSignalLogo(160,  50);
  const LOGO_2X = tlqaSignalLogo(320, 100);

  const passJson = {
    formatVersion:      1,
    passTypeIdentifier: "pass.clinic.tlgaads.com",
    serialNumber:       serial,
    teamIdentifier:     "V96R57F6T3",
    organizationName:   "تلقا تك",
    description:        "بطاقة تلقا تك التعريفية",
    logoText:           "تلقا تك",

    /* Near-black canvas — aurora strip + neon logo pop against it */
    backgroundColor: "rgb(8, 6, 20)",
    foregroundColor: "rgb(255, 255, 255)",
    labelColor:      "rgb(160, 130, 255)",

    generic: {
      headerFields: [
        {
          key:           "brand",
          label:         "TLQA TECH",
          value:         "🇸🇦 الرياض",
          textAlignment: "PKTextAlignmentRight",
        },
      ],
      primaryFields: [
        {
          key:   "holder",
          label: "الاسم",
          value: String(name),
        },
      ],
      secondaryFields: [
        {
          key:           "role",
          label:         "الصفة",
          value:         String(role),
          textAlignment: "PKTextAlignmentLeft",
        },
        {
          key:           "wa",
          label:         "واتساب",
          value:         "‎+966 55 137 8531",
          textAlignment: "PKTextAlignmentRight",
        },
      ],
      auxiliaryFields: [
        {
          key:           "services",
          label:         "خدماتنا",
          value:         "تطبيقات · مواقع · AI · Apple Wallet",
          textAlignment: "PKTextAlignmentLeft",
        },
        {
          key:           "web",
          label:         "الموقع",
          value:         "talqa.tech",
          textAlignment: "PKTextAlignmentRight",
        },
      ],
      backFields: [
        {
          key:   "slogan",
          label: "شعارنا",
          value: "نحوّل أفكارك إلى منتجات يعشقها عملاؤك.",
        },
        {
          key:   "about",
          label: "من نحن",
          value: "تلقا البرمجية — شركة سعودية متخصصة في بناء التطبيقات والمواقع وحلول Apple Wallet والذكاء الاصطناعي.",
        },
        {
          key:   "cr",
          label: "السجل التجاري",
          value: "7054835322",
        },
        {
          key:   "city",
          label: "المقر",
          value: "الرياض، المملكة العربية السعودية",
        },
        {
          key:   "note",
          label: "للتواصل",
          value: "افتح رمز QR أو راسلنا على واتساب +966551378531",
        },
      ],
    },

    barcodes: [{
      message:         "https://talqa.tech",
      format:          "PKBarcodeFormatQR",
      messageEncoding: "iso-8859-1",
      altText:         "talqa.tech",
    }],

    /* Geo — show pass when near Riyadh */
    locations: [
      { longitude: 46.6753, latitude: 24.7136, relevantText: "أنت قريب من مقر تلقا تك — الرياض" },
    ],
    maxDistance: 2000,
  };

  const certs = getCerts();

  if (certs) {
    try {
      await buildPass(passJson, "talqa-tech.pkpass", certs, res, {
        "strip.png":    STRIP_TQ,
        "strip@2x.png": STRIP_TQ_2X,
        "logo.png":     LOGO,
        "logo@2x.png":  LOGO_2X,
      });
      logger.info({ name, role }, "tlqa pass generated (signed)");
      return;
    } catch (err) {
      logger.error({ err }, "tlqa signed pass failed, falling back to unsigned");
    }
  }

  /* ─ Unsigned fallback ─ */
  const { createZip } = await import("../lib/minizip");
  const iconIndigo   = solidPng(29, 29, 99, 102, 241);
  const icon2xIndigo = solidPng(58, 58, 99, 102, 241);

  const buf = await createZip({
    "pass.json":     Buffer.from(JSON.stringify(passJson)),
    "icon.png":      iconIndigo,
    "icon@2x.png":   icon2xIndigo,
    "strip.png":     STRIP_TQ,
    "strip@2x.png":  STRIP_TQ_2X,
    "logo.png":      LOGO,
    "logo@2x.png":   LOGO_2X,
    "manifest.json": Buffer.from(JSON.stringify({
      "pass.json": "tlqa-v2", "icon.png": "0", "icon@2x.png": "0",
    })),
    "signature": Buffer.alloc(0),
  });

  res.set({
    "Content-Type":        "application/vnd.apple.pkpass",
    "Content-Disposition": 'attachment; filename="talqa-tech.pkpass"',
    "Content-Length":      String(buf.length),
    "Cache-Control":       "no-cache, no-store",
  });
  res.send(buf);
  logger.info({ name, role }, "tlqa pass generated (unsigned fallback)");
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
