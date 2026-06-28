"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";
import {
  DURATION_REVEAL,
  EASE_OUT,
  motionTransition,
  premiumRevealVariants,
  viewport,
  type ViewportKey,
} from "@/lib/motion";

export type PremiumRevealVariant = "fade" | "rise" | "depth" | "dramatic";

type PremiumRevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  viewportKey?: ViewportKey;
  variant?: PremiumRevealVariant;
  y?: number;
  as?: "div" | "article" | "section" | "li";
};

const VARIANT_PRESETS: Record<
  PremiumRevealVariant,
  { y: number; scale: number; blur: number }
> = {
  fade: { y: 12, scale: 1, blur: 0 },
  rise: { y: 20, scale: 1, blur: 0 },
  depth: { y: 24, scale: 0.97, blur: 4 },
  dramatic: { y: 32, scale: 0.94, blur: 6 },
};

export default function PremiumReveal({
  children,
  className,
  style,
  delay = 0,
  duration = DURATION_REVEAL,
  viewportKey = "section",
  variant = "depth",
  y,
  as = "div",
}: PremiumRevealProps) {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const vp = viewport[viewportKey];
  const preset = VARIANT_PRESETS[variant];
  const variants = premiumRevealVariants(reduce, {
    y: y ?? preset.y,
    scale: preset.scale,
    blur: preset.blur,
  });
  const t = motionTransition(reduce, { duration, delay, ease: EASE_OUT });

  const StaticTag = as;
  const MotionTag =
    as === "section"
      ? motion.section
      : as === "article"
        ? motion.article
        : as === "li"
          ? motion.li
          : motion.div;

  if (!hydrated || reduce) {
    return (
      <StaticTag className={className} style={style}>
        {children}
      </StaticTag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      variants={{
        hidden: variants.hidden,
        visible: variants.visible,
      }}
      transition={t}
    >
      {children}
    </MotionTag>
  );
}
