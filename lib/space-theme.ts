/**
 * Homepage space story — distinct photos, unified purple/blue grade + seam blends.
 * Arc: nebula → starfield → galaxy → cosmic dust → aurora signal → deep void
 *
 * Backgrounds are self-hosted under /public/space (1920×800, q≈80) so the hero
 * avoids an external Unsplash round-trip and Next.js can serve AVIF/WebP.
 */
export type SpaceSliceId =
  | "hero"
  | "about"
  | "services"
  | "projects"
  | "contact"
  | "footer";

export type SpaceSliceConfig = {
  /** Local path under /public */
  imageSrc: string;
  /** Optional mobile-optimized hero art direction asset */
  mobileImageSrc?: string;
  mobileImageWidth?: number;
  mobileImageHeight?: number;
  objectPosition: string;
  nebulaOpacity: number;
  /** Subtle tint to harmonise different source photos */
  colorGrade: string;
};

export const SPACE_STORY: Record<SpaceSliceId, SpaceSliceConfig> = {
  hero: {
    imageSrc: "/space/hero.jpg",
    mobileImageSrc: "/space/hero-mobile.webp",
    mobileImageWidth: 900,
    mobileImageHeight: 375,
    objectPosition: "center 38%",
    nebulaOpacity: 0.3,
    colorGrade:
      "linear-gradient(180deg, rgba(55,30,95,0.18) 0%, rgba(8,10,28,0.32) 100%)",
  },
  about: {
    imageSrc: "/space/about.jpg",
    objectPosition: "center 52%",
    nebulaOpacity: 0.26,
    colorGrade:
      "linear-gradient(180deg, rgba(20,18,48,0.22) 0%, rgba(6,8,22,0.38) 100%)",
  },
  services: {
    imageSrc: "/space/services.jpg",
    objectPosition: "center 48%",
    nebulaOpacity: 0.24,
    colorGrade:
      "linear-gradient(180deg, rgba(40,28,78,0.2) 0%, rgba(10,12,32,0.34) 100%)",
  },
  projects: {
    imageSrc: "/space/projects.jpg",
    objectPosition: "center 42%",
    nebulaOpacity: 0.28,
    colorGrade:
      "linear-gradient(180deg, rgba(48,22,72,0.2) 0%, rgba(8,10,26,0.36) 100%)",
  },
  contact: {
    imageSrc: "/space/contact.jpg",
    objectPosition: "center 55%",
    nebulaOpacity: 0.22,
    colorGrade:
      "linear-gradient(180deg, rgba(18,40,68,0.22) 0%, rgba(6,10,24,0.4) 100%)",
  },
  footer: {
    imageSrc: "/space/footer.jpg",
    objectPosition: "center 38%",
    nebulaOpacity: 0.3,
    colorGrade:
      "linear-gradient(180deg, rgba(55,30,95,0.18) 0%, rgba(8,10,28,0.32) 100%)",
  },
};

export type SpaceSliceImage = {
  src: string;
  mobileSrc?: string;
  mobileWidth?: number;
  mobileHeight?: number;
  objectPosition: string;
  priority: boolean;
  quality: number;
  sizes: string;
  mobileSizes: string;
  loading: "eager" | "lazy";
};

const HERO_IMAGE_SIZES = "(min-width: 768px) 100vw, 1920px";
const HERO_MOBILE_SIZES = "100vw";
const BELOW_FOLD_IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 1200px";

export function getSpaceSliceImage(slice: SpaceSliceId): SpaceSliceImage {
  const config = SPACE_STORY[slice];
  const isHero = slice === "hero";

  return {
    src: config.imageSrc,
    mobileSrc: config.mobileImageSrc,
    mobileWidth: config.mobileImageWidth,
    mobileHeight: config.mobileImageHeight,
    objectPosition: config.objectPosition,
    priority: isHero,
    quality: isHero ? 80 : 75,
    sizes: isHero ? HERO_IMAGE_SIZES : BELOW_FOLD_IMAGE_SIZES,
    mobileSizes: isHero ? HERO_MOBILE_SIZES : BELOW_FOLD_IMAGE_SIZES,
    loading: isHero ? "eager" : "lazy",
  };
}

/** @deprecated use getSpaceSliceImage — kept for any stale imports */
export function getSpaceSliceSrc(slice: SpaceSliceId) {
  const { src } = getSpaceSliceImage(slice);
  return { src, srcSet: "" };
}

/** Shared nebula wash — ties different photos into one palette */
export const SPACE_NEBULA_BACKGROUND =
  "radial-gradient(ellipse 85% 65% at 50% 40%, rgba(167,139,250,0.22) 0%, rgba(124,58,237,0.14) 35%, rgba(59,130,246,0.1) 58%, transparent 78%), radial-gradient(ellipse 55% 45% at 18% 72%, rgba(34,211,238,0.1) 0%, transparent 62%)";

/** Tall feathered seams — hide cuts between story chapters */
export const SPACE_SEAM_GRADIENT_TOP =
  "linear-gradient(to bottom, rgb(6,6,10) 0%, rgba(6,6,10,0.92) 12%, rgba(6,6,10,0.55) 38%, rgba(6,6,10,0.18) 62%, transparent 100%)";

export const SPACE_SEAM_GRADIENT_BOTTOM =
  "linear-gradient(to top, rgb(6,6,10) 0%, rgba(6,6,10,0.92) 12%, rgba(6,6,10,0.55) 38%, rgba(6,6,10,0.18) 62%, transparent 100%)";

/** Dark section exiting into illuminated canvas zone */
export const SPACE_SEAM_GRADIENT_BOTTOM_LIGHT =
  "linear-gradient(to top, #e2e8f2 0%, rgba(226,232,242,0.75) 18%, rgba(6,6,10,0.22) 52%, transparent 100%)";

/** @deprecated use SPACE_STORY */
export const SPACE_SLICES = SPACE_STORY;

/** @deprecated Use components/seo/HeroMobilePreload — do not put this in metadata.icons. */
export const HERO_MOBILE_PRELOAD = {
  rel: "preload" as const,
  url: "/space/hero-mobile.webp",
  type: "image/webp",
  media: "(max-width: 767px)",
  fetchPriority: "high" as const,
};
