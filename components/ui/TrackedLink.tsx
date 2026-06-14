"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackCtaClick } from "@/lib/analytics/track";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  ctaLocation: string;
  ctaLabel?: string;
};

export default function TrackedLink({
  ctaLocation,
  ctaLabel,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackCtaClick(
          ctaLocation,
          ctaLabel ?? (typeof children === "string" ? children : undefined),
        );
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
