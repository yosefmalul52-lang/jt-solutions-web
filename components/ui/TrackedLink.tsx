"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { getButtonClasses, type ButtonVariant, type ButtonSize } from "@/lib/button-variants";
import { trackCtaClick } from "@/lib/analytics/track";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  ctaLocation: string;
  ctaLabel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function TrackedLink({
  ctaLocation,
  ctaLabel,
  onClick,
  children,
  variant,
  size = "md",
  className = "",
  ...props
}: TrackedLinkProps) {
  const mergedClassName = variant
    ? getButtonClasses({ variant, size, className })
    : className;

  return (
    <Link
      {...props}
      className={mergedClassName}
      onClick={(event) => {
        trackCtaClick(
          ctaLocation,
          ctaLabel ?? (typeof children === "string" ? children : undefined),
        );
        onClick?.(event);
      }}
    >
      {variant ? <span className="btn__content">{children}</span> : children}
    </Link>
  );
}
