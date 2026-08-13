import Script from "next/script";

const jtPixelSrc = (process.env.NEXT_PUBLIC_JT_PIXEL_SRC ?? "").trim();
const jtPixelId = (process.env.NEXT_PUBLIC_JT_PIXEL_ID ?? "").trim();

/** Optional first-party pixel - only loads when both env vars are set. */
export default function JtPixel() {
  if (!jtPixelSrc || !jtPixelId) return null;

  return (
    <Script
      id="jt-analytics-pixel"
      src={jtPixelSrc}
      strategy="afterInteractive"
      data-jt-id={jtPixelId}
    />
  );
}
