"use client";

import { useCallback, useRef, type MouseEvent as ReactMouseEvent, type RefObject } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { SPRING_MAGNETIC, canUsePointerEffects } from "@/lib/motion";

type UseMagneticOptions = {
  /** Pull strength — higher = stronger attraction toward cursor. */
  strength?: number;
  /** Activation radius in pixels from element center. */
  radius?: number;
  /** Maximum offset in pixels (prevents extreme displacement on large cards). */
  maxOffset?: number;
  /** Exponent for distance falloff — higher = tighter pull near center. */
  falloff?: number;
  disabled?: boolean;
};

export type MagneticHandlers = {
  onMouseMove: (event: ReactMouseEvent<HTMLElement>) => void;
  onMouseLeave: (event: ReactMouseEvent<HTMLElement>) => void;
};

/**
 * Physics-based magnetic pull toward the cursor — desktop fine pointer only.
 * Returns spring-smoothed x/y offsets to apply on a motion element.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>({
  strength = 0.52,
  radius = 140,
  maxOffset = 22,
  falloff = 1.85,
  disabled = false,
}: UseMagneticOptions = {}): {
  ref: RefObject<T | null>;
  x: ReturnType<typeof useSpring> | undefined;
  y: ReturnType<typeof useSpring> | undefined;
  handlers: MagneticHandlers;
  disabled: boolean;
} {
  const ref = useRef<T | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_MAGNETIC);
  const springY = useSpring(y, SPRING_MAGNETIC);

  const magneticOff = disabled || !canUsePointerEffects();

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const onMouseMove = useCallback(
    (event: ReactMouseEvent<HTMLElement>) => {
      if (magneticOff) return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance > radius || distance === 0) {
        reset();
        return;
      }

      const pull = Math.pow(1 - distance / radius, falloff);
      const offsetX = deltaX * strength * pull;
      const offsetY = deltaY * strength * pull;
      const clamp = (value: number) => Math.max(-maxOffset, Math.min(maxOffset, value));

      x.set(clamp(offsetX));
      y.set(clamp(offsetY));
    },
    [falloff, magneticOff, maxOffset, radius, reset, strength, x, y],
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
