"use client";

import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics/track";
import { WHATSAPP_URL } from "@/lib/floating-buttons";

type FooterWhatsAppLinkProps = {
  className?: string;
};

export default function FooterWhatsAppLink({ className }: FooterWhatsAppLinkProps) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("footer")}
      className={className}
    >
      <MessageCircle size={16} aria-hidden />
      שיחה ב-WhatsApp
    </a>
  );
}
