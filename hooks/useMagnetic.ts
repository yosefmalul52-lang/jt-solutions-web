"use client";

import { useCallback, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { SPRING_SMOOTH, canUsePointerEffects } from "@/lib/motion";

type UseMagneticOptions = {
  /** Multiplier for pull strength (px offset per px from center). */
  strength?: number;
  /** Activation radius in pixels from element center. */
  radius?: number;
  disabled?: boolean;
};

/**
 * Subtle cursor-attract offset for CTAs - desktop fine pointer only.
 */
export function useMagnetic({
  strength = 0.22,
  radius = 72,
  disabled = false,
}: UseMagneticOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_SMOOTH);
  const springY = useSpring(y, SPRING_SMOOTH);

  const magneticOff = disabled || !canUsePointerEffects();

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (magneticOff) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);
      if (distance > radius) {
        reset();
        return;
      }
      const pull = 1 - distance / radius;
      x.set(deltaX * strength * pull);
      y.set(deltaY * strength * pull);
    },
    [magneticOff, radius, reset, strength, x, y],
  );

  const onMouseLeave = useCallback(() => {
    if (!magneticOff) reset();
  }, [magneticOff, reset]);

  return {
    ref,
    x: magneticOff ? undefined : springX,
    y: magneticOff ? undefined : springY,
    handlers: { onMouseMove, onMouseLeave },
    disabled: magneticOff,
  };
}
