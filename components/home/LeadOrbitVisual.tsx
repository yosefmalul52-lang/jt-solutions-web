"use client";

import { useEffect, useState, type CSSProperties } from "react";
import {
  Megaphone,
  MousePointerClick,
  Globe,
  ClipboardList,
  MessageCircle,
  Database,
  BellRing,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";

type OrbitNode = {
  label: string;
  icon: LucideIcon;
  color: string;
};

const NODES: OrbitNode[] = [
  { label: "קמפיינים", icon: Megaphone, color: "#F59E0B" },
  { label: "דף נחיתה", icon: MousePointerClick, color: "#2563EB" },
  { label: "אתר", icon: Globe, color: "#2563EB" },
  { label: "טופס ליד", icon: ClipboardList, color: "#10B981" },
  { label: "וואטסאפ", icon: MessageCircle, color: "#10B981" },
  { label: "CRM", icon: Database, color: "#7C3AED" },
  { label: "מעקב", icon: BellRing, color: "#7C3AED" },
  { label: "מדידה", icon: LineChart, color: "#06B6D4" },
];

const N = NODES.length;

type OrbitRingConfig = {
  id: string;
  duration: number;
  inset: string;
  phase: number;
  direction: "normal" | "reverse";
  slots: { nodeIndex: number; angle: number; trail?: boolean }[];
};

const RINGS: OrbitRingConfig[] = [
  {
    id: "outer",
    duration: 30,
    inset: "3%",
    phase: 0,
    direction: "normal",
    slots: [
      { nodeIndex: 0, angle: 0, trail: true },
      { nodeIndex: 2, angle: 90 },
      { nodeIndex: 4, angle: 180, trail: true }, // WhatsApp
      { nodeIndex: 6, angle: 270 },
    ],
  },
  {
    id: "inner",
    duration: 42,
    inset: "21%",
    phase: 45,
    direction: "reverse",
    slots: [
      { nodeIndex: 1, angle: 0, trail: true },
      { nodeIndex: 3, angle: 90 },
      { nodeIndex: 5, angle: 180, trail: true }, // CRM
      { nodeIndex: 7, angle: 270 },
    ],
  },
];

const PATHS = [
  { inset: "3%" },
  { inset: "21%" },
] as const;

export default function LeadOrbitVisual() {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const animate = hydrated && reduce !== true;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!animate) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % N), 1900);
    return () => window.clearInterval(id);
  }, [animate]);

  const activeNode = NODES[active];
  const ActiveIcon = activeNode.icon;

  return (
    <div className="orbit-visual-wrap">
      <div
        className={`orbit-visual hidden sm:block ${animate ? "is-animated" : "is-static"}`}
        role="img"
        aria-label="מערכת לידים שמחברת קמפיינים, דף נחיתה, אתר, טופס, וואטסאפ, CRM, מעקב ומדידה"
      >
        <div className="orbit-paths" aria-hidden>
          {PATHS.map((path, i) => (
            <div
              key={i}
              className="orbit-path"
              style={{ inset: path.inset } as CSSProperties}
            />
          ))}
        </div>

        {RINGS.map((ring) => (
          <div
            key={ring.id}
            className="orbit-ring"
            style={
              {
                inset: ring.inset,
                ["--duration"]: `${ring.duration}s`,
                ["--phase"]: `${ring.phase}deg`,
                ["--direction"]: ring.direction,
              } as CSSProperties
            }
            aria-hidden
          >
            {ring.slots.map(({ nodeIndex, angle, trail }) => {
              const node = NODES[nodeIndex];
              const Icon = node.icon;
              const isActive = nodeIndex === active;
              const isTrailLead = Boolean(trail);

              return (
                <div
                  key={node.label}
                  className={`orbit-carrier${isTrailLead ? ` orbit-carrier--trail orbit-carrier--trail-${ring.direction}` : ""}`}
                  style={
                    {
                      ["--angle"]: `${angle}deg`,
                      ...(isTrailLead ? { ["--trail-color"]: node.color } : {}),
                    } as CSSProperties
                  }
                >
                  <div
                    className={`orbit-node ${isActive ? "is-active" : ""}`}
                    style={{ ["--node"]: node.color } as CSSProperties}
                  >
                    <span className="orbit-node__icon">
                      <span
                        className="orbit-node__icon-upright"
                        style={
                          {
                            ["--angle"]: `${angle}deg`,
                            ["--phase"]: `${ring.phase}deg`,
                            ["--duration"]: `${ring.duration}s`,
                            ["--direction"]: ring.direction,
                          } as CSSProperties
                        }
                      >
                        <Icon size={20} strokeWidth={2} aria-hidden />
                      </span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <div className="orbit-center" aria-hidden style={{ color: activeNode.color }}>
          <ActiveIcon size={24} strokeWidth={1.9} aria-hidden />
          <span className="orbit-center__service">{activeNode.label}</span>
        </div>
      </div>
    </div>
  );
}
