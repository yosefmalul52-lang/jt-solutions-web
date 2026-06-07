"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";

function ScrollProgressMotion() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.35,
  });

  return (
    <motion.div
      aria-hidden
      className="scroll-progress-bar fixed top-0 left-0 right-0 z-[70] pointer-events-none"
      style={{ scaleX }}
    />
  );
}

export default function ScrollProgress() {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();

  if (!hydrated || reduce) {
    return (
      <div
        aria-hidden
        className="scroll-progress-bar fixed top-0 left-0 right-0 z-[70] pointer-events-none"
        style={{ transform: "scaleX(0)" }}
      />
    );
  }

  return <ScrollProgressMotion />;
}
