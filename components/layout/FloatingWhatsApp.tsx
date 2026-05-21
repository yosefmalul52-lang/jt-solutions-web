"use client";

import { trackWhatsAppClick } from "@/lib/analytics/track";
import { WHATSAPP_URL } from "@/lib/floating-buttons";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("floating_fab")}
      aria-label="שיחה ב-WhatsApp"
      className="jt-floating-whatsapp"
    >
      <WhatsAppIcon aria-hidden className="h-7 w-7 text-white" />
    </a>
  );
}
