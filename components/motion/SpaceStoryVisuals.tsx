"use client";

import type { RefObject } from "react";
import { useId } from "react";
import Starfield from "@/components/motion/Starfield";

type SpaceStoryVisualsProps = {
  nebulaRef: RefObject<HTMLDivElement | null>;
  planetRef: RefObject<HTMLDivElement | null>;
  astronautRef: RefObject<HTMLDivElement | null>;
  shipRef: RefObject<HTMLDivElement | null>;
  warpRef: RefObject<HTMLDivElement | null>;
  starsNearRef: RefObject<HTMLDivElement | null>;
};

function AstronautSvg() {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full drop-shadow-[0_0_24px_rgba(147,197,253,0.35)]"
      aria-hidden
    >
      <ellipse cx="60" cy="118" rx="28" ry="34" fill="#E2E8F0" opacity="0.95" />
      <rect x="38" y="72" width="44" height="52" rx="10" fill="#F8FAFC" />
      <circle cx="60" cy="52" r="26" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
      <circle cx="60" cy="52" r="18" fill="#0F172A" opacity="0.85" />
      <circle cx="54" cy="48" r="4" fill="#60A5FA" opacity="0.7" />
      <path
        d="M24 88 L38 78 L38 98 Z"
        fill="#94A3B8"
      />
      <path
        d="M96 88 L82 78 L82 98 Z"
        fill="#94A3B8"
      />
      <rect x="46" y="118" width="10" height="28" rx="4" fill="#64748B" />
      <rect x="64" y="118" width="10" height="28" rx="4" fill="#64748B" />
      <path
        d="M48 36 C48 22 72 22 72 36"
        stroke="#94A3B8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line x1="60" y1="10" x2="60" y2="24" stroke="#64748B" strokeWidth="2" />
      <circle cx="60" cy="8" r="3" fill="#60A5FA" />
    </svg>
  );
}

function ShipSvg() {
  const gradId = `shipBody-${useId().replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full drop-shadow-[0_0_32px_rgba(96,165,250,0.45)]"
      aria-hidden
    >
      <path
        d="M100 8 L168 96 H128 L100 72 L72 96 H32 Z"
        fill={`url(#${gradId})`}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
      />
      <path d="M100 72 V108" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <ellipse cx="100" cy="108" rx="18" ry="6" fill="#3B82F6" opacity="0.55" />
      <ellipse cx="100" cy="108" rx="28" ry="10" fill="#60A5FA" opacity="0.25" />
      <circle cx="100" cy="48" r="8" fill="#0F172A" opacity="0.7" stroke="#93C5FD" strokeWidth="1" />
      <defs>
        <linearGradient id={gradId} x1="100" y1="8" x2="100" y2="96" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FAFC" />
          <stop offset="0.5" stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#64748B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function SpaceStoryVisuals({
  nebulaRef,
  planetRef,
  astronautRef,
  shipRef,
  warpRef,
  starsNearRef,
}: SpaceStoryVisualsProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      <div className="absolute inset-0 bg-[#030014]">
        <Starfield />
      </div>

      <div
        ref={starsNearRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.5) 0%, transparent 100%), radial-gradient(1px 1px at 60% 70%, rgba(255,255,255,0.4) 0%, transparent 100%), radial-gradient(1.5px 1.5px at 80% 20%, rgba(147,197,253,0.6) 0%, transparent 100%), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.35) 0%, transparent 100%)",
          backgroundSize: "100% 100%",
        }}
      />

      <div
        ref={nebulaRef}
        className="absolute inset-0 will-change-[transform,opacity]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 40%, rgba(88,28,135,0.22) 0%, transparent 60%), radial-gradient(ellipse 60% 45% at 75% 65%, rgba(37,99,235,0.18) 0%, transparent 55%)",
        }}
      />

      <div
        ref={planetRef}
        className="absolute bottom-[8%] left-[8%] h-32 w-32 sm:h-44 sm:w-44 will-change-transform"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #93C5FD 0%, #3B82F6 35%, #1E3A8A 70%, #0F172A 100%)",
            boxShadow: "0 0 60px rgba(59,130,246,0.35), inset -8px -8px 24px rgba(0,0,0,0.4)",
          }}
        />
        <div
          className="absolute -inset-4 rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
            filter: "blur(12px)",
          }}
        />
      </div>

      <div
        ref={astronautRef}
        className="absolute right-[10%] top-[28%] h-28 w-20 sm:right-[14%] sm:top-[26%] sm:h-36 sm:w-24 will-change-transform"
      >
        <AstronautSvg />
      </div>

      <div
        ref={shipRef}
        className="absolute left-1/2 top-[12%] h-20 w-32 -translate-x-1/2 sm:h-24 sm:w-40 will-change-transform"
      >
        <ShipSvg />
      </div>

      <div ref={warpRef} className="absolute inset-0 opacity-0 will-change-[opacity,transform]">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-1/2 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
            style={{
              left: `${8 + i * 7}%`,
              width: `${14 + (i % 4) * 6}%`,
              transform: `rotate(${(i - 6) * 3}deg)`,
              opacity: 0.15 + (i % 3) * 0.12,
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,0,20,0.5) 0%, transparent 30%, transparent 70%, rgba(3,0,20,0.45) 100%)",
        }}
      />
    </div>
  );
}
