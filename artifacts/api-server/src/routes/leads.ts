import { Router } from "express";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const router = Router();

const NOTIFY_EMAIL = "Aamf11234@gmail.com";
const LEADS_FILE = path.join(process.cwd(), "leads.json");

function saveLead(lead: object) {
  let leads: object[] = [];
  try {
    if (fs.existsSync(LEADS_FILE)) {
      leads = JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
    }
  } catch {}
  leads.push({ ...lead, at: new Date().toISOString() });
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
}

async function sendNotification(lead: {
  name: string;
  clinic: string;
  phone: string;
  message?: string;
}) {
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASS"];

  if (!user || !pass) {
    console.warn("SMTP credentials not set — lead saved locally only");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const body = `
مهتم جديد من موقع تلقا للعيادات

الاسم:       ${lead.name}
العيادة:     ${lead.clinic}
الجوال:      ${lead.phone}
${lead.message ? `الرسالة:     ${lead.message}` : ""}

الوقت: ${new Date().toLocaleString("ar-SA", { timeZone: "Asia/Riyadh" })}
  `.trim();

  await transporter.sendMail({
    from: `"تلقا للعيادات" <${user}>`,
    to: NOTIFY_EMAIL,
    subject: `مهتم جديد — ${lead.clinic}`,
    text: body,
  });
}

router.post("/leads", async (req, res) => {
  const { name, clinic, phone, message } = req.body as {
    name?: string;
    clinic?: string;
    phone?: string;
    message?: string;
  };

  if (!name || !clinic || !phone) {
    res.status(400).json({ ok: false, error: "name, clinic, phone required" });
    return;
  }

  const lead = { name, clinic, phone, message: message ?? "" };

  saveLead(lead);

  sendNotification(lead).catch((e) =>
    console.error("Email notification failed:", e.message)
  );

  res.json({ ok: true });
});

export default router;
