"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
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
  zIndex: number;
};

const DESKTOP_SLOTS: Record<number, SlotStyle> = {
  0: { x: 0, y: 0, z: 140, scale: 1, rotateZ: 0, rotateY: 0, opacity: 1, zIndex: 30 },
  [-1]: { x: -380, y: 28, z: 10, scale: 0.85, rotateZ: -3, rotateY: 4, opacity: 0.76, zIndex: 20 },
  1: { x: 380, y: 28, z: 10, scale: 0.85, rotateZ: 3, rotateY: -4, opacity: 0.76, zIndex: 20 },
  [-2]: { x: -590, y: 70, z: -80, scale: 0.72, rotateZ: -4, rotateY: 6, opacity: 0.46, zIndex: 10 },
  2: { x: 590, y: 70, z: -80, scale: 0.72, rotateZ: 4, rotateY: -6, opacity: 0.46, zIndex: 10 },
  [-3]: { x: -700, y: 105, z: -170, scale: 0.55, rotateZ: -5, rotateY: 10, opacity: 0.16, zIndex: 5 },
  3: { x: 700, y: 105, z: -170, scale: 0.55, rotateZ: 5, rotateY: -10, opacity: 0.16, zIndex: 5 },
};

const MOBILE_SLOTS: Record<number, SlotStyle> = {
  0: { x: 0, y: 0, z: 90, scale: 1, rotateZ: 0, rotateY: 0, opacity: 1, zIndex: 30 },
  [-1]: { x: -68, y: 10, z: -20, scale: 0.9, rotateZ: 0, rotateY: 0, opacity: 0.48, zIndex: 20 },
  1: { x: 68, y: 10, z: -20, scale: 0.9, rotateZ: 0, rotateY: 0, opacity: 0.48, zIndex: 20 },
};

function getOffset(index: number, activeIndex: number, length: number) {
  let offset = index - activeIndex;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

function getSlotForOffset(offset: number, mobile: boolean): SlotStyle | null {
  const maxOffset = mobile ? 1 : 3;
  if (Math.abs(offset) > maxOffset) return null;
  const slots = mobile ? MOBILE_SLOTS : DESKTOP_SLOTS;
  return slots[offset] ?? null;
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
      transform: "translate3d(0, 16px, 0) scale(0.9)",
      zIndex: 0,
    };
  }

  return {
    transform: `translate3d(${slot.x}px, ${slot.y}px, ${slot.z}px) rotateY(${slot.rotateY}deg) rotateZ(${slot.rotateZ}deg) scale(${slot.scale})`,
    opacity: slot.opacity,
    zIndex: slot.zIndex,
    pointerEvents: Math.abs(offset) <= 2 ? "auto" : "none",
  };
}

function ProjectImageCard({ project, priority }: { project: CurvedPortfolioProject; priority?: boolean }) {
  if (!project.imageSrc) {
    return (
      <div className={`portfolio-image-wrap ${project.mockupClass}`} aria-hidden>
        <div className="mockup-ui" />
      </div>
    );
  }

  return (
    <div className="portfolio-image-wrap">
      <Image
        src={project.imageSrc}
        alt={`צילום מסך — ${project.title}`}
        fill
        quality={100}
        sizes="(max-width: 768px) 92vw, (max-width: 1200px) 76vw, 1100px"
        className="portfolio-image"
        priority={priority}
      />
    </div>
  );
}

function PortfolioScreen({
  project,
  active,
  style,
  onActivate,
  priority,
}: {
  project: CurvedPortfolioProject;
  active: boolean;
  style: CSSProperties;
  onActivate: () => void;
  priority?: boolean;
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
      aria-hidden={!active && Number(style.opacity) < 0.45}
      aria-label={`${project.title} — ${project.type}`}
    >
      <ProjectImageCard project={project} priority={priority} />
    </article>
  );
}

function StaticFallback({ projects }: { projects: CurvedPortfolioProject[] }) {
  return (
    <div className="portfolio-curve-fallback" dir="rtl">
      {projects.map((project, index) => (
        <article key={project.id} className="portfolio-curve-fallback__item">
          <ProjectImageCard project={project} priority={index === 0} />
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
          before="פרוייקטים שנראים מצויין ויותר חשוב "
          accent="מביאים פניות"
          after="!"
          accentColor="#2563EB"
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
              {projects.map((project, index) => (
                <PortfolioScreen
                  key={project.id}
                  project={project}
                  active={isActive(index)}
                  style={cardStyles[index]}
                  onActivate={() => setActiveIndex(index)}
                  priority={index === 0}
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
        </>
      )}
    </section>
  );
}
