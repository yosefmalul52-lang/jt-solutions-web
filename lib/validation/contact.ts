import { z } from "zod";

/** Displayed as "מה הכי דחוף לך כרגע?" — stored in API field `service` for backward compatibility */
export const contactUrgencyOptions = [
  "אין לי אתר / האתר ישן",
  "אני צריך דף נחיתה לקמפיין",
  "אני רוצה יותר פניות",
  "אני רוצה לסדר לידים בוואטסאפ/CRM",
  "אני רוצה חנות אונליין",
  "אני לא בטוח — צריך הכוונה",
] as const;

export const contactServiceOptions = contactUrgencyOptions;

export function normalizeIsraeliPhone(value: string): string {
  const trimmed = value.trim();
  let digits = trimmed.startsWith("+")
    ? trimmed.slice(1).replace(/\D/g, "")
    : trimmed.replace(/\D/g, "");

  if (digits.startsWith("972")) {
    digits = `0${digits.slice(3)}`;
  }

  return digits;
}

export function isValidIsraeliPhone(value: string): boolean {
  const digits = normalizeIsraeliPhone(value);

  if (digits.length < 9 || digits.length > 10) return false;
  if (!digits.startsWith("0")) return false;
  if (/^(\d)\1+$/.test(digits)) return false;

  if (/^05\d{8}$/.test(digits)) return true;
  if (/^0[2-47-9]\d{7,8}$/.test(digits)) return true;

  return false;
}

export const contactSchema = z.object({
  name: z.string().trim().min(2, "אנא הזן שם תקין (לפחות 2 אותיות)"),
  phone: z.preprocess(
    (value) => (typeof value === "string" ? normalizeIsraeliPhone(value) : value),
    z.string().refine(isValidIsraeliPhone, "מספר טלפון לא תקין"),
  ),
  email: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || z.string().email().safeParse(value).success,
      "כתובת אימייל לא תקינה",
    )
    .optional()
    .or(z.literal(""))
    .transform((value) => (value ? value : undefined)),
  service: z
    .string()
    .trim()
    .refine((value) => contactUrgencyOptions.includes(value as (typeof contactUrgencyOptions)[number]), {
      message: "יש לבחור אפשרות מהרשימה",
    }),
  message: z
    .string()
    .trim()
    .max(2000, "ההודעה ארוכה מדי")
    .optional()
    .or(z.literal(""))
    .transform((value) => (value ? value : undefined)),
  pagePath: z.string().trim().max(500).optional(),
});

export type ContactPayloadInput = z.input<typeof contactSchema>;
export type ContactPayload = z.output<typeof contactSchema>;

export const contactApiSchema = contactSchema.extend({
  submittedAt: z.string().datetime().optional(),
});

export type ContactApiPayload = z.output<typeof contactApiSchema>;
