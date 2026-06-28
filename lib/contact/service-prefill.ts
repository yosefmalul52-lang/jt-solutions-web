import { contactUrgencyOptions } from "@/lib/validation/contact";

export const serviceParamMap: Record<string, (typeof contactUrgencyOptions)[number]> = {
  website: "אין לי אתר / האתר ישן",
  landing: "אני צריך דף נחיתה לקמפיין",
  ecommerce: "אני רוצה חנות אונליין",
  branding: "אני רוצה יותר פניות",
  automation: "אני רוצה לסדר לידים בוואטסאפ/CRM",
  marketing: "אני רוצה יותר פניות",
};

export function mapServiceParamToOption(
  param: string | null | undefined,
): (typeof contactUrgencyOptions)[number] | null {
  if (!param) return null;
  const normalized = param.trim().toLowerCase();
  return serviceParamMap[normalized] ?? null;
}

export function buildContactHref(serviceParam: keyof typeof serviceParamMap | string): string {
  return `/?service=${serviceParam}#contact`;
}

export const serviceRelatedLinks: Record<
  (typeof contactUrgencyOptions)[number],
  { label: string; href: string }
> = {
  "אין לי אתר / האתר ישן": { label: "בניית אתרים ודפי נחיתה", href: "/services/websites" },
  "אני צריך דף נחיתה לקמפיין": { label: "ראו פרויקט דומה — EB Hair", href: "/projects/eb-hair" },
  "אני רוצה יותר פניות": { label: "שיווק דיגיטלי ותשתית פרסום", href: "/services/digital-marketing" },
  "אני רוצה לסדר לידים בוואטסאפ/CRM": {
    label: "ראו פרויקט דומה — אוטומציה",
    href: "/projects/ai-automation",
  },
  "אני רוצה חנות אונליין": { label: "ראו פרויקט דומה — Magadim", href: "/projects/magadim" },
  "אני לא בטוח — צריך הכוונה": { label: "כל השירותים", href: "/services" },
};

export const POST_LEAD_WHATSAPP_MESSAGE =
  "היי, שלחתי עכשיו פנייה דרך האתר של JT Solutions ואשמח להמשך שיחת התאמה.";

export function getPostLeadWhatsAppUrl(): string {
  return `https://wa.me/972528240230?text=${encodeURIComponent(POST_LEAD_WHATSAPP_MESSAGE)}`;
}
