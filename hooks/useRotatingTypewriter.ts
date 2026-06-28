"use client";

import { useEffect, useState } from "react";

type UseRotatingTypewriterOptions = {
  prefix: string;
  words: readonly string[];
  charDelay?: number;
  deleteDelay?: number;
  wordPause?: number;
  startDelay?: number;
  instant?: boolean;
  /** Keep full prefix + first word visible until false (avoids hydration CLS). */
  deferStart?: boolean;
};

export function useRotatingTypewriter({
  prefix,
  words,
  charDelay = 36,
  deleteDelay = 24,
  wordPause = 2000,
  startDelay = 520,
  instant = false,
  deferStart = false,
}: UseRotatingTypewriterOptions) {
  const [prefixText] = useState(instant || deferStart ? prefix : "");
  const [wordText, setWordText] = useState(instant || deferStart ? (words[0] ?? "") : "");
  const [wordIndex, setWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(!instant);
  const [phase, setPhase] = useState<"prefix" | "word" | "pause" | "delete">(
    instant ? "pause" : "prefix",
  );

  useEffect(() => {
    if (instant || deferStart || words.length === 0) return;

    let cancelled = false;
    let timeoutId = 0;
    const schedule = (fn: () => void, delay: number) => {
      timeoutId = window.setTimeout(fn, delay);
    };

    const typeWord = (word: string, idx: number, onDone: () => void) => {
      if (cancelled) return;
      setIsTyping(true);
      if (idx <= word.length) {
        setWordText(word.slice(0, idx));
        if (idx === word.length) {
          setIsTyping(false);
          onDone();
          return;
        }
        schedule(() => typeWord(word, idx + 1, onDone), charDelay);
      }
    };

    const deleteWord = (current: string, onDone: () => void) => {
      if (cancelled) return;
      setIsTyping(true);
      if (current.length === 0) {
        setIsTyping(false);
        onDone();
        return;
      }
      const next = current.slice(0, -1);
      setWordText(next);
      schedule(() => deleteWord(next, onDone), deleteDelay);
    };

    const runWordCycle = (index: number) => {
      if (cancelled) return;
      const word = words[index];
      if (!word) return;

      setWordIndex(index);
      setPhase("word");
      typeWord(word, 0, () => {
        setPhase("pause");
        schedule(() => {
          setPhase("delete");
          deleteWord(word, () => {
            const nextIndex = (index + 1) % words.length;
            runWordCycle(nextIndex);
          });
        }, wordPause);
      });
    };

    schedule(() => {
      const current = words[0];
      if (!current) return;
      setPhase("delete");
      deleteWord(current, () => runWordCycle(1 % words.length));
    }, startDelay);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [prefix, words, charDelay, deleteDelay, wordPause, startDelay, instant, deferStart]);

  return {
    prefixText,
    wordText,
    wordIndex,
    isTyping,
    phase,
    ariaLabel: `${prefix} ${words.join(", ")}`,
  };
}
