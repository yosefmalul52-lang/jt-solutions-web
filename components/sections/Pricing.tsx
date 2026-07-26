"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { homePathways } from "@/lib/home-funnel";
import { staggerVariants, viewport as motionViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type PathwayId = (typeof homePathways)[number]["id"];

type PathwayVisual = {
  gradientColor: string;
  accentColor: string;
  featuresTitle: string;
  badge: string;
};

const PATHWAY_VISUALS: Record<PathwayId, PathwayVisual> = {
  "digital-start": {
    gradientColor: "from-blue-100/95 via-blue-50/50 to-transparent",
    accentColor: "text-blue-600",
    featuresTitle: "מה כולל",
    badge: "התחלה דיגיטלית",
  },
  "ready-to-advertise": {
    gradientColor: "from-fuchsia-100/95 via-fuchsia-50/45 to-transparent",
    accentColor: "text-fuchsia-700",
    featuresTitle: "מה כולל",
    badge: "המערכת המלאה",
  },
  "leads-system": {
    gradientColor: "from-lime-100/95 via-lime-50/45 to-transparent",
    accentColor: "text-lime-700",
    featuresTitle: "מה כולל",
    badge: "לעסק פעיל",
  },
};

export default function Pricing() {
  const reduce = useReducedMotion();
  const { container: tiersStagger, item: tierItem } = staggerVariants(reduce);

  return (
    <section
      id="pathways"
      className="home-section home-section--pricing section-shell"
      dir="rtl"
      aria-labelledby="pathways-title"
    >
      <div className="home-section__atmosphere home-section__atmosphere--pricing" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          titleId="pathways-title"
          className="mb-10 lg:mb-14"
          before="מתחילים מהצורך שלכם, ובונים "
          accent="מערכת"
          after=" שיכולה לצמוח עם העסק"
          accentColor="#2563EB"
          subline="אפשר להתחיל ממיתוג ואתר, מתשתית לפרסום או ממערכת לניהול פניות. כל פתרון נבנה כך שיוכל להתחבר בהמשך למערכת דיגיטלית אחת."
        />

        <motion.div
          variants={tiersStagger}
          initial="hidden"
          whileInView="show"
          viewport={motionViewport.sectionLoose}
          className="home-pricing-grid"
        >
          {homePathways.map((pathway) => {
            const visual = PATHWAY_VISUALS[pathway.id];
            const isPopular = "popular" in pathway && pathway.popular === true;

            return (
              <motion.article
                key={pathway.id}
                variants={tierItem}
                whileHover={
                  reduce
                    ? undefined
                    : { y: -3, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }
                }
                whileTap={reduce ? undefined : { scale: 0.99 }}
                className={cn(
                  "home-pricing-card home-pricing-card--interactive h-full",
                  isPopular && "home-pricing-card--featured",
                )}
                aria-labelledby={`pathway-${pathway.id}-title`}
              >
                <div
                  className={cn(
                    "home-pricing-card__wash bg-gradient-to-b",
                    visual.gradientColor,
                  )}
                  aria-hidden
                />

                <div className="home-pricing-card__body">
                  <header className="home-pricing-card__identity">
                    <div className="home-pricing-card__meta">
                      <span
                        className={cn(
                          isPopular ? "home-pricing-popular-badge" : "home-pricing-fit-tag",
                        )}
                      >
                        {visual.badge}
                      </span>
                    </div>

                    <h3 id={`pathway-${pathway.id}-title`} className="home-pricing-card__title">
                      {pathway.name}
                    </h3>
                    <p className="home-pricing-tier-eyebrow">{pathway.forWho}</p>
                  </header>

                  {/* Value prop */}
                  <p className="home-pricing-card__desc">{pathway.description}</p>

                  {/* Features — medium density */}
                  <div className="home-pricing-card__includes">
                    <p className={cn("home-pricing-card__includes-label", visual.accentColor)}>
                      {visual.featuresTitle}
                    </p>
                    <ul className="home-pricing-card__features">
                      {pathway.items.map((item) => (
                        <li key={item}>
                          <Check
                            size={15}
                            strokeWidth={2.5}
                            className={cn("home-pricing-card__check", visual.accentColor)}
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action — last, always bottom-aligned */}
                  <div className="home-pricing-card__cta">
                    <CtaButton
                      href={pathway.ctaHref}
                      ctaLocation={pathway.ctaLocation}
                      variant={isPopular ? "primary" : "secondary"}
                      shine={Boolean(isPopular)}
                      className="w-full"
                      label={pathway.ctaLabel}
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
