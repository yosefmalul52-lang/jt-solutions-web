import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import JsonLd from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getContactPageJsonLd, NAP } from "@/lib/seo/organization";
import { contactLinks } from "@/lib/site";
import { homeFaqItems } from "@/lib/seo/home-faq";

export const metadata: Metadata = createPageMetadata({
  title: "יצירת קשר | סוכנות דיגיטל JT Solutions",
  description:
    "צרו קשר עם JT Solutions — סוכנות דיגיטל בישראל. טלפון, וואטסאפ, אימייל וטופס פנייה. שיחת התאמה של כ-15 דקות ללא התחייבות.",
  path: "/contact",
  keywords: [
    "יצירת קשר סוכנות דיגיטל",
    "JT Solutions",
    "בניית אתרים ישראל",
    "שיחת ייעוץ דיגיטל",
  ],
});

const contactFaq = homeFaqItems.slice(0, 4);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={getContactPageJsonLd()} />
      <Navbar />
      <main className="flex-1">
        <section
          className="relative overflow-hidden section-shell pt-28 pb-10 md:pt-36 md:pb-14"
          style={{ background: "linear-gradient(180deg, #F9FAFB 0%, #F3F6FF 100%)" }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h1 className="premium-title mb-4">יצירת קשר עם JT Solutions</h1>
              <p className="premium-subtitle">
                סוכנות דיגיטל בישראל — מיתוג, אתרים, דפי נחיתה, איקומרס ואוטומציה. נשמח לשמוע על העסק שלכם.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <a
                href={`tel:${contactLinks.phone}`}
                className="premium-card p-5 flex items-start gap-3 hover:border-indigo-200 transition-colors"
              >
                <Phone className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" aria-hidden />
                <div>
                  <p className="text-sm font-bold text-slate-900">טלפון</p>
                  <p className="text-sm text-slate-600 mt-1">{NAP.phone}</p>
                </div>
              </a>
              <a
                href={`mailto:${contactLinks.email}`}
                className="premium-card p-5 flex items-start gap-3 hover:border-indigo-200 transition-colors"
              >
                <Mail className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" aria-hidden />
                <div>
                  <p className="text-sm font-bold text-slate-900">אימייל</p>
                  <p className="text-sm text-slate-600 mt-1">{NAP.email}</p>
                </div>
              </a>
              <div className="premium-card p-5 flex items-start gap-3">
                <MapPin className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" aria-hidden />
                <div>
                  <p className="text-sm font-bold text-slate-900">אזור שירות</p>
                  <p className="text-sm text-slate-600 mt-1">
                    {NAP.addressLocality} · שירות בכל ישראל
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{NAP.streetAddress}, {NAP.addressLocality}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Contact />

        <section className="py-14 md:py-20 bg-[#F9FAFB]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
            <h2 className="text-xl font-extrabold text-slate-900 mb-6 text-center">שאלות נפוצות</h2>
            <ul className="space-y-4">
              {contactFaq.map((item) => (
                <li key={item.question} className="premium-card p-5">
                  <h3 className="text-sm font-bold text-slate-900">{item.question}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.answer}</p>
                </li>
              ))}
            </ul>
            <p className="text-center text-sm text-slate-500 mt-8">
              רוצים לראות את כל השירותים?{" "}
              <Link href="/services" className="font-semibold text-indigo-600 hover:underline">
                מעבר לעמוד השירותים
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
