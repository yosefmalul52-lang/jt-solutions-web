import type { ReactNode } from "react";

type StudioPanelVariant = "glass-dark" | "glass-light" | "elevated" | "editorial" | "metric";

type StudioPanelProps = {
  children: ReactNode;
  variant?: StudioPanelVariant;
  className?: string;
  as?: "div" | "article" | "section";
};

const VARIANT_CLASS: Record<StudioPanelVariant, string> = {
  "glass-dark": "surface-glass-dark",
  "glass-light": "surface-glass-light",
  elevated: "surface-elevated",
  editorial: "surface-editorial",
  metric: "surface-metric",
};

export default function StudioPanel({
  children,
  variant = "elevated",
  className = "",
  as: Tag = "div",
}: StudioPanelProps) {
  return <Tag className={`${VARIANT_CLASS[variant]} ${className}`.trim()}>{children}</Tag>;
}

export function EditorialCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <article className={`surface-editorial ${className}`.trim()}>{children}</article>;
}

export function GlassPanel({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className={`${tone === "dark" ? "surface-glass-dark" : "surface-glass-light"} ${className}`.trim()}>
      {children}
    </div>
  );
}

export function MetricPanel({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`surface-metric ${className}`.trim()}>
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <span className="mt-1 block text-sm font-bold text-emerald-700">{value}</span>
    </div>
  );
}
