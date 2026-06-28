"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Globe,
  MessageCircle,
  Inbox,
  Phone,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

const flowSteps = [
  { num: "01", label: "מבקר", value: "נכנס לאתר", meta: "חיפוש / פרסום", icon: Globe },
  { num: "02", label: "פנייה", value: "השאיר פרטים", meta: "טופס / וואטסאפ", icon: MessageCircle },
  { num: "03", label: "ליד", value: "נכנס למערכת", meta: "נרשם אוטומטית", icon: Inbox },
  { num: "04", label: "שיחה", value: "תיאום ואבחון", meta: "כ־15 דקות", icon: Phone },
  { num: "05", label: "לקוח", value: "הצעה מסודרת", meta: "מוכן לסגירה", icon: UserCheck },
] as const satisfies ReadonlyArray<{
  num: string;
  label: string;
  value: string;
  meta: string;
  icon: LucideIcon;
}>;

type Point = { x: number; y: number };

type FlowGeometry = {
  width: number;
  height: number;
  path: string;
  anchors: Point[];
};

function buildSimplePath(points: Point[]): string {
  if (points.length < 2) return "";

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)}`;
  }
  return d;
}

type CardMotion = {
  scale: number;
  floatDelay: string;
  floatDuration: string;
};

/** Deterministic per-step motion — avoids SSR/client Math.random hydration mismatch. */
const CARD_MOTION_PRESETS: CardMotion[] = flowSteps.map((_, index) => ({
  scale: 0.96 + ((index * 17 + 11) % 80) / 1000,
  floatDelay: `${(index * 0.55 + (index % 3) * 0.27).toFixed(2)}s`,
  floatDuration: `${(4.6 + (index % 5) * 0.44).toFixed(2)}s`,
}));

export function HeroFlowVisual() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [geometry, setGeometry] = useState<FlowGeometry | null>(null);

  const updateGeometry = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackRect = track.getBoundingClientRect();
    if (trackRect.width === 0 || trackRect.height === 0) return;

    const anchors: Point[] = [];

    for (let index = 0; index < cardRefs.current.length; index++) {
      const card = cardRefs.current[index];
      if (!card) return;

      const rect = card.getBoundingClientRect();
      anchors.push({
        x: rect.left + rect.width / 2 - trackRect.left,
        y: rect.top + rect.height / 2 - trackRect.top,
      });
    }

    if (anchors.length !== flowSteps.length) return;

    setGeometry({
      width: trackRect.width,
      height: trackRect.height,
      path: buildSimplePath(anchors),
      anchors,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const scheduleUpdate = () => requestAnimationFrame(updateGeometry);

    scheduleUpdate();

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(track);

    window.addEventListener("resize", scheduleUpdate);
    const settleTimer = window.setTimeout(scheduleUpdate, 150);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
      window.clearTimeout(settleTimer);
    };
  }, [updateGeometry]);

  return (
    <div className="hero-flow" aria-hidden="true">
      <div className="hero-flow__grid" />
      <div className="hero-flow__glow hero-flow__glow--cyan" />
      <div className="hero-flow__glow hero-flow__glow--violet" />

      <div className="hero-flow__steps" ref={trackRef}>
        {geometry && geometry.width > 0 ? (
          <svg
            className="hero-flow__lines"
            width={geometry.width}
            height={geometry.height}
            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="heroFlowActiveStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B3E7" />
                <stop offset="50%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
              <filter
                id="heroFlowBlueGlow"
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
                filterUnits="objectBoundingBox"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 0 0 0.063
                          0 0 0 0 0.702
                          0 0 0 0 0.906
                          0 0 0 0.75 0"
                  result="blueBlur"
                />
                <feMerge>
                  <feMergeNode in="blueBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path className="hero-flow__path hero-flow__path--base" d={geometry.path} />
            <path
              className="hero-flow__path hero-flow__path--active"
              d={geometry.path}
              pathLength={100}
              filter="url(#heroFlowBlueGlow)"
            />
            {geometry.anchors.map((point, index) => (
              <circle
                key={flowSteps[index].num}
                className="hero-flow__node"
                cx={point.x}
                cy={point.y}
                r="5"
              />
            ))}
          </svg>
        ) : null}

        <div className="hero-flow__cards" dir="rtl">
          {flowSteps.map((step, index) => {
            const Icon = step.icon;
            const motion = CARD_MOTION_PRESETS[index];
            return (
              <div
                className="hero-flow__step-wrap"
                key={step.num}
                style={
                  {
                    "--card-scale": motion.scale,
                    "--float-delay": motion.floatDelay,
                    "--float-duration": motion.floatDuration,
                  } as CSSProperties
                }
                ref={(element) => {
                  cardRefs.current[index] = element;
                  if (element) requestAnimationFrame(updateGeometry);
                }}
              >
                <div className="hero-flow__step">
                  <div className="hero-flow__step-icon">
                    <Icon size={18} strokeWidth={2.2} aria-hidden />
                  </div>
                  <span className="hero-flow__step-num">{step.num}</span>
                  <span className="hero-flow__step-label">{step.label}</span>
                  <strong>{step.value}</strong>
                  <small>{step.meta}</small>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
