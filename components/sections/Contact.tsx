"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import MaskedHeadline from "@/components/motion/MaskedHeadline";
import SpaceSectionBackdrop from "@/components/motion/SpaceSectionBackdrop";
import CtaButton from "@/components/ui/CtaButton";
import { trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics/track";
import { getMetaPixelId } from "@/lib/analytics/meta-pixel";
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

const inputClass = "contact-minimal__input";
const labelClass = "sr-only";

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

      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", { currency: "ILS", value: 100 });
      }

      if (getMetaPixelId() && typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }

      setIsSuccess(true);
      reset();
    } catch {
      setSubmitError("אירעה שגיאה בשליחה. נסה שוב בעוד רגע.");
    }
  };

  return (
    <SpaceSectionBackdrop slice="contact">
      <section
        id="contact"
        className="section-shell pt-24 md:pt-32 lg:pt-36 pb-16 md:pb-24 lg:pb-32 relative overflow-hidden bg-transparent"
        style={{ background: "transparent" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <MaskedHeadline
              as="h2"
              className="premium-title contact-headline mb-4"
              viewportKey="section"
              lines={[
                <span key="l1" className="contact-headline__line contact-headline__line--white">
                  מוכנים למעטפת דיגיטלית אחת שעובדת?
                </span>,
                <span key="l2" className="contact-headline__line contact-headline__line--spectrum">
                  בואו נבנה תהליך שמייצר תוצאות
                </span>,
              ]}
            />
          </div>

          <div className="contact-minimal" dir="rtl">
            <form onSubmit={handleSubmit(onSubmit)} className="contact-minimal__form">
              {isSuccess && (
                <p className="contact-minimal__success" role="status">
                  ההודעה נשלחה. נחזור אליך בהקדם.
                </p>
              )}

              <div className="contact-minimal__row">
                <div>
                  <label className={labelClass} htmlFor="contact-name">
                    שם מלא
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="שם מלא *"
                    className={`${inputClass} ${errors.name ? "contact-minimal__input--error" : ""}`}
                    {...register("name")}
                  />
                  {errors.name && <p className="contact-minimal__error">{errors.name.message}</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="contact-phone">
                    טלפון
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="טלפון *"
                    className={`${inputClass} ${errors.phone ? "contact-minimal__input--error" : ""}`}
                    {...register("phone")}
                  />
                  {errors.phone && <p className="contact-minimal__error">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="contact-service">
                  סוג שירות
                </label>
                <select
                  id="contact-service"
                  className={`${inputClass} ${errors.service ? "contact-minimal__input--error" : ""}`}
                  {...register("service")}
                >
                  <option value="">מה מעניין אותך?</option>
                  {contactServiceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="contact-minimal__error">{errors.service.message}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="contact-message">
                  הודעה
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  placeholder="ספרו בקצרה על העסק (אופציונלי)"
                  className={`${inputClass} contact-minimal__textarea ${errors.message ? "contact-minimal__input--error" : ""}`}
                  {...register("message")}
                />
                {errors.message && <p className="contact-minimal__error">{errors.message.message}</p>}
              </div>

              {submitError && <p className="contact-minimal__error contact-minimal__error--center">{submitError}</p>}

              <CtaButton
                type="submit"
                icon={Send}
                disabled={isSubmitting || !isValid}
                ctaLocation="contact_form"
                className="contact-minimal__cta w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "שולח..." : "שלחו — נחזור אליכם"}
              </CtaButton>
            </form>

            <div className="contact-minimal__links">
              <a href={`mailto:${contactLinks.email}`}>{contactLinks.email}</a>
              <span className="contact-minimal__dot" aria-hidden />
              <a href="tel:0528240230" onClick={() => trackPhoneClick("contact_section")}>
                052-8240230
              </a>
              <span className="contact-minimal__dot" aria-hidden />
              <a
                href="https://wa.me/972528240230"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("contact_section")}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </SpaceSectionBackdrop>
  );
}
