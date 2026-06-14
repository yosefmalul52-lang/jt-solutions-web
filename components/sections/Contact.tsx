"use client";

import { useState } from "react";
import { Send, Mail, Phone, Facebook, Instagram } from "lucide-react";
import MaskedHeadline from "@/components/motion/MaskedHeadline";
import Reveal from "@/components/motion/Reveal";
import { trackPhoneClick, trackCtaClick } from "@/lib/analytics/track";
import { contactLinks } from "@/lib/site";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  contactServiceOptions,
  type ContactPayload,
  type ContactPayloadInput,
} from "@/lib/validation/contact";

type ContactFormData = ContactPayload;

const inputClass = "rounded-2xl bg-[#F9FAFB] border border-[rgba(0,0,0,0.08)] text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all duration-200 w-full px-4 py-3";
const labelClass = "block text-xs font-semibold text-gray-600 mb-1.5";

export default function Contact() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactPayloadInput, unknown, ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      trackCtaClick("contact_form", "קובעים שיחת התאמה");
      setSubmitError(null);
      setIsSuccess(false);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          message: data.message?.trim() || "ללא הודעה נוספת.",
        }),
      });

      if (!response.ok) {
        throw new Error("request_failed");
      }

      // Track successful lead generation (only after API returns OK).
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", { currency: "ILS", value: 100 });
      }

      // Match Meta Pixel conversion tracking used elsewhere in the project.
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }

      setIsSuccess(true);
      reset();
    } catch {
      setSubmitError("אירעה שגיאה בשליחה. נסה שוב בעוד רגע.");
    }
  };

  return (
    <>
      <section
        id="contact"
        className="pt-8 md:pt-12 pb-16 md:pb-24 lg:pb-32 relative overflow-hidden bg-[#F9FAFB]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <MaskedHeadline
              as="h2"
              className="premium-title mb-4"
              viewportKey="section"
              lines={[
                "מוכנים למעטפת דיגיטלית אחת שעובדת?",
                <span key="grad" className="gradient-text">
                  בואו נבנה תהליך שמייצר תוצאות
                </span>,
              ]}
            />
            <p className="premium-subtitle max-w-2xl mx-auto">
              משאירים פרטים, קובעים שיחה קצרה ומקבלים כיוון ברור לצעד הבא.
            </p>
            <p className="text-sm mt-3" style={{ color: "#64748B" }}>
              חוזרים אליכם עד 24 שעות, ובשיחה תקבלו המלצה ברורה למסלול שמתאים לעסק.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <Reveal
              className="lg:col-span-2 flex flex-col gap-4"
              viewportKey="inView"
              x={-24}
              y={0}
              duration={0.6}
              delay={0.1}
            >
              <div
                className="space-y-4 rounded-[var(--radius)] p-4 sm:p-5"
                style={{ background: "rgba(255,255,255,0.86)", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 12px 28px rgba(15,23,42,0.06)" }}
              >
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-0.5">פרטי יצירת קשר</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>
                    נקודת קשר אחת לכל התהליך.
                  </p>
                </div>
                <ul className="space-y-1 text-xs" style={{ color: "#4B5563" }}>
                  <li>• תהליך עבודה ברור עם אבני דרך</li>
                  <li>• מוכנות לפרסום מיד עם סיום ההקמה</li>
                </ul>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
                      style={{ background: "rgba(16,179,231,0.12)", borderColor: "rgba(16,179,231,0.28)" }}
                    >
                      <Mail size={14} className="text-[#10b3e7]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500">אימייל</div>
                      <a
                        href={`mailto:${contactLinks.email}`}
                        className="text-xs font-semibold text-slate-800 transition-colors hover:text-[#10b3e7]"
                      >
                        {contactLinks.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
                      style={{ background: "rgba(34,197,94,0.12)", borderColor: "rgba(34,197,94,0.28)" }}
                    >
                      <Phone size={14} className="text-[#22C55E]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500">טלפון</div>
                      <a
                        href={`tel:${contactLinks.phone}`}
                        onClick={() => trackPhoneClick("contact_section")}
                        className="text-xs font-semibold text-slate-800 transition-colors hover:text-[#22C55E]"
                      >
                        052-8240230
                      </a>
                    </div>
                  </div>

                  <div className="space-y-2.5 border-t border-slate-200/80 pt-3">
                    <p className="text-[11px] font-semibold text-slate-500">רשתות חברתיות</p>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
                        style={{ background: "rgba(24,119,242,0.12)", borderColor: "rgba(24,119,242,0.28)" }}
                      >
                        <Facebook size={14} className="text-[#1877F2]" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-slate-500">פייסבוק</div>
                        <a
                          href={contactLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-slate-800 transition-colors hover:text-[#1877F2]"
                        >
                          JT Solutions
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
                        style={{
                          background: "linear-gradient(145deg, rgba(225,48,108,0.14) 0%, rgba(131,58,180,0.14) 100%)",
                          borderColor: "rgba(225,48,108,0.3)",
                        }}
                      >
                        <Instagram size={14} className="text-[#E1306C]" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-slate-500">אינסטגרם</div>
                        <a
                          href={contactLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-slate-800 transition-colors hover:text-[#E1306C]"
                        >
                          @jt.solutions.il
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal
              className="lg:col-span-3"
              viewportKey="inView"
              x={24}
              y={0}
              duration={0.6}
              delay={0.2}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 sm:p-8 space-y-5 rounded-[var(--radius)]"
                style={{ background: "rgba(255,255,255,0.88)", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 16px 38px rgba(15,23,42,0.08)" }}
              >
                {isSuccess && (
                  <div className="rounded-2xl p-4 text-sm text-center font-semibold"
                    style={{ color: "#059669", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                    ✓ ההודעה נשלחה בהצלחה! נחזור אליך בהקדם עם הצעד הבא.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="home-contact-name" className={labelClass}>
                      שם מלא *
                    </label>
                    <input
                      id="home-contact-name"
                      type="text"
                      placeholder="איך לפנות אליך?"
                      className={`${inputClass} ${errors.name ? "border-red-500" : ""}`}
                      {...register("name")}
                    />
                    <div className="min-h-5">
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 animate-in fade-in slide-in-from-top-1">{errors.name.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="home-contact-phone" className={labelClass}>
                      טלפון *
                    </label>
                    <input
                      id="home-contact-phone"
                      type="tel"
                      placeholder="מספר לשיחה קצרה"
                      className={`${inputClass} ${errors.phone ? "border-red-500" : ""}`}
                      {...register("phone")}
                    />
                    <div className="min-h-5">
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 animate-in fade-in slide-in-from-top-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="home-contact-email" className={labelClass}>
                    אימייל *
                  </label>
                  <input
                    id="home-contact-email"
                    type="email"
                    placeholder="לאן לשלוח סיכום מסודר?"
                    className={`${inputClass} ${errors.email ? "border-red-500" : ""}`}
                    {...register("email")}
                  />
                  <div className="min-h-5">
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 animate-in fade-in slide-in-from-top-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="home-contact-service" className={labelClass}>
                    סוג שירות *
                  </label>
                  <select
                    id="home-contact-service"
                    className={`${inputClass} appearance-none cursor-pointer ${errors.service ? "border-red-500" : ""}`}
                    {...register("service")}
                  >
                    <option value="">בחר שירות...</option>
                    {contactServiceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="min-h-5">
                    {errors.service && (
                      <p className="text-red-500 text-sm mt-1 animate-in fade-in slide-in-from-top-1">{errors.service.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="home-contact-message" className={labelClass}>
                    הודעה
                  </label>
                  <textarea
                    id="home-contact-message"
                    rows={4}
                    placeholder="מה המטרה המרכזית שלך בחודשיים הקרובים?"
                    className={`${inputClass} resize-none ${errors.message ? "border-red-500" : ""}`}
                    {...register("message")}
                  />
                  <div className="min-h-5">
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1 animate-in fade-in slide-in-from-top-1">{errors.message.message}</p>
                    )}
                  </div>
                </div>

                {submitError && (
                  <p className="text-red-500 text-sm mt-1 animate-in fade-in slide-in-from-top-1 text-center">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(120deg, #10b3e7, #7c3aed)",
                    border: "1px solid rgba(79,70,229,0.2)",
                    boxShadow: "0 12px 28px rgba(56,189,248,0.26), 0 9px 22px rgba(91,33,182,0.2)",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      שולח...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      קובעים שיחת התאמה
                    </>
                  )}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
