"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { COUNT_UP_DURATION_MS } from "@/lib/motion";

type CountUpValueProps = {
  target: number;
  suffix?: string;
  start?: boolean;
  className?: string;
};

/**
 * Reusable count-up for proof moments. Respects reduced motion via instant display.
 */
export default function CountUpValue({
  target,
  suffix = "",
  start = false,
  className = "",
}: CountUpValueProps) {
  const [count, setCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!start || reducedMotion) return;

    const duration = COUNT_UP_DURATION_MS;
    let frameId = 0;
    let startTime: number | null = null;

    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(target * eased));
      if (progress < 1) frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [start, target, reducedMotion]);

  const displayValue = !start ? 0 : reducedMotion ? target : count;

  return (
    <motion.span
      className={className}
      initial={false}
      animate={start ? { opacity: 1, scale: 1 } : { opacity: 0.85, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {displayValue}
      {suffix}
    </motion.span>
  );
}
