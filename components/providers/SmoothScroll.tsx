"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import "lenis/dist/lenis.css";

const LENIS_OPTIONS = {
  autoRaf: true,
  anchors: true,
  lerp: 0.09,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.1,
  smoothWheel: true,
} as const;

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      setEnabled(false);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const narrow = window.matchMedia("(max-width: 900px)");
    const sync = () => {
      // Native touch scroll feels better and costs less than Lenis on phones/tablets.
      setEnabled(!reduceMotion.matches && !coarse.matches && !narrow.matches);
    };
    sync();
    reduceMotion.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    narrow.addEventListener("change", sync);
    return () => {
      reduceMotion.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
      narrow.removeEventListener("change", sync);
    };
  }, [pathname]);

  if (!enabled) return children;

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      {children}
    </ReactLenis>
  );
}
