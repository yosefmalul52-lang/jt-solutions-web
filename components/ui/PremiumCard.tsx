import type { ReactNode } from "react";

type PremiumCardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  subtle?: boolean;
  as?: "div" | "article" | "li";
};

export default function PremiumCard({
  children,
  className = "",
  interactive = false,
  subtle = false,
  as: Tag = "div",
}: PremiumCardProps) {
  const classes = [
    "premium-card",
    interactive ? "premium-card--interactive" : "",
    subtle ? "premium-card--subtle" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
