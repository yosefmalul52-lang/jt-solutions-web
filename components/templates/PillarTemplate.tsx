import type { ReactNode } from "react";
import Link from "next/link";
import TrackedLink from "@/components/ui/TrackedLink";
import { CheckCircle2, Home, LayoutGrid, MessageCircle } from "lucide-react";
import PageEnter from "@/components/motion/PageEnter";
import CtaButton from "@/components/ui/CtaButton";
import FaqAccordion from "@/components/ui/FaqAccordion";
import GlassCard from "@/components/ui/GlassCard";
import PillarSectionNav from "@/components/ui/PillarSectionNav";
import type { ServiceFaqItem } from "@/lib/types/faq";
import type { PillarSlug } from "@/lib/pillars";

export type PillarSection = {
  id: string;
  title: string;
  subtitle: string;
  deliverables: string[];
  audience: string[];
  timeframe?: string;
  visualProof?: ReactNode;
  ctaLabel?: string;
};

export type PillarTemplateProps = {
  pillarId: PillarSlug;
  badge: string;
  title: string;
  description: string;
  seoIntro?: string[];
  sections: PillarSection[];
  faq?: ServiceFaqItem[];
  ctaLocation?: string;
};

export default function PillarTemplate({
  pillarId,
  badge,
  title,
  description,
  seoIntro,
  sections,
  faq,
  ctaLocation = pillarId,
}: PillarTemplateProps) {
  return (
    <div className="bg-[#0B0F19]">
      <PageEnter>
        <section className="relative -mt-[90px] sm:-mt-[102px] pt-[152px] sm:pt-[168px] pb-12 md:pb-16 section-shell">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none hero-grid"
            aria-hidden
          />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10" dir="rtl">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-[var(--radius-soft)] border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:text-slate-100 hover:bg-white/10"
              >
                <Home size={16} aria-hidden />
                חזרה לדף הבית
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-[var(--radius-soft)] border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:text-slate-100 hover:bg-white/10"
              >
                <LayoutGrid size={16} aria-hidden />
                כל השירותים
              </Link>
              <TrackedLink
                href="/#contact"
                ctaLocation={`${ctaLocation}-nav`}
                ctaLabel="צור קשר"
                className="inline-flex items-center gap-2 rounded-[var(--radius-soft)] border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:text-slate-100 hover:bg-white/10"
              >
                <MessageCircle size={16} aria-hidden />
                צור קשר
              </TrackedLink>
            </div>

            <div className="text-center" dir="rtl">
              <span
                className="inline-flex p-[1px] rounded-full mb-5"
                style={{ background: "var(--gradient-cta)" }}
              >
                <span className="inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0B0F19]/90 backdrop-blur-md text-slate-200">
                  {badge}
                </span>
              </span>

              <h1 className="display-title max-w-4xl mx-auto">
                <span className="gradient-text">{title}</span>
              </h1>

              <p className="premium-subtitle max-w-2xl mx-auto mt-6">{description}</p>

              {seoIntro && seoIntro.length > 0 ? (
                <div className="max-w-2xl mx-auto mt-8 space-y-3 text-sm sm:text-base leading-relaxed text-slate-400 text-right">
                  {seoIntro.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 flex justify-center">
                <CtaButton href="/#contact" ctaLocation={`${ctaLocation}-hero`} />
              </div>
            </div>
          </div>
        </section>

        <PillarSectionNav sections={sections.map(({ id, title: t }) => ({ id, title: t }))} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
          {sections.map((section, index) => {
            const visualFirst = index % 2 === 1;
            return (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-[calc(74px+0.75rem+4rem)] sm:scroll-mt-[calc(84px+1rem+4rem)] py-12 md:py-16 border-b border-white/10 last:border-b-0"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    visualFirst ? "" : ""
                  }`}
                  dir="rtl"
                >
                  <div className={visualFirst ? "lg:order-2" : "lg:order-1"}>
                    <GlassCard className="p-6 sm:p-8">
                      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-300/90 mb-2">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                        {section.title}
                      </h2>
                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-400">
                        {section.subtitle}
                      </p>

                      {section.timeframe ? (
                        <p className="mt-4 text-xs font-semibold text-slate-500">
                          זמן עבודה משוער:{" "}
                          <span className="text-slate-300">{section.timeframe}</span>
                        </p>
                      ) : null}

                      <div className="mt-6 grid gap-6 sm:grid-cols-2">
                        <div>
                          <h3 className="text-sm font-bold text-slate-200 mb-3">מה מקבלים</h3>
                          <ul className="space-y-2.5">
                            {section.deliverables.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-sm text-slate-400 leading-relaxed"
                              >
                                <CheckCircle2
                                  className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400"
                                  aria-hidden
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-200 mb-3">למי זה מתאים</h3>
                          <ul className="space-y-2.5">
                            {section.audience.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-sm text-slate-400 leading-relaxed"
                              >
                                <CheckCircle2
                                  className="mt-0.5 h-4 w-4 shrink-0 text-sky-400"
                                  aria-hidden
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8">
                        <CtaButton
                          href="/#contact"
                          label={section.ctaLabel ?? "בואו נדבר על זה"}
                          ctaLocation={`${ctaLocation}-${section.id}`}
                        />
                      </div>
                    </GlassCard>
                  </div>

                  <div className={`${visualFirst ? "lg:order-1" : "lg:order-2"} min-h-[16rem]`}>
                    {section.visualProof ? (
                      <div className="rounded-[var(--radius)] border border-white/10 bg-white/[0.02] p-4 sm:p-6 backdrop-blur-sm">
                        {section.visualProof}
                      </div>
                    ) : (
                      <div
                        className="flex h-full min-h-[16rem] items-center justify-center rounded-[var(--radius)] border border-dashed border-white/10 bg-white/[0.02] p-8 text-center"
                        aria-hidden
                      >
                        <p className="text-sm text-slate-500">תוצאה מותאמת לעסק שלכם</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {faq && faq.length > 0 ? (
          <section className="py-16 md:py-20 section-shell border-t border-white/10">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10" dir="rtl">
                <h2 className="premium-title">
                  שאלות <span className="gradient-text">נפוצות</span>
                </h2>
                <p className="premium-subtitle mt-3">כל מה שרצית לשאול — כאן</p>
              </div>
              <GlassCard className="overflow-hidden px-6 sm:px-8 md:px-9">
                <div className="h-1 w-full -mx-6 sm:-mx-8 md:-mx-9 mb-0" style={{ background: "var(--gradient-cta)" }} />
                <div dir="rtl" className="pt-2">
                  <FaqAccordion items={faq} />
                </div>
              </GlassCard>
            </div>
          </section>
        ) : null}

        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <GlassCard className="p-8 sm:p-12 text-center border-white/15">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-slate-100 mb-3">
                מוכנים להתחיל?
              </h2>
              <p className="text-sm sm:text-base leading-[1.7] mb-8 text-slate-400">
                בשיחה קצרה נמפה את הצרכים ונמליץ על המסלול המדויק לעסק שלך.
              </p>
              <div className="flex justify-center">
                <CtaButton href="/#contact" ctaLocation={`${ctaLocation}-footer`}>
                  אני רוצה אבחון לעסק שלי
                </CtaButton>
              </div>
            </GlassCard>
          </div>
        </section>
      </PageEnter>
    </div>
  );
}
