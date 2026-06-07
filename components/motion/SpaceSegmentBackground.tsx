import {
  getSpaceSliceSrc,
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
  const { src, srcSet } = getSpaceSliceSrc(slice);
  const { nebulaOpacity, colorGrade } = SPACE_STORY[slice];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#06060a]" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        srcSet={srcSet}
        sizes="100vw"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.82] contrast-[1.06] saturate-[0.9]"
        decoding="async"
        draggable={false}
        fetchPriority={slice === "hero" ? "high" : "low"}
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
