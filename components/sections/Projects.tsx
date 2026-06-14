"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { homeProjectCards } from "@/lib/home-projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden py-16 md:py-24 lg:py-32 section-shell"
      style={{ background: "linear-gradient(180deg, #F9FAFB 0%, #F3F7FD 50%, #F9FAFB 100%)" }}
    >
      <div aria-hidden className="section-blob-layer overflow-hidden">
        <div
          className="absolute right-[9%] top-14 h-36 w-36 rounded-full"
          style={{ background: "rgba(37,99,235,0.19)", filter: "blur(34px)" }}
        />
        <div
          className="absolute left-[7%] bottom-10 h-32 w-32 rounded-full"
          style={{ background: "rgba(30,64,175,0.16)", filter: "blur(30px)" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 md:mb-14 text-center" viewportKey="section" y={22} duration={0.62}>
          <h2 className="premium-title mt-1">
            פרויקטים שמייצרים{" "}
            <span className="gradient-text">צמיחה אמיתית</span>
          </h2>
          <p className="premium-subtitle mx-auto mt-3 max-w-2xl">
            מה בנינו בפועל — תוצאות עסקיות, לא רק עיצוב. כל כרטיס מוביל לסיפור הפרויקט המלא.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6" dir="rtl">
          {homeProjectCards.map((project, index) => (
            <Reveal key={project.id} viewportKey="section" y={18} duration={0.55} delay={index * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-white/50 bg-white/80 shadow-premium backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.28)]">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-100/80">
                  <Image
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-xs font-semibold tracking-wide text-indigo-600">{project.type}</p>
                  <h3 className="mt-2 text-lg font-extrabold text-slate-900">{project.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{project.resultLine}</p>

                  <Link
                    href={`/projects/${project.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
                  >
                    <span>קראו את הפרויקט</span>
                    <ArrowLeft size={16} aria-hidden />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
