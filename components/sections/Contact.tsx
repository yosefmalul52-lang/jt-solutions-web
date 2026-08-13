"use client";

import { Suspense, useState } from "react";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";
import PremiumReveal from "@/components/motion/PremiumReveal";
import JourneyPathBgCorner from "@/components/sections/JourneyPathBgCorner";
import ContactForm from "@/components/ui/ContactForm";
import SectionHeader from "@/components/ui/SectionHeader";
import DiagnosticFormProgress, {
  type DiagnosticFormPhase,
} from "@/components/sections/diagnostic/DiagnosticFormProgress";
import { trackPhoneClick } from "@/lib/analytics/track";
import { contactLinks } from "@/lib/site";
import { contactPageCopy } from "@/lib/contact-form-copy";
import { finalCtaSection, finalCtaTrust } from "@/lib/home-funnel";
import "./contact-final-cta.css";

type ContactProps = {
  /** `story` = homepage; `standalone` = /contact page */
  surface?: "story" | "standalone";
};

function ContactFormFallback() {
  return (
    <div className="diagnostic-form-card diagnostic-form-card--loading" aria-hidden>
      <div className="diagnostic-form-card__shimmer" />
    </div>
  );
}

function HomeFinalCta() {
  const [formPhase, setFormPhase] = useState<DiagnosticFormPhase>("ready");

  return (
    <section
      id="contact"
      className="home-final-cta home-section home-section--cta section-shell"
      dir="rtl"
      aria-labelledby="contact-title"
    >
      <div className="home-final-cta__mesh" aria-hidden />
      <div className="home-final-cta__grid-bg" aria-hidden />
      <JourneyPathBgCorner position="bottom-right" />

      <SectionHeader
        titleId="contact-title"
        before={finalCtaSection.before}
        accent={finalCtaSection.accent}
        after={finalCtaSection.after}
        accentColor={finalCtaSection.accentColor}
        subline={finalCtaSection.subline}
        className="home-final-cta__header relative z-10 px-4 sm:px-6"
      />

      <div id="contact-form" className="home-final-cta__form-center relative z-10">
        <PremiumReveal variant="rise" delay={0.1}>
          <div className="diagnostic-form-card">
            <div className="diagnostic-form-card__rule" aria-hidden />

            <div className="diagnostic-form-card__body">
              {formPhase !== "done" ? <DiagnosticFormProgress phase={formPhase} /> : null}

              <Suspense fallback={<ContactFormFallback />}>
                <ContactForm variant="compact" onPhaseChange={setFormPhase} />
              </Suspense>
            </div>
          </div>
        </PremiumReveal>
      </div>

      <PremiumReveal className="home-final-cta__footer relative z-10 px-4 sm:px-6" variant="rise" delay={0.2}>
        <div className="home-final-cta__trust" role="list">
          {finalCtaTrust.map((item) => (
            <span key={item} className="home-final-cta__trust-item" role="listitem">
              <span className="home-final-cta__trust-dot" aria-hidden />
              {item}
            </span>
          ))}
        </div>
      </PremiumReveal>
    </section>
  );
}

function ContactStandalone() {
  return (
    <section
      id="contact"
      className="relative section-shell pt-8 md:pt-12 pb-28 md:pb-24 lg:pb-32 bg-[#F8FAFC]"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <PremiumReveal className="text-center mb-12 md:mb-16" variant="rise">
          <h2 className="home-headline">{contactPageCopy.formHeadline}</h2>
          <p className="home-subline mx-auto mt-5 max-w-xl">{contactPageCopy.formSubline}</p>
        </PremiumReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <PremiumReveal className="lg:col-span-2 flex flex-col gap-4" variant="rise" delay={0.1}>
            <div className="home-card space-y-3 p-5 sm:p-6">
              <h3 className="text-base font-bold text-slate-900">מה קורה אחרי הפנייה?</h3>
              <ol className="space-y-3">
                <li className="home-after-step">
                  <span className="home-after-step__num">1</span>
                  <p className="text-sm leading-relaxed text-slate-600">
                    בודקים את העסק ואת המצב הדיגיטלי הנוכחי
                  </p>
                </li>
                <li className="home-after-step">
                  <span className="home-after-step__num">2</span>
                  <p className="text-sm leading-relaxed text-slate-600">
                    מזהים מה חסר ומה מונע מפניות להגיע או להסתדר
                  </p>
                </li>
                <li className="home-after-step">
                  <span className="home-after-step__num">3</span>
                  <p className="text-sm leading-relaxed text-slate-600">
                    מציעים כיוון ברור - מה כדאי לבנות קודם
                  </p>
                </li>
              </ol>
            </div>

            <div className="home-card space-y-4 p-5 sm:p-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-0.5">פרטי יצירת קשר</h3>
                <p className="text-xs leading-relaxed text-slate-500">טלפון, מייל או וואטסאפ - מה שנוח לך.</p>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-sky-200 bg-sky-50">
                    <Mail size={14} className="text-sky-600" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-slate-500">אימייל</div>
                    <a
                      href={`mailto:${contactLinks.email}`}
                      className="text-xs font-semibold text-slate-800 transition-colors hover:text-sky-700"
                    >
                      {contactLinks.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50">
                    <Phone size={14} className="text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-slate-500">טלפון</div>
                    <a
                      href={`tel:${contactLinks.phone}`}
                      onClick={() => trackPhoneClick("contact_section")}
                      className="text-xs font-semibold text-slate-800 transition-colors hover:text-emerald-700"
                    >
                      052-8240230
                    </a>
                  </div>
                </div>

                <div className="space-y-2.5 border-t border-slate-200 pt-3">
                  <p className="text-[11px] font-semibold text-slate-500">רשתות חברתיות</p>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50">
                      <Facebook size={14} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500">פייסבוק</div>
                      <a
                        href={contactLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-slate-800 transition-colors hover:text-blue-700"
                      >
                        JT Solutions
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-pink-200 bg-pink-50">
                      <Instagram size={14} className="text-pink-600" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500">אינסטגרם</div>
                      <a
                        href={contactLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-slate-800 transition-colors hover:text-pink-700"
                      >
                        @jt.solutions.il
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PremiumReveal>

          <PremiumReveal className="lg:col-span-3" variant="rise" delay={0.15}>
            <div className="home-card home-contact-form p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" aria-hidden />
                  אבחון קצר
                </span>
                <span className="text-xs text-slate-500">2 שדות חובה - שם וטלפון</span>
              </div>
              <ol className="form-steps mb-5" aria-label="שלבי האבחון">
                <li className="form-step form-step--1">
                  <span className="form-step__num">1</span>
                  <span className="form-step__label">שולחים פרטים</span>
                </li>
                <li className="form-step form-step--2">
                  <span className="form-step__num">2</span>
                  <span className="form-step__label">בודקים את העסק</span>
                </li>
                <li className="form-step form-step--3">
                  <span className="form-step__num">3</span>
                  <span className="form-step__label">מקבלים כיוון</span>
                </li>
              </ol>
              <Suspense fallback={<ContactFormFallback />}>
                <ContactForm variant="section" />
              </Suspense>
            </div>
          </PremiumReveal>
        </div>
      </div>
    </section>
  );
}

export default function Contact({ surface = "story" }: ContactProps) {
  return surface === "story" ? <HomeFinalCta /> : <ContactStandalone />;
}
