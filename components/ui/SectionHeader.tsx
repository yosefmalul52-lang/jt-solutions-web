import type { ReactNode } from "react";
import PremiumReveal from "@/components/motion/PremiumReveal";

type SectionHeaderProps = {
  /** Plain text before the highlighted word. */
  before?: ReactNode;
  /** Word highlighted with the marker background. */
  accent?: string;
  /** Plain text after the highlighted word. */
  after?: ReactNode;
  /** @deprecated Kept for call-site compatibility; marker uses fixed asset. */
  accentColor?: string;
  /** Full title when no accent word is needed. */
  title?: ReactNode;
  subline?: ReactNode;
  align?: "center" | "start";
  className?: string;
  titleId?: string;
};

/**
 * Unified section heading: H2 (with one optional highlighted word) + short subline.
 */
export default function SectionHeader({
  before,
  accent,
  after,
  title,
  subline,
  align = "center",
  className = "",
  titleId,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <PremiumReveal
      className={`max-w-3xl ${isCenter ? "mx-auto text-center" : "text-right"} ${className}`.trim()}
      variant="rise"
    >
      <h2 className="home-headline" id={titleId}>
        {accent ? (
          <>
            {before}
            <span className="accent-word">
              <span className="accent-word__text">{accent}</span>
            </span>
            {after}
          </>
        ) : (
          title
        )}
      </h2>

      {subline ? (
        <p className={`home-subline mt-4 max-w-2xl ${isCenter ? "mx-auto" : ""}`.trim()}>{subline}</p>
      ) : null}
    </PremiumReveal>
  );
}
