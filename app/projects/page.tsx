import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LightPageShell from "@/components/layout/LightPageShell";
import PremiumReveal from "@/components/motion/PremiumReveal";
import ScribbleUnderline from "@/components/motion/ScribbleUnderline";
import ProjectHubCard from "@/components/projects/ProjectHubCard";
import JsonLd from "@/components/seo/JsonLd";
import CtaButton from "@/components/ui/CtaButton";
import { projects } from "@/lib/projects";
import {
  projectsPageCta,
  projectsPageHero,
  projectsTrustBlock,
} from "@/lib/projects-page";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getProjectsCollectionPageJsonLd } from "@/lib/seo/projects-collection";

export const metadata: Metadata = createPageMetadata({
  title: "עבודות נבחרות ואתרים שנבנו לעסקים",
  description:
    "פרויקטים לדוגמה של JT Solutions: אתרים, דפי נחיתה, אוטומציות ותשתיות דיגיטליות שמסדרות פניות, מדידה וניהול.",
  path: "/projects",
  keywords: ["תיק עבודות", "פרויקטים דיגיטל", "case study", "תשתית דיגיטלית"],
});

export default function ProjectsHubPage() {
  return (
    <>
      <JsonLd data={getProjectsCollectionPageJsonLd()} />
      <Navbar />
      <LightPageShell>
        <main className="flex-1 overflow-x-hidden">
          <section className="studio-service-hero-zone relative section-shell pt-28 pb-10 sm:pt-32 md:pt-40 md:pb-16">
            <div className="studio-service-hero-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
            <div className="page-hero-mesh" aria-hidden />
            <PremiumReveal as="div" className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8" variant="rise">
              <div dir="rtl">
                <span className="home-badge mb-6 inline-flex">{projectsPageHero.badge}</span>
                <h1 className="home-headline mx-auto max-w-4xl">{projectsPageHero.title}</h1>
                <ScribbleUnderline color="#06B6D4" className="scribble-underline--inline mt-4" />
                <p className="home-subline mx-auto mt-6 max-w-2xl sm:mt-8">{projectsPageHero.subtitle}</p>
              </div>
            </PremiumReveal>
          </section>

          <section className="home-section pb-16 md:pb-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" dir="rtl">
              <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                {projects.map((project, index) => (
                  <li key={project.id}>
                    <PremiumReveal as="div" className="h-full" variant="rise" delay={0.04 + index * 0.06}>
                      <ProjectHubCard project={project} />
                    </PremiumReveal>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="home-section home-section--alt pb-24 md:pb-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" dir="rtl">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="home-headline">{projectsTrustBlock.title}</h2>
              </div>

              <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
                {projectsTrustBlock.cards.map((card, index) => (
                  <li key={card.id}>
                    <PremiumReveal as="div" className="home-card home-card--interactive h-full p-6" variant="rise" delay={0.04 + index * 0.05}>
                      <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.text}</p>
                    </PremiumReveal>
                  </li>
                ))}
              </ul>

              <div className="home-card home-card--featured mt-14 p-8 text-center sm:p-10">
                <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">{projectsPageCta.title}</h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  {projectsPageCta.text}
                </p>
                <CtaButton
                  href={projectsPageCta.href}
                  ctaLocation="projects-hub"
                  className="mt-6"
                  shine="auto"
                >
                  {projectsPageCta.label}
                </CtaButton>
              </div>
            </div>
          </section>
        </main>
      </LightPageShell>
      <Footer />
    </>
  );
}
