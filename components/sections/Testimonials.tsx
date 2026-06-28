"use client";

import Link from "next/link";
import { ArrowLeft, Quote } from "lucide-react";
import PremiumGlassCard from "@/components/motion/PremiumGlassCard";
import PremiumReveal from "@/components/motion/PremiumReveal";

const featuredTestimonials = [
  {
    quote:
      "השירות האישי הורגש מהשיחה הראשונה. קיבלנו זמינות גבוהה, פתרונות מהירים וביצוע מדויק בלי לרדוף אחרי כמה ספקים במקביל.",
    name: "אורי כהן",
    role: "בעלים, חנות איקומרס",
    relatedProjectId: "magadim",
    featured: true,
  },
  {
    quote:
      "הזמינות והאחריות היו יוצאות דופן. כל שאלה קיבלה מענה מהיר, והפרויקט התקדם בקצב גבוה עם שקיפות מלאה לכל אורך הדרך.",
    name: "נועה אברג'יל",
    role: "בעלים, סטודיו לעיצוב",
    relatedProjectId: "eb-hair",
    featured: false,
  },
  {
    quote:
      "מה שאהבנו במיוחד זה היכולת לקחת מורכבות טכנולוגית ולהפוך אותה למערכת פשוטה לתפעול יומיומי. מקצוענות ברמה גבוהה מאוד.",
    name: "רועי חדד",
    role: "שותף, מותג קמעונאות דיגיטלית",
    relatedProjectId: "ai-automation",
    featured: false,
  },
] as const;

export default function Testimonials() {
  const [featured, ...secondary] = featuredTestimonials;

  return (
    <section id="testimonials" className="homepage-story-section section-shell" dir="rtl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <PremiumReveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14" variant="rise">
          <p className="premium-eyebrow-dark">מה הלקוחות אומרים</p>
          <h2 className="premium-headline-dark mt-4">אמון שנבנה בתוצאות</h2>
        </PremiumReveal>

        <PremiumReveal variant="rise" delay={0.04}>
          <PremiumGlassCard className="mb-6 p-7 sm:p-9 md:mb-8" tilt={false}>
            <Quote size={32} className="text-violet-400/30" aria-hidden />
            <p className="mt-5 text-lg leading-relaxed text-slate-100 sm:text-xl">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="text-base font-bold text-white">{featured.name}</p>
              <p className="mt-1 text-sm text-slate-400">{featured.role}</p>
              <Link
                href={`/projects/${featured.relatedProjectId}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition-colors hover:text-white"
              >
                <span>ראו פרויקט דומה</span>
                <ArrowLeft size={14} aria-hidden />
              </Link>
            </div>
          </PremiumGlassCard>
        </PremiumReveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {secondary.map((item, index) => (
            <PremiumReveal key={item.name} variant="rise" delay={0.08 + index * 0.05}>
              <PremiumGlassCard className="flex h-full flex-col p-6" tilt={false}>
                <p className="flex-1 text-sm leading-relaxed text-slate-300 sm:text-base">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-sm font-bold text-slate-100">{item.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{item.role}</p>
                  <Link
                    href={`/projects/${item.relatedProjectId}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300/90 transition-colors hover:text-cyan-200"
                  >
                    <span>ראו פרויקט דומה</span>
                    <ArrowLeft size={12} aria-hidden />
                  </Link>
                </div>
              </PremiumGlassCard>
            </PremiumReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
