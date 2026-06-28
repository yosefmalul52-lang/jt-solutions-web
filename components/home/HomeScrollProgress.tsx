"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";
import { scrollToHash } from "@/lib/scroll";

const STEPS = [
  { id: "problem", label: "הבעיה", color: "#EF4444" },
  { id: "solution", label: "הפתרון", color: "#2563EB" },
  { id: "projects", label: "עבודות", color: "#7C3AED" },
  { id: "contact", label: "אבחון", color: "#2563EB" },
] as const;

export default function HomeScrollProgress() {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [activeId, setActiveId] = useState<string>(STEPS[0].id);

  useEffect(() => {
    if (!hydrated) return;

    const observers: IntersectionObserver[] = [];
    STEPS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [hydrated]);

  return (
    <>
      {hydrated && !reduce ? (
        <>
          <motion.div className="home-scroll-bar" style={{ scaleX }} aria-hidden />
          <div className="home-thread" aria-hidden>
            <motion.div className="home-thread__fill" style={{ height: "100%", scaleY: scaleX }} />
          </div>
        </>
      ) : null}

      <nav className="home-side-nav" aria-label="התקדמות בעמוד" dir="rtl">
        {STEPS.map(({ id, label, color }) => {
          const active = activeId === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(event) => {
                event.preventDefault();
                scrollToHash(`#${id}`);
              }}
              className={`home-side-nav__item ${active ? "home-side-nav__item--active" : ""}`}
            >
              <span
                className="home-side-nav__dot"
                style={active ? { background: color, borderColor: color } : undefined}
                aria-hidden
              />
              <span className="home-side-nav__label">{label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
