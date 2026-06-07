"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Home, Sparkles, Target } from "lucide-react";
import PageEnter from "@/components/motion/PageEnter";
import OutlineNavLink from "@/components/ui/OutlineNavLink";
import type { ProjectItem } from "@/lib/projects";
import { getPillarBySlug } from "@/lib/pillars";

export default function ProjectDetail({ project }: { project: ProjectItem }) {
  const relatedPillar = getPillarBySlug(project.relatedPillarSlug);

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
                sizes="100vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/18 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-[0.14em] text-slate-200">סיפור הצלחה</p>
                <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-6xl">{project.title}</h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg">{project.shortDescription}</p>
              </div>
            </div>

            <div className="space-y-7 p-6 sm:p-8 md:p-10">
              <article
                className="rounded-[var(--radius-soft)] border p-6"
                style={{
                  borderColor: "rgba(79,70,229,0.16)",
                  background: "linear-gradient(135deg, rgba(79,70,229,0.06), rgba(255,255,255,0.76))",
                }}
              >
                <div className="flex items-center gap-2" style={{ color: "#4f46e5" }}>
                  <Sparkles size={18} />
                  <h2 className="text-2xl font-extrabold text-slate-900">במילים פשוטות</h2>
                </div>
                <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">{project.simpleTerms}</p>
              </article>

              <div className="mb-7 flex flex-wrap gap-2.5">
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
                <article className="rounded-[var(--radius-soft)] border border-white/50 bg-white/80 p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                  <div className="flex items-center gap-2">
                    <Target size={18} style={{ color: "#4f46e5" }} />
                    <h2 className="text-2xl font-bold text-slate-900">הבעיה</h2>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{project.problem}</p>
                </article>

                <article className="rounded-[var(--radius-soft)] border border-white/50 bg-white/80 p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                  <h2 className="text-2xl font-bold text-slate-900">התהליך (ב-3 צעדים)</h2>
                  <ul className="mt-4 space-y-3">
                    {project.processPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                        <CheckCircle2 size={18} className="mt-1 shrink-0 text-indigo-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article
                  className="rounded-[var(--radius-soft)] border p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
                  style={{
                    borderColor: "rgba(5,150,105,0.2)",
                    background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(255,255,255,0.82))",
                  }}
                >
                  <h2 className="text-2xl font-bold text-slate-900">הערך העסקי</h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">{project.businessValue}</p>
                </article>

                {project.results.length > 0 ? (
                  <article className="rounded-[var(--radius-soft)] border border-white/50 bg-white/80 p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                    <h2 className="text-2xl font-bold text-slate-900">תוצאות בפועל</h2>
                    <ul className="mt-4 space-y-2">
                      {project.results.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-base text-slate-600">
                          <CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {project.metrics && project.metrics.length > 0 ? (
                      <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.metrics.map((m) => (
                          <div key={m.label} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                            <dt className="text-xs font-semibold text-slate-500">{m.label}</dt>
                            <dd className="text-sm font-bold text-slate-900 mt-1">{m.value}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </article>
                ) : null}

                {project.clientQuote ? (
                  <blockquote className="rounded-[var(--radius-soft)] border border-indigo-100 bg-indigo-50/50 px-6 py-5 text-base italic text-slate-700 leading-relaxed">
                    &ldquo;{project.clientQuote}&rdquo;
                  </blockquote>
                ) : null}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={relatedPillar.path}
                    className="text-sm font-semibold text-indigo-600 hover:underline"
                  >
                    לשירות {relatedPillar.title}
                  </Link>
                  <Link href="/#contact" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                    קובעים שיחת התאמה
                  </Link>
                </div>
              </div>
            </div>
          </header>
        </section>
      </PageEnter>
    </div>
  );
}
