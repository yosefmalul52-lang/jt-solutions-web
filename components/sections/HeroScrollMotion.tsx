"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MoveLeft } from "lucide-react";
import PlanetaryHorizon from "@/components/motion/PlanetaryHorizon";
import Starfield from "@/components/motion/Starfield";
import CtaButton from "@/components/ui/CtaButton";
import { heroCopy, heroTrustLogos } from "@/lib/hero-content";
import { trackCtaClick } from "@/lib/analytics/track";

const SCENE_1_END = 0.33;
const SCENE_2_END = 0.66;

function TrustBar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:gap-x-14 ${className}`.trim()}
      dir="ltr"
      aria-label="לקוחות ושותפים"
    >
      {heroTrustLogos.map((logo) => (
        <span
          key={logo.id}
          className="select-none text-[10px] font-medium uppercase tracking-[0.2em] text-slate-300 opacity-[0.35] transition-opacity duration-500 hover:opacity-50"
        >
          {logo.label}
        </span>
      ))}
    </div>
  );
}

export default function HeroScrollMotion() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const horizonY = useTransform(scrollYProgress, [0, 1], [0, -32]);

  const scene1Opacity = useTransform(
    scrollYProgress,
    [0, SCENE_1_END - 0.08, SCENE_1_END],
    [1, 1, 0],
  );
  const scene1Y = useTransform(scrollYProgress, [0, SCENE_1_END], [0, -72]);

  const scene1TrustOpacity = useTransform(
    scrollYProgress,
    [0, SCENE_1_END - 0.08, SCENE_1_END],
    [1, 1, 0],
  );
  const scene1TrustY = useTransform(scrollYProgress, [0, SCENE_1_END], [0, -20]);

  const scene2Opacity = useTransform(
    scrollYProgress,
    [SCENE_1_END, SCENE_1_END + 0.06, SCENE_2_END - 0.06, SCENE_2_END],
    [0, 1, 1, 0],
  );
  const scene2Y = useTransform(scrollYProgress, [SCENE_1_END, SCENE_2_END], [40, -36]);

  const scene3Opacity = useTransform(
    scrollYProgress,
    [SCENE_2_END, SCENE_2_END + 0.08, 1],
    [0, 1, 1],
  );
  const scene3Y = useTransform(scrollYProgress, [SCENE_2_END, SCENE_2_END + 0.12], [48, 0]);
  const scene3TrustOpacity = useTransform(
    scrollYProgress,
    [SCENE_2_END + 0.04, SCENE_2_END + 0.12, 1],
    [0, 1, 1],
  );

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.14], [0, 0.7, 0]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={trackRef}
      id="hero"
      className="relative h-[300vh] bg-[#050814]"
      aria-label="מבוא"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <PlanetaryHorizon scrollY={horizonY} />
        <Starfield />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 85% 65% at 50% 12%, transparent 0%, rgba(5,8,20,0.35) 68%, rgba(5,8,20,0.65) 100%)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="relative flex flex-1 items-center justify-center px-6 sm:px-10 lg:px-14 pt-[calc(74px+2.5rem)] pb-[calc(5rem+env(safe-area-inset-bottom))] sm:pt-[calc(84px+3.5rem)] sm:pb-28">
            <motion.div
              className="absolute inset-x-0 mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center sm:max-w-5xl sm:py-20 md:py-24"
              style={{ opacity: scene1Opacity, y: scene1Y }}
              dir="rtl"
            >
              <h1 className="hero-display-title w-full max-w-3xl sm:max-w-4xl">
                <span className="block text-white/95">{heroCopy.h1Line1}</span>
                <span className="hero-display-accent mt-4 block sm:mt-5">{heroCopy.h1Line2}</span>
              </h1>
              <p className="mt-10 max-w-xl text-base font-normal leading-[1.75] text-slate-400/90 sm:mt-12 sm:max-w-2xl sm:text-lg sm:leading-[1.8]">
                {heroCopy.subline}
              </p>
            </motion.div>

            <motion.div
              className="absolute inset-x-0 mx-auto max-w-2xl px-4 py-16 text-center sm:max-w-3xl sm:py-20"
              style={{ opacity: scene2Opacity, y: scene2Y }}
              dir="rtl"
            >
              <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.28em] text-blue-400/50">
                התהליך שלנו
              </p>
              <p className="text-lg font-normal leading-[1.85] text-slate-300/95 sm:text-xl sm:leading-[1.9]">
                {heroCopy.story}
              </p>
            </motion.div>

            <motion.div
              className="absolute inset-x-0 mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center sm:py-20"
              style={{ opacity: scene3Opacity, y: scene3Y }}
              dir="rtl"
            >
              <p className="mb-8 text-sm font-normal tracking-wide text-slate-500">
                מוכנים לצעד הבא?
              </p>
              <CtaButton
                id="hero-scroll-cta"
                onClick={() => {
                  trackCtaClick("hero", heroCopy.ctaLabel);
                  scrollTo("#contact");
                }}
                icon={MoveLeft}
                label={heroCopy.ctaLabel}
              />
              <p className="mt-8 max-w-sm text-sm font-normal leading-[1.75] text-slate-500/90">
                {heroCopy.microcopy}
              </p>
            </motion.div>
          </div>

          <motion.div
            className="absolute inset-x-0 bottom-[max(2rem,env(safe-area-inset-bottom))] z-20 px-8 sm:bottom-10"
            style={{ opacity: scene1TrustOpacity, y: scene1TrustY }}
          >
            <TrustBar />
          </motion.div>

          <motion.div
            className="absolute inset-x-0 bottom-[max(2rem,env(safe-area-inset-bottom))] z-20 px-8 sm:bottom-10"
            style={{ opacity: scene3TrustOpacity }}
          >
            <TrustBar />
          </motion.div>

          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center sm:bottom-8"
            style={{ opacity: scrollHintOpacity }}
          >
            <span className="flex flex-col items-center gap-2 text-[9px] font-medium uppercase tracking-[0.35em] text-slate-600/80">
              <span className="h-7 w-px bg-gradient-to-b from-transparent via-slate-600/60 to-transparent" />
              scroll
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
