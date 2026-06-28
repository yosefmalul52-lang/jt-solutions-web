"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";
import { EASE_OUT } from "@/lib/motion";

type ScribbleUnderlineProps = {
  color?: string;
  className?: string;
  delay?: number;
};

/** Hand-drawn SVG underline that draws itself in on scroll. Decorative only. */
export default function ScribbleUnderline({
  color = "#2563EB",
  className = "",
  delay = 0.1,
}: ScribbleUnderlineProps) {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const animate = hydrated && reduce !== true;

  return (
    <svg
      className={`scribble-underline ${className}`.trim()}
      viewBox="0 0 240 16"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M4 9C46 5 96 4 140 7c32 2 62 2 96-3"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        initial={animate ? { pathLength: 0, opacity: 0.4 } : false}
        whileInView={animate ? { pathLength: 1, opacity: 1 } : undefined}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      />
    </svg>
  );
}
