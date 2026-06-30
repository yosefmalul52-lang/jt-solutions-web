"use client";

import { motion, useReducedMotion } from "framer-motion";
import HomeCtaButton from "@/components/home/HomeCtaButton";
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
    <section id="hero" className="homepage-hero-section relative z-10 flex flex-1 items-center" dir="rtl">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-5 py-4 sm:gap-10 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-12">
        <Wrap className="flex flex-col text-center lg:text-right" {...wrapProps}>
          <Item {...itemProps}>
            <HomeHeroHeadline />
            <div className="mt-4 flex justify-center lg:justify-start">
              <PremiumTypewriter
                words={[
                  "קמפיין שמביא תנועה — מוכר?",
                  "דף נחיתה שממיר לפנייה",
                  "ליד שנכנס ל-CRM בלי לאבד אותו",
                  "וואטסאפ שלא מאבד לקוחות",
                  "מדידה שמראה לך מה באמת עובד",
                ]}
              />
            </div>
          </Item>

          <Text className="home-subline home-hero-subline mx-auto mt-5 max-w-xl md:hidden lg:mx-0" {...itemProps}>
            {heroCopy.sublineMobile}
          </Text>
          <Text className="home-subline home-hero-subline mx-auto mt-5 hidden max-w-xl md:block lg:mx-0" {...itemProps}>
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
              label={heroCopy.ctaLabel}
              className="w-full sm:w-auto"
            />
          </Item>
        </Wrap>

        <Item className="relative w-full lg:max-w-md lg:justify-self-end" {...itemProps}>
          <LeadOrbitVisual />
        </Item>
      </div>
    </section>
  );
}
