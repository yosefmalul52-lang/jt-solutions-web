"use client";

import type { ReactNode } from "react";
import type { SectionTone } from "@/lib/premium-visual";

export type SeamVariant = "dark-to-light" | "light-to-dark" | "none";

type MotionSectionShellProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  tone?: SectionTone;
  seamTop?: SeamVariant;
  seamBottom?: SeamVariant;
  dir?: "rtl" | "ltr";
};

/**
 * Section wrapper applying premium tone classes and animated gradient seams.
 * Does not replace SpaceSectionBackdrop - compose both when needed in 6B+.
 */
export default function MotionSectionShell({
  children,
  id,
  className = "",
  tone = "light",
  seamTop = "none",
  seamBottom = "none",
  dir = "rtl",
}: MotionSectionShellProps) {
  const toneClass =
    tone === "dark"
      ? "premium-dark-section"
      : tone === "light"
        ? "premium-light-section"
        : "premium-mixed-section";

  const seamTopClass =
    seamTop === "dark-to-light"
      ? "premium-seam-dark-to-light"
      : seamTop === "light-to-dark"
        ? "premium-seam-light-to-dark"
        : "";

  const seamBottomClass =
    seamBottom === "dark-to-light"
      ? "premium-seam-dark-to-light premium-seam--bottom"
      : seamBottom === "light-to-dark"
        ? "premium-seam-light-to-dark premium-seam--bottom"
        : "";

  return (
    <section
      id={id}
      dir={dir}
      className={`section-shell premium-motion-safe ${toneClass} ${seamTopClass} ${seamBottomClass} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
