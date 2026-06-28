"use client";

import { useEffect, useRef, useState } from "react";
import { useHydrated } from "@/hooks/useHydrated";
import { heroCopy } from "@/lib/hero-content";

const LINE_1 = heroCopy.h1Line1;
const LINE_2 = heroCopy.h1Line2;
const TYPE_SPEED_MS = 42;
const LINE_PAUSE_MS = 220;

type HeroTypewriterHeadlineProps = {
  reduceMotion: boolean | null;
};

function TypewriterChars({
  text,
  visibleCount,
}: {
  text: string;
  visibleCount: number;
}) {
  return (
    <>
      {text.slice(0, visibleCount).split("").map((char, index) => (
        <span key={`${char}-${index}`} className="hero-typewriter-char">
          {char}
        </span>
      ))}
    </>
  );
}

function StaticHeadline() {
  return (
    <h1 className="display-title max-w-4xl mx-auto">
      <span className="block text-slate-900">{LINE_1}</span>
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5b21b6] via-[#4f46e5] to-[#0ea5e9]">
        {LINE_2}
      </span>
    </h1>
  );
}

export default function HeroTypewriterHeadline({ reduceMotion }: HeroTypewriterHeadlineProps) {
  const hydrated = useHydrated();
  const startedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [line1Count, setLine1Count] = useState(0);
  const [line2Count, setLine2Count] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const showStatic = !hydrated || reduceMotion === true || isMobile;

  useEffect(() => {
    if (!hydrated || reduceMotion || isMobile) {
      return;
    }

    if (startedRef.current) return;
    startedRef.current = true;

    let line1Timer: number | undefined;
    let line2Timer: number | undefined;
    let pauseTimer: number | undefined;

    const bootTimer = window.setTimeout(() => {
      setLine1Count(0);
      setLine2Count(0);
      setIsTyping(true);

      let line1Index = 0;
      let line2Index = 0;

      line1Timer = window.setInterval(() => {
        line1Index += 1;
        setLine1Count(line1Index);

        if (line1Index >= LINE_1.length) {
          window.clearInterval(line1Timer);
          pauseTimer = window.setTimeout(() => {
            line2Timer = window.setInterval(() => {
              line2Index += 1;
              setLine2Count(line2Index);

              if (line2Index >= LINE_2.length) {
                window.clearInterval(line2Timer);
                setIsTyping(false);
              }
            }, TYPE_SPEED_MS);
          }, LINE_PAUSE_MS);
        }
      }, TYPE_SPEED_MS);
    }, 0);

    return () => {
      window.clearTimeout(bootTimer);
      if (line1Timer) window.clearInterval(line1Timer);
      if (line2Timer) window.clearInterval(line2Timer);
      if (pauseTimer) window.clearTimeout(pauseTimer);
    };
  }, [hydrated, reduceMotion, isMobile]);

  if (showStatic) {
    return <StaticHeadline />;
  }

  const showCursor = isTyping;
  const cursorOnLine1 = showCursor && line2Count === 0;
  const cursorOnLine2 = showCursor && line1Count >= LINE_1.length && line2Count < LINE_2.length;

  return (
    <h1 className="display-title max-w-4xl mx-auto">
      <span className="sr-only">
        {LINE_1} {LINE_2}
      </span>

      <span aria-hidden>
        <span className="block text-slate-900">
          <TypewriterChars text={LINE_1} visibleCount={line1Count} />
          {cursorOnLine1 ? <span className="hero-typewriter-cursor">|</span> : null}
        </span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5b21b6] via-[#4f46e5] to-[#0ea5e9]">
          <TypewriterChars text={LINE_2} visibleCount={line2Count} />
          {cursorOnLine2 ? <span className="hero-typewriter-cursor">|</span> : null}
        </span>
      </span>
    </h1>
  );
}
