"use client";

import Link from "next/link";
import {
  Megaphone,
  MonitorSmartphone,
  Palette,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import PremiumReveal from "@/components/motion/PremiumReveal";
import CtaButton from "@/components/ui/CtaButton";
import { homeServicePillars } from "@/lib/home-funnel";

const PILLAR_ICONS: Record<string, LucideIcon> = {
  monitor: MonitorSmartphone,
  palette: Palette,
  workflow: Workflow,
  megaphone: Megaphone,
};

const PILLAR_ACCENTS = {
  sky: "bg-sky-500/15 text-sky-300 ring-sky-400/25",
  violet: "bg-violet-500/15 text-violet-300 ring-violet-400/25",
  cyan: "bg-cyan-500/15 text-cyan-300 ring-cyan-400/25",
  emerald: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/25",
} as const;

export default function HomeServices() {
  const [featured, ...supporting] = homeServicePillars;

  return (
    <section id="services" className="homepage-story-section section-shell" dir="rtl">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <PremiumReveal className="mx-auto max-w-3xl text-center" variant="rise">
          <p className="premium-eyebrow-dark">מה אנחנו בונים</p>
          <h2 className="premium-headline-dark mt-4">שלוש מערכות. ארבעה מסלולי צמיחה.</h2>
          <p className="premium-subline-dark mx-auto mt-5 max-w-2xl">
            לא תפריט אינסופי — תוצאות אסטרטגיות שמחוברות למעטפת אחת.
          </p>
        </PremiumReveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <PremiumReveal className="lg:col-span-2" variant="rise" delay={0.04}>
            <article className="premium-pillar-card premium-pillar-card--featured flex flex-col rounded-[var(--radius)] p-7 sm:p-8">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${PILLAR_ACCENTS[featured.accent]}`}
                >
                  {(() => {
                    const Icon = PILLAR_ICONS[featured.icon] ?? MonitorSmartphone;
                    return <Icon size={22} aria-hidden />;
                  })()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-50">{featured.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{featured.outcome}</p>
                  <Link
                    href={featured.href}
                    className="mt-4 inline-flex text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                  >
                    לעמוד המסלול
                  </Link>
                </div>
              </div>
            </article>
          </PremiumReveal>

          {supporting.map((pillar, index) => {
            const Icon = PILLAR_ICONS[pillar.icon] ?? MonitorSmartphone;
            const accent = PILLAR_ACCENTS[pillar.accent];

            return (
              <PremiumReveal key={pillar.title} variant="rise" delay={0.08 + index * 0.05}>
                <article className="premium-pillar-card flex h-full flex-col rounded-[var(--radius)] p-6 sm:p-7">
                  <div
                    className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${accent}`}
                  >
                    <Icon size={18} aria-hidden />
                  </div>
                  <h3 className="text-lg font-bold text-slate-100">{pillar.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">
                    {pillar.outcome}
                  </p>
                </article>
              </PremiumReveal>
            );
          })}
        </div>

        <PremiumReveal className="mt-10 flex justify-center" variant="fade" delay={0.1}>
          <CtaButton href="/#pathways" ctaLocation="home-services" label="לכל המסלולים" />
        </PremiumReveal>
      </div>
    </section>
  );
}
