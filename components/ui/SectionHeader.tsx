import type { ReactNode } from "react";
import PremiumReveal from "@/components/motion/PremiumReveal";
import ScribbleUnderline from "@/components/motion/ScribbleUnderline";

type SectionHeaderProps = {
  eyebrow?: string;
  /** Plain text before the highlighted word. */
  before?: ReactNode;
  /** Single word to highlight with an elegant underline. */
  accent?: string;
  /** Plain text after the highlighted word. */
  after?: ReactNode;
  accentColor?: string;
  /** Full title when no accent word is needed. */
  title?: ReactNode;
  subline?: ReactNode;
  align?: "center" | "start";
  className?: string;
  titleId?: string;
};

/**
 * Unified section heading: eyebrow + H2 (with one optional highlighted word) +
 * short subline. Single source of truth for section typography across the site.
 */
export default function SectionHeader({
  eyebrow,
  before,
  accent,
  after,
  accentColor = "#2563EB",
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
      {eyebrow ? <p className="home-eyebrow">{eyebrow}</p> : null}

      <h2 className="home-headline mt-3" id={titleId}>
        {accent ? (
          <>
            {before}
            <span className="accent-word">
              {accent}
              <ScribbleUnderline color={accentColor} />
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
