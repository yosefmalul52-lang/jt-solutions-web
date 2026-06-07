"use client";

import { useEffect, useState } from "react";

type UseTypewriterOptions = {
  lines: readonly string[];
  /** ms per character */
  charDelay?: number;
  /** ms pause between lines */
  linePause?: number;
  /** ms before typing starts */
  startDelay?: number;
  /** skip animation — show full text immediately */
  instant?: boolean;
};

export function useTypewriter({
  lines,
  charDelay = 42,
  linePause = 380,
  startDelay = 520,
  instant = false,
}: UseTypewriterOptions) {
  const [displayLines, setDisplayLines] = useState<string[]>(() =>
    instant ? [...lines] : lines.map(() => ""),
  );
  const [activeLine, setActiveLine] = useState(0);
  const [isTyping, setIsTyping] = useState(!instant);
  const [isComplete, setIsComplete] = useState(instant);

  useEffect(() => {
    if (instant) return;

    let cancelled = false;
    let timeoutId = 0;

    const schedule = (fn: () => void, delay: number) => {
      timeoutId = window.setTimeout(fn, delay);
    };

    const typeLine = (lineIdx: number, charIdx: number) => {
      if (cancelled) return;

      const line = lines[lineIdx];
      if (!line) {
        setIsTyping(false);
        setIsComplete(true);
        return;
      }

      if (charIdx <= line.length) {
        setActiveLine(lineIdx);
        setDisplayLines((prev) => {
          const next = [...prev];
          next[lineIdx] = line.slice(0, charIdx);
          return next;
        });

        if (charIdx === line.length) {
          if (lineIdx < lines.length - 1) {
            schedule(() => typeLine(lineIdx + 1, 0), linePause);
          } else {
            setIsTyping(false);
            setIsComplete(true);
          }
          return;
        }

        schedule(() => typeLine(lineIdx, charIdx + 1), charDelay);
      }
    };

    schedule(() => typeLine(0, 0), startDelay);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [lines, charDelay, linePause, startDelay, instant]);

  return { displayLines, activeLine, isTyping, isComplete };
}
