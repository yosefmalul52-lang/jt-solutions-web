"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { GrainientProps } from "@/components/hero/Grainient";

const Grainient = dynamic(() => import("@/components/hero/Grainient"), {
  ssr: false,
  loading: () => <div className="grainient-container grainient-fallback" aria-hidden />,
});

/**
 * WebGL on capable devices only — including strong phones.
 * CSS fallback covers save-data, slow networks, low memory, and reduced motion.
 */
function shouldEnableGrainient() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };

  if (nav.connection?.saveData) return false;
  if (nav.connection?.effectiveType === "2g" || nav.connection?.effectiveType === "slow-2g") {
    return false;
  }
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) return false;

  // When memory API is missing (common on iOS), skip very low-core devices on touch.
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const cores = nav.hardwareConcurrency ?? 8;
  if (coarse && typeof nav.deviceMemory !== "number" && cores <= 4) return false;

  return true;
}

/**
 * Mounts the WebGL Grainient after first paint / idle so the hero text can show first.
 * Skips save-data, slow networks, low-memory, and weak-CPU touch devices.
 */
export default function DeferredGrainient(props: GrainientProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const enable = () => {
      if (!cancelled && shouldEnableGrainient()) setReady(true);
    };

    if (!shouldEnableGrainient()) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const idleTimeout = coarse ? 2200 : 1200;
    const fallbackDelay = coarse ? 450 : 200;

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(enable, { timeout: idleTimeout });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const t = window.setTimeout(enable, fallbackDelay);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  if (!ready) {
    return <div className="grainient-container grainient-fallback" aria-hidden />;
  }

  return <Grainient {...props} />;
}
