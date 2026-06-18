import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { CheckCircle2, Home, LayoutGrid, MessageCircle } from "lucide-react";
import PageEnter from "@/components/motion/PageEnter";
import CtaButton from "@/components/ui/CtaButton";
import OutlineNavLink from "@/components/ui/OutlineNavLink";
import TrackedLink from "@/components/ui/TrackedLink";
import FaqAccordion from "@/components/ui/FaqAccordion";
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

export interface ServiceTemplateProps {
  title: string;
  badge: string;
  description: string;
  targetAudience: string[];
  deliverables: ServiceDeliverableItem[];
  timeframe: string;
  faq?: ServiceFaqItem[];
  seoIntro?: string[];
  whyUs?: string[];
  relatedProjectIds?: string[];
  relatedBlogSlugs?: string[];
  ctaLocation?: string;
}

export default function ServiceTemplate({
  title,
  badge,
  description,
  targetAudience,
  deliverables,
  timeframe,
  faq,
  seoIntro,
  whyUs,
  relatedProjectIds = [],
  relatedBlogSlugs = [],
  ctaLocation = "service-page",
}: ServiceTemplateProps) {
  return (
    <div className="bg-[#F9FAFB]">
      <PageEnter>

        {/* ── Hero ── */}
        <section className="relative -mt-[90px] sm:-mt-[102px] pt-[152px] sm:pt-[168px] pb-24">
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10" dir="rtl">
              <OutlineNavLink href="/" icon={Home}>חזרה לדף הבית</OutlineNavLink>
              <OutlineNavLink href="/#services" icon={LayoutGrid}>מפת השירותים</OutlineNavLink>
              <TrackedLink
                href="/#contact"
                ctaLocation={`${ctaLocation}-nav`}
                ctaLabel="צור קשר"
                className="inline-flex items-center gap-2 rounded-[var(--radius-soft)] border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700"
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
                <span className="inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-slate-700">
                  {badge}
                </span>
              </span>

              <h1 className="display-title max-w-4xl mx-auto">
                <span className="gradient-text">{title}</span>
              </h1>

              <p className="premium-subtitle max-w-2xl mx-auto mt-6">{description}</p>
              {seoIntro && seoIntro.length > 0 ? (
                <div className="max-w-2xl mx-auto mt-8 space-y-3 text-sm sm:text-base leading-relaxed text-slate-600 text-right">
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

        {/* ── 3-col detail grid ── */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6" dir="rtl">

              {/* למי זה מתאים */}
              <article className="rounded-[var(--radius)] p-6 bg-white border border-slate-200 shadow-premium flex flex-col">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                  <div
                    className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-soft)] border shrink-0"
                    style={{ background: "rgba(79,70,229,0.08)", borderColor: "rgba(79,70,229,0.18)" }}
                  >
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#4f46e5" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h2 className="text-base font-bold tracking-tight text-slate-900">למי זה מתאים</h2>
                </div>
                <ul className="space-y-3 flex-1">
                  {targetAudience.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm leading-[1.7] text-slate-600">
                      <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: "#4f46e5" }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>

              {/* מה מקבלים */}
              <article className="rounded-[var(--radius)] p-6 bg-white border border-slate-200 shadow-premium flex flex-col">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                  <div
                    className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-soft)] border shrink-0"
                    style={{ background: "rgba(16,179,231,0.08)", borderColor: "rgba(16,179,231,0.22)" }}
                  >
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#0891b2" strokeWidth={2}>
                      <polyline points="9 11 12 14 22 4" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <h2 className="text-base font-bold tracking-tight text-slate-900">מה מקבלים בפועל</h2>
                </div>
                <ul className="space-y-3.5 flex-1">
                  {deliverables.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.text} className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-soft)] border shrink-0"
                          style={{ background: "rgba(79,70,229,0.06)", borderColor: "rgba(79,70,229,0.14)" }}
                        >
                          <Icon size={14} style={{ color: "#4f46e5" }} />
                        </div>
                        <span className="text-sm leading-[1.7] text-slate-600">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </article>

              {/* זמן עבודה + איך זה עובד */}
              <div className="flex flex-col gap-5">
                <article className="rounded-[var(--radius)] p-6 bg-white border border-slate-200 shadow-premium">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                    <div
                      className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-soft)] border shrink-0"
                      style={{ background: "rgba(124,58,237,0.08)", borderColor: "rgba(124,58,237,0.2)" }}
                    >
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#7c3aed" strokeWidth={2}>
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <h2 className="text-base font-bold tracking-tight text-slate-900">זמן עבודה</h2>
                  </div>
                  <p className="text-sm leading-[1.75] text-slate-600">{timeframe}</p>
                </article>

                <article
                  className="rounded-[var(--radius)] p-6 border border-slate-200"
                  style={{
                    background: "linear-gradient(135deg, rgba(79,70,229,0.04) 0%, rgba(16,179,231,0.04) 100%)",
                    borderColor: "rgba(79,70,229,0.14)",
                  }}
                >
                  <p className="text-sm font-bold text-slate-900 mb-2">איך זה עובד?</p>
                  <p className="text-sm leading-[1.75] text-slate-600">
                    מתחילים בשיחת אפיון קצרה, מגדירים יחד מטרות ולוח זמנים, ועובדים בשקיפות מלאה עד להשקה מוצלחת.
                  </p>
                </article>
              </div>

            </div>
          </div>
        </section>

        {whyUs && whyUs.length > 0 ? (
          <section className="py-12 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
              <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">למה JT Solutions</h2>
              <ul className="space-y-3">
                {whyUs.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-indigo-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {(relatedProjectIds.length > 0 || relatedBlogSlugs.length > 0) && (
          <section className="py-12 border-t border-slate-200/80">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8" dir="rtl">
              {relatedProjectIds.length > 0 ? (
                <div>
                  <h2 className="text-base font-bold text-slate-900 mb-3">פרויקטים קשורים</h2>
                  <ul className="space-y-2">
                    {relatedProjectIds.map((id) => {
                      const project = getProjectById(id);
                      if (!project) return null;
                      return (
                        <li key={id}>
                          <Link href={`/projects/${id}`} className="text-sm font-semibold text-indigo-600 hover:underline">
                            {project.title} — {project.shortDescription}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
              {relatedBlogSlugs.length > 0 ? (
                <div>
                  <h2 className="text-base font-bold text-slate-900 mb-3">מדריכים קשורים</h2>
                  <ul className="space-y-2">
                    {relatedBlogSlugs.map((slug) => {
                      const post = getBlogPostBySlug(slug);
                      if (!post) return null;
                      return (
                        <li key={slug}>
                          <Link href={`/blog/${slug}`} className="text-sm font-semibold text-indigo-600 hover:underline">
                            {post.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <Link href="/blog" className="inline-block mt-3 text-xs font-semibold text-slate-500 hover:text-slate-800">
                    כל המדריכים →
                  </Link>
                </div>
              ) : null}
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        {faq && faq.length > 0 && (
          <section
            className="py-16 md:py-20 section-shell"
            style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #F9FAFB 60%, #F3F6FB 100%)" }}
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10" dir="rtl">
                <h2 className="premium-title">
                  שאלות <span className="gradient-text">נפוצות</span>
                </h2>
                <p className="premium-subtitle mt-3">כל מה שרצית לשאול — כאן</p>
              </div>

              <div
                className="rounded-[var(--radius)] bg-white border border-slate-200 shadow-premium overflow-hidden"
                dir="rtl"
              >
                {/* colored top bar */}
                <div className="h-1 w-full" style={{ background: "var(--gradient-cta)" }} />
                <div className="px-7 md:px-9">
                  <FaqAccordion items={faq} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="rounded-[var(--radius)] p-8 sm:p-12 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,41,59,0.96))",
                border: "1px solid rgba(148,163,184,0.2)",
                boxShadow: "0 24px 50px rgba(15,23,42,0.22)",
              }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white mb-3">
                מוכן להתחיל?
              </h2>
              <p className="text-sm sm:text-base leading-[1.7] mb-8" style={{ color: "#CBD5E1" }}>
                בשיחה קצרה נמפה את הצרכים ונמליץ על המסלול המדויק לעסק שלך.
              </p>
              <div className="flex justify-center">
                <CtaButton href="/#contact" ctaLocation={`${ctaLocation}-footer`}>
                  קבלו אבחון דיגיטלי חינם
                </CtaButton>
              </div>
            </div>
          </div>
        </section>

      </PageEnter>
    </div>
  );
}
