"use client";

import { type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";
import { useMouseTilt } from "@/hooks/useMouseTilt";
import { TILT_Z_LIFT } from "@/lib/motion";

type TiltSurfaceProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
  as?: "div" | "article";
  disabled?: boolean;
  /** Cursor-tracking color wash — off by default for clean cards. */
  showHighlight?: boolean;
};

export default function TiltSurface({
  children,
  className = "",
  innerClassName = "",
  style,
  as = "div",
  disabled = false,
  showHighlight = false,
}: TiltSurfaceProps) {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const { ref, style: tiltStyle, handlers, highlight, disabled: tiltOff } = useMouseTilt({
    disabled: disabled || reduce === true || !hydrated,
  });

  const MotionTag = as === "article" ? motion.article : motion.div;
  const mergedStyle = tiltOff ? style : { ...style, ...tiltStyle };

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLDivElement>}
      style={mergedStyle}
      className={`relative ${className}`.trim()}
      {...handlers}
    >
      {!tiltOff && showHighlight ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: highlight }}
        />
      ) : null}
      <div
        className={`relative z-[1] h-full ${innerClassName}`.trim()}
        style={
          tiltOff
            ? undefined
            : { transform: `translateZ(${TILT_Z_LIFT}px)`, transformStyle: "preserve-3d" }
        }
      >
        {children}
      </div>
    </MotionTag>
  );
}
