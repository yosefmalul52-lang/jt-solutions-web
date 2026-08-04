/** Only allow same-origin admin paths after login. */
export function safeAdminNextPath(raw: string | null | undefined): string {
  if (!raw) return "/admin";
  if (!raw.startsWith("/admin")) return "/admin";
  if (raw.startsWith("//")) return "/admin";
  if (raw.includes("..") || raw.includes("\\") || raw.includes("@")) return "/admin";
  return raw;
}
