"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  LayoutTemplate,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { homePathways } from "@/lib/home-funnel";
import { staggerVariants, viewport as motionViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type PathwayId = (typeof homePathways)[number]["id"];

type PathwayVisual = {
  icon: LucideIcon;
  iconColor: string;
  gradientColor: string;
  accentColor: string;
  featuresTitle: string;
  badge: string;
};

const PATHWAY_VISUALS: Record<PathwayId, PathwayVisual> = {
  "digital-start": {
    icon: LayoutTemplate,
    iconColor: "text-blue-600",
    gradientColor: "from-blue-50/90 via-blue-50/30 to-transparent",
    accentColor: "text-blue-600",
    featuresTitle: "מה כלול",
    badge: "התחלה דיגיטלית",
  },
  "ready-to-advertise": {
    icon: ArrowUpRight,
    iconColor: "text-lime-700",
    gradientColor: "from-lime-50/90 via-lime-50/30 to-transparent",
    accentColor: "text-lime-700",
    featuresTitle: "מה כלול",
    badge: "מתאים לפני פרסום",
  },
  "leads-system": {
    icon: Workflow,
    iconColor: "text-fuchsia-700",
    gradientColor: "from-fuchsia-50/90 via-fuchsia-50/30 to-transparent",
    accentColor: "text-fuchsia-700",
    featuresTitle: "מה כלול",
    badge: "עסק בצמיחה",
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
          before="לפי "
          accent="המצב"
          after=" של העסק — לא לפי תווית כללית!"
          accentColor="#2563EB"
          subline="שלוש נקודות התחלה נפוצות. בשיחת האבחון נבין יחד מה באמת מתאים לך."
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
            const Icon = visual.icon;
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
                  "home-pricing-card home-pricing-card--interactive",
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
                  {/* Identity — tight cluster */}
                  <header className="home-pricing-card__identity">
                    <div className="home-pricing-card__meta">
                      <span
                        className={cn(
                          isPopular ? "home-pricing-popular-badge" : "home-pricing-fit-tag",
                        )}
                      >
                        {visual.badge}
                      </span>
                      <span className={cn("home-pricing-card__icon", visual.iconColor)} aria-hidden>
                        <Icon size={22} strokeWidth={1.75} />
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
                      label="קבל אבחון דיגיטלי חינם"
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
