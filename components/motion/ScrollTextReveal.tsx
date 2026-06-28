"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";
import { EASE_OUT } from "@/lib/motion";

type ScrollTextRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "span" | "div";
};

/**
 * Mask reveal for short headings / key phrases. Text stays in the DOM and is
 * fully accessible; only a clip-path animation is layered on top.
 */
export default function ScrollTextReveal({
  children,
  className,
  delay = 0,
  as = "span",
}: ScrollTextRevealProps) {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const animate = hydrated && reduce !== true;

  if (!animate) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = as === "div" ? motion.div : motion.span;

  return (
    <MotionTag
      className={className}
      style={{ display: as === "span" ? "inline-block" : undefined }}
      initial={{ clipPath: "inset(0 0 110% 0)", opacity: 0, y: 8 }}
      whileInView={{ clipPath: "inset(0 0 -10% 0)", opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
    >
      {children}
    </MotionTag>
  );
}
