"use client";

import { type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { homePathways } from "@/lib/home-funnel";
import { staggerVariants, viewport as motionViewport } from "@/lib/motion";

const TIER_ACCENT: Record<string, string> = {
  "digital-start": "home-pricing-card--cyan",
  "ready-to-advertise": "home-pricing-card--blue",
  "leads-system": "home-pricing-card--violet",
};

export default function Pricing() {
  const reduce = useReducedMotion();
  const { container: tiersStagger, item: tierItem } = staggerVariants(reduce);

  return (
    <section id="pathways" className="home-section section-shell" dir="rtl">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          className="mb-10 lg:mb-12"
          eyebrow="מסלולים"
          before="לפי "
          accent="המצב"
          after=" של העסק — לא לפי תווית כללית"
          accentColor="#7C3AED"
          subline="שלוש נקודות התחלה נפוצות. בשיחת האבחון נבין מה באמת מתאים לכם."
        />

        <motion.div
          variants={tiersStagger}
          initial="hidden"
          whileInView="show"
          viewport={motionViewport.sectionLoose}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 lg:items-stretch"
        >
          {homePathways.map((pathway) => {
            const isPopular = "popular" in pathway && pathway.popular === true;
            return (
              <motion.article
                variants={tierItem}
                key={pathway.id}
                className={`home-pricing-card relative flex h-full flex-col p-7 lg:p-8 ${
                  TIER_ACCENT[pathway.id] ?? ""
                } ${isPopular ? "home-pricing-card--featured lg:-translate-y-1" : ""}`}
                style={isPopular ? ({ ["--tier" as string]: "#2563eb" } as CSSProperties) : undefined}
              >
                {isPopular ? (
                  <span className="home-pricing-popular-badge" style={{ ["--tier" as string]: "#2563eb" }}>
                    מתאים לפני פרסום
                  </span>
                ) : null}

                <h3 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                  {pathway.name}
                </h3>
                <p className="home-pricing-tier-eyebrow mt-2">
                  {pathway.forWho}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{pathway.description}</p>

                <ul className="mt-6 flex-1 space-y-2.5 border-t border-slate-200 pt-6">
                  {pathway.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600"
                    >
                      <span className="cm-check mt-0.5" aria-hidden>
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <CtaButton
                    href={pathway.ctaHref}
                    ctaLocation={pathway.ctaLocation}
                    className="w-full"
                  />
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
