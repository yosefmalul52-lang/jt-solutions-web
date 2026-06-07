import type { Transition, Variants } from "framer-motion";

/** Primary ease-out — scroll reveals, accordions, page enter. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** @deprecated Use EASE_OUT — kept for existing imports. */
export const EASE = EASE_OUT;

export const EASE_IN_OUT: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const SPRING_SNAPPY = { stiffness: 400, damping: 30 } as const;
export const SPRING_SMOOTH = { stiffness: 180, damping: 24 } as const;
export const SPRING_GENTLE = { stiffness: 120, damping: 20 } as const;
export const SPRING_MAGNETIC = { stiffness: 220, damping: 26, mass: 0.65 } as const;

export const DURATION_FAST = 0.15;
export const DURATION_UI = 0.28;
export const DURATION_UI_REDUCED = 0.12;
export const DURATION_REVEAL = 0.6;

export const STAGGER_TIGHT = 0.08;
export const STAGGER_SECTION = 0.1;
export const DELAY_CHILDREN = 0.12;

export const DISTANCE_REVEAL_Y = 20;
export const DISTANCE_REVEAL_Y_HERO = 30;

export const TILT_MAX_DESKTOP = 9;
export const TILT_MAX_MOBILE = 0;
export const TILT_PERSPECTIVE = 1200;
export const TILT_Z_LIFT = 24;

/** Viewport presets for `whileInView` — keep `once` to avoid replay on scroll-back. */
export const viewport = {
  section: { once: true as const, margin: "-80px" },
  sectionLoose: { once: true as const, margin: "-50px" },
  sectionTight: { once: true as const, margin: "-60px" },
  sectionProof: { once: true as const, margin: "-90px" },
  sectionPillar: { once: true as const, margin: "-70px" },
  /** No margin — element may be large (e.g. contact form column). */
  inView: { once: true as const },
} as const;

export type ViewportKey = keyof typeof viewport;

export function motionTransition(
  prefersReducedMotion: boolean | null,
  full: { duration: number; delay?: number; ease?: typeof EASE_OUT },
): Transition {
  if (prefersReducedMotion) {
    return { duration: 0.01, delay: 0, ease: EASE_OUT };
  }
  return {
    duration: full.duration,
    delay: full.delay ?? 0,
    ease: full.ease ?? EASE_OUT,
  };
}

/** Shared height accordion / dropdown panel timing (FAQ, Services dropdown). */
export function accordionPanelTransition(prefersReducedMotion: boolean | null): Transition {
  return motionTransition(prefersReducedMotion, {
    duration: prefersReducedMotion ? DURATION_UI_REDUCED : DURATION_UI,
    ease: EASE_OUT,
  });
}

/** Staggered lists (Hero, Services timeline, Pricing cards). */
export function staggerVariants(prefersReducedMotion: boolean | null): {
  container: Variants;
  item: Variants;
} {
  if (prefersReducedMotion) {
    return {
      container: {
        hidden: {},
        show: { transition: { staggerChildren: 0 } },
      },
      item: {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0, transition: { duration: 0.01, ease: EASE_OUT } },
      },
    };
  }
  return {
    container: {
      hidden: {},
      show: {
        transition: { staggerChildren: STAGGER_SECTION, duration: DURATION_REVEAL, ease: EASE_OUT },
      },
    },
    item: {
      hidden: { opacity: 0, y: DISTANCE_REVEAL_Y },
      show: { opacity: 1, y: 0, transition: { duration: DURATION_REVEAL, ease: EASE_OUT } },
    },
  };
}

/** Proof bento grid — staggered materialize (scale + 90° unfold). For Phase 2+ Proof section. */
export function proofBentoStagger(prefersReducedMotion: boolean | null) {
  if (prefersReducedMotion) {
    return {
      container: {
        hidden: {},
        visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
      },
      card: {
        hidden: { opacity: 1, scale: 1, rotateX: 0, rotateY: 0, filter: "blur(0px)" },
        visible: { opacity: 1, scale: 1, rotateX: 0, rotateY: 0, filter: "blur(0px)" },
      },
      header: {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      },
    };
  }

  return {
    container: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: STAGGER_SECTION,
          delayChildren: DELAY_CHILDREN,
        },
      },
    },
    card: {
      hidden: (index: number) => {
        const axis = index % 3;
        return {
          opacity: 0,
          scale: 0.86,
          rotateX: axis === 0 ? 88 : 0,
          rotateY: axis === 1 ? -88 : axis === 2 ? 88 : 0,
          filter: "blur(6px)",
          transformOrigin: axis === 1 ? "right center" : axis === 2 ? "left center" : "center bottom",
        };
      },
      visible: {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        filter: "blur(0px)",
        transition: {
          type: "spring" as const,
          ...SPRING_GENTLE,
          mass: 0.85,
        },
      },
    },
    header: {
      hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: DURATION_REVEAL, ease: EASE_OUT },
      },
    },
  };
}

/** Alias for proof bento card variants — same as `proofBentoStagger().card`. */
export function proofMaterializeCardVariants(prefersReducedMotion: boolean | null): Variants {
  return proofBentoStagger(prefersReducedMotion).card as Variants;
}

export function pageEnterTransition(prefersReducedMotion: boolean | null): Transition {
  return motionTransition(prefersReducedMotion, { duration: 0.5, delay: 0 });
}

/** Desktop hover-capable pointer (tilt, magnetic CTAs). */
export function canUsePointerEffects(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
