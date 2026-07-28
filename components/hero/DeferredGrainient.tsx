"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { GrainientProps } from "@/components/hero/Grainient";

const Grainient = dynamic(() => import("@/components/hero/Grainient"), {
  ssr: false,
  loading: () => <div className="grainient-container grainient-fallback" aria-hidden />,
});

/**
 * Mounts the WebGL Grainient after first paint / idle so the hero text can show first.
 * Enabled on all devices; only skipped when the user prefers reduced motion.
 */
export default function DeferredGrainient(props: GrainientProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const enable = () => {
      if (!cancelled) setReady(true);
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(enable, { timeout: 1200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const t = window.setTimeout(enable, 200);
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
