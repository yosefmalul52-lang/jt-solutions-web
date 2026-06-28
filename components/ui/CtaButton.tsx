"use client";

import Link from "next/link";
import { Loader2, MoveLeft, type LucideIcon } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";
import {
  getButtonClasses,
  type ButtonShine,
  type ButtonSize,
  type ButtonVariant,
} from "@/lib/button-variants";
import { trackCtaClick } from "@/lib/analytics/track";

export type CtaButtonProps = {
  label?: string;
  children?: ReactNode;
  icon?: LucideIcon | null;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  shine?: ButtonShine;
  hideIcon?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  ctaLocation?: string;
};

function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

function isInternalPath(href: string): boolean {
  return href.startsWith("/") && !isExternalHref(href);
}

function ButtonSpinner() {
  return <Loader2 className="btn__spinner" size={16} aria-hidden />;
}

function ButtonInner({
  label,
  icon: Icon,
  loading,
  hideIcon,
  variant,
  children,
}: {
  label?: string;
  icon?: LucideIcon | null;
  loading?: boolean;
  hideIcon?: boolean;
  variant: ButtonVariant;
  children?: ReactNode;
}) {
  const showIcon = !hideIcon && Icon !== null && !loading;
  const ResolvedIcon = Icon ?? MoveLeft;
  const showAccent = variant === "primary" && !loading;

  return (
    <span className="btn__content">
      {loading ? <ButtonSpinner /> : null}
      {showIcon ? <ResolvedIcon size={17} strokeWidth={2.25} className="btn__icon" aria-hidden /> : null}
      <span dir="rtl" className="btn__label">
        {showAccent ? <span className="btn__accent" aria-hidden /> : null}
        {children ?? label}
      </span>
    </span>
  );
}

export default function CtaButton({
  label = "קבל אבחון דיגיטלי חינם",
  children,
  icon,
  variant = "gradient",
  size = "md",
  href,
  className = "",
  onClick,
  type = "button",
  id,
  disabled,
  loading = false,
  fullWidth,
  shine = "auto",
  hideIcon = false,
  ctaLocation,
}: CtaButtonProps) {
  const isDisabled = Boolean(disabled || loading);
  const isLink = Boolean(href) && type !== "submit" && type !== "reset";
  const classNames = getButtonClasses({
    variant,
    size,
    fullWidth,
    loading,
    disabled: isDisabled,
    shine,
    className,
  });

  const trackClick = () => {
    if (ctaLocation) {
      trackCtaClick(ctaLocation, typeof children === "string" ? children : label);
    }
  };

  const inner = (
    <ButtonInner
      label={label}
      icon={icon}
      loading={loading}
      hideIcon={hideIcon}
      variant={variant}
    >
      {children}
    </ButtonInner>
  );

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isDisabled) return;
    trackClick();
    onClick?.(event);
  };

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }
    trackClick();
    onClick?.(event);
  };

  if (!isLink) {
    return (
      <button
        type={type}
        id={id}
        disabled={isDisabled}
        dir="ltr"
        className={classNames}
        onClick={handleButtonClick}
        aria-busy={loading || undefined}
      >
        {inner}
      </button>
    );
  }

  const linkHref = href!;
  const external = isExternalHref(linkHref);

  if (isInternalPath(linkHref)) {
    return (
      <Link
        href={linkHref}
        id={id}
        dir="ltr"
        className={classNames}
        onClick={handleLinkClick}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : undefined}
      >
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={isDisabled ? undefined : linkHref}
      id={id}
      dir="ltr"
      className={classNames}
      onClick={handleLinkClick}
      aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled ? -1 : undefined}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  );
}
