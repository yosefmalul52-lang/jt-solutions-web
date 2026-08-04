import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "jt_admin_session";

export function createAdminSessionToken(password = process.env.ADMIN_PASSWORD): string | null {
  if (!password) return null;
  return createHmac("sha256", password).update("jt-admin-session-v1").digest("hex");
}

export function isValidAdminSession(token: string | undefined | null): boolean {
  const expected = createAdminSessionToken();
  if (!token || !expected) return false;
  try {
    const left = Buffer.from(token);
    const right = Buffer.from(expected);
    if (left.length !== right.length) return false;
    return timingSafeEqual(left, right);
  } catch {
    return false;
  }
}

export function adminAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD?.trim());
}
