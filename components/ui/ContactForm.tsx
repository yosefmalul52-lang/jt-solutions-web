"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CtaButton from "@/components/ui/CtaButton";
import ContactFormSuccess from "@/components/ui/ContactFormSuccess";
import { contactFormCopy } from "@/lib/contact-form-copy";
import {
  trackLeadConversion,
  trackLeadFormError,
  trackLeadFormSubmit,
  trackLeadFormSuccess,
  type LeadFormLocation,
} from "@/lib/analytics/lead-form";
import { mapServiceParamToOption } from "@/lib/contact/service-prefill";
import { finalCtaServiceChips } from "@/lib/home-funnel";
import {
  contactSchema,
  contactUrgencyOptions,
  type ContactPayload,
  type ContactPayloadInput,
} from "@/lib/validation/contact";

type ContactFormValues = ContactPayload;

type ContactFormProps = {
  variant?: "section" | "card" | "glass" | "compact";
};

function FieldError({ message }: { message?: string }) {
  return (
    <div className="min-h-5">
      <AnimatePresence initial={false}>
        {message ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="text-red-500 text-sm mt-1"
            role="alert"
          >
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm({ variant = "section" }: ContactFormProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedService, setSubmittedService] = useState<ContactPayload["service"] | undefined>();

  const formLocation: LeadFormLocation =
    pathname === "/contact" ? "contact_page" : "homepage_contact";

  const isSection = variant === "section";
  const isGlass = variant === "glass";
  const isCompact = variant === "compact";
  const inputClassName = "form-input form-input--glass";
  const labelClassName = "form-label";

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactPayloadInput, unknown, ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: isCompact ? "אני לא בטוח — צריך הכוונה" : "",
      message: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const mapped = mapServiceParamToOption(searchParams.get("service"));
    if (mapped) {
      setValue("service", mapped, { shouldValidate: true, shouldDirty: true });
    } else if (isCompact) {
      setValue("service", "אני לא בטוח — צריך הכוונה", { shouldValidate: true });
    }
  }, [searchParams, setValue, isCompact]);

  const onSubmit = async (values: ContactFormValues) => {
    trackLeadFormSubmit({
      form_location: formLocation,
      service: values.service,
    });

    const pagePath =
      typeof window !== "undefined"
        ? `${window.location.pathname}${window.location.search}${window.location.hash}`
        : undefined;

    const payload = {
      ...values,
      message: values.message?.trim() || undefined,
      pagePath,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorType = response.status === 400 ? "validation_error" : "server_error";
        trackLeadFormError({
          form_location: formLocation,
          service: values.service,
          error_type: errorType,
        });
        throw new Error("request_failed");
      }

      trackLeadFormSuccess({
        form_location: formLocation,
        service: values.service,
      });
      trackLeadConversion();
      setSubmittedService(values.service);
      setIsSuccess(true);
    } catch {
      setError("root", {
        type: "server",
        message: "אירעה שגיאה בשליחה. נסה שוב בעוד רגע.",
      });
    }
  };

  const wrapperClassName = isCompact
    ? undefined
    : isGlass
      ? "space-y-4"
      : isSection
        ? "p-6 sm:p-8 space-y-5 rounded-[var(--radius)]"
        : "rounded-[var(--radius)] p-6 sm:p-8 bg-white/60 backdrop-blur-md border border-white/40 shadow-premium";

  const wrapperStyle = isSection
    ? {
        background: "rgba(255,255,255,0.88)",
        border: "1px solid rgba(15,23,42,0.08)",
        boxShadow: "0 16px 38px rgba(15,23,42,0.08)",
      }
    : undefined;

  const microcopyClass = isGlass ? "text-slate-400" : "text-slate-500";
  const selectedService = watch("service");

  return (
    <div dir="rtl" className={wrapperClassName} style={wrapperStyle}>
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <ContactFormSuccess
              formLocation={formLocation}
              service={submittedService}
              variant={variant}
            />
          </motion.div>
        ) : isCompact ? (
          <motion.form
            key="form-compact"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="home-final-cta-form"
            noValidate
          >
            <input type="hidden" {...register("service")} />
            <div className="home-final-cta-form__fields">
              <div>
                <label htmlFor="contact-name-compact" className="form-label">
                  שם מלא *
                </label>
                <input
                  id="contact-name-compact"
                  type="text"
                  autoComplete="name"
                  placeholder="איך לפנות אליך?"
                  className={`form-input home-final-cta-form__input ${errors.name ? "home-final-cta-form__input--error" : ""}`}
                  aria-invalid={errors.name ? "true" : undefined}
                  {...register("name")}
                />
                <FieldError message={errors.name?.message} />
              </div>
              <div>
                <label htmlFor="contact-phone-compact" className="form-label">
                  טלפון *
                </label>
                <input
                  id="contact-phone-compact"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="05X-XXXXXXX"
                  className={`form-input home-final-cta-form__input ${errors.phone ? "home-final-cta-form__input--error" : ""}`}
                  aria-invalid={errors.phone ? "true" : undefined}
                  {...register("phone")}
                />
                <FieldError message={errors.phone?.message} />
              </div>
            </div>

            <div className="home-final-cta-form__intent">
              <span className="home-final-cta-form__intent-label">מה הכי רלוונטי לך כרגע?</span>
              <div className="home-final-cta-form__chips" role="group" aria-label="מה הכי רלוונטי לך כרגע?">
                {finalCtaServiceChips.map((chip) => {
                  const isActive = selectedService === chip.label;
                  return (
                    <button
                      key={chip.label}
                      type="button"
                      className={`home-final-cta-form__chip${isActive ? " home-final-cta-form__chip--active" : ""}`}
                      aria-pressed={isActive}
                      onClick={() =>
                        setValue("service", chip.label, { shouldValidate: true, shouldDirty: true })
                      }
                    >
                      <span
                        className="home-final-cta-form__chip-dot"
                        style={{ background: chip.color }}
                        aria-hidden
                      />
                      {chip.label}
                    </button>
                  );
                })}
              </div>
              <FieldError message={errors.service?.message} />
            </div>

            <FieldError message={errors.root?.message} />

            <CtaButton
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              fullWidth
              shine
              ctaLocation="contact_form"
              label={contactFormCopy.submitLabel}
            >
              {isSubmitting ? contactFormCopy.submittingLabel : contactFormCopy.submitLabel}
            </CtaButton>

            <p className="home-final-cta-form__micro">{contactFormCopy.microcopy}</p>
          </motion.form>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="space-y-4"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className={labelClassName}>
                  שם מלא *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="איך לפנות אליך?"
                  className={`${inputClassName} ${errors.name ? "border-red-500" : ""}`}
                  aria-invalid={errors.name ? "true" : undefined}
                  {...register("name")}
                />
                <FieldError message={errors.name?.message} />
              </div>

              <div>
                <label htmlFor="contact-phone" className={labelClassName}>
                  טלפון *
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="05X-XXXXXXX"
                  className={`${inputClassName} ${errors.phone ? "border-red-500" : ""}`}
                  aria-invalid={errors.phone ? "true" : undefined}
                  {...register("phone")}
                />
                <FieldError message={errors.phone?.message} />
              </div>
            </div>

            <div>
              <label htmlFor="contact-service" className={labelClassName}>
                {contactFormCopy.urgencyLabel} *
              </label>
              <select
                id="contact-service"
                className={`${inputClassName} appearance-none cursor-pointer ${errors.service ? "border-red-500" : ""}`}
                aria-invalid={errors.service ? "true" : undefined}
                {...register("service")}
              >
                <option value="">{contactFormCopy.urgencyPlaceholder}</option>
                {contactUrgencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FieldError message={errors.service?.message} />
            </div>

            <div>
              <label htmlFor="contact-email" className={labelClassName}>
                {contactFormCopy.emailLabel}
              </label>
              <input
                id="contact-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="name@company.com"
                className={`${inputClassName} ${errors.email ? "border-red-500" : ""}`}
                aria-invalid={errors.email ? "true" : undefined}
                {...register("email")}
              />
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <label htmlFor="contact-message" className={labelClassName}>
                {contactFormCopy.messageLabel}
              </label>
              <textarea
                id="contact-message"
                rows={3}
                placeholder={contactFormCopy.messagePlaceholder}
                className={`${inputClassName} resize-none ${errors.message ? "border-red-500" : ""}`}
                aria-invalid={errors.message ? "true" : undefined}
                {...register("message")}
              />
              <FieldError message={errors.message?.message} />
            </div>

            <FieldError message={errors.root?.message} />

            <CtaButton
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              fullWidth
              ctaLocation="contact_form"
              label={contactFormCopy.submitLabel}
            >
              {isSubmitting ? contactFormCopy.submittingLabel : contactFormCopy.submitLabel}
            </CtaButton>

            <p className={`text-xs text-center leading-relaxed ${microcopyClass}`}>
              {contactFormCopy.microcopy}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
