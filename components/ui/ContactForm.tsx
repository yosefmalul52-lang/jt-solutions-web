"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CtaButton from "@/components/ui/CtaButton";
import {
  contactSchema,
  contactServiceOptions,
  type ContactPayload,
  type ContactPayloadInput,
} from "@/lib/validation/contact";

type ContactFormValues = ContactPayload;

const inputClassName =
  "w-full rounded-2xl bg-white/50 backdrop-blur-sm border border-white/40 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#10b3e7] transition-all duration-200";

function FieldError({ message }: { message?: string }) {
  return (
    <div className="min-h-6">
      <AnimatePresence initial={false}>
        {message ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="text-red-500 text-sm mt-1 animate-in fade-in slide-in-from-top-1"
          >
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactPayloadInput, unknown, ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (values: ContactFormValues) => {
    const payload = {
      ...values,
      // API route currently expects message as required.
      message: values.message?.trim() || "ללא הודעה נוספת.",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("request_failed");
      }

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "generate_lead", { currency: "ILS", value: 100 });
      }

      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead");
      }

      setIsSuccess(true);
    } catch {
      setError("root", {
        type: "server",
        message: "אירעה שגיאה בשליחה. נסה שוב בעוד רגע.",
      });
    }
  };

  return (
    <div dir="rtl" className="rounded-[var(--radius)] p-6 sm:p-8 bg-white/60 backdrop-blur-md border border-white/40 shadow-premium">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="rounded-2xl border border-emerald-200 bg-emerald-50/90 px-4 py-5 text-center"
          >
            <p className="text-sm sm:text-base font-medium text-emerald-700">
              תודה! הפנייה התקבלה. נחזור אליך תוך 24 שעות.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-slate-600">
                  שם מלא
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="איך לפנות אליך?"
                  className={`${inputClassName} ${errors.name ? "border-red-500" : ""}`}
                  {...register("name")}
                />
                <FieldError message={errors.name?.message} />
              </div>

              <div>
                <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-semibold text-slate-600">
                  טלפון
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="05XXXXXXXX"
                  className={`${inputClassName} ${errors.phone ? "border-red-500" : ""}`}
                  {...register("phone")}
                />
                <FieldError message={errors.phone?.message} />
              </div>
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-slate-600">
                אימייל
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="name@company.com"
                className={`${inputClassName} ${errors.email ? "border-red-500" : ""}`}
                {...register("email")}
              />
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <label htmlFor="contact-service" className="mb-1.5 block text-xs font-semibold text-slate-600">
                שירות מבוקש
              </label>
              <select
                id="contact-service"
                className={`${inputClassName} appearance-none cursor-pointer ${errors.service ? "border-red-500" : ""}`}
                {...register("service")}
              >
                <option value="">בחר שירות</option>
                {contactServiceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              <FieldError message={errors.service?.message} />
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-slate-600">
                הודעה (אופציונלי)
              </label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="מה חשוב לך שנדע לפני השיחה?"
                className={`${inputClassName} resize-none ${errors.message ? "border-red-500" : ""}`}
                {...register("message")}
              />
              <FieldError message={errors.message?.message} />
            </div>

            <FieldError message={errors.root?.message} />

            <CtaButton
              type="submit"
              disabled={isSubmitting || !isValid}
              ctaLocation="contact_form"
              className="w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "שולח..." : "שליחת פנייה"}
            </CtaButton>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
