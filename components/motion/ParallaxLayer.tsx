"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";

type ParallaxLayerProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Scroll travel as % of element shift — keep low (0.06–0.14). */
  speed?: number;
};

function ParallaxLayerMotion({
  children,
  className = "",
  style,
  speed = 0.1,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 50}%`, `${speed * 50}%`]);

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}

export default function ParallaxLayer(props: ParallaxLayerProps) {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const { className = "", style, children } = props;

  if (!hydrated || reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return <ParallaxLayerMotion {...props} />;
}
