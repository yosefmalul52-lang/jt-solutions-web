"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import TypewriterCursor from "@/components/motion/TypewriterCursor";
import { useTypewriter } from "@/hooks/useTypewriter";

type HeroTypewriterHeadlineProps = {
  lines: readonly string[];
  /** Which line gets the gradient accent class */
  accentLineIndex?: number;
  titleClassName?: string;
  lineClassName?: string;
  accentClassName?: string;
  charDelay?: number;
  linePause?: number;
  startDelay?: number;
  instant?: boolean;
  onComplete?: () => void;
};

export default function HeroTypewriterHeadline({
  lines,
  accentLineIndex = 1,
  titleClassName = "hero-display-title",
  lineClassName = "block min-h-[1.25em] text-white/95",
  accentClassName = "hero-display-accent mt-4 block min-h-[1.25em] sm:mt-5",
  charDelay = 38,
  linePause = 420,
  startDelay = 680,
  instant = false,
  onComplete,
}: HeroTypewriterHeadlineProps) {
  const reduceMotion = useReducedMotion();
  const showInstant = instant || reduceMotion;

  const { displayLines, activeLine, isTyping, isComplete } = useTypewriter({
    lines,
    charDelay,
    linePause,
    startDelay: showInstant ? 0 : startDelay,
    instant: showInstant,
  });

  useEffect(() => {
    if (isComplete) onComplete?.();
  }, [isComplete, onComplete]);

  return (
    <h1 dir="rtl" className={titleClassName} aria-label={lines.join(" ")}>
      {lines.map((fullLine, index) => {
        const isAccent = index === accentLineIndex;
        const className = isAccent ? accentClassName : lineClassName;

        return (
          <span key={fullLine} className={className}>
            {displayLines[index]}
            {isTyping && activeLine === index ? (
              <TypewriterCursor className={isAccent ? "!bg-pink-400/95" : "!bg-white/90"} />
            ) : null}
          </span>
        );
      })}
    </h1>
  );
}
