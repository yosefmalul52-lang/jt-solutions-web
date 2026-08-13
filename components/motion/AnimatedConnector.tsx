"use client";

import { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";
import { connectorDrawTransition } from "@/lib/motion";

type AnimatedConnectorProps = {
  /** Horizontal connector between cards (desktop). */
  orientation?: "horizontal" | "vertical";
  className?: string;
  /** Stroke color - defaults to gradient via CSS class. */
  strokeWidth?: number;
};

export default function AnimatedConnector({
  orientation = "horizontal",
  className = "",
  strokeWidth = 1.5,
}: AnimatedConnectorProps) {
  const gradId = `premium-connector-${useId().replace(/:/g, "")}`;
  const ref = useRef<SVGSVGElement>(null);
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const showStatic = !hydrated || reduce;

  const isHorizontal = orientation === "horizontal";
  const path = isHorizontal ? "M 0 12 L 240 12" : "M 12 0 L 12 120";

  if (showStatic) {
    return (
      <svg
        ref={ref}
        viewBox={isHorizontal ? "0 0 240 24" : "0 0 24 120"}
        className={`premium-connector ${className}`.trim()}
        aria-hidden
      >
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={0.35}
        />
      </svg>
    );
  }

  return (
    <svg
      ref={ref}
      viewBox={isHorizontal ? "0 0 240 24" : "0 0 24 120"}
      className={`premium-connector ${className}`.trim()}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b3e7" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#7c3aed" stopOpacity="1" />
          <stop offset="100%" stopColor="#10b3e7" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.4 }}
        transition={connectorDrawTransition(reduce)}
      />
    </svg>
  );
}
