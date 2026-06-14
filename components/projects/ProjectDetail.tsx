"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Home, Layers, Sparkles, Target, Workflow } from "lucide-react";
import PageEnter from "@/components/motion/PageEnter";
import OutlineNavLink from "@/components/ui/OutlineNavLink";
import CtaButton from "@/components/ui/CtaButton";
import type { ProjectItem } from "@/lib/projects";
import { servicePages } from "@/lib/seo/services";

const cardClass =
  "rounded-[var(--radius-soft)] border border-white/50 bg-white/80 p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]";

const accentCardStyle = {
  borderColor: "rgba(79,70,229,0.16)",
  background: "linear-gradient(135deg, rgba(79,70,229,0.06), rgba(255,255,255,0.76))",
} as const;

const valueCardStyle = {
  borderColor: "rgba(5,150,105,0.2)",
  background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(255,255,255,0.82))",
} as const;

function SectionCard({
  title,
  icon,
  children,
  variant = "default",
}: {
  title: string;
  icon?: React.ReactNode;
  children: ReactNode;
  variant?: "default" | "accent" | "value";
}) {
  const style = variant === "accent" ? accentCardStyle : variant === "value" ? valueCardStyle : undefined;

  return (
    <article className={cardClass} style={style}>
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      <div className="mt-3">{children}</div>
    </article>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-slate-600 sm:text-lg">
          <CheckCircle2 size={18} className="mt-1 shrink-0 text-indigo-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectDetail({ project }: { project: ProjectItem }) {
  const relatedService = servicePages[project.relatedServiceSlug];
  const titles = project.sectionTitles ?? {};
  const resultItems = project.measurableResults ?? project.results;
  const builtItems = project.whatWeBuilt ?? project.processPoints;

  return (
    <div
      className="w-full py-16 md:py-24"
      style={{ background: "linear-gradient(180deg, #F8FAFF 0%, #F9FAFB 55%, #F6F8FF 100%)" }}
    >
      <PageEnter>
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8" dir="rtl">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <OutlineNavLink href="/" icon={Home}>
              חזרה לדף הבית
            </OutlineNavLink>
            <OutlineNavLink href="/projects" icon={ArrowRight}>
              חזרה לפרויקטים
            </OutlineNavLink>
          </div>

          <header className="overflow-hidden rounded-[var(--radius)] border border-white/40 bg-white/88 backdrop-blur-md shadow-premium">
            <div className="relative aspect-[21/9] border-b border-white/40">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/18 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-[0.14em] text-slate-200">סיפור הצלחה</p>
                <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-6xl">{project.title}</h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg">{project.shortDescription}</p>
              </div>
            </div>

            <div className="space-y-7 p-6 sm:p-8 md:p-10">
              {(project.industry || project.clientType) && (
                <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {project.industry ? (
                    <div className="rounded-[var(--radius-soft)] border border-slate-200 bg-slate-50 px-4 py-3">
                      <dt className="text-xs font-semibold text-slate-500">תעשייה</dt>
                      <dd className="mt-1 text-sm font-bold text-slate-900">{project.industry}</dd>
                    </div>
                  ) : null}
                  {project.clientType ? (
                    <div className="rounded-[var(--radius-soft)] border border-slate-200 bg-slate-50 px-4 py-3">
                      <dt className="text-xs font-semibold text-slate-500">סוג הלקוח</dt>
                      <dd className="mt-1 text-sm font-bold text-slate-900">{project.clientType}</dd>
                    </div>
                  ) : null}
                </dl>
              )}

              <article className={cardClass} style={accentCardStyle}>
                <div className="flex items-center gap-2" style={{ color: "#4f46e5" }}>
                  <Sparkles size={18} />
                  <h2 className="text-2xl font-extrabold text-slate-900">במילים פשוטות</h2>
                </div>
                <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">{project.simpleTerms}</p>
              </article>

              <div className="flex flex-wrap gap-2.5">
                {project.technologies.map((tech) => (
                  <span
                    key={`${project.id}-${tech}`}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-6">
                {(project.industry || project.clientType || project.businessProblem) && (
                  <SectionCard
                    title={titles.clientAndIndustry ?? "הלקוח והתעשייה"}
                    icon={<Layers size={18} style={{ color: "#4f46e5" }} />}
                  >
                    {project.businessProblem ? (
                      <p className="text-base leading-relaxed text-slate-600 sm:text-lg">{project.businessProblem}</p>
                    ) : (
                      <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                        {project.clientType ?? project.industry}
                      </p>
                    )}
                  </SectionCard>
                )}

                <SectionCard
                  title={titles.before ?? "המצב לפני"}
                  icon={<Target size={18} style={{ color: "#4f46e5" }} />}
                >
                  <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                    {project.beforeState ?? project.problem}
                  </p>
                </SectionCard>

                {project.projectGoal ? (
                  <SectionCard title={titles.goal ?? "המטרה העסקית"}>
                    <p className="text-base leading-relaxed text-slate-600 sm:text-lg">{project.projectGoal}</p>
                  </SectionCard>
                ) : null}

                <SectionCard title={titles.built ?? "מה בנינו"}>
                  <BulletList items={builtItems} />
                </SectionCard>

                {project.strategy || (project.techSetup && project.techSetup.length > 0) ? (
                  <SectionCard title={titles.strategy ?? "אסטרטגיה ותשתית"} icon={<Workflow size={18} style={{ color: "#4f46e5" }} />}>
                    {project.strategy ? (
                      <p className="text-base leading-relaxed text-slate-600 sm:text-lg">{project.strategy}</p>
                    ) : null}
                    {project.techSetup && project.techSetup.length > 0 ? (
                      <ul className={`space-y-2 ${project.strategy ? "mt-4" : ""}`}>
                        {project.techSetup.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-slate-600 sm:text-base">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </SectionCard>
                ) : null}

                {project.howItHelps ? (
                  <SectionCard title={titles.howItHelps ?? "איך התשתית עוזרת לעסק"} variant="value">
                    <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{project.howItHelps}</p>
                  </SectionCard>
                ) : null}

                {project.uxAndMessaging ? (
                  <SectionCard title={titles.uxMessage ?? "חוויית משתמש ומסר שיווקי"} variant="value">
                    <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{project.uxAndMessaging}</p>
                  </SectionCard>
                ) : null}

                {project.leadFlow && project.leadFlow.length > 0 ? (
                  <SectionCard title={titles.leadFlow ?? "זרימת הליד החדשה"}>
                    <ol className="space-y-3">
                      {project.leadFlow.map((step, index) => (
                        <li key={step} className="flex items-start gap-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-700">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </SectionCard>
                ) : null}

                {!project.howItHelps && !project.uxAndMessaging && !project.leadFlow ? (
                  <SectionCard title="הערך העסקי" variant="value">
                    <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{project.businessValue}</p>
                    {project.afterState ? (
                      <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{project.afterState}</p>
                    ) : null}
                  </SectionCard>
                ) : project.afterState ? (
                  <SectionCard title="המצב אחרי ההטמעה" variant="value">
                    <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{project.afterState}</p>
                  </SectionCard>
                ) : null}

                {resultItems.length > 0 ? (
                  <SectionCard title={titles.results ?? "תוצאות והשפעה"}>
                    <BulletList items={resultItems} />
                    {project.metrics && project.metrics.length > 0 ? (
                      <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {project.metrics.map((m) => (
                          <div key={m.label} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                            <dt className="text-xs font-semibold text-slate-500">{m.label}</dt>
                            <dd className="mt-1 text-sm font-bold text-slate-900">{m.value}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </SectionCard>
                ) : null}

                {project.successFactors && project.successFactors.length > 0 ? (
                  <SectionCard title={titles.success ?? "מה הפך את הפרויקט למוצלח"}>
                    <BulletList items={project.successFactors} />
                  </SectionCard>
                ) : null}

                {project.clientQuote ? (
                  <blockquote className="rounded-[var(--radius-soft)] border border-indigo-100 bg-indigo-50/50 px-6 py-5 text-base italic leading-relaxed text-slate-700">
                    &ldquo;{project.clientQuote}&rdquo;
                  </blockquote>
                ) : null}

                {(project.relatedServices && project.relatedServices.length > 0) || relatedService ? (
                  <article className={cardClass}>
                    <h2 className="text-2xl font-bold text-slate-900">שירותים קשורים</h2>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {project.relatedServices?.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex items-center gap-2 rounded-[var(--radius-soft)] border border-indigo-100 bg-indigo-50/60 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-100"
                        >
                          <span>{link.label}</span>
                          <ArrowRight size={14} className="rotate-180" aria-hidden />
                        </Link>
                      ))}
                      {!project.relatedServices?.some((l) => l.href === relatedService.path) ? (
                        <Link
                          href={relatedService.path}
                          className="inline-flex items-center gap-2 rounded-[var(--radius-soft)] border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300"
                        >
                          <span>לשירות {relatedService.serviceName}</span>
                          <ArrowRight size={14} className="rotate-180" aria-hidden />
                        </Link>
                      ) : null}
                    </div>
                  </article>
                ) : null}

                <div
                  className="rounded-[var(--radius-soft)] border p-6 text-center sm:p-8"
                  style={{
                    borderColor: "rgba(79,70,229,0.18)",
                    background: "linear-gradient(160deg, rgba(239,246,255,0.9) 0%, rgba(255,255,255,0.95) 100%)",
                  }}
                >
                  <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                    {project.serviceSpecificCtaLabel ?? "רוצים תוצאה דומה לעסק שלכם?"}
                  </h2>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                    בשיחת התאמה קצרה נבין מה מתאים לשלב שבו העסק שלכם נמצא — בלי התחייבות.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <CtaButton
                      href={project.serviceSpecificCtaHref ?? "/#contact"}
                      label={project.serviceSpecificCtaLabel ?? "קובעים שיחת התאמה"}
                      ctaLocation="project-detail"
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>
        </section>
      </PageEnter>
    </div>
  );
}
