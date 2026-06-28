"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { useHydrated } from "@/hooks/useHydrated";
import { identificationSection } from "@/lib/home-funnel";
import { EASE_OUT, motionTransition, viewport } from "@/lib/motion";

const ACCENT = "#2563EB";
const CENTRAL_INDEX = 3;

const CARD_ORDER = [0, 1, 2, 3, 4] as const;

const CARD_VISUALS: Record<number, { accent: string; tag: string; index: string }> = {
  0: { accent: "#2563EB", tag: "תדמית דיגיטלית", index: "01" },
  1: { accent: "#EF4444", tag: "מעקב פניות", index: "02" },
  2: { accent: "#06B6D4", tag: "תשתית פרסום", index: "03" },
  3: { accent: "#7C3AED", tag: "מדידה והמרה", index: "04" },
  4: { accent: "#10B981", tag: "ליווי מרכזי", index: "05" },
};

const PLACEMENT: Record<number, string> = {
  0: "lg:col-start-1 lg:row-start-1",
  1: "lg:col-start-1 lg:row-start-2",
  2: "lg:col-start-3 lg:row-start-1",
  3: "lg:col-start-2 lg:row-start-1 lg:row-span-2",
  4: "lg:col-start-3 lg:row-start-2",
};

/** Desktop: side cards emerge from center toward their slot. */
const SIDE_EMERGE: Record<number, { x: number; y: number }> = {
  0: { x: -56, y: 28 },
  1: { x: -56, y: -28 },
  2: { x: 56, y: 28 },
  4: { x: 56, y: -28 },
};

/** Lines connect center → cards 01, 02, 03, 05 (after central card animates). */
const LINE_DELAYS = ["0.45s", "0.53s", "0.61s", "0.69s"] as const;

const STAGGER = 0.09;
const CARD_DURATION = 0.52;

type CardMotionCustom = {
  isCentral: boolean;
  spread: boolean;
  cardIndex: number;
};

function getCardEmerge({ isCentral, spread, cardIndex }: CardMotionCustom) {
  if (isCentral) {
    return { x: 0, y: spread ? 18 : 14, scale: 0.96 };
  }
  if (!spread) {
    return { x: 0, y: 14, scale: 0.97 };
  }
  const offset = SIDE_EMERGE[cardIndex] ?? { x: 0, y: 14 };
  return { x: offset.x, y: offset.y, scale: 0.97 };
}

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER,
      delayChildren: 0.04,
    },
  },
};

const cardVariants = {
  hidden: (custom: CardMotionCustom) => {
    const emerge = getCardEmerge(custom);
    return {
      opacity: 0,
      x: emerge.x,
      y: emerge.y,
      scale: emerge.scale,
    };
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: CARD_DURATION,
      ease: EASE_OUT,
    },
  },
};

function useDesktopSpread() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(min-width: 1024px)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false,
  );
}

function DiagCardContent({ index }: { index: number }) {
  const card = identificationSection.cards[index];
  const visual = CARD_VISUALS[index];
  const isCentral = index === CENTRAL_INDEX;

  return (
    <>
      <div className="diag-card__meta">
        {isCentral ? (
          <span className="accent-chip">בעיה אחת חוזרת</span>
        ) : (
          <span className="diag-card__tag">{visual.tag}</span>
        )}
        <span className="diag-card__index" aria-hidden>
          {visual.index}
        </span>
      </div>

      <p
        className={
          isCentral
            ? "text-base font-bold leading-snug text-slate-900 sm:text-lg lg:text-xl"
            : "flex-1 text-sm font-semibold leading-relaxed text-slate-800 sm:text-base"
        }
      >
        {card.pain}
      </p>

      {isCentral ? (
        <div className="diag-central__insight mt-4">
          <p className="text-sm leading-relaxed text-slate-700 sm:text-[0.95rem]">
            <span className="font-semibold text-slate-800">בעיה אחת חוזרת: </span>
            יש תנועה, יש פניות — אבל אין מערכת שמחברת ביניהן!
          </p>
        </div>
      ) : null}

      <div
        className={`diag-card__solution${isCentral ? " diag-central__solution" : ""} ${isCentral ? "mt-5" : "mt-4"}`}
      >
        <span className="diag-solution__label">מה עושים עם זה? </span>
        {card.solution}
      </div>
    </>
  );
}

export default function IdentificationSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const spread = useDesktopSpread();
  const inView = useInView(gridRef, viewport.section);

  const useMotion = hydrated && !reduce;
  const linesActive = reduce || (hydrated && inView);
  const noteDelay = 0.04 + CARD_ORDER.length * STAGGER + 0.1;

  const cardClass = (index: number) => {
    const isCentral = index === CENTRAL_INDEX;
    return [
      "diag-card home-card accent-card relative flex h-full list-none flex-col",
      isCentral ? "diag-central" : "home-card--interactive",
      isCentral ? "p-6 sm:p-7 lg:p-8" : "p-5 sm:p-6",
      PLACEMENT[index],
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <section
      id="identification"
      className="home-section section-shell diag-section"
      dir="rtl"
    >
      <div className="diag-backdrop" aria-hidden>
        <span className="diag-backdrop__orb diag-backdrop__orb--a" />
        <span className="diag-backdrop__orb diag-backdrop__orb--b" />
        <span className="diag-backdrop__grid" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="זיהוי"
          before="אם זה נשמע "
          accent="מוכר"
          after="? — האתר שלך צריך לעבוד אחרת!"
          accentColor={ACCENT}
        />

        <div ref={gridRef} className="diag-grid relative mt-10 lg:mt-12">
          <svg
            className={`diag-lines hidden lg:block${linesActive ? " diag-lines--active" : ""}`}
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="diagLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#22d3ee" stopOpacity="1" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9" />
              </linearGradient>
              <filter id="diagLineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g filter="url(#diagLineGlow)" opacity="0.35">
              <path className="diag-line diag-line--glow" pathLength={1} d="M500 300 Q 360 210 170 150" />
              <path className="diag-line diag-line--glow" pathLength={1} d="M500 300 Q 360 390 170 450" />
              <path className="diag-line diag-line--glow" pathLength={1} d="M500 300 Q 640 210 830 150" />
              <path className="diag-line diag-line--glow" pathLength={1} d="M500 300 Q 640 390 830 450" />
            </g>

            <path className="diag-line" pathLength={1} style={{ animationDelay: LINE_DELAYS[0] }} d="M500 300 Q 360 210 170 150" />
            <path className="diag-line" pathLength={1} style={{ animationDelay: LINE_DELAYS[1] }} d="M500 300 Q 360 390 170 450" />
            <path className="diag-line" pathLength={1} style={{ animationDelay: LINE_DELAYS[2] }} d="M500 300 Q 640 210 830 150" />
            <path className="diag-line" pathLength={1} style={{ animationDelay: LINE_DELAYS[3] }} d="M500 300 Q 640 390 830 450" />

            <circle className="diag-dot" cx="170" cy="150" r="4.5" fill="#2563eb" />
            <circle className="diag-dot" cx="170" cy="450" r="4.5" fill="#22d3ee" />
            <circle className="diag-dot" cx="830" cy="150" r="4.5" fill="#22d3ee" />
            <circle className="diag-dot" cx="830" cy="450" r="4.5" fill="#7c3aed" />

            <circle className="diag-hub" cx="500" cy="300" r="18" fill="none" stroke="#7c3aed" strokeOpacity="0.2" />
            <circle className="diag-hub diag-hub--inner" cx="500" cy="300" r="9" fill="#7c3aed" fillOpacity="0.12" />
            <circle className="diag-dot diag-dot--hub" cx="500" cy="300" r="5" fill="#7c3aed" />
          </svg>

          {useMotion ? (
            <motion.ul
              className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5 xl:gap-6"
              initial={inView ? false : "hidden"}
              whileInView="visible"
              viewport={viewport.section}
              variants={listVariants}
            >
              {CARD_ORDER.map((index) => {
                const visual = CARD_VISUALS[index];
                const isCentral = index === CENTRAL_INDEX;
                const custom: CardMotionCustom = { isCentral, spread, cardIndex: index };

                return (
                  <motion.li
                    key={index}
                    custom={custom}
                    variants={cardVariants}
                    className={cardClass(index)}
                    style={{ ["--accent" as string]: visual.accent }}
                  >
                    <DiagCardContent index={index} />
                  </motion.li>
                );
              })}
            </motion.ul>
          ) : (
            <ul className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5 xl:gap-6">
              {CARD_ORDER.map((index) => {
                const visual = CARD_VISUALS[index];
                return (
                  <li
                    key={index}
                    className={cardClass(index)}
                    style={{ ["--accent" as string]: visual.accent }}
                  >
                    <DiagCardContent index={index} />
                  </li>
                );
              })}
            </ul>
          )}

          {useMotion ? (
            <motion.div
              className="diag-note mx-auto mt-8 max-w-2xl lg:mt-10"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={motionTransition(reduce, {
                duration: 0.45,
                delay: inView ? noteDelay : 0,
                ease: EASE_OUT,
              })}
            >
              <p className="text-sm leading-relaxed text-slate-600">
                הבעיה לרוב לא נמצאת רק באתר או רק בקמפיין — אלא בחיבור ביניהם.
              </p>
            </motion.div>
          ) : (
            <div className="diag-note mx-auto mt-8 max-w-2xl lg:mt-10">
              <p className="text-sm leading-relaxed text-slate-600">
                הבעיה לרוב לא נמצאת רק באתר או רק בקמפיין — אלא בחיבור ביניהם.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
