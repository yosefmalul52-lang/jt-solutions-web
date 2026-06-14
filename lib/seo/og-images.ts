import type { PillarSlug } from "@/lib/pillars";

export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "JT Solutions — סוכנות דיגיטל בישראל",
} as const;

const PILLAR_OG_IMAGES: Record<PillarSlug, string> = {
  websites: "/services/websites.png",
  branding: "/services/branding.png",
  automations: "/services/automations.png",
  "digital-marketing": "/services/digital-marketing.png",
};

export function getPillarOgImage(slug: PillarSlug) {
  return {
    url: PILLAR_OG_IMAGES[slug],
    width: 1200,
    height: 630,
    alt: `JT Solutions — ${slug}`,
  };
}

export function getProjectOgImage(imageSrc: string, title: string) {
  return {
    url: imageSrc,
    width: 1200,
    height: 630,
    alt: title,
  };
}

export function getHomeOgImage() {
  return {
    url: "/space/hero.jpg",
    width: 1920,
    height: 800,
    alt: "JT Solutions — מעטפת דיגיטלית חכמה",
  };
}
