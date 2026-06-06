"use client";

import { trackPhoneClick } from "@/lib/analytics/track";
import { contactLinks } from "@/lib/site";

export default function FooterPhoneLink() {
  return (
    <a
      href={`tel:${contactLinks.phone}`}
      onClick={() => trackPhoneClick("footer")}
      className="text-sm text-[#6B7280] transition-colors duration-200 hover:text-[#22C55E]"
    >
      052-8240230
    </a>
  );
}
