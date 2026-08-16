import nodemailer from "nodemailer";
import type { ContactApiPayload } from "@/lib/validation/contact";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function isSmtpConfigured(): boolean {
  return Boolean(process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim());
}

export async function sendContactEmail(payload: ContactApiPayload): Promise<void> {
  const smtpUser = process.env.SMTP_USER;
  const smtpPassRaw = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPassRaw) {
    throw new Error("Missing SMTP configuration");
  }

  const smtpPass = smtpPassRaw.replace(/\s+/g, "");
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.verify();

  const { name, phone, email, service, message, pagePath, submittedAt } = payload;

  await transporter.sendMail({
    from: `"JT Solutions Contact" <${smtpUser}>`,
    to: "jtsolutions.officee@gmail.com",
    ...(email ? { replyTo: email } : {}),
    subject: `ליד חדש מהאתר - ${service}`,
    html: `<div dir="rtl">
             <h3>פנייה חדשה מאתר JT Solutions:</h3>
             <p><strong>שם:</strong> ${escapeHtml(name)}</p>
             <p><strong>טלפון:</strong> ${escapeHtml(phone)}</p>
             <p><strong>אימייל:</strong> ${escapeHtml(email ?? "לא צוין")}</p>
             <p><strong>מה הכי דחוף:</strong> ${escapeHtml(service)}</p>
             <p><strong>הודעה:</strong> ${escapeHtml(message || "לא צורפה הודעה")}</p>
             <p><strong>עמוד מקור:</strong> ${escapeHtml(pagePath ?? "לא זמין")}</p>
             <p><strong>נשלח בתאריך:</strong> ${escapeHtml(submittedAt ?? new Date().toISOString())}</p>
           </div>`,
  });
}
