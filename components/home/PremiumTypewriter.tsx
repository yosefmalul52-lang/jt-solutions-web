"use client";

import { useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";
import { useRotatingTypewriter } from "@/hooks/useRotatingTypewriter";

type PremiumTypewriterProps = {
  words: readonly string[];
  className?: string;
};

/**
 * Small rotating support line. The first phrase is always present as accessible
 * text (sr-only); the animated part is aria-hidden, so meaning never depends on
 * motion. Falls back to a static phrase when reduced-motion / pre-hydration.
 */
export default function PremiumTypewriter({ words, className = "" }: PremiumTypewriterProps) {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const instant = !hydrated || reduce === true;

  const { wordText } = useRotatingTypewriter({ prefix: "", words, instant });
  const display = instant ? (words[0] ?? "") : wordText;

  return (
    <p className={`tw-line ${className}`.trim()} dir="rtl">
      <span className="tw-dot" aria-hidden />
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden>
        {display}
        {!instant ? <span className="tw-caret" /> : null}
      </span>
    </p>
  );
}
