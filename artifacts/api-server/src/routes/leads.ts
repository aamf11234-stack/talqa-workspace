import { Router } from "express";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import https from "https";

const router = Router();

const NOTIFY_PHONE = "966551378531";
const LEADS_FILE = path.join(process.cwd(), "leads.json");
const LEADS_BACKUP = path.join(process.cwd(), "leads_backup.json");

/* ── Persist lead to JSON (with backup) ───────────────────────── */
function saveLead(lead: object): object[] {
  let leads: object[] = [];
  try {
    if (fs.existsSync(LEADS_FILE)) {
      leads = JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
    }
  } catch {
    // if main file is corrupted, try backup
    try {
      if (fs.existsSync(LEADS_BACKUP)) {
        leads = JSON.parse(fs.readFileSync(LEADS_BACKUP, "utf-8"));
      }
    } catch {}
  }

  const entry = { ...lead, id: Date.now(), at: new Date().toISOString() };
  leads.push(entry);

  const serialized = JSON.stringify(leads, null, 2);
  fs.writeFileSync(LEADS_FILE, serialized);
  // write backup immediately after
  fs.writeFileSync(LEADS_BACKUP, serialized);

  return leads;
}

/* ── WhatsApp via CallMeBot ───────────────────────────────────── */
function sendWhatsApp(lead: {
  name: string;
  clinic: string;
  phone: string;
  message?: string;
}): void {
  const apiKey = process.env["CALLMEBOT_API_KEY"];
  if (!apiKey) {
    console.warn(
      "[leads] CALLMEBOT_API_KEY not set — WhatsApp notification skipped"
    );
    return;
  }

  const lines = [
    "🔔 مهتم جديد — تلقا للعيادات",
    "",
    `👤 الاسم:    ${lead.name}`,
    `🏥 العيادة:  ${lead.clinic}`,
    `📱 الجوال:   +${lead.phone}`,
    lead.message ? `💬 الرسالة:  ${lead.message}` : "",
    "",
    `🕐 ${new Date().toLocaleString("ar-SA", { timeZone: "Asia/Riyadh" })}`,
  ]
    .filter((l) => l !== undefined && l !== null)
    .join("\n");

  const text = encodeURIComponent(lines);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${NOTIFY_PHONE}&text=${text}&apikey=${apiKey}`;

  https
    .get(url, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        if (res.statusCode === 200) {
          console.log("[leads] WhatsApp notification sent ✓");
        } else {
          console.error(
            `[leads] CallMeBot returned ${res.statusCode}: ${body.slice(0, 200)}`
          );
        }
      });
    })
    .on("error", (e) => {
      console.error("[leads] WhatsApp request failed:", e.message);
    });
}

/* ── SMTP email (fallback) ────────────────────────────────────── */
async function sendEmail(lead: {
  name: string;
  clinic: string;
  phone: string;
  message?: string;
}): Promise<void> {
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASS"];
  if (!user || !pass) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const body = [
    "مهتم جديد من موقع تلقا للعيادات",
    "",
    `الاسم:    ${lead.name}`,
    `العيادة:  ${lead.clinic}`,
    `الجوال:   ${lead.phone}`,
    lead.message ? `الرسالة:  ${lead.message}` : "",
    "",
    `الوقت: ${new Date().toLocaleString("ar-SA", { timeZone: "Asia/Riyadh" })}`,
  ]
    .filter(Boolean)
    .join("\n");

  await transporter.sendMail({
    from: `"تلقا للعيادات" <${user}>`,
    to: user,
    subject: `مهتم جديد — ${lead.clinic}`,
    text: body,
  });
}

/* ── POST /leads ──────────────────────────────────────────────── */
router.post("/leads", async (req, res) => {
  const { name, clinic, phone, message } = req.body as {
    name?: string;
    clinic?: string;
    phone?: string;
    message?: string;
  };

  if (!name?.trim() || !clinic?.trim() || !phone?.trim()) {
    res
      .status(400)
      .json({ ok: false, error: "name, clinic, phone are required" });
    return;
  }

  const lead = {
    name: name.trim(),
    clinic: clinic.trim(),
    phone: phone.trim(),
    message: message?.trim() ?? "",
  };

  // save synchronously so we never lose a lead
  saveLead(lead);

  // notify async — don't block the response
  sendWhatsApp(lead);
  sendEmail(lead).catch((e) =>
    console.error("[leads] Email fallback failed:", e.message)
  );

  res.json({ ok: true });
});

/* ── GET /leads (password-protected dashboard) ────────────────── */
router.get("/leads", (req, res) => {
  const dashboardPassword = process.env["LEADS_DASHBOARD_PASSWORD"];
  const provided =
    (req.query["password"] as string | undefined) ||
    req.headers["x-leads-password"];

  if (!dashboardPassword) {
    res.status(503).json({ ok: false, error: "Dashboard not configured" });
    return;
  }
  if (!provided || provided !== dashboardPassword) {
    res.status(401).json({ ok: false, error: "Unauthorized" });
    return;
  }

  let leads: object[] = [];
  try {
    if (fs.existsSync(LEADS_FILE)) {
      leads = JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
    }
  } catch (e) {
    // try backup
    try {
      if (fs.existsSync(LEADS_BACKUP)) {
        leads = JSON.parse(fs.readFileSync(LEADS_BACKUP, "utf-8"));
      }
    } catch {}
  }

  res.json({ ok: true, total: leads.length, leads });
});

export default router;
