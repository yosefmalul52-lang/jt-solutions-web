import Image from "next/image";
import {
  getSpaceSliceImage,
  SPACE_NEBULA_BACKGROUND,
  SPACE_SEAM_GRADIENT_BOTTOM,
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
};

function HeroResponsiveImage({
  src,
  mobileSrc,
  mobileWidth,
  mobileHeight,
  objectPosition,
  desktopSizes,
}: {
  src: string;
  mobileSrc: string;
  mobileWidth: number;
  mobileHeight: number;
  objectPosition: string;
  desktopSizes: string;
}) {
  return (
    <>
      <div className="absolute inset-0 md:hidden" aria-hidden>
        <picture className="block h-full w-full">
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
      </div>

      <div className="absolute inset-0 hidden md:block" aria-hidden>
        <Image
          src={src}
          alt=""
          fill
          sizes={desktopSizes}
          priority
          loading="eager"
          fetchPriority="high"
          quality={80}
          className={HERO_IMAGE_CLASS}
          style={{ objectPosition }}
        />
      </div>
    </>
  );
}

export default function SpaceSegmentBackground({
  slice,
  blendTop = true,
  blendBottom = true,
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
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#06060a]" aria-hidden>
      {hasMobileHero ? (
        <HeroResponsiveImage
          src={src}
          mobileSrc={mobileSrc}
          mobileWidth={mobileWidth}
          mobileHeight={mobileHeight}
          objectPosition={objectPosition}
          desktopSizes={sizes}
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
          className="absolute inset-x-0 top-0 h-28 sm:h-36"
          style={{ background: SPACE_SEAM_GRADIENT_TOP }}
        />
      ) : null}

      {blendBottom ? (
        <div
          className="absolute inset-x-0 bottom-0 h-28 sm:h-36"
          style={{ background: SPACE_SEAM_GRADIENT_BOTTOM }}
        />
      ) : null}
    </div>
  );
}
