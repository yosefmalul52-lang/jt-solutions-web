"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SectionShell from "@/components/ui/SectionShell";
import { projects, type ProjectItem } from "@/lib/projects";

type MosaicCell = { id: string; wide?: boolean };

/** 4 rows — alternating small|small|wide ↔ wide|small|small (reference mosaic) */
const MOSAIC_ROWS: MosaicCell[][] = [
  [{ id: "eb-hair" }, { id: "ai-automation" }, { id: "magadim", wide: true }],
  [{ id: "magadim", wide: true }, { id: "eb-hair" }, { id: "ai-automation" }],
  [{ id: "ai-automation" }, { id: "magadim" }, { id: "eb-hair", wide: true }],
  [{ id: "eb-hair", wide: true }, { id: "ai-automation" }, { id: "magadim" }],
];

function MosaicTile({ project, wide = false }: { project: ProjectItem; wide?: boolean }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className={`portfolio-mosaic-tile group relative block overflow-hidden bg-neutral-950 ${
        wide ? "portfolio-mosaic-tile--wide" : ""
      }`}
      aria-label={`${project.title} — ${project.shortDescription}`}
    >
      <Image
        src={project.image.src}
        alt={project.image.alt}
        fill
        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
        sizes={wide ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
      />
      <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
      <div
        className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/65 via-black/20 to-transparent"
        aria-hidden
      />
      <span className="absolute bottom-3 right-3 z-10 text-sm font-medium tracking-wide text-white sm:bottom-4 sm:right-4 sm:text-[15px]">
        {project.title}
      </span>
    </Link>
  );
}

function getProject(id: string): ProjectItem | undefined {
  return projects.find((p) => p.id === id);
}

export default function PortfolioBento() {
  return (
    <SectionShell
      id="projects"
      className="py-16 md:py-20"
      style={{ background: "#0a0a0a" }}
    >
      <div className="mb-10 md:mb-12" dir="rtl">
        <h2 className="premium-title text-center">
          פרויקטים <span className="gradient-text">שדברו בעד עצמם</span>
        </h2>
      </div>

      <div className="portfolio-mosaic" dir="ltr">
        {MOSAIC_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="portfolio-mosaic-row">
            {row.map((cell, cellIndex) => {
              const project = getProject(cell.id);
              if (!project) return null;
              return (
                <MosaicTile
                  key={`${rowIndex}-${cellIndex}-${cell.id}`}
                  project={project}
                  wide={cell.wide}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center" dir="rtl">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
        >
          כל הפרויקטים
          <ArrowLeft className="h-4 w-4 scale-x-[-1]" aria-hidden />
        </Link>
      </div>
    </SectionShell>
  );
}
