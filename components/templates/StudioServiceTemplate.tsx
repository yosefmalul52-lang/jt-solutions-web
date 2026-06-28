import type { ComponentType, ReactNode, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronDown, Home, LayoutGrid } from "lucide-react";
import PageEnter from "@/components/motion/PageEnter";
import PremiumReveal from "@/components/motion/PremiumReveal";
import ScribbleUnderline from "@/components/motion/ScribbleUnderline";
import { GlassPanel } from "@/components/studio/StudioPanel";

const SERVICE_ACCENT: Record<string, string> = {
  websites: "#2563EB",
  "business-websites": "#2563EB",
  "landing-pages": "#2563EB",
  ecommerce: "#06B6D4",
  "web-development": "#2563EB",
  automations: "#7C3AED",
  "ai-automation": "#7C3AED",
  "whatsapp-bot": "#10B981",
  "site-integration": "#7C3AED",
  "digital-marketing": "#06B6D4",
  "ad-infrastructure": "#2563EB",
  branding: "#7C3AED",
};

function accentFor(ctaLocation: string): string {
  return SERVICE_ACCENT[ctaLocation] ?? "#2563EB";
}
import StudioTextLink from "@/components/studio/StudioTextLink";
import CtaButton from "@/components/ui/CtaButton";
import FaqAccordion from "@/components/ui/FaqAccordion";
import PillarSectionNav from "@/components/ui/PillarSectionNav";
import { getBlogPostBySlug } from "@/lib/blog/posts";
import { getProjectById } from "@/lib/projects";

export interface ServiceDeliverableItem {
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  text: string;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export type StudioServiceSection = {
  id: string;
  title: string;
  subtitle: string;
  deliverables: string[];
  audience: string[];
  problem?: string;
  nextStep?: string;
  timeframe?: string;
  visualProof?: ReactNode;
  ctaLabel?: string;
  outcomeFeeling?: string;
  measurementConnection?: string;
  contactHref?: string;
};

export type StudioServiceTemplateProps = {
  badge: string;
  title: string;
  description: string;
  targetAudience?: string[];
  deliverables?: ServiceDeliverableItem[];
  timeframe?: string;
  faq?: ServiceFaqItem[];
  seoIntro?: string[];
  whyUs?: string[];
  relatedProjectIds?: string[];
  relatedBlogSlugs?: string[];
  ctaLocation?: string;
  /** Multi-section pillar layout (websites, automations, etc.) */
  sections?: StudioServiceSection[];
  problemContext?: string;
  processSteps?: { step: string; title: string; text: string }[];
  /** Optional block between hero and pillar sections (e.g. fit table) */
  beforeSections?: ReactNode;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
};

const DEFAULT_PROCESS = [
  { step: "01", title: "אבחון", text: "מבינים מטרה, קהל ומה חוסם פניות." },
  { step: "02", title: "אפיון", text: "מגדירים מסר, זרימה ומערכת לפני בנייה." },
  { step: "03", title: "בנייה", text: "מעצבים, מפתחים ומחברים את כל החלקים." },
  { step: "04", title: "השקה", text: "עולים לאוויר עם מדידה ושיפור מתמשך." },
];

function ServiceHero({
  badge,
  title,
  description,
  ctaLocation,
  relatedProjectIds,
  secondaryCtaHref,
  secondaryCtaLabel,
}: Pick<
  StudioServiceTemplateProps,
  | "badge"
  | "title"
  | "description"
  | "ctaLocation"
  | "relatedProjectIds"
  | "secondaryCtaHref"
  | "secondaryCtaLabel"
>) {
  const proofId = relatedProjectIds?.[0];
  const proof = proofId ? getProjectById(proofId) : null;

  return (
    <section className="studio-service-hero-zone relative -mt-[90px] sm:-mt-[102px] overflow-hidden pt-[152px] pb-14 sm:pt-[168px] md:pb-20 section-shell">
      <div className="studio-service-hero-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="page-hero-mesh" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3" dir="rtl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[var(--radius-soft)] border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <Home size={16} aria-hidden />
            חזרה לדף הבית
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-[var(--radius-soft)] border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <LayoutGrid size={16} aria-hidden />
            מפת השירותים
          </Link>
        </div>

        <div className="mx-auto max-w-3xl text-center" dir="rtl">
          <span className="dark-section-badge">{badge}</span>
          <h1 className="text-display mt-5">
            <span className="gradient-text">{title}</span>
          </h1>
          <ScribbleUnderline color={accentFor(ctaLocation ?? "service")} className="scribble-underline--inline mt-4" />
          <p className="text-lead mx-auto mt-6 max-w-2xl text-slate-600">{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton href="/contact" ctaLocation={`${ctaLocation}-hero`} className="w-full sm:w-auto" shine="auto" />
            {secondaryCtaHref && secondaryCtaLabel ? (
              <CtaButton
                href={secondaryCtaHref}
                ctaLocation={`${ctaLocation}-hero-secondary`}
                label={secondaryCtaLabel}
                className="w-full sm:w-auto"
              />
            ) : proof ? (
              <CtaButton
                href={`/projects/${proof.id}`}
                ctaLocation={`${ctaLocation}-hero-proof`}
                label={`ראו פרויקט: ${proof.title}`}
                className="w-full sm:w-auto"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarSections({
  sections,
  ctaLocation,
}: {
  sections: StudioServiceSection[];
  ctaLocation: string;
}) {
  return (
    <>
      <PillarSectionNav sections={sections.map(({ id, title: t }) => ({ id, title: t }))} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
        {sections.map((section, index) => {
          const visualFirst = index % 2 === 1;
          return (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-[calc(74px+0.75rem+4rem)] border-b border-slate-200 py-12 last:border-b-0 md:py-16 sm:scroll-mt-[calc(84px+1rem+4rem)]"
            >
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12" dir="rtl">
                <div className={visualFirst ? "lg:order-2" : "lg:order-1"}>
                  <GlassPanel tone="light" className="p-6 sm:p-8">
                    <p className="text-eyebrow text-eyebrow--light mb-2">{String(index + 1).padStart(2, "0")}</p>
                    <h2 className="text-section text-slate-900">{section.title}</h2>
                    <p className="text-lead mt-3 text-slate-600">{section.subtitle}</p>
                    {section.problem ? (
                      <div className="mt-5 rounded-[var(--radius-soft)] border border-slate-200 bg-slate-50 p-4">
                        <h3 className="text-sm font-bold text-slate-800">איזו בעיה זה פותר</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{section.problem}</p>
                      </div>
                    ) : null}
                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <div>
                        <h3 className="mb-3 text-sm font-bold text-slate-800">מה מקבלים בפועל</h3>
                        <ul className="space-y-2.5">
                          {section.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" aria-hidden />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="mb-3 text-sm font-bold text-slate-800">למי זה מתאים</h3>
                        <ul className="space-y-2.5">
                          {section.audience.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" aria-hidden />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {section.outcomeFeeling ? (
                      <div className="mt-6 rounded-[var(--radius-soft)] border border-slate-200 bg-slate-50 p-4">
                        <h3 className="text-sm font-bold text-slate-800">מה אמורים להרגיש / לקבל בסוף</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{section.outcomeFeeling}</p>
                      </div>
                    ) : null}
                    {section.measurementConnection ? (
                      <div className="mt-4 rounded-[var(--radius-soft)] border border-slate-200 bg-slate-50 p-4">
                        <h3 className="text-sm font-bold text-slate-800">איך זה עוזר להביא פניות</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{section.measurementConnection}</p>
                      </div>
                    ) : null}
                    {section.nextStep ? (
                      <div className="mt-4 rounded-[var(--radius-soft)] border border-slate-200 bg-slate-50 p-4">
                        <h3 className="text-sm font-bold text-slate-800">מה הצעד הבא</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{section.nextStep}</p>
                      </div>
                    ) : null}
                    <div className="mt-8">
                      <CtaButton
                        href={section.contactHref ?? "/#contact"}
                        ctaLocation={`${ctaLocation}-${section.id}`}
                        shine="auto"
                      />
                    </div>
                  </GlassPanel>
                </div>
                <div className={`min-h-[16rem] ${visualFirst ? "lg:order-1" : "lg:order-2"}`}>
                  {section.visualProof ? (
                    <GlassPanel tone="light" className="p-4 sm:p-6">
                      {section.visualProof}
                    </GlassPanel>
                  ) : (
                    <div className="service-visual" aria-hidden>
                      <p className="text-xs font-bold uppercase tracking-wide text-sky-700">{section.title}</p>
                      {section.deliverables.slice(0, 3).map((item) => (
                        <div key={item} className="service-visual__row">
                          <span className="service-visual__dot" />
                          <span className="truncate text-sm font-medium text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

function LeafServiceBody({
  targetAudience = [],
  deliverables = [],
  timeframe = "",
  problemContext,
  whyUs,
  processSteps = DEFAULT_PROCESS,
}: Pick<
  StudioServiceTemplateProps,
  "targetAudience" | "deliverables" | "timeframe" | "problemContext" | "whyUs" | "processSteps"
>) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
      {problemContext ? (
        <section className="mb-12 md:mb-16" dir="rtl">
          <p className="text-eyebrow text-eyebrow--light mb-3">האתגר</p>
          <GlassPanel tone="light" className="p-6 sm:p-8">
            <p className="text-lead text-slate-600">{problemContext}</p>
          </GlassPanel>
        </section>
      ) : null}

      <section className="mb-12 md:mb-16" dir="rtl">
        <p className="text-eyebrow text-eyebrow--light mb-3">מה בונים</p>
        <h2 className="text-section mb-8 text-slate-900">מה מקבלים בפועל</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {deliverables.map((item, index) => {
            const Icon = item.icon;
            return (
              <PremiumReveal key={item.text} as="div" variant="rise" delay={0.03 + index * 0.04}>
                <GlassPanel tone="light" className="group flex h-full items-start gap-4 p-5 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={18} className="text-sky-600" aria-hidden />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">{item.text}</p>
                </GlassPanel>
              </PremiumReveal>
            );
          })}
        </div>
        {timeframe ? (
          <p className="mt-6 text-sm text-slate-500">
            זמן עבודה משוער: <span className="font-semibold text-slate-700">{timeframe}</span>
          </p>
        ) : null}
      </section>

      {targetAudience.length > 0 ? (
        <section className="mb-12 md:mb-16" dir="rtl">
          <p className="text-eyebrow text-eyebrow--light mb-3">למי זה מתאים</p>
          <GlassPanel tone="light" className="p-6">
            <ul className="space-y-3">
              {targetAudience.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sky-600" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </GlassPanel>
        </section>
      ) : null}

      <section className="mb-12 md:mb-16" dir="rtl">
        <p className="text-eyebrow text-eyebrow--light mb-3">איך עובדים</p>
        <h2 className="text-section mb-8 text-slate-900">תהליך ברור. בלי הפתעות.</h2>
        <ol className="process-rail grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.title}>
              <PremiumReveal as="div" className="studio-process-step relative h-full p-5" variant="rise" delay={0.04 + index * 0.07}>
                <span className="relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-bold text-white">
                  {step.step}
                </span>
                <h3 className="mt-3 text-base font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </PremiumReveal>
            </li>
          ))}
        </ol>
      </section>

      {whyUs && whyUs.length > 0 ? (
        <section className="mb-12" dir="rtl">
          <p className="text-eyebrow text-eyebrow--light mb-3">למה JT Solutions</p>
          <ul className="space-y-3">
            {whyUs.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-slate-600">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sky-600" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function ProofSection({
  relatedProjectIds = [],
  relatedBlogSlugs = [],
}: Pick<StudioServiceTemplateProps, "relatedProjectIds" | "relatedBlogSlugs">) {
  if (relatedProjectIds.length === 0 && relatedBlogSlugs.length === 0) return null;

  return (
    <section className="border-t border-slate-200 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" dir="rtl">
        <p className="text-eyebrow text-eyebrow--light mb-3">הוכחות</p>
        <h2 className="text-section mb-8 text-slate-900">פרויקטים ומדריכים קשורים</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {relatedProjectIds.map((id) => {
            const project = getProjectById(id);
            if (!project) return null;
            return (
              <Link key={id} href={`/projects/${id}`} className="studio-project-proof-card group block">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-sky-600">פרויקט</p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">{project.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{project.shortDescription}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
                    קראו את הפרויקט
                    <ArrowLeft size={14} aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
          {relatedBlogSlugs.length > 0 ? (
            <GlassPanel tone="light" className="p-6">
              <h3 className="text-base font-bold text-slate-900">מדריכים קשורים</h3>
              <ul className="mt-4 space-y-3">
                {relatedBlogSlugs.map((slug) => {
                  const post = getBlogPostBySlug(slug);
                  if (!post) return null;
                  return (
                    <li key={slug}>
                      <StudioTextLink href={`/blog/${slug}`}>{post.title}</StudioTextLink>
                    </li>
                  );
                })}
              </ul>
              <StudioTextLink href="/blog" className="mt-4">
                כל המדריכים
              </StudioTextLink>
            </GlassPanel>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function SeoIntroBlock({ seoIntro }: { seoIntro: string[] }) {
  if (!seoIntro.length) return null;
  return (
    <section className="border-t border-slate-200 py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8" dir="rtl">
        <details className="studio-seo-details group">
          <summary className="flex items-center justify-between gap-4 rounded-[var(--radius-soft)] border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900">
            <span>מידע נוסף לעיון מעמיק</span>
            <ChevronDown
              size={18}
              className="shrink-0 transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <div className="mt-4 space-y-3 rounded-[var(--radius)] border border-slate-200 bg-slate-50 p-5 sm:p-6">
            {seoIntro.map((p) => (
              <p key={p} className="text-sm leading-relaxed text-slate-600">
                {p}
              </p>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}

export default function StudioServiceTemplate({
  badge,
  title,
  description,
  targetAudience,
  deliverables,
  timeframe,
  faq,
  seoIntro,
  whyUs,
  relatedProjectIds,
  relatedBlogSlugs,
  ctaLocation = "service",
  sections,
  problemContext,
  processSteps,
  beforeSections,
  secondaryCtaHref,
  secondaryCtaLabel,
}: StudioServiceTemplateProps) {
  const isPillar = sections && sections.length > 0;
  const contextLine = problemContext ?? seoIntro?.[0];

  return (
    <div className="studio-service-page">
      <PageEnter>
        <ServiceHero
          badge={badge}
          title={title}
          description={description}
          ctaLocation={ctaLocation}
          relatedProjectIds={relatedProjectIds}
          secondaryCtaHref={secondaryCtaHref}
          secondaryCtaLabel={secondaryCtaLabel}
        />

        {beforeSections}

        {isPillar ? (
          <PillarSections sections={sections} ctaLocation={ctaLocation} />
        ) : (
          <LeafServiceBody
            targetAudience={targetAudience}
            deliverables={deliverables}
            timeframe={timeframe}
            problemContext={contextLine}
            whyUs={whyUs}
            processSteps={processSteps}
          />
        )}

        <ProofSection relatedProjectIds={relatedProjectIds} relatedBlogSlugs={relatedBlogSlugs} />

        {seoIntro && seoIntro.length > 1 ? <SeoIntroBlock seoIntro={seoIntro.slice(1)} /> : null}

        {faq && faq.length > 0 ? (
          <section className="border-t border-slate-200 py-14 md:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 text-center" dir="rtl">
                <p className="text-eyebrow text-eyebrow--light">שאלות נפוצות</p>
                <h2 className="text-section mt-3 text-slate-900">לפני שמתחילים</h2>
              </div>
              <GlassPanel tone="light" className="overflow-hidden px-6 sm:px-8">
                <div className="h-1 w-full -mx-6 mb-0 sm:-mx-8" style={{ background: "var(--gradient-cta)" }} />
                <div dir="rtl" className="divide-y divide-slate-200 pt-2 [&_.divide-y]:divide-slate-200 [&_button]:text-slate-800 [&_button:hover]:text-slate-950 [&_p]:text-slate-600">
                  <FaqAccordion items={faq} />
                </div>
              </GlassPanel>
            </div>
          </section>
        ) : null}

        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="studio-cta-block p-8 text-center sm:p-12" dir="rtl">
              <h2 className="text-section text-slate-900">מוכנים להתחיל?</h2>
              <p className="text-lead mx-auto mt-4 max-w-xl text-slate-600">
                בשיחה קצרה נמפה את הצרכים ונמליץ על המסלול המדויק לעסק שלך.
              </p>
              <div className="mt-8 flex justify-center">
                <CtaButton href="/contact" ctaLocation={`${ctaLocation}-footer`} shine="auto" />
              </div>
            </div>
          </div>
        </section>
      </PageEnter>
    </div>
  );
}
