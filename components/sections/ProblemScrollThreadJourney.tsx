"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  Globe,
  Megaphone,
  MessageCircle,
  RefreshCw,
  Route,
  TriangleAlert,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { useHydrated } from "@/hooks/useHydrated";
import { problemSection } from "@/lib/home-funnel";
import { EASE_OUT, motionTransition } from "@/lib/motion";
import "./problem-journey-section.css";

const STEPS = problemSection.journeySteps;
const STEP_COUNT = STEPS.length;
const LINE_DRAW_MS = 1100;
const SCROLL_IO = { root: null, rootMargin: "-6% 0px -28% 0px", threshold: 0.08 } as const;

const REPAIR_BG: Record<string, string> = {
  crm: "#ecfdf5",
  track: "#ecfeff",
  measure: "#f5f3ff",
};

const ICONS: Record<string, LucideIcon> = {
  campaign: Megaphone,
  site: Globe,
  lead: UserPlus,
  break: TriangleAlert,
  crm: MessageCircle,
  track: RefreshCw,
  measure: BarChart3,
};

const STEP_TAGS: Record<string, string> = {
  campaign: "תנועה",
  site: "הגעה",
  lead: "פנייה",
  break: "חסימה",
  crm: "החיבור",
  track: "החיבור",
  measure: "החיבור",
};

type JourneyStep = (typeof STEPS)[number];
type Point = { x: number; y: number };

type LineGeometry = {
  id: string;
  d: string;
  length: number;
  color: string;
  fromColor: string;
  toColor: string;
  dashed: boolean;
  repair: boolean;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

function getAnchor(rect: DOMRect, container: DOMRect): Point {
  return {
    x: rect.left - container.left + rect.width / 2,
    y: rect.top - container.top + rect.height / 2,
  };
}

function connectorPath(start: Point, end: Point): string {
  const dy = end.y - start.y;
  const bend = Math.max(Math.abs(dy) * 0.42, 28);
  return `M ${start.x} ${start.y} C ${start.x} ${start.y + bend}, ${end.x} ${end.y - bend}, ${end.x} ${end.y}`;
}

function useStackedLayout() {
  const [stacked, setStacked] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setStacked(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return stacked;
}

function queryStep(root: HTMLElement, id: string) {
  return root.querySelector<HTMLElement>(`#${id}`);
}

function queryAnchor(root: HTMLElement, stepId: string, socket: "top" | "bottom") {
  const wrap = queryStep(root, stepId);
  if (!wrap) return null;
  return wrap.querySelector<HTMLElement>(`[data-journey-anchor="${socket}"]`);
}

function isInScrollZone(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const triggerY = window.innerHeight * 0.72;
  return rect.top < triggerY && rect.bottom > 0;
}

function lineColor(from: JourneyStep, to: JourneyStep) {
  if ("isBreak" in to && to.isBreak) return "#EF4444";
  if ("repair" in to && to.repair) return to.color;
  return from.color;
}

function JourneyBar() {
  return (
    <>
      <div className="stjourney-leader-shell__bar">
        <div className="stjourney-leader-shell__bar-start">
          <span className="stjourney-leader-shell__bar-icon" aria-hidden>
            <Route size={15} strokeWidth={2.2} />
          </span>
          <div className="stjourney-leader-shell__bar-copy">
            <span className="stjourney-leader-shell__eyebrow">מסלול פנייה אמיתי</span>
            <span className="stjourney-leader-shell__bar-hint">
              כך נראית פנייה כשהמערכת לא מחוברת
            </span>
          </div>
        </div>
        <span className="stjourney-leader-shell__meta">
          <span className="stjourney-leader-shell__meta-dot" aria-hidden />
          7 שלבים
        </span>
      </div>
      <p className="stjourney-insight">{problemSection.insight}</p>
    </>
  );
}

function JourneyStepCard({
  step,
  stepId,
  visible,
}: {
  step: JourneyStep;
  stepId: string;
  visible: boolean;
}) {
  const Icon = ICONS[step.id] ?? Megaphone;
  const reduce = useReducedMotion();
  const isBreak = "isBreak" in step && step.isBreak;
  const isRepair = "repair" in step && step.repair;
  const repairBg = REPAIR_BG[step.id];
  const slideX = step.side === "right" ? 20 : -20;

  const card = (
    <div
      className={`stjourney-leader__card stjourney-leader__card--${step.side}${isBreak ? " stjourney-leader__card--break" : ""}${isRepair ? " stjourney-leader__card--repair" : ""}`}
      style={{
        ["--step-color" as string]: step.color,
        ...(repairBg ? { ["--repair-bg" as string]: repairBg } : {}),
      }}
    >
      <span className="stjourney-leader__card-accent" aria-hidden />
      <div className="stjourney-leader__card-head">
        <div className="stjourney-leader__card-meta">
          <span className="stjourney-leader__card-icon" aria-hidden>
            <Icon size={17} strokeWidth={2.1} />
          </span>
          <span className="stjourney-leader__card-tag">{STEP_TAGS[step.id] ?? "שלב"}</span>
        </div>
        <span className="stjourney-leader__card-index">{step.index}</span>
      </div>
      <h3 className="stjourney-leader__card-label">{step.label}</h3>
      <p className="stjourney-leader__card-desc">{step.description}</p>
      {"micro" in step && typeof step.micro === "string" ? (
        <p className="stjourney-leader__card-micro">{step.micro}</p>
      ) : null}
    </div>
  );

  return (
    <div
      id={stepId}
      className={`stjourney-leader__card-wrap${visible ? "" : " stjourney-leader__card-wrap--pending"}${isBreak ? " stjourney-leader__card-wrap--break" : ""}`}
    >
      <span className="stjourney-leader__anchor stjourney-leader__anchor--top" data-journey-anchor="top" aria-hidden />
      <span className="stjourney-leader__anchor stjourney-leader__anchor--bottom" data-journey-anchor="bottom" aria-hidden />
      {reduce ? (
        card
      ) : (
        <motion.div
          className="stjourney-leader__card-motion"
          initial={false}
          animate={
            visible
              ? { opacity: 1, y: 0, x: 0 }
              : { opacity: 0, y: 14, x: slideX }
          }
          transition={motionTransition(reduce, { duration: 0.45, ease: EASE_OUT })}
        >
          {card}
        </motion.div>
      )}
    </div>
  );
}

function useLeaderLineGeometry(rootRef: RefObject<HTMLElement | null>) {
  const [lines, setLines] = useState<LineGeometry[]>([]);

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    const container = root.getBoundingClientRect();
    const nextLines: LineGeometry[] = [];

    for (let i = 0; i < STEP_COUNT - 1; i += 1) {
      const fromAnchor = queryAnchor(root, `step_${i + 1}`, "bottom");
      const toAnchor = queryAnchor(root, `step_${i + 2}`, "top");
      if (!fromAnchor || !toAnchor) continue;

      const start = getAnchor(fromAnchor.getBoundingClientRect(), container);
      const end = getAnchor(toAnchor.getBoundingClientRect(), container);
      const d = connectorPath(start, end);

      const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
      probe.setAttribute("d", d);
      const length = probe.getTotalLength();

      const fromStep = STEPS[i];
      const toStep = STEPS[i + 1];
      nextLines.push({
        id: `line_${i + 1}_${i + 2}`,
        d,
        length,
        color: lineColor(fromStep, toStep),
        fromColor: fromStep.color,
        toColor: toStep.color,
        dashed: "isBreak" in toStep && Boolean(toStep.isBreak),
        repair: Boolean("repair" in toStep && toStep.repair),
        startX: start.x,
        startY: start.y,
        endX: end.x,
        endY: end.y,
      });
    }

    const closingEl = queryStep(root, "step_closing");
    const lastAnchor = queryAnchor(root, `step_${STEP_COUNT}`, "bottom");
    const closingAnchor = closingEl?.querySelector<HTMLElement>('[data-journey-anchor="top"]');
    if (closingEl && lastAnchor && closingAnchor) {
      const start = getAnchor(lastAnchor.getBoundingClientRect(), container);
      const end = getAnchor(closingAnchor.getBoundingClientRect(), container);
      const d = connectorPath(start, end);
      const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
      probe.setAttribute("d", d);
      const lastStep = STEPS[STEP_COUNT - 1];
      nextLines.push({
        id: "line_closing",
        d,
        length: probe.getTotalLength(),
        color: "#10B981",
        fromColor: lastStep.color,
        toColor: "#10B981",
        dashed: false,
        repair: true,
        startX: start.x,
        startY: start.y,
        endX: end.x,
        endY: end.y,
      });
    }

    setLines(nextLines);
  }, [rootRef]);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => measure());
    const root = rootRef.current;
    if (!root) return () => cancelAnimationFrame(frame);

    const ro = new ResizeObserver(() => requestAnimationFrame(() => measure()));
    ro.observe(root);
    const onResize = () => requestAnimationFrame(() => measure());
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [measure, rootRef]);

  return { lines, remeasure: measure };
}

function useSequentialJourneyReveal(
  rootRef: RefObject<HTMLElement | null>,
  ready: boolean,
) {
  const lineCount = STEP_COUNT;
  const [revealedSteps, setRevealedSteps] = useState<boolean[]>(() =>
    Array(STEP_COUNT).fill(false),
  );
  const [linesShown, setLinesShown] = useState<boolean[]>(() => Array(lineCount).fill(false));
  const [closingRevealed, setClosingRevealed] = useState(false);
  const revealedRef = useRef(Array(STEP_COUNT).fill(false));
  const linesShownRef = useRef(Array(lineCount).fill(false));
  const closingRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    if (!ready) return undefined;

    const root = rootRef.current;
    if (!root) return undefined;

    const clearTimers = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };

    const revealStep = (index: number) => {
      if (revealedRef.current[index]) return;
      revealedRef.current[index] = true;
      setRevealedSteps([...revealedRef.current]);
    };

    const getNextLineIndex = () => linesShownRef.current.findIndex((shown) => !shown);

    const startLine = (index: number) => {
      if (linesShownRef.current[index]) return;
      if (index !== getNextLineIndex()) return;

      linesShownRef.current[index] = true;
      setLinesShown([...linesShownRef.current]);

      const timer = window.setTimeout(() => {
        if (index === lineCount - 1) {
          if (!closingRef.current) {
            closingRef.current = true;
            setClosingRevealed(true);
          }
        } else {
          revealStep(index + 1);
          tryStartNextLine();
        }
      }, LINE_DRAW_MS);
      timersRef.current.push(timer);
    };

    const tryStartNextLine = () => {
      const index = getNextLineIndex();
      if (index === -1) return;

      const isClosing = index === lineCount - 1;
      const requiredStep = isClosing ? STEP_COUNT - 1 : index;
      if (!revealedRef.current[requiredStep]) return;

      const targetId = isClosing ? "step_closing" : `step_${index + 2}`;
      const target = queryStep(root, targetId);
      if (target && isInScrollZone(target)) {
        startLine(index);
      }
    };

    const observers: IntersectionObserver[] = [];

    const sectionObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealStep(0);
          tryStartNextLine();
        }
      });
    }, SCROLL_IO);
    sectionObs.observe(root);
    observers.push(sectionObs);

    for (let index = 0; index < lineCount; index += 1) {
      const isClosing = index === lineCount - 1;
      const targetId = isClosing ? "step_closing" : `step_${index + 2}`;
      const target = queryStep(root, targetId);
      if (!target) continue;

      const requiredStep = isClosing ? STEP_COUNT - 1 : index;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && revealedRef.current[requiredStep]) {
            tryStartNextLine();
          }
        });
      }, SCROLL_IO);

      observer.observe(target);
      observers.push(observer);
    }

    let scrollRaf = 0;
    const onScroll = () => {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(tryStartNextLine);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(tryStartNextLine);

    return () => {
      cancelAnimationFrame(scrollRaf);
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
      clearTimers();
    };
  }, [rootRef, lineCount, ready]);

  return { revealedSteps, linesShown, closingRevealed };
}

function LeaderLineCanvas({
  lines,
  stacked,
  linesShown,
}: {
  lines: LineGeometry[];
  stacked: boolean;
  linesShown: boolean[];
}) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const dashId = uid;

  return (
    <svg className="stjourney-leader__svg" aria-hidden="true">
      <defs>
        {lines.map((line, index) => (
          <linearGradient
            key={`grad-${line.id}`}
            id={`stj-grad-${uid}-${index}`}
            gradientUnits="userSpaceOnUse"
            x1={line.startX}
            y1={line.startY}
            x2={line.endX}
            y2={line.endY}
          >
            <stop offset="0%" stopColor={line.fromColor} />
            <stop offset="100%" stopColor={line.toColor} />
          </linearGradient>
        ))}
        <style>{`
          @keyframes stj-dash-${dashId} {
            to { stroke-dashoffset: -24; }
          }
        `}</style>
      </defs>
      {lines.map((line, index) => {
        const active = reduce || linesShown[index];
        const strokeWidth = stacked ? 3 : 3.5;

        return (
          <g
            key={line.id}
            className={active ? "stjourney-leader__segment--active" : "stjourney-leader__segment--hidden"}
          >
            <path className="stjourney-leader__track" d={line.d} strokeWidth={strokeWidth} />
            <path
              className={`stjourney-leader__path${line.dashed ? " stjourney-leader__path--break" : ""}${line.repair ? " stjourney-leader__path--repair" : ""}`}
              d={line.d}
              stroke={line.dashed ? line.color : `url(#stj-grad-${uid}-${index})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={line.dashed ? "10 12" : `${line.length}`}
              strokeDashoffset={active ? 0 : line.length}
              style={
                active && !reduce && line.dashed
                  ? { animation: `stj-dash-${dashId} 1.1s linear infinite` }
                  : undefined
              }
            />
          </g>
        );
      })}
    </svg>
  );
}

function LeaderLineJourney({ stacked }: { stacked: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const { lines, remeasure } = useLeaderLineGeometry(rootRef);
  const { revealedSteps, linesShown, closingRevealed } = useSequentialJourneyReveal(
    rootRef,
    hydrated,
  );

  useEffect(() => {
    if (!hydrated) return undefined;
    const timers = [100, 400].map((ms) => window.setTimeout(remeasure, ms));
    return () => timers.forEach(clearTimeout);
  }, [hydrated, remeasure, stacked]);

  return (
    <div className="stjourney-leader-wrap">
      <JourneyBar />

      <div className={`stjourney-leader${stacked ? " stjourney-leader--stacked" : ""}`} ref={rootRef}>
        {hydrated ? <LeaderLineCanvas lines={lines} stacked={stacked} linesShown={linesShown} /> : null}
        <ol className="stjourney-leader__steps">
          {STEPS.map((step, index) => (
            <li
              key={step.id}
              className={`stjourney-leader__item stjourney-leader__item--${step.side}${"repair" in step && step.repair ? " stjourney-leader__item--repair" : ""}`}
            >
              <JourneyStepCard
                step={step}
                stepId={`step_${index + 1}`}
                visible={revealedSteps[index] ?? false}
              />
            </li>
          ))}
        </ol>
        <div id="step_closing" className="stjourney-leader__closing-wrap">
          <span className="stjourney-leader__anchor stjourney-leader__anchor--top" data-journey-anchor="top" aria-hidden />
          <motion.div
            className={`stjourney-leader__closing${closingRevealed ? "" : " stjourney-leader__closing--pending"}`}
            initial={false}
            animate={closingRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={motionTransition(reduce, { duration: 0.45, ease: EASE_OUT })}
          >
            <span className="stjourney-leader__closing-icon" aria-hidden>
              <CheckCircle2 size={20} strokeWidth={2.2} />
            </span>
            <p className="stjourney-leader__closing-text">{problemSection.journeyClosing}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StaticTimeline() {
  return (
    <div className="stjourney-leader-wrap stjourney-leader-wrap--static">
      <JourneyBar />
      <ol className="stjourney-static" aria-label="מסלול הפנייה">
        {STEPS.map((step) => {
          const Icon = ICONS[step.id] ?? Megaphone;
          const isBreak = "isBreak" in step && step.isBreak;
          const isRepair = "repair" in step && step.repair;
          const repairBg = REPAIR_BG[step.id];
          return (
            <li
              key={step.id}
              className={`stjourney-static__item${isBreak ? " stjourney-static__item--break" : ""}${isRepair ? " stjourney-static__item--repair" : ""}`}
              style={{
                ["--step-color" as string]: step.color,
                ...(repairBg ? { ["--repair-bg" as string]: repairBg } : {}),
              }}
            >
              <span className="stjourney-static__node" aria-hidden>
                <Icon size={14} strokeWidth={2.1} />
              </span>
              <div className="stjourney-static__body">
                <span className="stjourney-static__tag">{STEP_TAGS[step.id] ?? "שלב"}</span>
                <span className="stjourney-static__index">{step.index}</span>
                <h3 className="stjourney-static__label">{step.label}</h3>
                <p className="stjourney-static__desc">{step.description}</p>
                {"micro" in step && typeof step.micro === "string" ? (
                  <p className="stjourney-static__micro">{step.micro}</p>
                ) : null}
              </div>
            </li>
          );
        })}
        <li className="stjourney-static__closing">{problemSection.journeyClosing}</li>
      </ol>
    </div>
  );
}

export default function ProblemScrollThreadJourney() {
  const reduce = useReducedMotion();
  const stacked = useStackedLayout();

  if (reduce) {
    return <StaticTimeline />;
  }

  return <LeaderLineJourney stacked={stacked} />;
}
