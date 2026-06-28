import type { Metadata } from "next";
import Link from "next/link";
import { Home, LayoutGrid } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createPageMetadata } from "@/lib/seo/metadata";
import { servicePages } from "@/lib/seo/services";

export const metadata: Metadata = createPageMetadata({
  title: "הדף לא נמצא",
  description: "העמוד שחיפשתם לא קיים. חזרו לדף הבית או לשירותים של JT Solutions.",
  path: "/",
  noIndex: true,
  includeCanonical: false,
});

const featuredServices = [
  servicePages["landing-pages"],
  servicePages["business-websites"],
  servicePages["ecommerce"],
  servicePages["branding"],
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F8FAFC]">
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 text-center" dir="rtl">
          <p className="text-6xl font-extrabold tracking-tight text-slate-200 sm:text-7xl" aria-hidden>
            404
          </p>
          <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900">הדף לא נמצא</h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
            ייתכן שהקישור שגוי או שהעמוד הוסר. אפשר לחזור לדף הבית או לעיין בשירותים שלנו.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-[var(--radius-soft)] bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              <Home size={16} aria-hidden />
              דף הבית
            </Link>
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 rounded-[var(--radius-soft)] border border-slate-200 bg-[#F8FAFC] px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:text-sky-700"
            >
              <LayoutGrid size={16} aria-hidden />
              השירותים
            </Link>
          </div>

          <div className="mt-12 text-right">
            <h2 className="text-sm font-bold text-slate-900 mb-4">שירותים פופולריים</h2>
            <ul className="space-y-2">
              {featuredServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.path}
                    className="block rounded-[var(--radius-soft)] border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:text-sky-700"
                  >
                    {service.serviceName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
