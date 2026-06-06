import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";
import {
  getAllLocalPageSlugs,
  getLocalPageBySlug,
} from "@/lib/seo/local-pages";
import { NAP } from "@/lib/seo/organization";
import { servicePages } from "@/lib/seo/services";

type AreaPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllLocalPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocalPageBySlug(slug);
  if (!page) return { title: "עמוד לא נמצא" };

  return createPageMetadata({
    title: `${page.title} | ${SITE_NAME}`,
    description: page.description,
    path: `/areas/${page.slug}`,
    keywords: page.keywords,
  });
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const page = getLocalPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/areas/${page.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: SITE_NAME,
      url: SITE_URL,
      telephone: NAP.phoneE164,
      email: NAP.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: NAP.addressLocality,
        addressRegion: NAP.addressRegion,
        addressCountry: NAP.addressCountry,
      },
      areaServed: {
        "@type": "Place",
        name: page.areaServedName,
      },
      description: page.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "דף הבית", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: page.cityName, item: pageUrl },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main className="flex-1">
        <section
          className="relative overflow-hidden section-shell pt-32 pb-16 md:pt-40 md:pb-24"
          style={{ background: "linear-gradient(180deg, #F9FAFB 0%, #F3F6FF 48%, #F9FAFB 100%)" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" dir="rtl">
            <p className="text-xs font-semibold text-indigo-600 mb-4">{page.regionLabel}</p>
            <h1 className="display-title max-w-3xl mx-auto">
              {page.title} — <span className="gradient-text">{SITE_NAME}</span>
            </h1>
            <p className="premium-subtitle max-w-2xl mx-auto mt-6">{page.intro}</p>
          </div>
        </section>

        <section className="pb-12 md:pb-16 bg-[#F9FAFB]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
            {page.bodyParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-base text-slate-600 leading-relaxed mb-5">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="pb-16 md:pb-24 bg-[#F9FAFB]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
            <h2 className="text-xl font-extrabold text-slate-900 mb-6 text-center">שירותים מובילים ב{page.cityName}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {page.servicesHighlight.map((slug) => {
                const service = servicePages[slug];
                return (
                  <li key={slug}>
                    <Link
                      href={service.path}
                      className="premium-card block p-5 h-full hover:border-indigo-200 transition-colors"
                    >
                      <h3 className="text-sm font-bold text-slate-900">{service.serviceName}</h3>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600">
                        לפרטים
                        <ArrowLeft size={14} aria-hidden />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="pb-16 md:pb-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
            <h2 className="text-xl font-extrabold text-slate-900 mb-6">שאלות נפוצות</h2>
            <ul className="space-y-4">
              {page.faq.map((item) => (
                <li key={item.question} className="premium-card p-5">
                  <h3 className="text-sm font-bold text-slate-900">{item.question}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pb-24 md:pb-32 bg-[#F9FAFB]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" dir="rtl">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">מוכנים להתחיל?</h2>
            <p className="text-sm text-slate-600 mb-6">
              שיחת התאמה של כ-15 דקות — בלי התחייבות. נבין את המטרה ונציע מסלול ברור.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-[var(--radius-soft)] px-6 py-3 text-sm font-semibold text-white"
                style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-glow)" }}
              >
                יצירת קשר
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-[var(--radius-soft)] px-6 py-3 text-sm font-semibold text-slate-800 border border-slate-200 bg-white"
              >
                תיק עבודות
              </Link>
            </div>
            <p className="text-xs text-slate-500 mt-8">
              <Link href="/about" className="hover:text-indigo-600">אודות JT Solutions</Link>
              {" · "}
              <Link href="/blog" className="hover:text-indigo-600">מדריכים דיגיטל</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
