"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MoveLeft } from "lucide-react";
import HomeCtaButton from "@/components/home/HomeCtaButton";
import CtaButton from "@/components/ui/CtaButton";
import LeadOrbitVisual from "@/components/home/LeadOrbitVisual";
import HomeHeroHeadline from "@/components/home/HomeHeroHeadline";
import PremiumTypewriter from "@/components/home/PremiumTypewriter";
import { useHydrated } from "@/hooks/useHydrated";
import { heroCopy } from "@/lib/hero-content";
import { staggerVariants } from "@/lib/motion";

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
    <section id="hero" className="relative py-6 sm:py-10 md:py-12 lg:py-14" dir="rtl">
      <div
        aria-hidden
        className="shrink-0 h-[calc(0.25rem+64px+0.75rem)] sm:h-[calc(0.5rem+74px+1.5rem)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-12">
        <Wrap className="flex flex-col text-center lg:text-right" {...wrapProps}>
          <Item {...itemProps}>
            <p className="home-hero-badge mx-auto lg:mx-0">{heroCopy.badge}</p>
            <div className="mt-4">
              <HomeHeroHeadline />
            </div>
            <div className="mt-4 flex justify-center lg:justify-start">
              <PremiumTypewriter
                words={[
                  "קמפיין שמביא תנועה",
                  "דף נחיתה שממיר לפנייה",
                  "ליד שנכנס ל-CRM",
                  "וואטסאפ שלא מאבד לקוחות",
                  "מדידה שמראה מה עובד",
                ]}
              />
            </div>
          </Item>

          <Text className="home-subline home-hero-subline mt-5 max-w-xl md:hidden" {...itemProps}>
            {heroCopy.sublineMobile}
          </Text>
          <Text className="home-subline home-hero-subline mt-5 hidden max-w-xl md:block" {...itemProps}>
            {heroCopy.subline}
          </Text>

          <Item
            className="mt-7 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
            {...itemProps}
          >
            <HomeCtaButton
              id="hero-main-cta"
              href="#contact"
              ctaLocation="hero"
              icon={MoveLeft}
              label={heroCopy.ctaLabel}
              className="w-full sm:w-auto"
            />
            <CtaButton
              href="#projects"
              ctaLocation="hero-secondary"
              label={heroCopy.secondaryCtaLabel}
              className="w-full sm:w-auto"
            />
          </Item>

          <Item {...itemProps}>
            <p className="home-hero-micro mt-4 text-center lg:text-right">{heroCopy.microcopy}</p>
          </Item>
        </Wrap>

        <Item className="relative w-full lg:max-w-md lg:justify-self-end" {...itemProps}>
          <LeadOrbitVisual />
        </Item>
      </div>
    </section>
  );
}
