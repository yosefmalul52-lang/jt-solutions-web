"use client";

import { useEffect, useState } from "react";

type NavSection = {
  id: string;
  title: string;
};

type PillarSectionNavProps = {
  sections: NavSection[];
};

export default function PillarSectionNav({ sections }: PillarSectionNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-40% 0px -45% 0px", threshold: 0.1 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return (
    <nav
      aria-label="ניווט בין שירותי העמוד"
      className="sticky top-[calc(74px+0.75rem)] sm:top-[calc(84px+1rem)] z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 backdrop-blur-md border-y border-slate-200 bg-white/90"
    >
      <div className="max-w-6xl mx-auto overflow-x-auto" dir="rtl">
        <ul className="flex items-center gap-2 min-w-max">
          {sections.map(({ id, title }) => {
            const active = activeId === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`inline-flex items-center rounded-[var(--radius-soft)] px-3.5 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                    active
                      ? "bg-sky-50 text-slate-900 border border-sky-200"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  {title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
