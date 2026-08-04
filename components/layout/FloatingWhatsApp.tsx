"use client";

import { usePathname } from "next/navigation";
import { trackWhatsAppClick } from "@/lib/analytics/track";
import { WHATSAPP_URL } from "@/lib/floating-buttons";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("floating_fab")}
      aria-label="שיחה ב-WhatsApp"
      className="jt-floating-whatsapp"
    >
      <WhatsAppIcon aria-hidden className="relative z-[2] h-7 w-7 text-white" />
    </a>
  );
}
