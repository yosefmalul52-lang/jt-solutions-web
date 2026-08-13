/**
 * Premium visual system - Phase 6A design tokens.
 * Consumed by CSS classes in globals.css and motion primitives.
 */

export const PREMIUM_COLORS = {
  void: "#06060A",
  deep: "#0B0F1A",
  slate: "#1E293B",
  canvas: "#F9FAFB",
  surface: "#FFFFFF",
  ink: "#0F172A",
  muted: "#64748B",
  violet: "#7C3AED",
  cyan: "#10B3E7",
} as const;

export const PREMIUM_GLOWS = {
  violet: "0 0 48px rgba(124, 58, 237, 0.22), 0 0 96px rgba(124, 58, 237, 0.08)",
  cyan: "0 0 48px rgba(16, 179, 231, 0.2), 0 0 96px rgba(16, 179, 231, 0.08)",
  editorial: "0 18px 42px rgba(15, 23, 42, 0.11), 0 4px 14px rgba(15, 23, 42, 0.06)",
} as const;

/** Homepage section rhythm - dark/light alternation for Phase 6B+. */
export const HOME_VISUAL_RHYTHM = [
  { id: "hero", tone: "dark", motion: "cinematic-entrance" },
  { id: "problem", tone: "light", motion: "dramatic-reveal" },
  { id: "solution", tone: "dark", motion: "connected-systems" },
  { id: "projects", tone: "mixed", motion: "editorial-parallax" },
  { id: "process", tone: "dark", motion: "timeline-draw" },
  { id: "services", tone: "light", motion: "pillar-hover" },
  { id: "testimonials", tone: "dark", motion: "glass-entrance" },
  { id: "pricing", tone: "light", motion: "tier-rise" },
  { id: "faq", tone: "light", motion: "calm-accordion" },
  { id: "contact", tone: "dark", motion: "finale-entrance" },
] as const;

export type HomeSectionId = (typeof HOME_VISUAL_RHYTHM)[number]["id"];
export type SectionTone = "dark" | "light" | "mixed";
