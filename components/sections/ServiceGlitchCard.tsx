import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { PillarConfig } from "@/lib/pillars";
import { getServiceCardImage } from "@/lib/service-card-media";

type ServiceGlitchCardProps = {
  pillar: PillarConfig;
};

export default function ServiceGlitchCard({ pillar }: ServiceGlitchCardProps) {
  const Icon = pillar.icon as LucideIcon;
  const { src, objectPosition } = getServiceCardImage(pillar.slug);

  return (
    <Link
      href={pillar.path}
      className="service-glitch-card group relative flex min-h-[380px] flex-1 flex-col overflow-hidden bg-black transition-[flex-grow,min-height] duration-500 ease-out sm:min-h-[420px] lg:min-h-0 lg:hover:flex-[2.15] lg:hover:min-h-0"
      aria-label={`${pillar.title} — ${pillar.tagline}`}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="service-glitch-card__base absolute inset-0 h-full w-full object-cover brightness-[0.97] contrast-[1.04] saturate-[1.02]"
          style={{ objectPosition }}
          decoding="async"
          draggable={false}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="service-glitch-card__shift-r absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition }}
          decoding="async"
          draggable={false}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="service-glitch-card__shift-b absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition }}
          decoding="async"
          draggable={false}
        />
      </div>

      <div className="service-glitch-card__scanlines pointer-events-none absolute inset-0" aria-hidden />
      <div className="service-glitch-card__noise pointer-events-none absolute inset-0" aria-hidden />

      <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/8" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/75 via-black/30 to-transparent"
        aria-hidden
      />

      <div
        className="service-glitch-card__glow pointer-events-none absolute inset-x-0 bottom-0 h-[55%] translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(to top, rgba(${pillar.accentRgb}, 0.92) 0%, rgba(${pillar.accentRgb}, 0.55) 38%, rgba(${pillar.accentRgb}, 0.12) 68%, transparent 100%)`,
        }}
        aria-hidden
      />

      <div className="relative z-10 mt-auto p-5 sm:p-6">
        <Icon className="mb-3 h-7 w-7 text-white/95" strokeWidth={1.35} aria-hidden />
        <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">{pillar.title}</h3>
        <p className="service-glitch-card__desc mt-3 text-sm leading-relaxed text-white/95 sm:text-[15px]">
          {pillar.heroDescription}
        </p>
      </div>
    </Link>
  );
}
