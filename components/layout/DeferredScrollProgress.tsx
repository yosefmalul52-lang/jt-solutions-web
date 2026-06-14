"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ScrollProgress = dynamic(() => import("@/components/layout/ScrollProgress"), {
  ssr: false,
});

function scheduleIdle(callback: () => void, timeout = 2500) {
  if (typeof window === "undefined") return;

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(callback, { timeout });
  } else if (document.readyState === "complete") {
    setTimeout(callback, 1200);
  } else {
    window.addEventListener("load", () => setTimeout(callback, 1200), { once: true });
  }
}

export default function DeferredScrollProgress() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    scheduleIdle(() => setReady(true));
  }, []);

  if (!ready) return null;
  return <ScrollProgress />;
}
