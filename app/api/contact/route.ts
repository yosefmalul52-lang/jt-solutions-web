import { NextResponse } from "next/server";
import { saveSiteLeadToCrm } from "@/lib/contact/save-site-lead";
import { isSmtpConfigured, sendContactEmail } from "@/lib/contact/send-contact-email";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { clientIp, rateLimit } from "@/lib/security/rate-limit";
import { contactApiSchema } from "@/lib/validation/contact";

export const runtime = "nodejs";

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

    if (!isSupabaseConfigured() && !isSmtpConfigured()) {
      return NextResponse.json(
        { success: false, error: "Contact backend is not configured" },
        { status: 500 },
      );
    }

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
    let crmSaved = false;

    if (isSupabaseConfigured()) {
      const crmResult = await saveSiteLeadToCrm(payload);
      if (!crmResult.ok) {
        return NextResponse.json(
          { success: false, error: "שגיאה בשמירת הליד במערכת. נסה שוב בעוד רגע." },
          { status: 500 },
        );
      }
      crmSaved = true;
    }

    if (isSmtpConfigured()) {
      try {
        await sendContactEmail(payload);
      } catch (error) {
        console.error("Contact form email error:", error);
        if (!crmSaved) {
          return NextResponse.json(
            { success: false, error: "שגיאה פנימית בשליחת הפנייה" },
            { status: 500 },
          );
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form API error:", error);
    return NextResponse.json(
      { success: false, error: "שגיאה פנימית בשליחת הפנייה" },
      { status: 500 },
    );
  }
}
