type ContinuityVariant = "projects-soft" | "contact-glow";

type SectionContinuityLayerProps = {
  variant: ContinuityVariant;
  className?: string;
};

/**
 * Minimal decorative accents - only for Projects and Contact wow moments.
 */
export default function SectionContinuityLayer({
  variant,
  className = "",
}: SectionContinuityLayerProps) {
  return (
    <div
      className={`premium-section-continuity-layer premium-continuity--${variant} ${className}`.trim()}
      aria-hidden
    />
  );
}
