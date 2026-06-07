"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

type PortalParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  driftY: number;
  driftX: number;
  duration: number;
  delay: number;
};

function buildPortalParticles(count: number): PortalParticle[] {
  return Array.from({ length: count }, (_, id) => {
    const spread = (id * 19.7) % 100;
    const centerBias = Math.abs(spread - 50) / 50;
    return {
      id,
      x: 18 + spread * 0.64,
      y: 38 + ((id * 11.3) % 52) * (0.55 + centerBias * 0.25),
      size: 0.5 + (id % 3) * 0.35,
      opacity: 0.12 + (id % 5) * 0.07,
      driftY: 10 + (id % 7) * 4,
      driftX: (id % 5) - 2,
      duration: 2.8 + (id % 9) * 0.45,
      delay: (id % 13) * 0.11,
    };
  });
}

type HeroPortalGlowProps = {
  onRevealed?: () => void;
};

export default function HeroPortalGlow({ onRevealed }: HeroPortalGlowProps) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const bloomInnerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringMidRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const coreHotRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(() => buildPortalParticles(84), []);

  useGSAP(
    () => {
      const bloom = bloomRef.current;
      const bloomInner = bloomInnerRef.current;
      const ring = ringRef.current;
      const ringMid = ringMidRef.current;
      const core = coreRef.current;
      const coreHot = coreHotRef.current;
      const floor = floorRef.current;
      const dotsWrap = particlesRef.current;
      if (!bloom || !bloomInner || !ring || !ringMid || !core || !coreHot || !floor || !dotsWrap) {
        return;
      }

      const dots = gsap.utils.toArray<HTMLElement>(dotsWrap.children);

      if (reduce) {
        gsap.set([bloom, bloomInner, ring, ringMid, core, coreHot, floor, ...dots], {
          opacity: 1,
          scale: 1,
          y: 0,
          x: 0,
          filter: "blur(0px)",
        });
        onRevealed?.();
        return;
      }

      gsap.set(bloom, {
        opacity: 0,
        scale: 0.62,
        y: 48,
        filter: "blur(24px)",
        transformOrigin: "50% 100%",
      });
      gsap.set(bloomInner, { opacity: 0, scale: 0.85, transformOrigin: "50% 100%" });
      gsap.set(ring, { opacity: 0, scale: 0.78, transformOrigin: "50% 100%" });
      gsap.set(ringMid, { opacity: 0, scale: 0.82, transformOrigin: "50% 100%" });
      gsap.set(core, { opacity: 0, scale: 0.7, y: 32, transformOrigin: "50% 100%" });
      gsap.set(coreHot, { opacity: 0, scale: 0.6, transformOrigin: "50% 100%" });
      gsap.set(floor, { opacity: 0, scaleX: 0.15, transformOrigin: "50% 50%" });
      gsap.set(dots, { opacity: 0, y: 16, scale: 0.6 });

      const intro = gsap.timeline({
        delay: 0.08,
        onComplete: () => onRevealed?.(),
      });

      intro
        .to(bloom, {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 2.1,
          ease: "expo.out",
        })
        .to(
          bloomInner,
          { opacity: 1, scale: 1, duration: 1.6, ease: "power3.out" },
          0.22,
        )
        .to(
          ring,
          { opacity: 1, scale: 1, duration: 1.45, ease: "power3.out" },
          0.32,
        )
        .to(
          ringMid,
          { opacity: 1, scale: 1, duration: 1.35, ease: "power2.out" },
          0.42,
        )
        .to(
          core,
          { opacity: 1, scale: 1, y: 0, duration: 1.55, ease: "power4.out" },
          0.48,
        )
        .to(
          coreHot,
          { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
          0.62,
        )
        .to(
          floor,
          { opacity: 1, scaleX: 1, duration: 1.15, ease: "power2.inOut" },
          0.58,
        )
        .to(
          dots,
          {
            opacity: (i) => (particles[i]?.opacity ?? 0.3) + 0.15,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: { each: 0.012, from: "center" },
            ease: "power2.out",
          },
          0.55,
        );

      const idle = gsap.timeline({ delay: 2.2, repeat: -1, defaults: { ease: "sine.inOut" } });

      idle
        .to(
          bloom,
          { scale: 1.045, opacity: 0.92, duration: 5.2, yoyo: true, repeat: 1 },
          0,
        )
        .to(
          bloomInner,
          { scale: 1.06, opacity: 0.75, duration: 4.4, yoyo: true, repeat: 1 },
          0,
        )
        .to(
          ring,
          { scale: 1.018, opacity: 0.88, duration: 3.8, yoyo: true, repeat: 1 },
          0,
        )
        .to(
          ringMid,
          { scale: 0.985, opacity: 0.72, duration: 4.1, yoyo: true, repeat: 1 },
          0.4,
        )
        .to(
          coreHot,
          { scale: 1.035, opacity: 0.88, duration: 2.6, yoyo: true, repeat: 1 },
          0,
        )
        .to(
          floor,
          { opacity: 0.55, scaleX: 1.04, duration: 3.2, yoyo: true, repeat: 1 },
          0.2,
        );

      dots.forEach((dot, i) => {
        const p = particles[i];
        if (!p) return;

        gsap.to(dot, {
          y: `-=${p.driftY}`,
          x: `+=${p.driftX}`,
          opacity: `+=0.12`,
          duration: p.duration,
          delay: 2 + p.delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      gsap.to(bloom, {
        x: 8,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 3,
      });

      return () => {
        intro.kill();
        idle.kill();
        gsap.killTweensOf([
          bloom,
          bloomInner,
          ring,
          ringMid,
          core,
          coreHot,
          floor,
          ...dots,
        ]);
      };
    },
    { scope: rootRef, dependencies: [reduce, onRevealed, particles] },
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#030014]"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(76,29,149,0.2) 0%, rgba(3,0,20,0) 55%), linear-gradient(180deg, #030014 0%, #050818 100%)",
        }}
      />

      <div
        ref={bloomRef}
        className="absolute bottom-[-10%] left-1/2 h-[74%] w-[165%] -translate-x-1/2 will-change-[transform,opacity,filter]"
        style={{
          background:
            "radial-gradient(ellipse 50% 44% at 50% 88%, rgba(167,139,250,0.5) 0%, rgba(124,58,237,0.26) 30%, rgba(88,28,135,0.08) 54%, transparent 74%)",
          filter: "blur(32px)",
        }}
      />

      <div
        ref={bloomInnerRef}
        className="absolute bottom-[2%] left-1/2 h-[48%] w-[95%] max-w-4xl -translate-x-1/2 will-change-[transform,opacity]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(196,181,253,0.28) 0%, rgba(124,58,237,0.1) 42%, transparent 72%)",
          filter: "blur(20px)",
        }}
      />

      <div
        ref={ringRef}
        className="absolute bottom-[5.5%] left-1/2 h-[44vmin] w-[90vmin] max-h-[440px] max-w-[940px] -translate-x-1/2 will-change-[transform,opacity]"
      >
        <div
          className="absolute inset-[6%] rounded-[50%] opacity-75"
          style={{
            background:
              "radial-gradient(ellipse 100% 55% at 50% 100%, rgba(196,181,253,0.38) 0%, rgba(124,58,237,0.14) 45%, transparent 72%)",
            filter: "blur(20px)",
          }}
        />
        <div
          ref={ringMidRef}
          className="absolute inset-[16%] rounded-[50%] border border-violet-300/30 will-change-[transform,opacity]"
          style={{
            boxShadow:
              "0 0 72px rgba(167,139,250,0.28), inset 0 0 48px rgba(255,255,255,0.05)",
          }}
        />
        <div
          className="absolute inset-[26%] rounded-[50%] border border-violet-200/22"
          style={{ boxShadow: "0 0 48px rgba(139,92,246,0.22)" }}
        />
      </div>

      <div
        ref={coreRef}
        className="absolute bottom-[7%] left-1/2 h-[38vmin] w-[78vmin] max-h-[340px] max-w-[800px] -translate-x-1/2 will-change-[transform,opacity]"
      >
        <div
          className="absolute inset-x-[5%] bottom-0 top-[40%] rounded-t-[50%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(233,213,255,0.88) 16%, rgba(167,139,250,0.48) 40%, rgba(124,58,237,0.06) 100%)",
            boxShadow:
              "0 -10px 90px rgba(196,181,253,0.5), 0 0 130px rgba(124,58,237,0.38)",
          }}
        />
        <div
          ref={coreHotRef}
          className="absolute inset-x-[20%] bottom-0 top-[56%] rounded-t-[50%] bg-white will-change-[transform,opacity]"
          style={{
            boxShadow: "0 0 56px rgba(255,255,255,0.82), 0 0 100px rgba(196,181,253,0.45)",
          }}
        />
      </div>

      <div
        ref={floorRef}
        className="absolute bottom-[16.5%] inset-x-[8%] h-px will-change-[transform,opacity] sm:inset-x-[12%]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.12) 18%, rgba(255,255,255,0.55) 50%, rgba(167,139,250,0.12) 82%, transparent 100%)",
          boxShadow: "0 0 28px rgba(124,58,237,0.4)",
        }}
      />

      <div ref={particlesRef} className="absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="portal-particle absolute rounded-full bg-white will-change-transform"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,0,20,0.5) 0%, transparent 26%, transparent 64%, rgba(3,0,20,0.38) 100%)",
        }}
      />
    </div>
  );
}
