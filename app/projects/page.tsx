import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { projects } from "@/lib/projects";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getProjectsCollectionPageJsonLd } from "@/lib/seo/projects-collection";
import { servicePages } from "@/lib/seo/services";

export const metadata: Metadata = createPageMetadata({
  title: "תיק עבודות - פרויקטים נבחרים",
  description:
    "פרויקטים נבחרים של JT Solutions: חנות איקומרס, מיתוג ודפי נחיתה, ואוטומציה עסקית — תוצאות אמיתיות לפני ואחרי.",
  path: "/projects",
  keywords: ["תיק עבודות", "פרויקטים דיגיטל", "case study", "בניית אתרים"],
});

const glassCardStyle = {
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(15,23,42,0.1)",
  boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
} as const;

export default function ProjectsHubPage() {
  return (
    <>
      <JsonLd data={getProjectsCollectionPageJsonLd()} />
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative overflow-hidden section-shell pt-32 pb-16 md:pt-40 md:pb-24"
          style={{
            background: "linear-gradient(180deg, #F9FAFB 0%, #F3F6FF 48%, #F9FAFB 100%)",
          }}
        >
          <div aria-hidden className="section-blob-layer overflow-hidden">
            <div
              className="absolute top-[6%] right-[6%] h-56 w-56 rounded-full"
              style={{ background: "rgba(124,58,237,0.22)", filter: "blur(48px)" }}
            />
            <div
              className="absolute bottom-[8%] left-[4%] h-64 w-64 rounded-full"
              style={{ background: "rgba(16,179,231,0.2)", filter: "blur(52px)" }}
            />
            <div
              className="absolute top-[38%] left-[28%] h-40 w-40 rounded-full"
              style={{ background: "rgba(79,70,229,0.14)", filter: "blur(40px)" }}
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center" dir="rtl">
            <span
              className="inline-flex p-[1px] rounded-full mb-6"
              style={{ background: "var(--gradient-cta)" }}
            >
              <span
                className="inline-flex px-4 py-1.5 rounded-full text-xs font-semibold text-slate-700"
                style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}
              >
                Portfolio · JT Solutions
              </span>
            </span>
            <h1 className="display-title max-w-4xl mx-auto">
              <span className="gradient-text">הפרויקטים</span> שלנו
            </h1>
            <p className="premium-subtitle max-w-2xl mx-auto mt-6 sm:mt-8">
              מיתוג, אתרים, איקומרס ואוטומציה — כל פרויקט נבנה סביב תוצאה עסקית מדידה, לא רק עיצוב יפה.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section
          className="relative pb-24 md:pb-32 section-shell"
          style={{ background: "linear-gradient(180deg, #F9FAFB 0%, #F2F5FB 100%)" }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {projects.map((project) => {
                const service = servicePages[project.relatedServiceSlug];
                const caseStudyHref = `/projects/${project.id}`;

                return (
                  <li key={project.id}>
                    <article
                      className="flex h-full flex-col overflow-hidden rounded-[var(--radius)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(15,23,42,0.12)]"
                      style={glassCardStyle}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/50">
                        <Image
                          src={project.image.src}
                          alt={project.image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          quality={75}
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent" />
                        <span
                          className="absolute top-3 right-3 rounded-full px-3 py-1 text-[11px] font-semibold text-slate-800"
                          style={{
                            background: "rgba(255,255,255,0.88)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.5)",
                          }}
                        >
                          {service.serviceName}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">{project.title}</h2>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                          {project.shortDescription}
                        </p>

                        {project.metrics?.[0] ? (
                          <div
                            className="mt-4 flex items-center justify-between gap-2 rounded-[var(--radius-soft)] px-3 py-2 text-xs"
                            style={{
                              background: "rgba(16,185,129,0.08)",
                              border: "1px solid rgba(16,185,129,0.18)",
                            }}
                          >
                            <span className="font-medium text-slate-600">{project.metrics[0].label}</span>
                            <span className="font-bold text-emerald-700">{project.metrics[0].value}</span>
                          </div>
                        ) : null}

                        <Link
                          href={caseStudyHref}
                          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-soft)] px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-95"
                          style={{
                            background: "linear-gradient(120deg, #10b3e7, #7c3aed)",
                            boxShadow: "0 10px 24px rgba(79,70,229,0.28)",
                          }}
                        >
                          לצפייה בפרויקט
                          <ArrowLeft size={16} aria-hidden />
                        </Link>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>

            <div
              className="mt-14 rounded-[var(--radius)] p-8 sm:p-10 text-center"
              style={{
                ...glassCardStyle,
                background: "rgba(255,255,255,0.8)",
              }}
            >
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">רוצים פרויקט כזה לעסק שלכם?</h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                נבנה יחד מעטפת דיגיטלית שמייצרת פניות — מאפיון ועד השקה ומדידה.
              </p>
              <Link
                href="/#contact"
                className="mt-6 inline-flex items-center justify-center rounded-[var(--radius-soft)] border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-indigo-200 hover:text-indigo-700"
              >
                קובעים שיחת התאמה
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
