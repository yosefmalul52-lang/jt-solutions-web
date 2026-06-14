import Image from "next/image";
import {
  getSpaceSliceImage,
  SPACE_NEBULA_BACKGROUND,
  SPACE_SEAM_GRADIENT_BOTTOM,
  SPACE_SEAM_GRADIENT_TOP,
  SPACE_STORY,
  type SpaceSliceId,
} from "@/lib/space-theme";

type SpaceSegmentBackgroundProps = {
  slice: SpaceSliceId;
  blendTop?: boolean;
  blendBottom?: boolean;
};

export default function SpaceSegmentBackground({
  slice,
  blendTop = true,
  blendBottom = true,
}: SpaceSegmentBackgroundProps) {
  const { src, objectPosition, priority, quality } = getSpaceSliceImage(slice);
  const { nebulaOpacity, colorGrade } = SPACE_STORY[slice];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#06060a]" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        priority={priority}
        quality={quality}
        className="object-cover brightness-[0.82] contrast-[1.06] saturate-[0.9]"
        style={{ objectPosition }}
      />

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
