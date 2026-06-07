import { z } from "zod";

export const contactServiceOptions = [
  "דפי נחיתה ממירים",
  "אתרי תדמית מותאמים אישית",
  "חנויות איקומרס חכמות",
  "חבילת מיתוג וזהות ויזואלית",
  "ניהול קמפיינים ותשתית פרסום",
  "אוטומציה עסקית עם AI",
  "אחר / לא בטוח עדיין",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "אנא הזן שם תקין (לפחות 2 אותיות)"),
  phone: z.preprocess(
    (value) => (typeof value === "string" ? value.replace(/[^\d]/g, "") : value),
    z
      .string()
      .regex(/^05\d{8}$/, "מספר טלפון לא תקין"),
  ),
  email: z
    .string()
    .trim()
    .refine((value) => value === "" || z.string().email().safeParse(value).success, {
      message: "כתובת אימייל לא תקינה",
    }),
  service: z
    .string()
    .trim()
    .refine(
      (value) =>
        value === "" ||
        contactServiceOptions.includes(value as (typeof contactServiceOptions)[number]),
      { message: "יש לבחור שירות מהרשימה" },
    ),
  message: z
    .string()
    .trim()
    .max(2000, "ההודעה ארוכה מדי")
    .optional()
    .or(z.literal("")),
});

export type ContactPayloadInput = z.input<typeof contactSchema>;
export type ContactPayload = z.output<typeof contactSchema>;
