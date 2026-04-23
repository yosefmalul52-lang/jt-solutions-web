"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MoveLeft, type LucideIcon } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";

type CtaButtonVariant = "primary" | "secondary";

interface CtaButtonProps {
  label?: string;
  children?: ReactNode;
  icon?: LucideIcon;
  variant?: CtaButtonVariant;
  href?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function CtaButton({
  label = "אני רוצה אבחון לעסק שלי",
  children,
  icon: Icon = MoveLeft,
  variant = "primary",
  href,
  className = "",
  onClick,
  type = "button",
  id,
  disabled,
}: CtaButtonProps) {
  const reduce = useReducedMotion();
  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-soft)] px-7 py-3 md:px-8 md:py-3 text-sm md:text-base font-semibold transition-shadow transition-colors transition-transform duration-200";

  const primaryClass =
    "text-white shadow-glow";

  const secondaryClass =
    "bg-white text-slate-900 border border-slate-200 shadow-premium";

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onClick) onClick(event);
    if (event.defaultPrevented || !href) return;

    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    window.location.href = href;
  };

  return (
    <motion.button
      type={type}
      id={id}
      disabled={disabled}
      dir="ltr"
      className={`${baseClass} ${variant === "primary" ? primaryClass : secondaryClass} ${className}`.trim()}
      style={variant === "primary" ? { background: "var(--gradient-cta)", boxShadow: "var(--shadow-glow)" } : undefined}
      onClick={handleClick}
      whileHover={
        reduce
          ? undefined
          : variant === "primary"
            ? { scale: 1.05, filter: "brightness(1.06)", boxShadow: "var(--shadow-glow-active)" }
            : { scale: 1.02, backgroundColor: "#F8FAFC", boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08)" }
      }
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      <Icon size={18} strokeWidth={2.2} style={{ color: variant === "primary" ? "#ffffff" : "#475569" }} />
      <span dir="rtl">{children ?? label}</span>
    </motion.button>
  );
}
