"use client";

import type { ElementType, ReactNode } from "react";

type PremiumCardProps = {
  children: ReactNode;
  className?: string;
  /** Accent for light-leak border — RGB components e.g. `"59, 130, 246"` */
  accentRgb?: string;
  innerClassName?: string;
  as?: ElementType;
  /** Brighter edge glow on hover */
  hoverGlow?: boolean;
};

/**
 * Tech-Lux card: film grain, glass fill, gradient light-leak border.
 * Pair with `SkewReveal` for scroll entrance animations.
 */
export default function PremiumCard({
  children,
  className = "",
  innerClassName = "",
  accentRgb = "59, 130, 246",
  as: Tag = "div",
  hoverGlow = true,
}: PremiumCardProps) {
  return (
    <Tag
      className={[
        "premium-card group relative isolate overflow-hidden",
        hoverGlow ? "premium-card--hover" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--premium-accent": accentRgb } as React.CSSProperties}
    >
      <div className="premium-card__noise pointer-events-none" aria-hidden />
      <div className="premium-card__glow pointer-events-none" aria-hidden />
      <div className={`premium-card__inner relative z-[1] ${innerClassName}`.trim()}>{children}</div>
    </Tag>
  );
}
