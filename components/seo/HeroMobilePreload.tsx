/** Mobile hero LCP preload — real head link, not metadata.icons. */
export default function HeroMobilePreload() {
  return (
    <link
      rel="preload"
      href="/space/hero-mobile.webp"
      as="image"
      type="image/webp"
      media="(max-width: 767px)"
      fetchPriority="high"
    />
  );
}
