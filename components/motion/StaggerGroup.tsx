"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";
import { EASE, motionTransition, viewport, type ViewportKey } from "@/lib/motion";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  viewportKey?: ViewportKey;
};

export default function StaggerGroup({
  children,
  className,
  stagger = 0.07,
  viewportKey = "section",
}: StaggerGroupProps) {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const vp = viewport[viewportKey];

  if (!hydrated || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const hydrated = useHydrated();

  if (!hydrated || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: motionTransition(reduce, { duration: 0.5, ease: EASE }),
        },
      }}
    >
      {children}
    </motion.div>
  );
}
