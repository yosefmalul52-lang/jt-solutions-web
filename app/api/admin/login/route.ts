import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  adminAuthConfigured,
  createAdminSessionToken,
} from "@/lib/admin/auth";
import { clientIp, rateLimit } from "@/lib/security/rate-limit";

export const runtime = "nodejs";

function passwordsMatch(provided: string, expected: string): boolean {
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  if (left.length !== right.length) {
    timingSafeEqual(right, right);
    return false;
  }
  return timingSafeEqual(left, right);
}

export async function POST(req: Request) {
  if (!adminAuthConfigured()) {
    return NextResponse.json(
      { success: false, error: "ADMIN_PASSWORD לא הוגדר בשרת" },
      { status: 500 },
    );
  }

  const ip = clientIp(req);
  const limited = await rateLimit({
    prefix: "admin-login",
    identifier: ip,
    limit: 10,
    windowMs: 10 * 60 * 1000,
  });
  if (!limited.ok) {
    return NextResponse.json(
      { success: false, error: "יותר מדי ניסיונות. נסה שוב בעוד כמה דקות." },
      {
        status: 429,
        headers: {
          "Retry-After": String(limited.retryAfterSec),
          "X-RateLimit-Remaining": String(limited.remaining),
        },
      },
    );
  }

  const body = (await req.json().catch(() => null)) as { password?: string } | null;
  const password = body?.password ?? "";
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!password || !passwordsMatch(password, expected)) {
    return NextResponse.json({ success: false, error: "סיסמה שגויה" }, { status: 401 });
  }

  const token = createAdminSessionToken();
  if (!token) {
    return NextResponse.json({ success: false, error: "שגיאת הגדרה" }, { status: 500 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return response;
}
