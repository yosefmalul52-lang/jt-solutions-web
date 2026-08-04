import { normalizeIsraeliPhone } from "@/lib/validation/contact";

/** Convert local Israeli phone to E.164 digits for wa.me (972…) */
export function toWhatsAppDigits(phone: string): string | null {
  const local = normalizeIsraeliPhone(phone);
  if (!local.startsWith("0") || local.length < 9) return null;
  return `972${local.slice(1)}`;
}

export function whatsappHref(phone: string, text?: string): string | null {
  const digits = toWhatsAppDigits(phone);
  if (!digits) return null;
  const base = `https://wa.me/${digits}`;
  if (!text?.trim()) return base;
  return `${base}?text=${encodeURIComponent(text.trim())}`;
}

export function telHref(phone: string): string | null {
  const local = normalizeIsraeliPhone(phone);
  if (!local) return null;
  return `tel:${local}`;
}
