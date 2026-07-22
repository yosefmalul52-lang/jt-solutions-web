"use client";

import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import SectionHeader from "@/components/ui/SectionHeader";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useHydrated } from "@/hooks/useHydrated";
import {
  curvedPortfolioProjects,
  type CurvedPortfolioProject,
} from "@/lib/curved-portfolio-projects";
import { cn } from "@/lib/utils";

import "./curved-portfolio-carousel.css";

function ProjectSlideImage({
  project,
  priority,
}: {
  project: CurvedPortfolioProject;
  priority?: boolean;
}) {
  if (!project.imageSrc) {
    return (
      <div className={`portfolio-image-wrap ${project.mockupClass}`} aria-hidden>
        <div className="mockup-ui" />
      </div>
    );
  }

  const width = project.imageWidth ?? 1920;
  const height = project.imageHeight ?? 1080;

  return (
    <Image
      src={project.imageSrc}
      alt={`צילום מסך — ${project.title}`}
      width={width}
      height={height}
      sizes="(max-width: 768px) 80vw, (max-width: 1280px) 60vw, 720px"
      className="h-auto w-full"
      priority={priority}
      loading={priority ? "eager" : "lazy"}
    />
  );
}

function StaticFallback({ projects }: { projects: CurvedPortfolioProject[] }) {
  return (
    <div className="portfolio-curve-fallback" dir="rtl">
      {projects.map((project, index) => (
        <article key={project.id} className="portfolio-curve-fallback__item">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <ProjectSlideImage project={project} priority={index === 0} />
          </div>
          <p className="mt-3 text-center text-sm font-semibold text-slate-700">
            {project.title}
            <span className="mt-0.5 block text-xs font-medium text-slate-500">{project.type}</span>
          </p>
        </article>
      ))}
    </div>
  );
}

function ProjectsEmblaCarousel({
  projects,
  autoplay = true,
  loop = true,
}: {
  projects: CurvedPortfolioProject[];
  autoplay?: boolean;
  loop?: boolean;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className="portfolio-embla w-full"
      opts={{
        loop,
        align: "center",
        direction: "rtl",
        slidesToScroll: 1,
      }}
      plugins={
        autoplay && reduceMotion !== true
          ? [
              Autoplay({
                delay: 3200,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]
          : []
      }
    >
      <CarouselContent className="portfolio-embla__track ms-0 flex items-start">
        {projects.map((project, index) => {
          const isActive = current === index;

          return (
            <CarouselItem
              key={project.id}
              className="relative basis-[80%] ps-0 -me-4 sm:basis-[72%] sm:-me-6 md:basis-[64%] md:-me-8 lg:basis-[58%] lg:-me-10 xl:basis-[54%] xl:-me-12"
            >
              <motion.div
                initial={false}
                animate={{
                  clipPath: isActive
                    ? "inset(0% 0% 0% 0% round 1rem)"
                    : "inset(12% 0% 12% 0% round 0.375rem)",
                  borderRadius: isActive ? "1rem" : "0.375rem",
                  scale: isActive ? 1 : 0.78,
                  opacity: isActive ? 1 : 0.62,
                }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "w-full origin-center overflow-hidden bg-white",
                  isActive ? "z-10" : "z-0",
                )}
              >
                <Link
                  href={project.href}
                  className={cn(
                    "relative block w-full overflow-hidden border bg-white transition-[box-shadow,border-radius] duration-700",
                    isActive
                      ? "rounded-2xl border-slate-200 shadow-[0_28px_64px_rgba(15,23,42,0.18)]"
                      : "rounded-md border-slate-200/80 shadow-[0_8px_24px_rgba(15,23,42,0.06)]",
                  )}
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`${project.title} — ${project.type}`}
                  onClick={(event) => {
                    if (!isActive) {
                      event.preventDefault();
                      api?.scrollTo(index);
                    }
                  }}
                >
                  <ProjectSlideImage project={project} priority={index === 0} />
                </Link>
              </motion.div>

              <div className="mt-5 flex h-16 flex-col items-center justify-start px-2 text-center sm:mt-6 sm:h-[4.5rem]">
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key={project.id}
                      initial={
                        reduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, filter: "blur(8px)" }
                      }
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)" }}
                      transition={{ duration: 0.55 }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                        {project.title}
                      </span>
                      <span className="mt-1 text-sm font-semibold text-slate-500 sm:text-base">
                        {project.type}
                      </span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <div className="mt-12 flex w-full items-center justify-between gap-4 px-4 sm:mt-14 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-label="הפרויקט הבא"
          onClick={() => api?.scrollNext()}
          className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden />
        </button>

        <div className="flex items-center justify-center gap-2.5" role="tablist" aria-label="בחירת פרויקט">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={current === index}
              aria-label={`מעבר ל${project.title}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2.5 cursor-pointer rounded-full transition-all duration-300",
                current === index ? "w-8 bg-slate-900" : "w-2.5 bg-slate-300 hover:bg-slate-400",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="הפרויקט הקודם"
          onClick={() => api?.scrollPrev()}
          className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
        >
          <ChevronRight className="h-6 w-6" aria-hidden />
        </button>
      </div>
    </Carousel>
  );
}

export default function CurvedPortfolioCarousel() {
  const projects = curvedPortfolioProjects;
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();

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
          before="פרוייקטים שנראים מצויין ויותר חשוב "
          accent="מביאים פניות"
          after="!"
          accentColor="#2563EB"
          subline="אתרים, דפי נחיתה ומערכות שעובדים בשביל העסק — לא רק נראים טוב."
        />
      </div>

      <div className="portfolio-carousel-bleed relative z-10 w-full max-w-none">
        {!hydrated || reduceMotion === true ? (
          <StaticFallback projects={projects} />
        ) : (
          <ProjectsEmblaCarousel projects={projects} autoplay loop />
        )}
      </div>
    </section>
  );
}
