"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MoveLeft, type LucideIcon } from "lucide-react";
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useHydrated } from "@/hooks/useHydrated";
import { SPRING_SNAPPY } from "@/lib/motion";
import { trackCtaClick } from "@/lib/analytics/track";

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
  ctaLocation?: string;
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
  ctaLocation,
}: CtaButtonProps) {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const enableMotion = hydrated && reduce !== true;
  const { ref, x, y, handlers, disabled: magneticOff } = useMagnetic({
    disabled: disabled || !enableMotion,
  });

  const labelContent = (
    <>
      <Icon size={18} strokeWidth={2.2} style={{ color: variant === "primary" ? "#ffffff" : "#475569" }} />
      <span dir="rtl">{children ?? label}</span>
    </>
  );

  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-soft)] px-7 py-3 md:px-8 md:py-3 text-sm md:text-base font-semibold transition-shadow transition-colors duration-200";

  const primaryClass = "text-white shadow-glow";
  const secondaryClass = "bg-white text-slate-900 border border-slate-200 shadow-premium";

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (ctaLocation) {
      trackCtaClick(ctaLocation, typeof children === "string" ? children : label);
    }
    if (onClick) onClick(event);
    if (event.defaultPrevented || !href) return;

    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    window.location.href = href;
  };

  const primaryStyle: CSSProperties | undefined =
    variant === "primary"
      ? { background: "var(--gradient-cta)", boxShadow: "var(--shadow-glow)" }
      : undefined;

  const classNames = `${baseClass} ${variant === "primary" ? primaryClass : secondaryClass} ${className}`.trim();
  const inner = <span className="inline-flex items-center justify-center gap-2">{labelContent}</span>;

  if (!enableMotion) {
    return (
      <button
        type={type}
        id={id}
        disabled={disabled}
        dir="ltr"
        className={classNames}
        style={primaryStyle}
        onClick={handleClick}
      >
        {inner}
      </button>
    );
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      id={id}
      disabled={disabled}
      dir="ltr"
      className={classNames}
      style={magneticOff ? primaryStyle : { ...(primaryStyle ?? {}), x, y }}
      onClick={handleClick}
      {...handlers}
      whileHover={
        variant === "primary"
          ? { scale: 1.04, filter: "brightness(1.06)", boxShadow: "var(--shadow-glow-active)" }
          : { scale: 1.02, backgroundColor: "#F8FAFC", boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08)" }
      }
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", ...SPRING_SNAPPY }}
    >
      {inner}
    </motion.button>
  );
}
