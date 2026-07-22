"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CtaButton from "@/components/ui/CtaButton";
import ContactFormSuccess from "@/components/ui/ContactFormSuccess";
import { FloatingInput, FloatingTextarea } from "@/components/ui/FloatingInput";
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
import { DURATION_FAST, DURATION_UI, EASE_OUT, motionTransition } from "@/lib/motion";
import type { DiagnosticFormPhase } from "@/components/sections/diagnostic/DiagnosticFormProgress";

type ContactFormValues = ContactPayload;

type ContactFormProps = {
  variant?: "section" | "card" | "glass" | "compact";
  onPhaseChange?: (phase: DiagnosticFormPhase) => void;
};

function FieldError({ id, message }: { id?: string; message?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="min-h-5" id={id}>
      <AnimatePresence initial={false}>
        {message ? (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={motionTransition(reduce, { duration: DURATION_FAST })}
            className="mt-1 text-sm font-medium text-red-600"
            role="alert"
          >
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm({ variant = "section", onPhaseChange }: ContactFormProps) {
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedService, setSubmittedService] = useState<ContactPayload["service"] | undefined>();
  const formSwapTransition = motionTransition(reduce, { duration: DURATION_UI });

  const formLocation: LeadFormLocation = "homepage_contact";

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
      service: isCompact ? "אני רוצה לבנות את המותג שלי" : "",
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
      setValue("service", "אני רוצה לבנות את המותג שלי", { shouldValidate: true });
    }
  }, [searchParams, setValue, isCompact]);

  useEffect(() => {
    if (!onPhaseChange) return;
    if (isSuccess) onPhaseChange("done");
    else if (isSubmitting) onPhaseChange("sending");
    else onPhaseChange("ready");
  }, [isSuccess, isSubmitting, onPhaseChange]);

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
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={formSwapTransition}
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
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={formSwapTransition}
            className="home-final-cta-form"
            noValidate
          >
            <input type="hidden" {...register("service")} />
            <div className="home-final-cta-form__fields">
              <div>
                <FloatingInput
                  id="contact-name-compact"
                  label="שם מלא"
                  requiredMark
                  type="text"
                  autoComplete="name"
                  className={`form-input--glass home-final-cta-form__input ${errors.name ? "home-final-cta-form__input--error" : ""}`}
                  error={Boolean(errors.name)}
                  aria-invalid={errors.name ? "true" : undefined}
                  aria-required="true"
                  aria-describedby={errors.name ? "contact-name-compact-error" : undefined}
                  {...register("name")}
                />
                <FieldError id="contact-name-compact-error" message={errors.name?.message} />
              </div>
              <div>
                <FloatingInput
                  id="contact-phone-compact"
                  label="טלפון"
                  requiredMark
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className={`form-input--glass home-final-cta-form__input ${errors.phone ? "home-final-cta-form__input--error" : ""}`}
                  error={Boolean(errors.phone)}
                  aria-invalid={errors.phone ? "true" : undefined}
                  aria-required="true"
                  aria-describedby={errors.phone ? "contact-phone-compact-error" : undefined}
                  {...register("phone")}
                />
                <FieldError id="contact-phone-compact-error" message={errors.phone?.message} />
              </div>
            </div>

            <fieldset className="home-final-cta-form__intent">
              <legend className="home-final-cta-form__intent-label">מה הכי רלוונטי לך כרגע?</legend>
              <div className="home-final-cta-form__chips" role="group">
                {finalCtaServiceChips.map((chip) => {
                  const isActive = selectedService === chip.label;
                  return (
                    <motion.button
                      key={chip.label}
                      type="button"
                      className={`home-final-cta-form__chip${isActive ? " home-final-cta-form__chip--active" : ""}`}
                      aria-pressed={isActive}
                      whileTap={reduce ? undefined : { scale: 0.96 }}
                      transition={{ duration: 0.12, ease: EASE_OUT }}
                      onClick={() =>
                        setValue("service", chip.label, { shouldValidate: true, shouldDirty: true })
                      }
                    >
                      <span className="home-final-cta-form__chip-dot" aria-hidden />
                      {chip.label}
                    </motion.button>
                  );
                })}
              </div>
              <FieldError id="contact-service-compact-error" message={errors.service?.message} />
            </fieldset>

            <FieldError id="contact-root-compact-error" message={errors.root?.message} />

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
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={formSwapTransition}
            className="space-y-4"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FloatingInput
                  id="contact-name"
                  label="שם מלא"
                  requiredMark
                  type="text"
                  autoComplete="name"
                  className={`${inputClassName} ${errors.name ? "border-red-500" : ""}`}
                  error={Boolean(errors.name)}
                  aria-invalid={errors.name ? "true" : undefined}
                  {...register("name")}
                />
                <FieldError message={errors.name?.message} />
              </div>

              <div>
                <FloatingInput
                  id="contact-phone"
                  label="טלפון"
                  requiredMark
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className={`${inputClassName} ${errors.phone ? "border-red-500" : ""}`}
                  error={Boolean(errors.phone)}
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
              <FloatingInput
                id="contact-email"
                label={contactFormCopy.emailLabel}
                type="email"
                inputMode="email"
                autoComplete="email"
                className={`${inputClassName} ${errors.email ? "border-red-500" : ""}`}
                error={Boolean(errors.email)}
                aria-invalid={errors.email ? "true" : undefined}
                {...register("email")}
              />
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <FloatingTextarea
                id="contact-message"
                label={contactFormCopy.messageLabel}
                rows={3}
                className={`${inputClassName} ${errors.message ? "border-red-500" : ""}`}
                error={Boolean(errors.message)}
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
