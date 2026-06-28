import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactApiSchema } from "@/lib/validation/contact";

export const runtime = "nodejs";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  try {
    const smtpUser = process.env.SMTP_USER;
    const smtpPassRaw = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPassRaw) {
      return NextResponse.json(
        { success: false, error: "Missing SMTP configuration" },
        { status: 500 },
      );
    }

    const smtpPass = smtpPassRaw.replace(/\s+/g, "");
    const raw = await req.json();
    const parsed = contactApiSchema.safeParse({
      ...raw,
      submittedAt: new Date().toISOString(),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 },
      );
    }

    const payload = parsed.data;

    try {
      await fetch("https://n8n-automation-vqkj.onrender.com/webhook/e8685c87-d98e-4ff2-85ae-95751c35fd3d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });
    } catch (webhookError) {
      console.error("n8n webhook failed:", webhookError);
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.verify();

    const {
      name,
      phone,
      email,
      service,
      message,
      pagePath,
      submittedAt,
    } = payload;

    await transporter.sendMail({
      from: `"JT Solutions Contact" <${smtpUser}>`,
      to: "jtsolutions.officee@gmail.com",
      ...(email ? { replyTo: email } : {}),
      subject: `ליד חדש מהאתר — ${service}`,
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

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form API error:", error);
    return NextResponse.json(
      { success: false, error: "שגיאה פנימית בשליחת הפנייה" },
      { status: 500 },
    );
  }
}
