"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

type SkewRevealProps = {
  children: ReactNode;
  className?: string;
  /** Vertical travel in px */
  y?: number;
  /** Skew in degrees — keep subtle (2–6) */
  skewY?: number;
  delay?: number;
  duration?: number;
  /** Scrub with scroll instead of one-shot */
  scrub?: boolean | number;
  start?: string;
};

/**
 * GSAP scroll entrance with subtle skew — Tech-Lux slide-in pattern.
 */
export default function SkewReveal({
  children,
  className = "",
  y = 40,
  skewY = 3,
  delay = 0,
  duration = 0.9,
  scrub = false,
  start = "top 88%",
}: SkewRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduce) return;

      gsap.set(el, { y, skewY, opacity: 0, transformOrigin: "50% 100%" });

      const tween = gsap.to(el, {
        y: 0,
        skewY: 0,
        opacity: 1,
        duration,
        delay,
        ease: scrub ? "none" : "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: scrub ? "play none none reverse" : "play none none none",
          scrub: scrub === false ? false : scrub === true ? 0.6 : scrub,
        },
        clearProps: scrub ? undefined : "skewY",
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: ref, dependencies: [reduce, y, skewY, delay, duration, scrub, start] },
  );

  return (
    <div ref={ref} className={className} style={reduce ? undefined : { willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}
