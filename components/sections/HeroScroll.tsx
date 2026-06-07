"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import Hero from "@/components/sections/Hero";

const HeroScrollMotion = dynamic(() => import("@/components/sections/HeroScrollMotion"), {
  ssr: false,
  loading: () => <Hero />,
});

export default function HeroScroll() {
  const reduce = useReducedMotion();

  if (reduce === true) {
    return <Hero />;
  }

  return <HeroScrollMotion />;
}
