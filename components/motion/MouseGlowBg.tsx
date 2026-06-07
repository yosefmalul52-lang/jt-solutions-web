"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";
import { canUsePointerEffects } from "@/lib/motion";

const ORB_BLUE = "rgba(59, 130, 246, 0.42)";
const ORB_PURPLE = "rgba(109, 40, 217, 0.38)";
const ORB_INNER = "rgba(129, 140, 248, 0.22)";

type MouseGlowBgProps = {
  className?: string;
};

export default function MouseGlowBg({ className = "" }: MouseGlowBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const active = hydrated && reduce !== true && canUsePointerEffects();

  const targetX = useMotionValue(50);
  const targetY = useMotionValue(45);

  const blueX = useSpring(targetX, { stiffness: 38, damping: 20, mass: 1.1 });
  const blueY = useSpring(targetY, { stiffness: 38, damping: 20, mass: 1.1 });
  const purpleX = useSpring(targetX, { stiffness: 22, damping: 18, mass: 1.5 });
  const purpleY = useSpring(targetY, { stiffness: 22, damping: 18, mass: 1.5 });
  const coreX = useSpring(targetX, { stiffness: 55, damping: 24, mass: 0.9 });
  const coreY = useSpring(targetY, { stiffness: 55, damping: 24, mass: 0.9 });

  const blueLeft = useTransform(blueX, (v) => `${v}%`);
  const blueTop = useTransform(blueY, (v) => `${v}%`);
  const purpleLeft = useTransform(purpleX, (v) => `${v - 8}%`);
  const purpleTop = useTransform(purpleY, (v) => `${v + 6}%`);
  const coreLeft = useTransform(coreX, (v) => `${v + 4}%`);
  const coreTop = useTransform(coreY, (v) => `${v - 3}%`);

  useEffect(() => {
    if (!active) return;

    const onMove = (event: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = ((event.clientX - rect.left) / rect.width) * 100;
      const py = ((event.clientY - rect.top) / rect.height) * 100;
      targetX.set(Math.min(92, Math.max(8, px)));
      targetY.set(Math.min(88, Math.max(12, py)));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [active, targetX, targetY]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
    >
      {/* Static ambient depth — always visible */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 40%, rgba(59,130,246,0.12) 0%, transparent 65%), radial-gradient(ellipse 60% 45% at 70% 65%, rgba(109,40,217,0.1) 0%, transparent 60%)",
        }}
      />

      {active ? (
        <>
          <motion.div
            className="absolute h-[min(95vw,820px)] w-[min(95vw,820px)] rounded-full will-change-transform"
            style={{
              left: blueLeft,
              top: blueTop,
              x: "-50%",
              y: "-50%",
              background: `radial-gradient(circle at 40% 40%, ${ORB_BLUE} 0%, transparent 68%)`,
              filter: "blur(72px)",
            }}
          />
          <motion.div
            className="absolute h-[min(85vw,680px)] w-[min(85vw,680px)] rounded-full will-change-transform"
            style={{
              left: purpleLeft,
              top: purpleTop,
              x: "-50%",
              y: "-50%",
              background: `radial-gradient(circle at 55% 45%, ${ORB_PURPLE} 0%, transparent 70%)`,
              filter: "blur(80px)",
            }}
          />
          <motion.div
            className="absolute h-[min(55vw,420px)] w-[min(55vw,420px)] rounded-full will-change-transform"
            style={{
              left: coreLeft,
              top: coreTop,
              x: "-50%",
              y: "-50%",
              background: `radial-gradient(circle, ${ORB_INNER} 0%, transparent 72%)`,
              filter: "blur(48px)",
            }}
          />
        </>
      ) : null}
    </div>
  );
}
