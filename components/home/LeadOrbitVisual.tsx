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

// Deterministic polar positions (no Math.random → no hydration mismatch).
const POSITIONS = NODES.map((_, i) => {
  const angle = (-90 + i * (360 / N)) * (Math.PI / 180);
  return {
    nodeX: 50 + 40 * Math.cos(angle),
    nodeY: 50 + 40 * Math.sin(angle),
    lineX: 50 + 37 * Math.cos(angle),
    lineY: 50 + 37 * Math.sin(angle),
  };
});

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
      {/* Desktop / tablet: orbit */}
      <div
        className="orbit-visual hidden sm:block"
        role="img"
        aria-label="מערכת לידים שמחברת קמפיינים, דף נחיתה, אתר, טופס, וואטסאפ, CRM, מעקב ומדידה"
      >
        <svg className="orbit-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {POSITIONS.map((pos, i) => {
            const isActive = i === active;
            return (
              <line
                key={NODES[i].label}
                x1="50"
                y1="50"
                x2={pos.lineX}
                y2={pos.lineY}
                stroke={isActive ? NODES[i].color : "#e2e8f0"}
                strokeWidth={isActive ? 1.1 : 0.6}
                strokeLinecap="round"
                style={{ transition: "stroke 500ms ease, stroke-width 500ms ease" }}
              />
            );
          })}
        </svg>

        <div className="orbit-center" aria-hidden style={{ color: activeNode.color }}>
          <ActiveIcon size={22} strokeWidth={1.9} aria-hidden />
          <span className="orbit-center__service">{activeNode.label}</span>
        </div>

        {NODES.map((node, i) => {
          const Icon = node.icon;
          const pos = POSITIONS[i];
          return (
            <div
              key={node.label}
              className={`orbit-node ${i === active ? "is-active" : ""}`}
              style={
                {
                  left: `${pos.nodeX}%`,
                  top: `${pos.nodeY}%`,
                  ["--node"]: node.color,
                } as CSSProperties
              }
              aria-hidden
            >
              <span className="orbit-node__icon">
                <Icon size={18} strokeWidth={2} aria-hidden />
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
