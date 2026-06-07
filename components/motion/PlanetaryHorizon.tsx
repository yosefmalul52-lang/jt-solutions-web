"use client";

import { useId, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, type MotionValue } from "framer-motion";

type PlanetaryHorizonProps = {
  scrollY?: MotionValue<number>;
};

export default function PlanetaryHorizon({ scrollY }: PlanetaryHorizonProps) {
  const uid = useId().replace(/:/g, "");
  const arcId = `horizonArcTop-${uid}`;
  const bloomId = `horizonBloomTop-${uid}`;
  const glowId = `horizonGlowTop-${uid}`;
  const crownRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const crown = crownRef.current;
      if (!crown) return;

      gsap.fromTo(
        crown,
        { opacity: 0, scale: 0.92, y: -24 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: "power2.out", delay: 0.1 },
      );
    },
    { scope: crownRef },
  );

  const crownContent = (
    <>
      <svg
        viewBox="0 0 1440 420"
        preserveAspectRatio="xMidYMin slice"
        className="absolute left-1/2 top-0 h-full w-[180%] max-w-none -translate-x-1/2"
        aria-hidden
      >
        <defs>
          <linearGradient id={arcId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.04" />
            <stop offset="22%" stopColor="#BAE6FD" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="78%" stopColor="#BAE6FD" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.04" />
          </linearGradient>
          <radialGradient id={bloomId} cx="50%" cy="0%" r="90%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.72" />
            <stop offset="18%" stopColor="#E0F2FE" stopOpacity="0.42" />
            <stop offset="42%" stopColor="#38BDF8" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#050814" stopOpacity="0" />
          </radialGradient>
          <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="28" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx="720" cy="-160" rx="980" ry="300" fill={`url(#${bloomId})`} opacity="1" />

        <ellipse
          cx="720"
          cy="96"
          rx="820"
          ry="46"
          fill="none"
          stroke={`url(#${arcId})`}
          strokeWidth="2.5"
          filter={`url(#${glowId})`}
          opacity="0.95"
        />

        <ellipse
          cx="720"
          cy="118"
          rx="900"
          ry="72"
          fill={`url(#${arcId})`}
          filter={`url(#${glowId})`}
          opacity="0.22"
        />
      </svg>

      <div
        className="absolute inset-x-0 top-0 h-[58%]"
        style={{
          background:
            "radial-gradient(ellipse 72% 48% at 50% 0%, rgba(255,255,255,0.22) 0%, rgba(125,211,252,0.12) 28%, rgba(56,189,248,0.05) 48%, transparent 72%)",
          filter: "blur(40px)",
        }}
      />
    </>
  );

  const crownWrap = scrollY ? (
    <motion.div className="absolute inset-x-0 top-0 h-[min(68vh,560px)]" style={{ y: scrollY }}>
      {crownContent}
    </motion.div>
  ) : (
    <div ref={crownRef} className="absolute inset-x-0 top-0 h-[min(68vh,560px)] will-change-transform">
      {crownContent}
    </div>
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-[#050814]">
      {crownWrap}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,8,20,0) 0%, rgba(5,8,20,0.08) 32%, rgba(5,8,20,0.55) 58%, #050814 78%, #050814 100%)",
        }}
      />
    </div>
  );
}
