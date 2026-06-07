"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MoveLeft } from "lucide-react";
import PlanetaryHorizon from "@/components/motion/PlanetaryHorizon";
import Starfield from "@/components/motion/Starfield";
import { staggerVariants } from "@/lib/motion";
import CtaButton from "@/components/ui/CtaButton";
import { useHydrated } from "@/hooks/useHydrated";
import { heroCopy, heroTrustLogos } from "@/lib/hero-content";
import { trackCtaClick } from "@/lib/analytics/track";

export default function Hero() {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const useMotion = hydrated && reduce !== true;
  const { container: heroStagger, item: heroItemUp } = staggerVariants(useMotion ? reduce : null);

  const Wrap = useMotion ? motion.div : "div";
  const Item = useMotion ? motion.div : "div";
  const Text = useMotion ? motion.p : "p";

  const wrapProps = useMotion
    ? { variants: heroStagger, initial: false as const, animate: "show" as const }
    : {};
  const itemProps = useMotion ? { variants: heroItemUp } : {};

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-[#050814]"
      aria-label="מבוא"
    >
      <PlanetaryHorizon />
      <Starfield />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 50% 12%, transparent 0%, rgba(5,8,20,0.35) 68%, rgba(5,8,20,0.65) 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 pb-32 sm:px-10 sm:py-24 lg:px-14">
          <Wrap
            className="flex w-full max-w-4xl flex-col items-center text-center sm:max-w-5xl"
            dir="rtl"
            {...wrapProps}
          >
            <Item className="w-full max-w-3xl px-2 sm:max-w-4xl" {...itemProps}>
              <h1 className="hero-display-title mx-auto">
                <span className="block text-white/95">{heroCopy.h1Line1}</span>
                <span className="hero-display-accent mt-4 block sm:mt-5">{heroCopy.h1Line2}</span>
              </h1>
            </Item>

            <Text
              className="mt-10 max-w-xl text-base font-normal leading-[1.75] text-slate-400/90 sm:mt-12 sm:max-w-2xl sm:text-lg"
              {...itemProps}
            >
              {heroCopy.subline}
            </Text>

            <Item className="mt-12 sm:mt-14" {...itemProps}>
              <CtaButton
                id="hero-main-cta"
                onClick={() => {
                  trackCtaClick("hero", heroCopy.ctaLabel);
                  scrollTo("#contact");
                }}
                icon={MoveLeft}
                label={heroCopy.ctaLabel}
              />
            </Item>

            <Text className="mt-8 max-w-sm text-sm font-normal leading-[1.75] text-slate-500/90" {...itemProps}>
              {heroCopy.microcopy}
            </Text>
          </Wrap>
        </div>

        <div
          className="absolute inset-x-0 bottom-[max(2rem,env(safe-area-inset-bottom))] px-8 sm:bottom-10"
          dir="ltr"
          aria-label="לקוחות ושותפים"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:gap-x-14">
            {heroTrustLogos.map((logo) => (
              <span
                key={logo.id}
                className="select-none text-[10px] font-medium uppercase tracking-[0.2em] text-slate-300 opacity-[0.35]"
              >
                {logo.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
