"use client";

import type { ReactNode } from "react";

type TimeTunnelBackdropProps = {
  className?: string;
  /** Intensity 0–1 — keep low for performance. */
  intensity?: "subtle" | "medium";
  children?: ReactNode;
};

/**
 * Lightweight CSS tunnel — radial rings + slow drift. No canvas/video.
 * Place inside a relative container; pointer-events none.
 */
export default function TimeTunnelBackdrop({
  className = "",
  intensity = "subtle",
  children,
}: TimeTunnelBackdropProps) {
  return (
    <div
      className={`premium-tunnel-backdrop premium-tunnel-backdrop--${intensity} ${className}`.trim()}
      aria-hidden
    >
      <div className="premium-tunnel-backdrop__rings" />
      <div className="premium-tunnel-backdrop__beam" />
      {children}
    </div>
  );
}
