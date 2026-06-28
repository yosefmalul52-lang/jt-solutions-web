"use client";

import type { CSSProperties, ReactNode } from "react";
import TiltSurface from "@/components/motion/TiltSurface";
import { useHydrated } from "@/hooks/useHydrated";
import { canUsePointerEffects } from "@/lib/motion";

type PremiumGlassCardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
  /** Enable cursor-tracking tilt on desktop. */
  tilt?: boolean;
  /** Show cursor highlight wash on hover. */
  highlight?: boolean;
  as?: "div" | "article";
};

export default function PremiumGlassCard({
  children,
  className = "",
  innerClassName = "",
  style,
  tilt = true,
  highlight = false,
  as = "div",
}: PremiumGlassCardProps) {
  const hydrated = useHydrated();
  const useTilt = tilt && hydrated && canUsePointerEffects();
  const panelClass = `premium-glass-panel premium-glass-panel--interactive ${className}`.trim();
  const Tag = as;

  if (!useTilt) {
    return (
      <Tag className={panelClass} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <TiltSurface
      as={as}
      className={panelClass}
      innerClassName={innerClassName}
      style={style}
      showHighlight={highlight}
    >
      {children}
    </TiltSurface>
  );
}
