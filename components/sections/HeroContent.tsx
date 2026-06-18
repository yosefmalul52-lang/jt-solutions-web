"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, LayoutGrid, MoveLeft } from "lucide-react";
import { staggerVariants } from "@/lib/motion";
import CtaButton from "@/components/ui/CtaButton";
import { HeroFlowVisual } from "@/components/hero/HeroFlowVisual";
import HeroTypewriterHeadline from "@/components/hero/HeroTypewriterHeadline";
import { useHydrated } from "@/hooks/useHydrated";
import { heroCopy, heroTrustPillars } from "@/lib/hero-content";

export default function HeroContent() {
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

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] grid grid-rows-[auto_1fr] overflow-hidden"
    >
      <div
        aria-hidden
        className="shrink-0 h-[calc(0.75rem+74px+2.5rem)] sm:h-[calc(1rem+84px+3rem)]"
      />

      <div aria-hidden className="hero-flow-layer">
        <HeroFlowVisual />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start w-full max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 pt-1 sm:pt-3 pb-8">
        <Wrap className="flex flex-col items-center text-center w-full" dir="rtl" {...wrapProps}>
          <Item className="max-w-4xl mx-auto w-full" {...itemProps}>
            <HeroTypewriterHeadline reduceMotion={reduce} />
          </Item>

          <Text
            className="max-w-3xl mx-auto w-full mt-8 sm:mt-10 text-lg sm:text-2xl font-medium leading-relaxed text-slate-300"
            {...itemProps}
          >
            {heroCopy.subline}
          </Text>

          <Item
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mt-10 sm:mt-12 w-full sm:w-auto"
            {...itemProps}
          >
            <CtaButton
              id="hero-main-cta"
              href="#contact"
              ctaLocation="hero"
              icon={MoveLeft}
              label={heroCopy.ctaLabel}
              className="w-full sm:w-auto"
            />
            <CtaButton
              href="/projects"
              ctaLocation="hero"
              variant="secondary"
              icon={LayoutGrid}
              label={heroCopy.secondaryCtaLabel}
              className="w-full sm:w-auto"
            />
          </Item>

          <Item
            className="hero-trust-row mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto w-full"
            {...itemProps}
          >
            {heroTrustPillars.map((text) => (
              <span key={text} className="hero-trust-item hero-trust-item--on-dark">
                <CheckCircle className="h-3.5 w-3.5 shrink-0 text-indigo-400" aria-hidden />
                {text}
              </span>
            ))}
          </Item>

          <Text className="hero-microcopy text-sm mt-5 sm:mt-6 max-w-xl mx-auto text-slate-400" {...itemProps}>
            {heroCopy.microcopy}
          </Text>
        </Wrap>
      </div>
    </section>
  );
}
