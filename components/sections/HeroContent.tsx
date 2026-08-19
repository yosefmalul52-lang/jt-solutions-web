"use client";

import { motion, useReducedMotion } from "framer-motion";
import HomeCtaButton from "@/components/home/HomeCtaButton";
import LeadOrbitVisual from "@/components/home/LeadOrbitVisual";
import HomeHeroHeadline from "@/components/home/HomeHeroHeadline";
import PremiumTypewriter from "@/components/home/PremiumTypewriter";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { useHydrated } from "@/hooks/useHydrated";
import { trackWhatsAppClick } from "@/lib/analytics/track";
import { WHATSAPP_URL } from "@/lib/floating-buttons";
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
      <div className="relative z-10 mx-auto grid w-full max-w-[90rem] grid-cols-1 items-center gap-10 px-5 py-4 sm:gap-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(34rem,40rem)] lg:gap-x-20 lg:gap-y-12 xl:gap-x-24 lg:px-10 xl:px-12">
        <Wrap className="home-hero-copy flex min-w-0 flex-col text-center lg:max-w-[42rem] lg:justify-self-stretch lg:text-right xl:max-w-[44rem]" {...wrapProps}>
          <Item className="home-hero-copy__lead" {...itemProps}>
            <HomeHeroHeadline />
            <div className="home-hero-copy__typewriter mt-3 flex justify-center lg:justify-start sm:mt-3.5">
              <PremiumTypewriter
                words={[
                  "קמפיין שמביא תנועה",
                  "דף נחיתה שממיר לפנייה",
                  "ליד שנכנס ל-CRM בלי לאבד אותו",
                  "בניית מותג ייחודי",
                  "מדידה שמראה לך מה באמת עובד",
                ]}
              />
            </div>
          </Item>

          <Text className="home-subline home-hero-subline home-hero-copy__subline mx-auto mt-5 max-w-[36ch] md:hidden lg:mx-0 lg:max-w-[42ch]" {...itemProps}>
            {heroCopy.sublineMobile}
          </Text>
          <Text className="home-subline home-hero-subline home-hero-copy__subline mx-auto mt-5 hidden max-w-[42ch] md:block lg:mx-0 lg:max-w-[46ch]" {...itemProps}>
            {heroCopy.subline}
          </Text>

          <Item
            className="home-hero-copy__cta mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center lg:justify-start"
            {...itemProps}
          >
            <HomeCtaButton
              id="hero-main-cta"
              href="#contact-form"
              ctaLocation="hero"
              label={heroCopy.ctaLabel}
              className="w-full sm:w-auto"
            />
            <HomeCtaButton
              id="hero-whatsapp-cta"
              variant="whatsapp"
              href={WHATSAPP_URL}
              hideIcon
              className="w-full sm:w-auto"
              onClick={() => trackWhatsAppClick("hero")}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <WhatsAppIcon size={17} className="shrink-0" aria-hidden />
                {heroCopy.whatsappCtaLabel}
              </span>
            </HomeCtaButton>
          </Item>
        </Wrap>

        <Item className="relative w-full min-w-0 justify-self-center lg:justify-self-end lg:-translate-x-6 xl:-translate-x-12 2xl:-translate-x-16" {...itemProps}>
          <LeadOrbitVisual />
        </Item>
      </div>
    </section>
  );
}
