"use client";

import { heroCopy, heroTrustLogos } from "@/lib/hero-content";
import { trackCtaClick } from "@/lib/analytics/track";

type HomeHeroSceneProps = {
  onScrollToContact?: () => void;
};

export default function HomeHeroScene({ onScrollToContact }: HomeHeroSceneProps) {
  const scrollToContact =
    onScrollToContact ??
    (() => {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    });

  return (
    <>
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-40 pt-24 sm:px-10 sm:pb-44 sm:pt-28 lg:px-14">
        <div
          className="flex w-full max-w-3xl flex-col items-center text-center sm:max-w-4xl"
          dir="rtl"
        >
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.32em] text-blue-300/70">
            פרק א׳ · שיגור
          </p>

          <h1 className="hero-ref-title mx-auto w-full max-w-3xl">
            <span className="block text-white/95">{heroCopy.h1Line1}</span>
            <span className="hero-ref-accent mt-2 block sm:mt-3">{heroCopy.h1Line2}</span>
          </h1>

          <p className="mt-8 max-w-xl text-sm font-normal leading-[1.85] text-neutral-400 sm:mt-10 sm:max-w-2xl sm:text-base">
            {heroCopy.subline}
          </p>

          <button
            id="hero-main-cta"
            type="button"
            data-cursor-hover
            className="hero-pill-cta mt-10 sm:mt-12"
            onClick={() => {
              trackCtaClick("hero", heroCopy.ctaLabel);
              scrollToContact();
            }}
          >
            {heroCopy.ctaLabel}
          </button>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-[max(1.75rem,env(safe-area-inset-bottom))] z-10 px-8 sm:bottom-8"
        dir="ltr"
        aria-label="לקוחות ושותפים"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:gap-x-14">
          {heroTrustLogos.map((logo) => (
            <span
              key={logo.id}
              className="select-none text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400/35"
            >
              {logo.label}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
