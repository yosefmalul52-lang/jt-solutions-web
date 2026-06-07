import type { PillarSlug } from "@/lib/pillars";

export type ServiceCardMedia = {
  src: string;
  /** CSS object-position for portrait crops in card frames */
  objectPosition: string;
};

export const SERVICE_CARD_MEDIA: Record<PillarSlug, ServiceCardMedia> = {
  websites: {
    src: "/services/websites.png",
    objectPosition: "center 22%",
  },
  branding: {
    src: "/services/branding.png",
    objectPosition: "center 35%",
  },
  automations: {
    src: "/services/automations.png",
    objectPosition: "center 38%",
  },
  "digital-marketing": {
    src: "/services/digital-marketing.png",
    objectPosition: "center 42%",
  },
};

export function getServiceCardImage(slug: PillarSlug): ServiceCardMedia {
  return SERVICE_CARD_MEDIA[slug];
}
