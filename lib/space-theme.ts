const SLICE_WIDTH = 3840;
const SLICE_HEIGHT = 1600;
const SLICE_QUALITY = 90;

/**
 * Homepage space story — distinct photos, unified purple/blue grade + seam blends.
 * Arc: nebula → starfield → galaxy → cosmic dust → aurora signal → deep void
 */
export type SpaceSliceId =
  | "hero"
  | "about"
  | "services"
  | "projects"
  | "contact"
  | "footer";

export type SpaceSliceConfig = {
  photoId: string;
  fpX: number;
  fpY: number;
  nebulaOpacity: number;
  /** Subtle tint to harmonise different source photos */
  colorGrade: string;
};

export const SPACE_STORY: Record<SpaceSliceId, SpaceSliceConfig> = {
  hero: {
    photoId: "photo-1462331940025-496dfbfc7564",
    fpX: 0.5,
    fpY: 0.38,
    nebulaOpacity: 0.3,
    colorGrade:
      "linear-gradient(180deg, rgba(55,30,95,0.18) 0%, rgba(8,10,28,0.32) 100%)",
  },
  about: {
    photoId: "photo-1419242902214-272b403eb854",
    fpX: 0.5,
    fpY: 0.52,
    nebulaOpacity: 0.26,
    colorGrade:
      "linear-gradient(180deg, rgba(20,18,48,0.22) 0%, rgba(6,8,22,0.38) 100%)",
  },
  services: {
    photoId: "photo-1464802689007-049863665176",
    fpX: 0.5,
    fpY: 0.48,
    nebulaOpacity: 0.24,
    colorGrade:
      "linear-gradient(180deg, rgba(40,28,78,0.2) 0%, rgba(10,12,32,0.34) 100%)",
  },
  projects: {
    photoId: "photo-1465101167626-1897a38c5555",
    fpX: 0.5,
    fpY: 0.42,
    nebulaOpacity: 0.28,
    colorGrade:
      "linear-gradient(180deg, rgba(48,22,72,0.2) 0%, rgba(8,10,26,0.36) 100%)",
  },
  contact: {
    photoId: "photo-1614728897120-866786da7035",
    fpX: 0.5,
    fpY: 0.55,
    nebulaOpacity: 0.22,
    colorGrade:
      "linear-gradient(180deg, rgba(18,40,68,0.22) 0%, rgba(6,10,24,0.4) 100%)",
  },
  footer: {
    photoId: "photo-1462331940025-496dfbfc7564",
    fpX: 0.5,
    fpY: 0.38,
    nebulaOpacity: 0.3,
    colorGrade:
      "linear-gradient(180deg, rgba(55,30,95,0.18) 0%, rgba(8,10,28,0.32) 100%)",
  },
};

function spaceStoryUrl(
  config: SpaceSliceConfig,
  width: number,
  height: number,
  quality: number,
) {
  return (
    `https://images.unsplash.com/${config.photoId}` +
    `?auto=format&fit=crop&crop=focalpoint&fp-x=${config.fpX}&fp-y=${config.fpY}` +
    `&w=${width}&h=${height}&q=${quality}`
  );
}

export function getSpaceSliceSrc(slice: SpaceSliceId) {
  const config = SPACE_STORY[slice];
  return {
    src: spaceStoryUrl(config, SLICE_WIDTH, SLICE_HEIGHT, SLICE_QUALITY),
    srcSet: [
      `${spaceStoryUrl(config, 1920, 800, 85)} 1920w`,
      `${spaceStoryUrl(config, 2560, 1067, 88)} 2560w`,
      `${spaceStoryUrl(config, SLICE_WIDTH, SLICE_HEIGHT, SLICE_QUALITY)} 3840w`,
    ].join(", "),
  };
}

/** Shared nebula wash — ties different photos into one palette */
export const SPACE_NEBULA_BACKGROUND =
  "radial-gradient(ellipse 85% 65% at 50% 40%, rgba(167,139,250,0.22) 0%, rgba(124,58,237,0.14) 35%, rgba(59,130,246,0.1) 58%, transparent 78%), radial-gradient(ellipse 55% 45% at 18% 72%, rgba(34,211,238,0.1) 0%, transparent 62%)";

/** Tall feathered seams — hide cuts between story chapters */
export const SPACE_SEAM_GRADIENT_TOP =
  "linear-gradient(to bottom, rgb(6,6,10) 0%, rgba(6,6,10,0.92) 12%, rgba(6,6,10,0.55) 38%, rgba(6,6,10,0.18) 62%, transparent 100%)";

export const SPACE_SEAM_GRADIENT_BOTTOM =
  "linear-gradient(to top, rgb(6,6,10) 0%, rgba(6,6,10,0.92) 12%, rgba(6,6,10,0.55) 38%, rgba(6,6,10,0.18) 62%, transparent 100%)";

/** @deprecated use SPACE_STORY */
export const SPACE_SLICES = SPACE_STORY;
