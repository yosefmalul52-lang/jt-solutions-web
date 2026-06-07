"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";
import { EASE, motionTransition, viewport, type ViewportKey } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  viewportKey?: ViewportKey;
  y?: number;
  x?: number;
  as?: "div" | "article";
};

export default function Reveal({
  children,
  className,
  style,
  delay = 0,
  duration = 0.6,
  viewportKey = "section",
  y = 20,
  x,
  as = "div",
}: RevealProps) {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const vp = viewport[viewportKey];
  const t = motionTransition(reduce, { duration, delay, ease: EASE });

  const initial =
    x !== undefined ? { opacity: 0, x, y: 0 } : { opacity: 0, y, x: 0 };
  const animate = { opacity: 1, y: 0, x: 0 };
  const MotionTag = as === "article" ? motion.article : motion.div;

  if (!hydrated || reduce) {
    const StaticTag = as === "article" ? "article" : "div";
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
      initial={initial}
      whileInView={animate}
      viewport={vp}
      transition={t}
    >
      {children}
    </MotionTag>
  );
}
