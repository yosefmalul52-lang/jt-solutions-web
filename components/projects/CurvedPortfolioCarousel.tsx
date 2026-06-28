"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  curvedPortfolioProjects,
  type CurvedPortfolioProject,
} from "@/lib/curved-portfolio-projects";
import "./curved-portfolio-carousel.css";

type SlotStyle = {
  x: number;
  y: number;
  z: number;
  scale: number;
  rotateZ: number;
  rotateY: number;
  opacity: number;
  blur: number;
};

const DESKTOP_SLOTS: Record<number, SlotStyle> = {
  0: { x: 0, y: -20, z: 180, scale: 1, rotateZ: 0, rotateY: 0, opacity: 1, blur: 0 },
  [-1]: { x: -320, y: 35, z: 40, scale: 0.72, rotateZ: 7, rotateY: 42, opacity: 0.82, blur: 0 },
  1: { x: 320, y: 35, z: 40, scale: 0.72, rotateZ: -7, rotateY: -42, opacity: 0.82, blur: 0 },
  [-2]: { x: -500, y: 120, z: -160, scale: 0.52, rotateZ: 15, rotateY: 58, opacity: 0.45, blur: 0.8 },
  2: { x: 500, y: 120, z: -160, scale: 0.52, rotateZ: -15, rotateY: -58, opacity: 0.45, blur: 0.8 },
  [-3]: { x: -610, y: 205, z: -300, scale: 0.38, rotateZ: 23, rotateY: 68, opacity: 0.16, blur: 1.6 },
  3: { x: 610, y: 205, z: -300, scale: 0.38, rotateZ: -23, rotateY: -68, opacity: 0.16, blur: 1.6 },
};

const MOBILE_SLOTS: Record<number, SlotStyle> = {
  0: { x: 0, y: -8, z: 140, scale: 1, rotateZ: 0, rotateY: 0, opacity: 1, blur: 0 },
  [-1]: { x: -118, y: 28, z: 20, scale: 0.62, rotateZ: 6, rotateY: 38, opacity: 0.42, blur: 0.3 },
  1: { x: 118, y: 28, z: 20, scale: 0.62, rotateZ: -6, rotateY: -38, opacity: 0.42, blur: 0.3 },
};

function getOffset(index: number, activeIndex: number, length: number) {
  let offset = index - activeIndex;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

function getSlotForOffset(offset: number, mobile: boolean): SlotStyle | null {
  if (mobile) {
    if (Math.abs(offset) > 1) return null;
    return MOBILE_SLOTS[offset] ?? null;
  }
  return DESKTOP_SLOTS[offset] ?? null;
}

function getCardStyle(
  index: number,
  activeIndex: number,
  length: number,
  mobile: boolean,
): CSSProperties {
  const offset = getOffset(index, activeIndex, length);
  const slot = getSlotForOffset(offset, mobile);

  if (!slot) {
    return {
      opacity: 0,
      pointerEvents: "none",
      transform: "translate3d(0, 180px, -360px) scale(0.35)",
      zIndex: 0,
    };
  }

  return {
    transform: `translate3d(${slot.x}px, ${slot.y}px, ${slot.z}px) rotateY(${slot.rotateY}deg) rotateZ(${slot.rotateZ}deg) scale(${slot.scale})`,
    opacity: slot.opacity,
    zIndex: 100 - Math.abs(offset),
    filter: slot.blur > 0 ? `blur(${slot.blur}px)` : undefined,
    pointerEvents: Math.abs(offset) <= 3 ? "auto" : "none",
  };
}

function ScreenPreview({ project }: { project: CurvedPortfolioProject }) {
  if (project.imageSrc) {
    return (
      <div className={`screen-preview ${project.mockupClass} screen-preview--image`}>
        <Image
          src={project.imageSrc}
          alt=""
          fill
          sizes="(max-width: 760px) 92vw, 620px"
          className="screen-preview__shot"
        />
        <span className="screen-preview__sheen" aria-hidden />
      </div>
    );
  }

  return (
    <div className={`screen-preview ${project.mockupClass}`} aria-hidden>
      <div className="mockup-ui" />
    </div>
  );
}

function PortfolioScreen({
  project,
  active,
  style,
  onActivate,
}: {
  project: CurvedPortfolioProject;
  active: boolean;
  style: CSSProperties;
  onActivate: () => void;
}) {
  return (
    <article
      className={`portfolio-screen${active ? " is-active" : ""}`}
      style={style}
      onClick={onActivate}
      onKeyDown={(event) => {
        if (!active && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onActivate();
        }
      }}
      tabIndex={active ? 0 : -1}
      aria-hidden={!active && Number(style.opacity) < 0.5}
      aria-label={`${project.title} — ${project.type}`}
    >
      <div className="screen-chrome">
        <div className="screen-dots" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div className="screen-url" aria-hidden />
      </div>
      <ScreenPreview project={project} />
      <div className="screen-overlay">
        <span className="screen-overlay__type">{project.type}</span>
        <strong className="screen-overlay__title">{project.title}</strong>
      </div>
    </article>
  );
}

function ActiveInfoPanel({ project }: { project: CurvedPortfolioProject }) {
  return (
    <div className="curve-info" key={project.id}>
      <span className="curve-info__label">פרויקט נבחר</span>
      <h3 className="curve-info__title">{project.title}</h3>
      <p className="curve-info__desc">{project.description}</p>
      <div className="curve-info__tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <Link href={project.href} className="curve-info__cta" aria-label={`צפייה בפרויקט ${project.title}`}>
        <span>צפייה בפרויקט</span>
        <ArrowLeft size={16} aria-hidden />
      </Link>
    </div>
  );
}

function StaticFallback({ projects }: { projects: CurvedPortfolioProject[] }) {
  return (
    <div className="portfolio-curve-fallback" dir="rtl">
      {projects.map((project) => (
        <article key={project.id} className="portfolio-curve-fallback__item">
          <ActiveInfoPanel project={project} />
        </article>
      ))}
    </div>
  );
}

export default function CurvedPortfolioCarousel() {
  const projects = curvedPortfolioProjects;
  const length = projects.length;
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobile, setMobile] = useState(false);

  const activeProject = projects[activeIndex];

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % length);
  }, [length]);

  const prev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + length) % length);
  }, [length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        prev();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        next();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, prev]);

  const cardStyles = useMemo(
    () => projects.map((_, index) => getCardStyle(index, activeIndex, length, mobile)),
    [projects, activeIndex, length, mobile],
  );

  const isActive = (index: number) => getOffset(index, activeIndex, length) === 0;

  return (
    <section
      id="projects"
      className="portfolio-curve-section home-section--alt"
      dir="rtl"
      aria-labelledby="portfolio-title"
    >
      <div className="portfolio-bg-orb portfolio-bg-orb-one" aria-hidden />
      <div className="portfolio-bg-orb portfolio-bg-orb-two" aria-hidden />

      <div className="portfolio-header">
        <SectionHeader
          titleId="portfolio-title"
          eyebrow="תיק עבודות"
          title="פרויקטים שבנויים להיראות טוב וגם להביא פניות"
          subline="הצצה לעבודות שבנינו לעסקים. אתרים, דפי נחיתה, חנויות ואוטומציות עם מבנה ברור ומטרה עסקית."
        />
      </div>

      {!hydrated || reduceMotion ? (
        <StaticFallback projects={projects} />
      ) : (
        <>
          <div className="curve-shell">
            <button
              className="curve-nav curve-nav-prev"
              type="button"
              aria-label="הפרויקט הקודם"
              onClick={prev}
            >
              ‹
            </button>

            <div
              className="curve-stage"
              aria-live="polite"
              role="region"
              aria-label="גלריית תצוגות פרויקטים"
            >
              <div className="curve-stage__spotlight" aria-hidden />
              {projects.map((project, index) => (
                <PortfolioScreen
                  key={project.id}
                  project={project}
                  active={isActive(index)}
                  style={cardStyles[index]}
                  onActivate={() => setActiveIndex(index)}
                />
              ))}
            </div>

            <button
              className="curve-nav curve-nav-next"
              type="button"
              aria-label="הפרויקט הבא"
              onClick={next}
            >
              ›
            </button>
          </div>

          <div className="curve-dots" role="tablist" aria-label="בחירת פרויקט">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                role="tab"
                className={`curve-dot${index === activeIndex ? " is-active" : ""}`}
                aria-selected={index === activeIndex}
                aria-label={`מעבר ל${project.title}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          <ActiveInfoPanel project={activeProject} />
        </>
      )}
    </section>
  );
}
