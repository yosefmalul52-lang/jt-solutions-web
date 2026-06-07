/** Meta (Facebook) Pixel ID — numeric string only; empty/invalid skips all fb scripts. */
export function getMetaPixelId(): string | null {
  const raw = (
    process.env.NEXT_PUBLIC_FB_PIXEL_ID ??
    process.env.NEXT_PUBLIC_META_PIXEL_ID ??
    ""
  ).trim();

  if (!raw || raw === "null" || raw === "undefined") return null;
  if (!/^\d{5,20}$/.test(raw)) return null;

  return raw;
}
