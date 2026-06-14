import type { ReactNode } from "react";
import type { SpaceSliceId } from "@/lib/space-theme";
import SpaceSegmentBackground from "@/components/motion/SpaceSegmentBackground";

type SpaceSectionBackdropProps = {
  slice: SpaceSliceId;
  children: ReactNode;
  className?: string;
  blendTop?: boolean;
  blendBottom?: boolean;
};

/** Section wrapper with a matched space slice background */
export default function SpaceSectionBackdrop({
  slice,
  children,
  className = "",
  blendTop,
  blendBottom,
}: SpaceSectionBackdropProps) {
  const isHero = slice === "hero";
  const isFooter = slice === "footer";

  return (
    <div className={`relative isolate overflow-hidden ${className}`.trim()}>
      <SpaceSegmentBackground
        slice={slice}
        blendTop={blendTop ?? !isHero}
        blendBottom={blendBottom ?? !isFooter}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
