"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Send, MessageCircle, Mail, Phone } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
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
  const reduce = useReducedMotion();
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
        className="py-16 md:py-24 lg:py-32 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #F1F5FF 0%, #F8FAFF 45%, #F9FAFB 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal className="text-center mb-16" viewportKey="section" y={24} duration={0.6}>
            <span className="premium-badge mb-4">
              יוצאים לדרך
            </span>
            <h2 className="premium-title mb-4">
              מוכנים למעטפת דיגיטלית אחת שעובדת?
              <br />
              <span className="gradient-text">בואו נבנה תהליך שמייצר תוצאות</span>
            </h2>
            <p className="premium-subtitle max-w-2xl mx-auto">
              משאירים פרטים, קובעים שיחה קצרה ומקבלים כיוון ברור לצעד הבא.
            </p>
            <p className="text-sm mt-3" style={{ color: "#64748B" }}>
              חוזרים אליכם עד 24 שעות, ובשיחה תקבלו המלצה ברורה למסלול שמתאים לעסק.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <Reveal
              className="lg:col-span-2 flex flex-col gap-5"
              viewportKey="inView"
              x={-24}
              y={0}
              duration={0.6}
              delay={0.1}
            >
              <div className="p-6 space-y-6 rounded-[var(--radius)]"
                style={{ background: "rgba(255,255,255,0.86)", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 16px 38px rgba(15,23,42,0.08)" }}>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">פרטי יצירת קשר</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    נקודת קשר אחת לכל התהליך.
                  </p>
                </div>
                <ul className="space-y-2 text-sm" style={{ color: "#4B5563" }}>
                  <li>• תהליך עבודה ברור עם אבני דרך</li>
                  <li>• מוכנות לפרסום מיד עם סיום ההקמה</li>
                </ul>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(79,70,229,0.08)", border: "1px solid rgba(79,70,229,0.15)" }}>
                      <Mail size={16} style={{ color: "#4f46e5" }} />
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: "#9CA3AF" }}>אימייל</div>
                      <a href="mailto:jtsolutions.officee@gmail.com" className="text-sm font-medium text-gray-800 hover:text-indigo-600 transition-colors">
                        jtsolutions.officee@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(79,70,229,0.08)", border: "1px solid rgba(79,70,229,0.15)" }}>
                      <Phone size={16} style={{ color: "#4f46e5" }} />
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: "#9CA3AF" }}>טלפון</div>
                      <a href="tel:0528240230" className="text-sm font-medium text-gray-800 hover:text-indigo-600 transition-colors">
                        052-8240230
                      </a>
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
                    <label className={labelClass}>שם מלא *</label>
                    <input
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
                    <label className={labelClass}>טלפון *</label>
                    <input
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
                  <label className={labelClass}>אימייל *</label>
                  <input
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
                  <label className={labelClass}>סוג שירות *</label>
                  <select
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
                  <label className={labelClass}>הודעה</label>
                  <textarea
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

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {["ללא התחייבות", "ללא ספאם", "מענה אישי"].map((item) => (
                    <span
                      key={item}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ color: "#475569", background: "rgba(255,255,255,0.9)", border: "1px solid rgba(15,23,42,0.08)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
                  ללא ספאם. ללא התחייבות.
                </p>
                <p className="text-xs text-center font-semibold" style={{ color: "#5B21B6" }}>
                  מענה אישי תוך 24 שעות בימי עסקים
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <motion.a
        href="https://wa.me/972528240230?text=שלום%2C%20אני%20מעוניין%20לשמוע%20עוד%20על%20השירותים%20שלכם"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שיחה ב-WhatsApp"
        initial={reduce === true ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={
          reduce === true
            ? { duration: 0.01 }
            : { delay: 1.5, type: "spring", stiffness: 200, damping: 15 }
        }
        whileHover={reduce ? undefined : { scale: 1.1 }}
        whileTap={reduce ? undefined : { scale: 0.95 }}
        className="hidden md:flex fixed bottom-6 left-6 z-50 w-14 h-14 rounded-[var(--radius-soft)] bg-emerald-500 hover:bg-emerald-400 items-center justify-center transition-colors duration-200"
        style={{ boxShadow: "0 8px 24px rgba(16,185,129,0.4)" }}
      >
        <MessageCircle size={26} className="text-white" fill="white" />
      </motion.a>
    </>
  );
}
