"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import {
  Bell,
  LayoutTemplate,
  Link2,
  Megaphone,
  MessageCircle,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import JourneyStepGraphic from "@/components/sections/JourneyStepGraphic";
import { useHydrated } from "@/hooks/useHydrated";
import { problemSection } from "@/lib/home-funnel";
import "./problem-journey-section.css";

const STEPS = problemSection.journeySteps;
const STEP_COUNT = STEPS.length;
const CLOSING_PIPELINE_LABELS = ["אתר", "קמפיין", "לידים", "CRM", "מעקב"] as const;
const LINE_SCROLL_TRIGGER = 0.58;
/** Extra viewport padding so each segment draws over a longer scroll distance */
const LINE_SCROLL_LEAD = 0.2;
const LINE_SCROLL_TRAIL = 0.14;
/** Higher = snappier follow; lower = silkier lag */
const LINE_SMOOTH_LAMBDA = 11;
const SCROLL_IO = { root: null, rootMargin: "-6% 0px -28% 0px", threshold: 0.08 } as const;

const PATH_COLOR = "#2563eb";
/** Line has reached the destination card - activate its color. */
const CARD_CONNECT_PROGRESS = 0.9;

const JOURNEY_ICONS: Record<(typeof STEPS)[number]["icon"], LucideIcon> = {
  megaphone: Megaphone,
  layout: LayoutTemplate,
  "user-plus": UserPlus,
  message: MessageCircle,
  bell: Bell,
};

type JourneyStep = (typeof STEPS)[number];
type Point = { x: number; y: number };

type LineGeometry = {
  id: string;
  d: string;
  length: number;
  color: string;
  repair: boolean;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

function sideAnchor(rect: DOMRect, container: DOMRect, side: "left" | "right"): Point {
  return {
    x: (side === "left" ? rect.left : rect.right) - container.left,
    y: rect.top - container.top + rect.height / 2,
  };
}

function topAnchor(rect: DOMRect, container: DOMRect): Point {
  return {
    x: rect.left - container.left + rect.width / 2,
    y: rect.top - container.top,
  };
}

function bottomAnchor(rect: DOMRect, container: DOMRect): Point {
  return {
    x: rect.left - container.left + rect.width / 2,
    y: rect.bottom - container.top,
  };
}

/** Gap so the path starts outside a card edge - chain links, not through cards. */
const CHAIN_GAP = 12;

function chainSegmentHorizontal(start: Point, end: Point): { start: Point; end: Point } {
  const dirX = end.x >= start.x ? 1 : -1;
  const available = Math.abs(end.x - start.x);
  const gap = Math.min(CHAIN_GAP, Math.max(6, available * 0.12));
  return {
    start: { x: start.x + dirX * gap, y: start.y },
    end: { x: end.x - dirX * gap, y: end.y },
  };
}

function chainSegmentVertical(start: Point, end: Point): { start: Point; end: Point } {
  const available = end.y - start.y;
  const gap = Math.min(CHAIN_GAP, Math.max(4, available * 0.18));
  return {
    start: { x: start.x, y: start.y + gap },
    end: { x: end.x, y: end.y - gap },
  };
}

/** Side-to-side when cards zigzag; bottom→top when stacked / aligned. */
function connectionPoints(
  fromRect: DOMRect,
  toRect: DOMRect,
  container: DOMRect,
): { start: Point; end: Point; mode: "side" | "vertical" } {
  const fromCx = fromRect.left + fromRect.width / 2;
  const toCx = toRect.left + toRect.width / 2;
  const dx = toCx - fromCx;

  if (Math.abs(dx) < 28) {
    return {
      ...chainSegmentVertical(bottomAnchor(fromRect, container), topAnchor(toRect, container)),
      mode: "vertical",
    };
  }

  const startSide: "left" | "right" = dx > 0 ? "right" : "left";
  const endSide: "left" | "right" = dx > 0 ? "left" : "right";
  return {
    ...chainSegmentHorizontal(
      sideAnchor(fromRect, container, startSide),
      sideAnchor(toRect, container, endSide),
    ),
    mode: "side",
  };
}

/** Last step → closing card: always land on the top center via the spine. */
function connectionPointsClosing(
  fromRect: DOMRect,
  toRect: DOMRect,
  container: DOMRect,
  spineX: number,
  forceVertical = false,
): { start: Point; end: Point } {
  const fromCx = fromRect.left - container.left + fromRect.width / 2;
  const endRaw = topAnchor(toRect, container);
  const end: Point = {
    // Keep the node on the center spine when the closing card is centered
    x: Math.abs(endRaw.x - spineX) < 14 ? spineX : endRaw.x,
    y:
      endRaw.y -
      Math.min(CHAIN_GAP, Math.max(4, (endRaw.y - (fromRect.bottom - container.top)) * 0.2)),
  };

  if (forceVertical || Math.abs(fromCx - spineX) < 28) {
    const startRaw = bottomAnchor(fromRect, container);
    // Share the end x so the drop stays a straight line even when the last card is offset
    const fromLeft = fromRect.left - container.left;
    const startX = forceVertical
      ? Math.min(Math.max(end.x, fromLeft + 12), fromLeft + fromRect.width - 12)
      : startRaw.x;
    return {
      start: { x: startX, y: startRaw.y + Math.min(CHAIN_GAP, 10) },
      end,
    };
  }

  const startSide: "left" | "right" = fromCx < spineX ? "right" : "left";
  const startRaw = sideAnchor(fromRect, container, startSide);
  const dirX = startSide === "right" ? 1 : -1;
  return {
    start: { x: startRaw.x + dirX * CHAIN_GAP, y: startRaw.y },
    end,
  };
}

/** Elbow into the spine, then drop vertically onto the closing card top. */
function connectorPathClosing(start: Point, end: Point, spineX: number): string {
  const r = 10;
  const dirY = end.y >= start.y ? 1 : -1;

  if (Math.abs(start.x - end.x) < 28 && Math.abs(start.x - spineX) < 28) {
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  }

  const dirXStart = spineX >= start.x ? 1 : -1;
  const clampedR = Math.min(
    r,
    Math.abs(spineX - start.x) / 2,
    Math.abs(end.y - start.y) / 3 || r,
  );

  // Closing is centered: prefer ending on the spine drop, then nudge to top center
  if (Math.abs(end.x - spineX) < 14) {
    return [
      `M ${start.x} ${start.y}`,
      `L ${spineX - dirXStart * clampedR} ${start.y}`,
      `Q ${spineX} ${start.y}, ${spineX} ${start.y + dirY * clampedR}`,
      `L ${spineX} ${end.y}`,
    ].join(" ");
  }

  const dirXEnd = end.x >= spineX ? 1 : -1;
  const endR = Math.min(clampedR, Math.abs(end.x - spineX) / 2 || clampedR);

  return [
    `M ${start.x} ${start.y}`,
    `L ${spineX - dirXStart * clampedR} ${start.y}`,
    `Q ${spineX} ${start.y}, ${spineX} ${start.y + dirY * clampedR}`,
    `L ${spineX} ${end.y - dirY * endR}`,
    `Q ${spineX} ${end.y}, ${spineX + dirXEnd * endR} ${end.y}`,
    `L ${end.x} ${end.y}`,
  ].join(" ");
}

function connectorPathSide(start: Point, end: Point, spineX: number): string {
  const r = 10;
  const dy = end.y - start.y;
  const dirY = dy >= 0 ? 1 : -1;
  const dirXStart = spineX >= start.x ? 1 : -1;
  const dirXEnd = end.x >= spineX ? 1 : -1;

  if (Math.abs(end.x - start.x) < 1) {
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  }

  const clampedR = Math.min(
    r,
    Math.abs(spineX - start.x) / 2,
    Math.abs(end.x - spineX) / 2,
    Math.abs(dy) / 2 || r,
  );

  return [
    `M ${start.x} ${start.y}`,
    `L ${spineX - dirXStart * clampedR} ${start.y}`,
    `Q ${spineX} ${start.y}, ${spineX} ${start.y + dirY * clampedR}`,
    `L ${spineX} ${end.y - dirY * clampedR}`,
    `Q ${spineX} ${end.y}, ${spineX + dirXEnd * clampedR} ${end.y}`,
    `L ${end.x} ${end.y}`,
  ].join(" ");
}

function connectorPathVertical(start: Point, end: Point): string {
  const midY = start.y + (end.y - start.y) / 2;
  const r = 12;
  const dx = end.x - start.x;
  const dirX = dx > 0 ? 1 : -1;

  if (Math.abs(dx) < 1) {
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  }

  const clampedR = Math.min(r, Math.abs(dx) / 2, Math.abs(end.y - start.y) / 4);

  return [
    `M ${start.x} ${start.y}`,
    `L ${start.x} ${midY - clampedR}`,
    `Q ${start.x} ${midY}, ${start.x + dirX * clampedR} ${midY}`,
    `L ${end.x - dirX * clampedR} ${midY}`,
    `Q ${end.x} ${midY}, ${end.x} ${midY + clampedR}`,
    `L ${end.x} ${end.y}`,
  ].join(" ");
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

function JourneyStepCard({
  step,
  stepId,
  active,
}: {
  step: JourneyStep;
  stepId: string;
  active: boolean;
}) {
  const Icon = JOURNEY_ICONS[step.icon];

  return (
    <div id={stepId} className="stjourney-leader__card-wrap">
      <div
        className={`stjourney-leader__card stjourney-leader__card--${step.side}${
          "repair" in step && step.repair ? " stjourney-leader__card--repair" : ""
        }${active ? " stjourney-leader__card--active" : ""}`}
      >
        <div className="stjourney-leader__card-body">
          <div className="stjourney-leader__card-main">
            <div className="stjourney-leader__card-title-row">
              <span className="stjourney-leader__card-icon" aria-hidden>
                <Icon size={16} strokeWidth={1.75} />
              </span>
              <h3 className="stjourney-leader__card-label">{step.label}</h3>
            </div>
            <p className="stjourney-leader__card-desc">{step.description}</p>
          </div>
          <div className="stjourney-leader__card-graphic">
            <JourneyStepGraphic id={step.id} accent={step.color} />
          </div>
        </div>
      </div>
    </div>
  );
}

function useLeaderLineGeometry(rootRef: RefObject<HTMLElement | null>, stacked: boolean) {
  const [lines, setLines] = useState<LineGeometry[]>([]);

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    const container = root.getBoundingClientRect();
    const nextLines: LineGeometry[] = [];

    for (let i = 0; i < STEP_COUNT - 1; i += 1) {
      const fromEl = queryStep(root, `step_${i + 1}`);
      const toEl = queryStep(root, `step_${i + 2}`);
      if (!fromEl || !toEl) continue;

      const { start, end, mode } = connectionPoints(
        fromEl.getBoundingClientRect(),
        toEl.getBoundingClientRect(),
        container,
      );
      const spineX = container.width / 2;
      const d =
        mode === "side" ? connectorPathSide(start, end, spineX) : connectorPathVertical(start, end);

      const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
      probe.setAttribute("d", d);
      const length = probe.getTotalLength();

      const toStep = STEPS[i + 1];
      nextLines.push({
        id: `line_${i + 1}_${i + 2}`,
        d,
        length,
        color: PATH_COLOR,
        repair: Boolean("repair" in toStep && toStep.repair),
        startX: start.x,
        startY: start.y,
        endX: end.x,
        endY: end.y,
      });
    }

    const closingEl = queryStep(root, "step_closing");
    const lastEl = queryStep(root, `step_${STEP_COUNT}`);
    if (closingEl && lastEl) {
      const spineX = container.width / 2;
      const { start, end } = connectionPointsClosing(
        lastEl.getBoundingClientRect(),
        closingEl.getBoundingClientRect(),
        container,
        spineX,
        stacked,
      );
      const d = stacked
        ? connectorPathVertical(start, end)
        : connectorPathClosing(start, end, spineX);
      const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
      probe.setAttribute("d", d);
      nextLines.push({
        id: "line_closing",
        d,
        length: probe.getTotalLength(),
        color: PATH_COLOR,
        repair: true,
        startX: start.x,
        startY: start.y,
        endX: end.x,
        endY: end.y,
      });
    }

    setLines(nextLines);
  }, [rootRef, stacked]);

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

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lineScrollProgress(fromEl: HTMLElement, toEl: HTMLElement) {
  const vh = window.innerHeight;
  const trigger = vh * LINE_SCROLL_TRIGGER;
  const fromBottom = fromEl.getBoundingClientRect().bottom;
  const toTop = toEl.getBoundingClientRect().top;

  // Stretch the draw window so progress advances gradually with scroll
  const startBound = fromBottom - vh * LINE_SCROLL_LEAD;
  const endBound = toTop + vh * LINE_SCROLL_TRAIL;
  const span = Math.max(vh * 0.28, endBound - startBound);
  const raw = clamp01((trigger - startBound) / span);
  return easeInOutCubic(raw);
}

function useSequentialJourneyReveal(
  rootRef: RefObject<HTMLElement | null>,
  ready: boolean,
) {
  const lineCount = STEP_COUNT;
  const [revealedSteps, setRevealedSteps] = useState<boolean[]>(() =>
    Array(STEP_COUNT).fill(false),
  );
  const [lineProgress, setLineProgress] = useState<number[]>(() => Array(lineCount).fill(0));
  const [closingRevealed, setClosingRevealed] = useState(false);
  const revealedRef = useRef(Array(STEP_COUNT).fill(false));
  const targetRef = useRef(Array(lineCount).fill(0));
  const displayRef = useRef(Array(lineCount).fill(0));
  const closingRef = useRef(false);

  useEffect(() => {
    if (!ready) return undefined;

    const root = rootRef.current;
    if (!root) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealStep = (index: number) => {
      if (revealedRef.current[index]) return;
      revealedRef.current[index] = true;
      setRevealedSteps([...revealedRef.current]);
    };

    const sampleTargets = () => {
      for (let index = 0; index < lineCount; index += 1) {
        const isClosing = index === lineCount - 1;
        const fromId = isClosing ? `step_${STEP_COUNT}` : `step_${index + 1}`;
        const toId = isClosing ? "step_closing" : `step_${index + 2}`;
        const fromEl = queryStep(root, fromId);
        const toEl = queryStep(root, toId);
        if (!fromEl || !toEl) continue;

        const progress = reduceMotion ? 1 : lineScrollProgress(fromEl, toEl);
        targetRef.current[index] = progress;

        if (progress > 0.06) {
          revealStep(isClosing ? STEP_COUNT - 1 : index);
        }
        if (!isClosing && progress > 0.45) {
          revealStep(index + 1);
        }
        if (isClosing && progress > 0.65 && !closingRef.current) {
          closingRef.current = true;
          setClosingRevealed(true);
        }
      }
    };

    let rafId = 0;
    let lastTs = 0;
    let running = false;

    const tick = (ts: number) => {
      sampleTargets();

      const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 0.016;
      lastTs = ts;
      const alpha = reduceMotion ? 1 : 1 - Math.exp(-dt * LINE_SMOOTH_LAMBDA);

      const next = displayRef.current.slice();
      let changed = false;
      let needsMore = false;

      for (let index = 0; index < lineCount; index += 1) {
        const target = targetRef.current[index];
        const current = next[index];
        const blended = current + (target - current) * alpha;
        const settled = Math.abs(target - blended) < 0.001;

        next[index] = settled ? target : blended;
        if (Math.abs(next[index] - displayRef.current[index]) > 0.0004) {
          changed = true;
        }
        if (!settled) needsMore = true;
      }

      if (changed) {
        displayRef.current = next;
        setLineProgress(next);
      }

      if (needsMore) {
        rafId = requestAnimationFrame(tick);
      } else {
        running = false;
        lastTs = 0;
      }
    };

    const kick = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(tick);
    };

    const observers: IntersectionObserver[] = [];

    const sectionObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealStep(0);
          kick();
        }
      });
    }, SCROLL_IO);
    sectionObs.observe(root);
    observers.push(sectionObs);

    for (let index = 0; index < STEP_COUNT; index += 1) {
      const el = queryStep(root, `step_${index + 1}`);
      if (!el) continue;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) revealStep(index);
        });
      }, SCROLL_IO);
      observer.observe(el);
      observers.push(observer);
    }

    const closingEl = queryStep(root, "step_closing");
    if (closingEl) {
      const closingObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !closingRef.current) {
            closingRef.current = true;
            setClosingRevealed(true);
          }
        });
      }, SCROLL_IO);
      closingObs.observe(closingEl);
      observers.push(closingObs);
    }

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });
    kick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      observers.forEach((o) => o.disconnect());
    };
  }, [rootRef, lineCount, ready]);

  return { revealedSteps, lineProgress, closingRevealed };
}

function PathCurrent({
  d,
  progress,
  length,
  color,
  radius,
}: {
  d: string;
  progress: number;
  length: number;
  color: string;
  radius: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);

  useLayoutEffect(() => {
    const el = pathRef.current;
    if (!el || length <= 0 || progress < 0.03 || progress > 0.97) {
      setPoint(null);
      return;
    }
    const at = el.getPointAtLength(length * progress);
    setPoint({ x: at.x, y: at.y });
  }, [d, length, progress]);

  return (
    <>
      <path ref={pathRef} d={d} fill="none" stroke="none" />
      {point ? (
        <circle
          className="stjourney-leader__current"
          cx={point.x}
          cy={point.y}
          r={radius}
          fill={color}
        />
      ) : null}
    </>
  );
}

function LeaderLineCanvas({
  lines,
  stacked,
  lineProgress,
  closingPulse,
}: {
  lines: LineGeometry[];
  stacked: boolean;
  lineProgress: number[];
  closingPulse: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="stjourney-leader__strokes" aria-hidden="true">
      {lines.map((line, index) => {
        const progress = reduce ? 1 : Math.min(1, Math.max(0, lineProgress[index] ?? 0));
        const drawn = progress > 0.01;
        const isClosingLine = index === lines.length - 1;
        const isActiveTip =
          !reduce &&
          progress > 0.55 &&
          progress < 0.98 &&
          (index === 0 || (lineProgress[index - 1] ?? 0) > 0.9);
        const closingHit = !reduce && isClosingLine && closingPulse;
        const strokeWidth = stacked ? 4 : 4.5;
        const dashOffset = line.length * (1 - progress);

        return (
          <svg
            key={line.id}
            className={`stjourney-leader__svg${
              drawn || reduce
                ? " stjourney-leader__segment--active"
                : " stjourney-leader__segment--idle"
            }`}
            style={{ zIndex: lines.length - index }}
          >
            <path
              className="stjourney-leader__track stjourney-leader__track--ghost"
              d={line.d}
              strokeWidth={strokeWidth}
            />
            <path
              className={`stjourney-leader__path${line.repair ? " stjourney-leader__path--repair" : ""}`}
              d={line.d}
              stroke={line.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${line.length}`}
              strokeDashoffset={dashOffset}
              style={{ opacity: drawn || reduce ? undefined : 0 }}
            />
            {!reduce && drawn ? (
              <PathCurrent
                d={line.d}
                progress={progress}
                length={line.length}
                color={line.color}
                radius={stacked ? 4.5 : 5}
              />
            ) : null}
            <circle
              className="stjourney-leader__link"
              cx={line.startX}
              cy={line.startY}
              r={stacked ? 3.5 : 3.75}
              fill={line.color}
              style={{ opacity: progress > 0.04 || reduce ? 1 : 0 }}
            />
            <circle
              className={`stjourney-leader__link${
                isActiveTip ? " stjourney-leader__link--active" : ""
              }${closingHit ? " stjourney-leader__link--closing-hit" : ""}`}
              cx={line.endX}
              cy={line.endY}
              r={stacked ? 3.75 : 4}
              fill={line.color}
              style={{ opacity: progress > 0.92 || reduce ? 1 : 0 }}
            />
          </svg>
        );
      })}
    </div>
  );
}

function JourneyClosingShapes() {
  return (
    <div className="stjourney-leader__closing-decor" aria-hidden>
      <span className="stjourney-leader__closing-shape stjourney-leader__closing-shape--end">
        <Image
          src="/journey/cloud-solid.png"
          alt=""
          fill
          unoptimized
          className="stjourney-leader__closing-shape-img"
        />
      </span>
      <span className="stjourney-leader__closing-shape stjourney-leader__closing-shape--start">
        <Image
          src="/journey/cloud-solid.png"
          alt=""
          fill
          unoptimized
          className="stjourney-leader__closing-shape-img"
        />
      </span>
    </div>
  );
}

function JourneyClosingCard({
  closingConnected,
  closingPulse,
  onPulseEnd,
}: {
  closingConnected: boolean;
  closingPulse: boolean;
  onPulseEnd: () => void;
}) {
  return (
    <div
      className={`stjourney-leader__closing${
        closingConnected ? " stjourney-leader__closing--active" : ""
      }${closingPulse ? " stjourney-leader__closing--pulse" : ""}`}
      onAnimationEnd={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.animationName !== "stjourney-closing-hit") return;
        onPulseEnd();
      }}
    >
      <JourneyClosingShapes />
      <div className="stjourney-leader__closing-content">
      <div className="stjourney-leader__closing-head">
        <span className="stjourney-leader__closing-eyebrow">
          <Link2 size={13} strokeWidth={2} aria-hidden />
          {problemSection.journeyClosingEyebrow}
        </span>
        <h3 className="stjourney-leader__closing-label">{problemSection.journeyClosingLabel}</h3>
      </div>

      <ol
        className="stjourney-leader__closing-flow"
        aria-label="כל שלבי המסלול מחוברים"
      >
        {CLOSING_PIPELINE_LABELS.map((label, index) => (
          <li key={label} className="stjourney-leader__closing-flow-item">
            <span
              className={`stjourney-leader__closing-flow-node${
                closingConnected ? " stjourney-leader__closing-flow-node--live" : ""
              }`}
              style={{ ["--i" as string]: index }}
            >
              <span className="stjourney-leader__closing-flow-dot" aria-hidden />
              <span className="stjourney-leader__closing-flow-label">{label}</span>
            </span>
            {index < CLOSING_PIPELINE_LABELS.length - 1 ? (
              <span
                className={`stjourney-leader__closing-flow-connector${
                  closingConnected ? " stjourney-leader__closing-flow-connector--live" : ""
                }`}
                style={{ ["--i" as string]: index }}
                aria-hidden
              />
            ) : null}
          </li>
        ))}
      </ol>

      <p className="stjourney-leader__closing-text">{problemSection.journeyClosing}</p>

      <dl className="stjourney-leader__closing-stats">
        {problemSection.journeyClosingHighlights.map((item) => (
          <div key={item.title} className="stjourney-leader__closing-stat">
            <dt className="stjourney-leader__closing-stat-title">{item.title}</dt>
            <dd className="stjourney-leader__closing-stat-detail">{item.detail}</dd>
          </div>
        ))}
      </dl>
      </div>
    </div>
  );
}

function LeaderLineJourney({ stacked }: { stacked: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const { lines, remeasure } = useLeaderLineGeometry(rootRef, stacked);
  const { revealedSteps, lineProgress, closingRevealed } = useSequentialJourneyReveal(
    rootRef,
    hydrated,
  );
  const [closingPulse, setClosingPulse] = useState(false);
  const closingConnectedRef = useRef(false);

  const closingConnected =
    Boolean(reduce) ||
    closingRevealed ||
    (lineProgress[STEP_COUNT - 1] ?? 0) >= CARD_CONNECT_PROGRESS;

  useEffect(() => {
    if (!hydrated) return undefined;
    const timers = [100, 400].map((ms) => window.setTimeout(remeasure, ms));
    return () => timers.forEach(clearTimeout);
  }, [hydrated, remeasure, stacked]);

  useEffect(() => {
    if (reduce) return;

    const connected = (lineProgress[STEP_COUNT - 1] ?? 0) >= CARD_CONNECT_PROGRESS;

    if (connected && !closingConnectedRef.current) {
      closingConnectedRef.current = true;
      setClosingPulse(true);
      return;
    }

    if (!connected) {
      closingConnectedRef.current = false;
      setClosingPulse(false);
    }
  }, [lineProgress, reduce]);

  useEffect(() => {
    if (!closingPulse) return undefined;
    const timer = window.setTimeout(() => setClosingPulse(false), 1000);
    return () => window.clearTimeout(timer);
  }, [closingPulse]);

  return (
    <div className="stjourney-leader-wrap">
      <div className={`stjourney-leader${stacked ? " stjourney-leader--stacked" : ""}`} ref={rootRef}>
        {hydrated ? (
          <LeaderLineCanvas
            lines={lines}
            stacked={stacked}
            lineProgress={lineProgress}
            closingPulse={closingPulse}
          />
        ) : null}
        <ol className="stjourney-leader__steps">
          {STEPS.map((step, index) => {
            const connected =
              reduce ||
              (index === 0
                ? (revealedSteps[0] ?? false) || (lineProgress[0] ?? 0) > 0.04
                : (lineProgress[index - 1] ?? 0) >= CARD_CONNECT_PROGRESS);

            return (
              <li
                key={step.id}
                className={`stjourney-leader__item stjourney-leader__item--${step.side}`}
              >
                <JourneyStepCard
                  step={step}
                  stepId={`step_${index + 1}`}
                  active={connected}
                />
              </li>
            );
          })}
        </ol>
        <div id="step_closing" className="stjourney-leader__closing-wrap">
          <JourneyClosingCard
            closingConnected={closingConnected}
            closingPulse={closingPulse}
            onPulseEnd={() => setClosingPulse(false)}
          />
        </div>
      </div>
    </div>
  );
}

function StaticTimeline() {
  return (
    <div className="stjourney-leader-wrap stjourney-leader-wrap--static">
      <ol className="stjourney-static" aria-label="מסלול הפנייה">
        {STEPS.map((step) => {
          const Icon = JOURNEY_ICONS[step.icon];
          return (
            <li key={step.id} className="stjourney-static__item">
              <div
                className={`stjourney-static__body stjourney-static__body--active${
                  "repair" in step && step.repair ? " stjourney-static__body--repair" : ""
                }`}
              >
                <div className="stjourney-static__main">
                  <div className="stjourney-static__title-row">
                    <span className="stjourney-static__icon" aria-hidden>
                      <Icon size={16} strokeWidth={1.75} />
                    </span>
                    <h3 className="stjourney-static__label">{step.label}</h3>
                  </div>
                  <p className="stjourney-static__desc">{step.description}</p>
                </div>
                <div className="stjourney-static__graphic">
                  <JourneyStepGraphic id={step.id} accent={step.color} />
                </div>
              </div>
            </li>
          );
        })}
        <li className="stjourney-static__closing">
          <JourneyClosingShapes />
          <span className="stjourney-static__closing-eyebrow">
            <Link2 size={13} strokeWidth={2} aria-hidden />
            {problemSection.journeyClosingEyebrow}
          </span>
          <span className="stjourney-static__closing-label">{problemSection.journeyClosingLabel}</span>
          <ol className="stjourney-static__closing-flow" aria-label="כל שלבי המסלול מחוברים">
            {CLOSING_PIPELINE_LABELS.map((label, index) => (
              <li key={label} className="stjourney-static__closing-flow-item">
                <span className="stjourney-static__closing-flow-node stjourney-static__closing-flow-node--live">
                  <span className="stjourney-static__closing-flow-dot" aria-hidden />
                  <span>{label}</span>
                </span>
                {index < CLOSING_PIPELINE_LABELS.length - 1 ? (
                  <span
                    className="stjourney-static__closing-flow-connector stjourney-static__closing-flow-connector--live"
                    aria-hidden
                  />
                ) : null}
              </li>
            ))}
          </ol>
          <span className="stjourney-static__closing-text">{problemSection.journeyClosing}</span>
          <dl className="stjourney-static__closing-stats">
            {problemSection.journeyClosingHighlights.map((item) => (
              <div key={item.title} className="stjourney-static__closing-stat">
                <dt>{item.title}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
        </li>
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
