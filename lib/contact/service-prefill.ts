import { contactUrgencyOptions } from "@/lib/validation/contact";

export const serviceParamMap: Record<string, (typeof contactUrgencyOptions)[number]> = {
  website: "אין לי אתר / האתר ישן",
  landing: "אני צריך דף נחיתה לקמפיין",
  ecommerce: "אני רוצה חנות אונליין",
  branding: "אני רוצה לבנות את המותג שלי",
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
  "אין לי אתר / האתר ישן": { label: "איך המעטפת עובדת", href: "/#solution" },
  "אני צריך דף נחיתה לקמפיין": { label: "ראו עבודות לדוגמה", href: "/#projects" },
  "אני רוצה יותר פניות": { label: "מסלולי צמיחה", href: "/#pathways" },
  "אני רוצה לסדר לידים בוואטסאפ/CRM": {
    label: "ראו עבודות לדוגמה",
    href: "/#projects",
  },
  "אני רוצה חנות אונליין": { label: "ראו עבודות לדוגמה", href: "/#projects" },
  "אני רוצה לבנות את המותג שלי": { label: "איך המעטפת עובדת", href: "/#solution" },
  "אני עדיין לא בטוח..": { label: "מסלולים ומחירים", href: "/#pathways" },
  "אני לא בטוח — צריך הכוונה": { label: "מסלולים ומחירים", href: "/#pathways" },
};

export const POST_LEAD_WHATSAPP_MESSAGE =
  "היי, שלחתי עכשיו פנייה דרך האתר של JT Solutions ואשמח להמשך שיחת התאמה.";

export function getPostLeadWhatsAppUrl(): string {
  return `https://wa.me/972528240230?text=${encodeURIComponent(POST_LEAD_WHATSAPP_MESSAGE)}`;
}
