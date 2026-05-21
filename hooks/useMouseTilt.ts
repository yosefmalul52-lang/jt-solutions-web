"use client";

import { useCallback, useRef } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import {
  SPRING_SMOOTH,
  TILT_MAX_DESKTOP,
  TILT_PERSPECTIVE,
  canUsePointerEffects,
} from "@/lib/motion";

export type MouseTiltHandlers = {
  onMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
};

type UseMouseTiltOptions = {
  maxRotate?: number;
  stiffness?: number;
  damping?: number;
  disabled?: boolean;
};

/**
 * Maps pointer position within an element to spring-smoothed rotateX / rotateY (degrees).
 * Disabled when `disabled` is true, reduced motion is on, or the device has no fine pointer.
 */
export function useMouseTilt({
  maxRotate = TILT_MAX_DESKTOP,
  stiffness = SPRING_SMOOTH.stiffness,
  damping = SPRING_SMOOTH.damping,
  disabled = false,
}: UseMouseTiltOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springConfig = { stiffness, damping };

  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [maxRotate, -maxRotate]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-maxRotate, maxRotate]),
    springConfig,
  );

  const glowX = useTransform(pointerX, [-0.5, 0.5], [28, 72]);
  const glowY = useTransform(pointerY, [-0.5, 0.5], [22, 78]);
  const highlight = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(129,140,248,0.28) 0%, transparent 58%)`;

  const tiltOff = disabled || !canUsePointerEffects();

  const reset = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (tiltOff) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [tiltOff, pointerX, pointerY],
  );

  const onMouseLeave = useCallback(() => {
    if (!tiltOff) reset();
  }, [tiltOff, reset]);

  const style: MotionStyle = tiltOff
    ? {}
    : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: TILT_PERSPECTIVE,
      };

  const handlers: MouseTiltHandlers = { onMouseMove, onMouseLeave };

  return { ref, style, handlers, highlight, disabled: tiltOff };
}
