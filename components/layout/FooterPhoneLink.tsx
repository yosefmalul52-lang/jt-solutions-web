"use client";

import { trackPhoneClick } from "@/lib/analytics/track";
import { contactLinks } from "@/lib/site";

type FooterPhoneLinkProps = {
  className?: string;
};

export default function FooterPhoneLink({ className }: FooterPhoneLinkProps) {
  return (
    <a
      href={`tel:${contactLinks.phone}`}
      onClick={() => trackPhoneClick("footer")}
      className={
        className ??
        "text-sm text-[#6B7280] transition-colors duration-200 hover:text-[#22C55E]"
      }
    >
      052-8240230
    </a>
  );
}
