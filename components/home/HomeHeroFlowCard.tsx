import type { CSSProperties } from "react";
import { Globe, MessageCircle, Inbox, BellRing, CheckCircle2 } from "lucide-react";

const systemSteps = [
  { label: "תנועה", hint: "פרסום, חיפוש, המלצה", icon: Globe, color: "#2563EB" },
  { label: "פנייה", hint: "טופס או וואטסאפ", icon: MessageCircle, color: "#10B981" },
  { label: "CRM", hint: "ליד נכנס מסודר", icon: Inbox, color: "#7C3AED", active: true },
  { label: "מעקב", hint: "מי צריך חזרה ומתי", icon: BellRing, color: "#2563EB" },
  { label: "סגירה", hint: "תהליך מכירה ברור", icon: CheckCircle2, color: "#10B981" },
] as const;

export default function HomeHeroFlowCard() {
  return (
    <div className="home-system-card" aria-hidden="true">
      <div className="home-system-card__head">
        <span className="home-system-dots">
          <span />
          <span />
          <span />
        </span>
        <span className="text-xs font-semibold text-slate-500">מערכת הלידים שלך</span>
      </div>

      <div className="home-system-steps">
        <div className="home-system-line" aria-hidden>
          <svg width="2" height="100%" viewBox="0 0 2 100" preserveAspectRatio="none" fill="none">
            <line x1="1" y1="0" x2="1" y2="100" stroke="#e2e8f0" strokeWidth="2" />
            <line
              className="cm-flow-path--dash"
              x1="1"
              y1="0"
              x2="1"
              y2="100"
              stroke="#2563eb"
              strokeWidth="2"
            />
          </svg>
        </div>

        {systemSteps.map((step) => {
          const Icon = step.icon;
          return (
            <div className="home-system-step" key={step.label}>
              <span
                className="flow-node relative"
                style={{ ["--node" as string]: step.color } as CSSProperties}
              >
                {"active" in step && step.active ? <span className="home-system-pulse" aria-hidden /> : null}
                <Icon size={16} strokeWidth={2.2} className="relative" aria-hidden />
              </span>
              <span className="home-system-step__body">
                <span className="home-system-step__label">{step.label}</span>
                <span className="home-system-step__hint">{step.hint}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
