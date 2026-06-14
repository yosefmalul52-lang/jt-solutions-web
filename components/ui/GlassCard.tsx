import type { ElementType, ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  /** Subtle lift + shadow on hover */
  hover?: boolean;
  as?: ElementType;
};

export default function GlassCard({
  children,
  className = "",
  hover = false,
  as: Tag = "div",
}: GlassCardProps) {
  return (
    <Tag
      className={[
        "glass-panel rounded-[var(--radius)] backdrop-blur-md",
        hover ? "hover-lift transition-all duration-300 ease-out" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
