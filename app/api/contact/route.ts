import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { clientIp, rateLimit } from "@/lib/security/rate-limit";
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
    const ip = clientIp(req);
    const limited = await rateLimit({
      prefix: "contact",
      identifier: ip,
      limit: 8,
      windowMs: 10 * 60 * 1000,
    });
    if (!limited.ok) {
      return NextResponse.json(
        { success: false, error: "נשלחו יותר מדי פניות. נסה שוב בעוד כמה דקות." },
        {
          status: 429,
          headers: {
            "Retry-After": String(limited.retryAfterSec),
            "X-RateLimit-Remaining": String(limited.remaining),
          },
        },
      );
    }

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

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        // Prefer service-role table insert; fall back to insert-only RPC for anon key.
        if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
          const { data: lead, error: leadError } = await supabase
            .from("leads")
            .insert({
              name: payload.name,
              phone: payload.phone,
              email: payload.email ?? null,
              service: payload.service,
              source: "site",
              status: "new",
              notes: payload.message ?? null,
              page_path: payload.pagePath ?? null,
            })
            .select("id")
            .single();

          if (leadError) {
            console.error("Supabase lead insert failed:", leadError);
          } else if (lead?.id) {
            const due = new Date();
            due.setDate(due.getDate() + 1);
            await supabase.from("tasks").insert({
              title: "שיחת אבחון",
              lead_id: lead.id,
              due_date: due.toISOString().slice(0, 10),
              done: false,
            });
          }
        } else {
          const { error: rpcError } = await supabase.rpc("submit_site_lead", {
            p_name: payload.name,
            p_phone: payload.phone,
            p_email: payload.email ?? null,
            p_service: payload.service,
            p_notes: payload.message ?? null,
            p_page_path: payload.pagePath ?? null,
          });
          if (rpcError) console.error("Supabase submit_site_lead failed:", rpcError);
        }
      } catch (dbError) {
        console.error("Supabase lead insert error:", dbError);
      }
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(8000),
        });
      } catch (webhookError) {
        console.error("n8n webhook failed:", webhookError);
      }
    } else {
      console.warn("N8N_WEBHOOK_URL is not set — skipping webhook");
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
