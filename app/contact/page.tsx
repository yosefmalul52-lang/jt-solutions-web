import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LightPageShell from "@/components/layout/LightPageShell";
import PremiumReveal from "@/components/motion/PremiumReveal";
import ScribbleUnderline from "@/components/motion/ScribbleUnderline";
import Contact from "@/components/sections/Contact";
import JsonLd from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getContactPageJsonLd, NAP } from "@/lib/seo/organization";
import { contactLinks } from "@/lib/site";
import { contactPageCopy } from "@/lib/contact-form-copy";
import { homeFaqItems } from "@/lib/seo/home-faq";

export const metadata: Metadata = createPageMetadata({
  title: "אבחון דיגיטלי חינם",
  description:
    "בואו נבין מה חסר בתשתית הדיגיטלית של העסק — טופס קצר, שיחת התאמה ללא התחייבות. טלפון, וואטסאפ ואימייל.",
  path: "/contact",
  keywords: [
    "אבחון דיגיטלי",
    "JT Solutions",
    "יצירת קשר",
    "תשתית דיגיטלית לעסק",
  ],
});

const contactFaq = homeFaqItems.slice(0, 4);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={getContactPageJsonLd()} />
      <Navbar />
      <LightPageShell>
        <main className="flex-1">
          <section className="studio-service-hero-zone relative section-shell pt-28 pb-10 md:pt-36 md:pb-14">
            <div className="studio-service-hero-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
            <div className="page-hero-mesh" aria-hidden />
            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" dir="rtl">
              <PremiumReveal as="div" className="mx-auto mb-10 max-w-3xl text-center" variant="rise">
                <span className="home-badge mb-6 inline-flex">יצירת קשר</span>
                <h1 className="home-headline mb-4">{contactPageCopy.title}</h1>
                <ScribbleUnderline color="#10B981" className="scribble-underline--inline mb-4" />
                <p className="home-subline">{contactPageCopy.subtitle}</p>
              </PremiumReveal>

              <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
                <a
                  href={`tel:${contactLinks.phone}`}
                  className="home-card home-card--interactive flex items-start gap-3 p-5"
                >
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" aria-hidden />
                  <div>
                    <p className="text-sm font-bold text-slate-900">טלפון</p>
                    <p className="mt-1 text-sm text-slate-600">{NAP.phone}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${contactLinks.email}`}
                  className="home-card home-card--interactive flex items-start gap-3 p-5"
                >
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" aria-hidden />
                  <div>
                    <p className="text-sm font-bold text-slate-900">אימייל</p>
                    <p className="mt-1 text-sm text-slate-600">{NAP.email}</p>
                  </div>
                </a>
                <div className="home-card flex items-start gap-3 p-5">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" aria-hidden />
                  <div>
                    <p className="text-sm font-bold text-slate-900">אזור שירות</p>
                    <p className="mt-1 text-sm text-slate-600">
                      {NAP.addressLocality} · שירות בכל ישראל
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {NAP.streetAddress}, {NAP.addressLocality}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Contact surface="standalone" />

          <section className="home-section home-section--alt pb-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6" dir="rtl">
              <h2 className="home-headline mb-6 text-center">שאלות נפוצות</h2>
              <ul className="space-y-4">
                {contactFaq.map((item, index) => (
                  <li key={item.question}>
                    <PremiumReveal as="div" className="home-card home-card--interactive p-5" variant="rise" delay={0.03 + index * 0.05}>
                      <h3 className="text-sm font-bold text-slate-900">{item.question}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.answer}</p>
                    </PremiumReveal>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-center text-sm text-slate-500">
                רוצים לראות את כל השירותים?{" "}
                <Link href="/services" className="font-semibold text-sky-700 hover:text-sky-900">
                  מעבר לעמוד השירותים
                </Link>
              </p>
            </div>
          </section>
        </main>
      </LightPageShell>
      <Footer />
    </>
  );
}
