"use client";

import {
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  Megaphone,
  Globe,
  MessageCircle,
  Database,
  Workflow,
  LineChart,
  BellRing,
  Palette,
  Building2,
  type LucideIcon,
} from "lucide-react";
import PremiumReveal from "@/components/motion/PremiumReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { systemMapSection } from "@/lib/home-funnel";
import "./solution-system-section.css";

const SERVICE_ICONS: LucideIcon[] = [
  Globe,
  Megaphone,
  MessageCircle,
  Database,
  Workflow,
  LineChart,
  BellRing,
  Palette,
];

/** Grid row placement — near (4) + far (4) share 4 rows for aligned connectors */
const HUB_NEAR_SLOTS = [
  { index: 0, row: 1 },
  { index: 1, row: 2 },
  { index: 2, row: 3 },
  { index: 3, row: 4 },
] as const;

const HUB_FAR_SLOTS = [
  { index: 4, row: 1 },
  { index: 5, row: 2 },
  { index: 6, row: 3 },
  { index: 7, row: 4 },
] as const;

const HUB_ALL_SLOTS = [
  ...HUB_NEAR_SLOTS.map(({ index, row }) => ({ index, side: "near" as const, row })),
  ...HUB_FAR_SLOTS.map(({ index, row }) => ({ index, side: "far" as const, row })),
];

type HubPoint = { x: number; y: number };

type HubCurveMetric = {
  index: number;
  side: "near" | "far";
  start: HubPoint;
  end: HubPoint;
  d: string;
};

type HubMetrics = {
  width: number;
  height: number;
  center: HubPoint;
  centerRadius: number;
  curves: HubCurveMetric[];
};

function buildHubCurvePath(
  sx: number,
  sy: number,
  endX: number,
  endY: number,
  cx: number,
  cy: number,
  side: "near" | "far",
): string {
  const span = Math.hypot(sx - endX, sy - endY);
  const pull = Math.min(96, Math.max(36, span * 0.38));

  if (side === "near") {
    const c1x = sx - pull;
    const c1y = sy;
    const c2x = endX + pull * 0.42;
    const c2y = endY + (sy - cy) * 0.1;
    return `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`;
  }

  const c1x = sx + pull;
  const c1y = sy;
  const c2x = endX - pull * 0.42;
  const c2y = endY + (sy - cy) * 0.1;
  return `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`;
}

function measureHubGeometry(
  hubEl: HTMLElement,
  centerEl: HTMLElement,
  nodeEls: Record<number, HTMLElement | null>,
): HubMetrics | null {
  const hubRect = hubEl.getBoundingClientRect();
  if (hubRect.width < 10 || hubRect.height < 10) return null;

  const centerRect = centerEl.getBoundingClientRect();
  const cx = centerRect.left + centerRect.width / 2 - hubRect.left;
  const cy = centerRect.top + centerRect.height / 2 - hubRect.top;
  const centerRadius = Math.min(centerRect.width, centerRect.height) * 0.5;

  const curves: HubCurveMetric[] = [];

  for (const { index, side } of HUB_ALL_SLOTS) {
    const nodeEl = nodeEls[index];
    if (!nodeEl) continue;

    const nodeRect = nodeEl.getBoundingClientRect();
    const sy = nodeRect.top + nodeRect.height / 2 - hubRect.top;
    const sx =
      side === "near"
        ? nodeRect.left - hubRect.left
        : nodeRect.right - hubRect.left;

    const dx = cx - sx;
    const dy = cy - sy;
    const dist = Math.hypot(dx, dy) || 1;
    const endX = cx - (dx / dist) * centerRadius;
    const endY = cy - (dy / dist) * centerRadius;

    curves.push({
      index,
      side,
      start: { x: sx, y: sy },
      end: { x: endX, y: endY },
      d: buildHubCurvePath(sx, sy, endX, endY, cx, cy, side),
    });
  }

  return {
    width: hubRect.width,
    height: hubRect.height,
    center: { x: cx, y: cy },
    centerRadius,
    curves,
  };
}

function HubCurvesOverlay({
  uid,
  metrics,
}: {
  uid: string;
  metrics: HubMetrics;
}) {
  const { width, height, center, centerRadius, curves } = metrics;
  const outerRing = centerRadius + 28;
  const innerRing = centerRadius + 10;

  return (
    <svg
      className="solution-hub__curves"
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
    >
      <defs>
        <radialGradient id={`${uid}-hub-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width={width} height={height} fill={`url(#${uid}-hub-glow)`} opacity="0.45" />
      <ellipse
        cx={center.x}
        cy={center.y}
        rx={outerRing}
        ry={outerRing}
        className="solution-hub__curve-ring"
      />
      <ellipse
        cx={center.x}
        cy={center.y}
        rx={innerRing}
        ry={innerRing}
        className="solution-hub__curve-ring solution-hub__curve-ring--inner"
      />

      {curves.map(({ index, start, d }) => {
        const color = systemMapSection.services[index].color;

        return (
          <g
            key={index}
            className="solution-hub__curve-group is-active"
            style={
              {
                ["--curve-color" as string]: color,
                ["--flow-delay" as string]: `${index * 0.62}s`,
              } as CSSProperties
            }
          >
            <path d={d} className="solution-hub__curve-track" />
            <path d={d} className="solution-hub__curve-flow" />
            <circle cx={start.x} cy={start.y} r={3.5} className="solution-hub__curve-port" />
          </g>
        );
      })}

      <circle cx={center.x} cy={center.y} r={4.5} className="solution-hub__curve-core" />
    </svg>
  );
}

function SolutionHubDesktop({ uid }: { uid: string }) {
  const hubRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const nodeEls = useRef<Record<number, HTMLElement | null>>({});
  const [metrics, setMetrics] = useState<HubMetrics | null>(null);

  const remeasure = useCallback(() => {
    const hub = hubRef.current;
    const center = centerRef.current;
    if (!hub || !center) return;
    const next = measureHubGeometry(hub, center, nodeEls.current);
    if (next) setMetrics(next);
  }, []);

  useLayoutEffect(() => {
    remeasure();

    const hub = hubRef.current;
    if (!hub) return;

    const observer = new ResizeObserver(() => remeasure());
    observer.observe(hub);

    window.addEventListener("resize", remeasure);
    const t1 = window.setTimeout(remeasure, 100);
    const t2 = window.setTimeout(remeasure, 450);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", remeasure);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [remeasure]);

  const registerNode = useCallback(
    (index: number, el: HTMLSpanElement | null) => {
      nodeEls.current[index] = el;
      if (el) requestAnimationFrame(() => remeasure());
    },
    [remeasure],
  );

  return (
    <div
      ref={hubRef}
      className="solution-hub"
      role="img"
      aria-label="העסק שלך במרכז, מחובר לכלים דיגיטליים משני הצדדים"
    >
      {metrics ? <HubCurvesOverlay uid={uid} metrics={metrics} /> : null}

      <div className="solution-hub__col solution-hub__col--near">
        {HUB_NEAR_SLOTS.map(({ index, row }) => (
          <HubNode
            key={systemMapSection.services[index].label}
            index={index}
            side="near"
            row={row}
            registerNode={registerNode}
          />
        ))}
      </div>

      <div className="solution-hub__center-wrap">
        <span className="solution-hub__center-halo" aria-hidden />
        <div ref={centerRef} className="solution-hub__center is-active">
          <span className="solution-hub__center-kicker">מרכז המערכת</span>
          <span className="solution-hub__center-icon" aria-hidden>
            <Building2 size={24} strokeWidth={1.75} />
          </span>
          <span className="solution-hub__center-title">{systemMapSection.centerTitle}</span>
          <span className="solution-hub__center-status">{systemMapSection.centerStatus}</span>
        </div>
      </div>

      <div className="solution-hub__col solution-hub__col--far">
        {HUB_FAR_SLOTS.map(({ index, row }) => (
          <HubNode
            key={systemMapSection.services[index].label}
            index={index}
            side="far"
            row={row}
            registerNode={registerNode}
          />
        ))}
      </div>
    </div>
  );
}

function HubNode({
  index,
  side,
  row,
  registerNode,
}: {
  index: number;
  side: "near" | "far";
  row: number;
  registerNode: (index: number, el: HTMLSpanElement | null) => void;
}) {
  const service = systemMapSection.services[index];
  const Icon = SERVICE_ICONS[index];

  return (
    <div
      className={`solution-hub__row solution-hub__row--${side} is-active`}
      style={
        {
          ["--node" as string]: service.color,
          ["--flow-delay" as string]: `${index * 0.62}s`,
          gridRow: row,
        } as CSSProperties
      }
      aria-label={`${service.label} — ${service.hint}`}
    >
      <span
        className="solution-hub__node"
        ref={(el) => registerNode(index, el)}
      >
        <span className="solution-hub__node-icon">
          <Icon size={18} strokeWidth={2} aria-hidden />
        </span>
        <span className="solution-hub__node-text">
          <span className="solution-hub__node-label">{service.label}</span>
          <span className="solution-hub__node-hint">{service.hint}</span>
        </span>
      </span>
    </div>
  );
}

export default function SolutionSection() {
  const uid = useId().replace(/:/g, "");

  return (
    <section id="solution" className="solution-system home-section section-shell" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="solution-system__content solution-system__content--hub-only">
          <SectionHeader
            accent="מערכת"
            after=" אחת — מהתנועה ועד הסגירה!"
            accentColor="#2563EB"
          />

          <div className="solution-system__bridge-head">
            <h3 className="solution-system__map-title">
              {systemMapSection.headlineBefore}
              <span className="solution-system__map-title-accent">
                {systemMapSection.headlineAccent}
              </span>
              {systemMapSection.headlineAfter}
            </h3>
            <p className="solution-system__map-subline">{systemMapSection.subline}</p>
          </div>

          <div className="solution-system__map">
            <PremiumReveal className="solution-hub-wrap hidden lg:block" variant="fade" delay={0.08}>
              <div className="solution-hub-canvas">
                <span className="solution-hub-canvas__noise" aria-hidden />
                <span className="solution-hub-canvas__grid" aria-hidden />
                <span className="solution-hub-canvas__vignette" aria-hidden />

                <SolutionHubDesktop uid={uid} />
              </div>
            </PremiumReveal>

            <div className="solution-hub-mobile lg:hidden">
              <div className="solution-hub-mobile__stage">
                <div className="solution-hub-mobile__center is-active">
                  <span className="solution-hub__center-kicker">מרכז המערכת</span>
                  <span className="solution-hub__center-icon" aria-hidden>
                    <Building2 size={22} strokeWidth={1.75} />
                  </span>
                  <span className="solution-hub__center-title">{systemMapSection.centerTitle}</span>
                  <span className="solution-hub__center-status">{systemMapSection.centerStatus}</span>
                </div>
                <span className="solution-hub-mobile__beam" aria-hidden />
              </div>
              <ul className="solution-hub-mobile__list">
                {systemMapSection.services.map((service, i) => {
                  const Icon = SERVICE_ICONS[i];
                  return (
                    <PremiumReveal as="li" key={service.label} variant="rise" delay={0.03 + i * 0.03}>
                      <div
                        className="solution-hub-mobile__item is-active"
                        style={{ ["--node" as string]: service.color } as CSSProperties}
                      >
                        <span className="solution-hub-mobile__rail" aria-hidden />
                        <span className="solution-hub-mobile__icon">
                          <Icon size={17} strokeWidth={2} aria-hidden />
                        </span>
                        <span className="solution-hub-mobile__copy">
                          <span className="solution-hub-mobile__label">{service.label}</span>
                          <span className="solution-hub-mobile__hint">{service.hint}</span>
                        </span>
                      </div>
                    </PremiumReveal>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
