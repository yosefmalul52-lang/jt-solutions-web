import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PremiumReveal from "@/components/motion/PremiumReveal";
import ScribbleUnderline from "@/components/motion/ScribbleUnderline";
import JsonLd from "@/components/seo/JsonLd";
import CtaButton from "@/components/ui/CtaButton";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getServicesHubJsonLd } from "@/lib/seo/organization";
import { allServiceSeoLinks } from "@/lib/services-hub";
import {
  serviceOfferings,
  servicesHubFinalCta,
  servicesHubHero,
  urgencyCards,
} from "@/lib/services-hub-page";

export const metadata: Metadata = createPageMetadata({
  title: "שירותים לפי הבעיה של העסק",
  description:
    "אתר, דף נחיתה, מדידה, סדר בלידים ופרסום מדיד — JT Solutions עוזרת לעסקים בישראל להפוך נראות דיגיטלית לפניות מסודרות.",
  path: "/services",
  keywords: [
    "בניית אתרים לעסקים",
    "דף נחיתה ממיר",
    "סדר בלידים",
    "מדידת פניות",
    "פרסום מדיד",
    "JT Solutions",
  ],
});

const ACCENT_ICON: Record<string, string> = {
  sky: "bg-sky-100 text-sky-700 ring-sky-200",
  violet: "bg-sky-50 text-sky-800 ring-sky-200",
  cyan: "bg-sky-100 text-sky-700 ring-sky-200",
  rose: "bg-rose-50 text-rose-700 ring-rose-200",
};

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd data={getServicesHubJsonLd()} />
      <Navbar />
      <main className="flex-1 studio-service-page overflow-x-hidden">
        {/* Hero */}
        <section className="studio-service-hero-zone relative section-shell pt-28 pb-10 sm:pt-32 md:pt-40 md:pb-16">
          <div className="studio-service-hero-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
          <div className="page-hero-mesh" aria-hidden />
          <PremiumReveal as="div" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center" variant="rise">
            <div dir="rtl">
            <p className="text-eyebrow text-eyebrow--light">{servicesHubHero.eyebrow}</p>
            <h1 className="text-display mt-4 max-w-4xl mx-auto">
              <span className="gradient-text">{servicesHubHero.headline}</span>
            </h1>
            <ScribbleUnderline color="#2563EB" className="scribble-underline--inline mt-4" />

            <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center md:hidden">
              <CtaButton
                href="/contact"
                ctaLocation="services-hub-hero"
                label={servicesHubHero.ctaLabel}
                className="w-full sm:w-auto"
              />
              <CtaButton
                href="/projects"
                ctaLocation="services-hub-hero-secondary"
                label={servicesHubHero.secondaryCtaLabel}
                className="w-full sm:w-auto"
              />
            </div>

            <p className="text-lead mx-auto mt-5 max-w-3xl text-slate-600 md:hidden">
              {servicesHubHero.sublineMobile}
            </p>
            <p className="text-lead mx-auto mt-6 max-w-3xl text-slate-600 hidden md:block">
              {servicesHubHero.subline}
            </p>

            <div className="mt-8 hidden flex-wrap items-center justify-center gap-3 md:flex">
              <CtaButton href="/contact" ctaLocation="services-hub-hero" label={servicesHubHero.ctaLabel} />
              <CtaButton
                href="/projects"
                ctaLocation="services-hub-hero-secondary"
                label={servicesHubHero.secondaryCtaLabel}
              />
            </div>
            </div>
          </PremiumReveal>
        </section>

        {/* מה הכי דחוף */}
        <section className="pb-12 md:pb-16 section-shell" aria-labelledby="urgency-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" dir="rtl">
            <h2 id="urgency-heading" className="text-section text-center text-slate-900">
              מה הכי דחוף לך כרגע?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
              בחרו את המצב הקרוב אליכם — נוביל למסלול המתאים.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {urgencyCards.map((card, index) => (
                <li key={card.id}>
                  <PremiumReveal as="div" className="h-full" variant="rise" delay={0.04 + index * 0.05}>
                  <article className="studio-hub-urgency-card premium-card premium-card--interactive cm-sheen flex h-full flex-col p-5">
                    <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{card.description}</p>
                    <CtaButton
                      href={card.href}
                      ctaLocation={`services-hub-urgency-${card.id}`}
                      label={card.ctaLabel}
                      className="mt-4 w-full"
                    />
                  </article>
                  </PremiumReveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* שירותים לפי בעיות */}
        <section className="pb-16 md:pb-24 section-shell" aria-labelledby="offerings-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" dir="rtl">
            <h2 id="offerings-heading" className="text-section text-center text-slate-900">
              שירותים לפי הבעיה שהעסק צריך לפתור
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
              כל מסלול מתחיל בכאב אמיתי — ומסתיים בתוצאה עסקית ברורה.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              {serviceOfferings.map((offering, index) => {
                const Icon = offering.icon;
                const accent = ACCENT_ICON[offering.accent];

                return (
                  <PremiumReveal as="article" key={offering.id} className="studio-hub-pillar group p-5 sm:p-7 lg:p-8" variant="rise" delay={0.03 + index * 0.05}>
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex flex-1 gap-4">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 sm:h-12 sm:w-12 ${accent}`}
                        >
                          <Icon size={20} aria-hidden />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-extrabold leading-snug text-slate-900 sm:text-xl">
                            {offering.title}
                          </h3>

                          <dl className="mt-4 space-y-3 text-sm">
                            <div>
                              <dt className="font-semibold text-slate-500">הבעיה</dt>
                              <dd className="mt-1 leading-relaxed text-slate-600">{offering.problem}</dd>
                            </div>
                            <div>
                              <dt className="font-semibold text-slate-500">למי זה מתאים</dt>
                              <dd className="mt-1 leading-relaxed text-slate-600">{offering.forWho}</dd>
                            </div>
                            <div>
                              <dt className="font-semibold text-slate-500">מה מקבלים בפועל</dt>
                              <dd className="mt-1 leading-relaxed text-slate-600">{offering.deliverables}</dd>
                            </div>
                            <div>
                              <dt className="font-semibold text-slate-500">התוצאה העסקית</dt>
                              <dd className="mt-1 leading-relaxed text-slate-800">{offering.outcome}</dd>
                            </div>
                            <div>
                              <dt className="font-semibold text-slate-500">הצעד הבא</dt>
                              <dd className="mt-1 leading-relaxed text-slate-600">{offering.nextStep}</dd>
                            </div>
                          </dl>

                          <CtaButton
                            href={offering.href}
                            ctaLocation={`services-hub-offering-${offering.id}`}
                            label="קרא עוד על המסלול"
                            className="mt-5"
                          />
                        </div>
                      </div>

                      <div className="shrink-0 lg:pt-1">
                        <CtaButton
                          href={offering.contactHref}
                          ctaLocation={`services-hub-${offering.id}`}
                          label={servicesHubHero.ctaLabel}
                          className="w-full lg:w-auto lg:min-w-[14rem]"
                          shine="auto"
                        />
                      </div>
                    </div>
                  </PremiumReveal>
                );
              })}
            </div>

            <nav
              className="premium-card mt-12 p-5 sm:p-6"
              aria-label="קישורים לשירותים ספציפיים"
            >
              <h2 className="mb-3 text-xs font-bold text-slate-500">גישה מהירה לשירותים</h2>
              <ul className="flex flex-wrap gap-2">
                {allServiceSeoLinks.map((link) => (
                  <li key={link.slug}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-[2.25rem] items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-sky-200 hover:text-sky-800"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <PremiumReveal as="div" className="studio-cta-block mt-12 p-6 sm:p-10 text-center" variant="depth">
              <h2 className="text-section text-slate-900">{servicesHubFinalCta.headline}</h2>
              <p className="text-lead mx-auto mt-3 max-w-xl text-slate-600">{servicesHubFinalCta.subline}</p>
              <div className="mt-6 flex justify-center">
                <CtaButton href="/contact" ctaLocation="services-hub" label={servicesHubHero.ctaLabel} shine="auto" />
              </div>
            </PremiumReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
