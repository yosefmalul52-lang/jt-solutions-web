"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";
import { canUsePointerEffects } from "@/lib/motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, select, textarea, label[for], summary, [data-cursor-hover]';

const CURSOR_NONE_SELECTOR = "[data-cursor-none]";

const DOT_SPRING = { stiffness: 520, damping: 32, mass: 0.35 } as const;
const RING_SPRING = { stiffness: 140, damping: 22, mass: 0.85 } as const;

export default function CustomCursor() {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const enabled = hydrated && reduce !== true && canUsePointerEffects();

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const dotX = useSpring(rawX, DOT_SPRING);
  const dotY = useSpring(rawY, DOT_SPRING);
  const ringX = useSpring(rawX, RING_SPRING);
  const ringY = useSpring(rawY, RING_SPRING);

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (event: MouseEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      setVisible(true);

      const target = event.target;
      if (!(target instanceof Element)) {
        setHovering(false);
        return;
      }

      if (target.closest(CURSOR_NONE_SELECTOR)) {
        setHovering(false);
        return;
      }

      setHovering(!!target.closest(INTERACTIVE_SELECTOR));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          width: hovering ? 56 : 40,
          height: hovering ? 56 : 40,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
      >
        <span className="block h-full w-full rounded-full border-2 border-white/90" />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 0.35 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <span
          className={`block rounded-full bg-white transition-[background-color] duration-200 ${
            hovering ? "h-2 w-2" : "h-1.5 w-1.5"
          }`}
        />
      </motion.div>
    </>
  );
}
