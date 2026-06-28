import Image from "next/image";
import {
  getSpaceSliceImage,
  SPACE_NEBULA_BACKGROUND,
  SPACE_SEAM_GRADIENT_BOTTOM,
  SPACE_SEAM_GRADIENT_BOTTOM_LIGHT,
  SPACE_SEAM_GRADIENT_TOP,
  SPACE_STORY,
  type SpaceSliceId,
} from "@/lib/space-theme";

const HERO_IMAGE_CLASS =
  "object-cover brightness-[0.82] contrast-[1.06] saturate-[0.9]";

type SpaceSegmentBackgroundProps = {
  slice: SpaceSliceId;
  blendTop?: boolean;
  blendBottom?: boolean;
  /** Fade bottom into illuminated canvas instead of void */
  seamBottomTone?: "void" | "light";
};

function HeroResponsiveImage({
  src,
  mobileSrc,
  mobileWidth,
  mobileHeight,
  objectPosition,
}: {
  src: string;
  mobileSrc: string;
  mobileWidth: number;
  mobileHeight: number;
  objectPosition: string;
}) {
  return (
    <picture className="absolute inset-0 block h-full w-full">
      <source media="(min-width: 768px)" srcSet={src} />
      <source srcSet={mobileSrc} type="image/webp" />
      <img
        src={mobileSrc}
        alt=""
        width={mobileWidth}
        height={mobileHeight}
        decoding="async"
        fetchPriority="high"
        loading="eager"
        sizes="100vw"
        className={`h-full w-full ${HERO_IMAGE_CLASS}`}
        style={{ objectPosition }}
      />
    </picture>
  );
}

export default function SpaceSegmentBackground({
  slice,
  blendTop = true,
  blendBottom = true,
  seamBottomTone = "void",
}: SpaceSegmentBackgroundProps) {
  const {
    src,
    mobileSrc,
    mobileWidth,
    mobileHeight,
    objectPosition,
    priority,
    quality,
    sizes,
    loading,
  } = getSpaceSliceImage(slice);
  const { nebulaOpacity, colorGrade } = SPACE_STORY[slice];
  const isHero = slice === "hero";
  const hasMobileHero =
    isHero && mobileSrc && mobileWidth && mobileHeight;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-transparent" aria-hidden>
      {hasMobileHero ? (
        <HeroResponsiveImage
          src={src}
          mobileSrc={mobileSrc}
          mobileWidth={mobileWidth}
          mobileHeight={mobileHeight}
          objectPosition={objectPosition}
        />
      ) : (
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          loading={loading}
          fetchPriority={priority ? "high" : "auto"}
          quality={quality}
          className={HERO_IMAGE_CLASS}
          style={{ objectPosition }}
        />
      )}

      <div className="absolute inset-0 bg-neutral-950/30" />

      <div className="absolute inset-0" style={{ background: colorGrade }} />

      <div
        className="absolute inset-0"
        style={{
          opacity: nebulaOpacity,
          background: SPACE_NEBULA_BACKGROUND,
        }}
      />

      {blendTop ? (
        <div
          className="absolute inset-x-0 top-0 h-[100px] sm:h-[120px]"
          style={{ background: SPACE_SEAM_GRADIENT_TOP }}
        />
      ) : null}

      {blendBottom ? (
        <div
          className="absolute inset-x-0 bottom-0 h-[100px] sm:h-[120px]"
          style={{
            background:
              seamBottomTone === "light"
                ? SPACE_SEAM_GRADIENT_BOTTOM_LIGHT
                : SPACE_SEAM_GRADIENT_BOTTOM,
          }}
        />
      ) : null}
    </div>
  );
}
