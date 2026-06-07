"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useHydrated } from "@/hooks/useHydrated";
import { SPRING_SNAPPY } from "@/lib/motion";

type PillarCardProps = {
  href: string;
  title: string;
  tagline: string;
  icon: LucideIcon;
  /** RGB components e.g. "59, 130, 246" */
  accentRgb?: string;
  /** RGB components e.g. "109, 40, 217" */
  accentSecondaryRgb?: string;
  className?: string;
  /** Enable magnetic pull on homepage pillar grid */
  magnetic?: boolean;
};

export default function PillarCard({
  href,
  title,
  tagline,
  icon: Icon,
  accentRgb = "59, 130, 246",
  accentSecondaryRgb = "109, 40, 217",
  className = "",
  magnetic = false,
}: PillarCardProps) {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const enableMagnetic = magnetic && hydrated && reduce !== true;

  const { ref, x, y, handlers, disabled: magneticOff } = useMagnetic<HTMLDivElement>({
    strength: 0.38,
    radius: 160,
    maxOffset: 14,
    falloff: 2,
    disabled: !enableMagnetic,
  });

  const card = (
    <Link
      href={href}
      dir="rtl"
      data-cursor-hover
      className={[
        "group relative flex aspect-square flex-col justify-between",
        "glass-panel rounded-[var(--radius)] border border-white/10 backdrop-blur-md p-5 sm:p-6",
        "transition-[box-shadow,border-color] duration-300 ease-out",
        "hover:border-white/20",
        "hover:shadow-[0_20px_48px_-14px_rgba(59,130,246,0.35)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background: `linear-gradient(155deg, rgba(${accentRgb}, 0.16) 0%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,0.02) 100%)`,
      }}
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-soft)] border border-white/10 transition-all duration-300 group-hover:border-white/25 group-hover:scale-105"
        style={{
          background: `linear-gradient(135deg, rgba(${accentRgb}, 0.22), rgba(${accentSecondaryRgb}, 0.14))`,
        }}
      >
        <Icon className="h-5 w-5 text-slate-100" strokeWidth={2} aria-hidden />
      </div>

      <div className="mt-auto pt-6">
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-100 leading-snug tracking-tight transition-colors group-hover:text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-2 group-hover:text-slate-300 transition-colors">
          {tagline}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 transition-colors group-hover:text-white">
          לפרטים
          <ArrowLeft
            className="h-3.5 w-3.5 scale-x-[-1] transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden
          />
        </span>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[var(--radius)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at 50% 50%, rgba(${accentRgb}, 0.12), transparent 55%)`,
        }}
      />
    </Link>
  );

  if (!enableMagnetic || magneticOff) {
    return card;
  }

  return (
    <motion.div
      ref={ref}
      className="h-full w-full"
      style={{ x, y }}
      {...handlers}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", ...SPRING_SNAPPY }}
    >
      {card}
    </motion.div>
  );
}
