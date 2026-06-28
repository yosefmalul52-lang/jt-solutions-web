"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";
import type { HomeProjectCard } from "@/lib/home-projects";

const ACCENTS = ["#2563EB", "#06B6D4", "#7C3AED"] as const;

function ProjectCard({
  project,
  accent,
  active,
}: {
  project: HomeProjectCard;
  accent: string;
  active: boolean;
}) {
  return (
    <article className="flex h-full flex-col" dir="rtl">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-slate-200">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 1024px) 90vw, 40rem"
          loading="lazy"
          className="object-cover"
        />
        <span
          className="absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold text-white"
          style={{ background: accent }}
        >
          {project.businessType}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">{project.name}</h3>
          {project.serviceTag ? (
            <span
              className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold"
              style={{ background: `color-mix(in srgb, ${accent} 12%, #fff)`, color: accent }}
            >
              {project.serviceTag}
            </span>
          ) : null}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-[var(--radius-soft)] border border-rose-100 bg-rose-50/60 p-3">
            <p className="text-xs font-bold text-rose-700">הבעיה</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">{project.problem}</p>
          </div>
          <div className="rounded-[var(--radius-soft)] border border-emerald-100 bg-emerald-50/60 p-3">
            <p className="text-xs font-bold text-emerald-700">תוצאה תפעולית</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">{project.operationalResult}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          <span className="font-semibold text-slate-500">מה נבנה: </span>
          {project.built}
        </p>

        <Link
          href={`/projects/${project.id}`}
          tabIndex={active ? 0 : -1}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          style={{ color: accent }}
        >
          <span>לצפייה בפרויקט</span>
          <ArrowLeft size={16} aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export default function ProjectShowcaseCarousel({ projects }: { projects: HomeProjectCard[] }) {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const n = projects.length;
  const [index, setIndex] = useState(0);
  const regionRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + n) % n),
    [n],
  );

  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        go(-1);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [go]);

  const useCoverflow = hydrated && reduce !== true && n > 1;

  const fallback = (
    <ul className="orbit-fallback" dir="rtl">
      {projects.map((project, i) => (
        <li key={project.id} className="home-card overflow-hidden">
          <ProjectCard project={project} accent={ACCENTS[i % ACCENTS.length]} active />
        </li>
      ))}
    </ul>
  );

  if (!useCoverflow) return fallback;

  const posFor = (i: number): "center" | "left" | "right" | "hidden" => {
    if (i === index) return "center";
    if (i === (index + 1) % n) return "left";
    if (i === (index - 1 + n) % n) return "right";
    return "hidden";
  };

  return (
    <div className="orbit">
      <div
        ref={regionRef}
        className="hidden lg:block"
        role="group"
        aria-roledescription="קרוסלת פרויקטים"
        aria-label="עבודות נבחרות"
        tabIndex={0}
      >
        <div className="orbit__viewport">
          <div className="orbit__stage">
            {projects.map((project, i) => {
              const pos = posFor(i);
              return (
                <div
                  key={project.id}
                  className="orbit__card"
                  data-pos={pos}
                  aria-hidden={pos !== "center"}
                  style={{ "--accent": ACCENTS[i % ACCENTS.length] } as CSSProperties}
                >
                  <div className="orbit__inner">
                    <ProjectCard
                      project={project}
                      accent={ACCENTS[i % ACCENTS.length]}
                      active={pos === "center"}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-5">
          <button type="button" className="orbit__nav" onClick={() => go(-1)} aria-label="הפרויקט הקודם">
            <ChevronRight size={20} aria-hidden />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="בחירת פרויקט">
            {projects.map((project, i) => (
              <button
                key={project.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`מעבר ל${project.name}`}
                className={`orbit__dot ${i === index ? "orbit__dot--active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <button type="button" className="orbit__nav" onClick={() => go(1)} aria-label="הפרויקט הבא">
            <ChevronLeft size={20} aria-hidden />
          </button>
        </div>
      </div>

      <div className="lg:hidden">{fallback}</div>
    </div>
  );
}
