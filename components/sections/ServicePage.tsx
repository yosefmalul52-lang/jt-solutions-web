"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Check, ArrowLeft, ChevronDown, ChevronUp,
  Code2, Globe, Zap, ShieldCheck, BarChart3, Layers, ShoppingCart,
  Palette, Eye, Star, FileText, Share2,
  TrendingUp, Target, RefreshCw,
  Bot, Workflow, Database, MessageSquare,
} from "lucide-react";
import GradientText from "@/components/ui/GradientText";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2, Globe, Zap, ShieldCheck, BarChart3, Layers,
  ShoppingCart,
  Palette, Eye, Star, FileText, Share2,
  TrendingUp, Target, RefreshCw,
  Bot, Workflow, Database, MessageSquare,
};

interface Feature {
  iconName: string;
  title: string;
  description: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface ServicePageProps {
  badge: string;
  badgeColor: string;
  title: string;
  titleGradientFrom: string;
  titleGradientTo: string;
  subtitle: string;
  description: string;
  fit: string;
  timeframe: string;
  ctaText: string;
  heroAccent: string;
  features: Feature[];
  process: ProcessStep[];
  faqs: FAQ[];
  deliverables: string[];
}

export default function ServicePage({
  badge,
  badgeColor,
  title,
  titleGradientFrom,
  titleGradientTo,
  subtitle,
  description,
  fit,
  timeframe,
  ctaText,
  features,
  process,
  faqs,
  deliverables,
}: ServicePageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-60" aria-hidden />
        <div
          aria-hidden
          className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-[0.08] blur-[120px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${titleGradientFrom}, transparent)` }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mb-10"
          >
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={16} className="scale-x-[-1]" />
              חזרה לשירותים
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
                className={`inline-block mb-5 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${badgeColor}`}
              >
                {badge}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 leading-[1.08]"
              >
                <GradientText from={titleGradientFrom} via={titleGradientTo} to={titleGradientTo}>
                  {title}
                </GradientText>
                <br />
                <span className="text-slate-900">{subtitle}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                className="text-lg text-slate-600 leading-relaxed mb-8"
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25, ease: EASE }}
                className="mb-7 rounded-2xl px-4 py-3"
                style={{ background: "rgba(79,70,229,0.06)", border: "1px solid rgba(79,70,229,0.14)" }}
              >
                <p className="text-xs font-bold mb-1" style={{ color: "#4f46e5" }}>למי זה מתאים</p>
                <p className="text-sm font-medium text-slate-700 leading-relaxed">{fit}</p>
                <p className="text-xs font-bold mt-3 mb-1" style={{ color: "#4f46e5" }}>תוך כמה זמן רואים שינוי</p>
                <p className="text-sm font-medium text-slate-700 leading-relaxed">{timeframe}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <Link
                  href="/#contact"
                  className="btn-primary text-base"
                >
                  {ctaText}
                </Link>
                <span className="text-sm text-slate-500">שיחה קצרה, כיוון ברור, בלי התחייבות.</span>
              </motion.div>
            </div>

            {/* Right: deliverables card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              className="bg-white rounded-2xl border border-slate-200 shadow-md p-6"
            >
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                מה מקבלים בפועל
              </h3>
              <ul className="space-y-3">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check size={15} className="text-indigo-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
              למה זה{" "}
              <GradientText from={titleGradientFrom} via={titleGradientTo} to={titleGradientTo}>
                עובד
              </GradientText>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              כל היבט של השירות נבנה כדי לייצר בהירות, אמון ותוצאה עסקית בפועל.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = ICON_MAP[feature.iconName];
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-300"
                >
                  {Icon && (
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-slate-600" />
                    </div>
                  )}
                  <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
              איך זה{" "}
              <GradientText from={titleGradientFrom} via={titleGradientTo} to={titleGradientTo}>
                עובד
              </GradientText>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              תהליך ברור, קצר וללא הפתעות.
            </p>
          </motion.div>

          <div className="space-y-6">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="flex gap-5"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${titleGradientFrom}, ${titleGradientTo})`,
                    }}
                  >
                    {step.step}
                  </div>
                  {i < process.length - 1 && (
                    <div className="flex-1 w-px bg-slate-200 mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-50 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
              <GradientText from={titleGradientFrom} via={titleGradientTo} to={titleGradientTo}>
                שאלות
              </GradientText>{" "}
              נפוצות
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-right cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-violet-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              מוכן להתחיל?
            </h2>
            <p className="text-indigo-200 text-lg mb-8 leading-relaxed">
              ספר לנו על הפרויקט שלך ונחזור תוך 24 שעות עם כיוון אסטרטגי ברור וצעד ראשון פרקטי.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-indigo-700 bg-white hover:bg-indigo-50 shadow-xl shadow-indigo-900/20 transition-all duration-200"
              >
                {ctaText}
              </Link>
              <Link
                href="/#services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white border border-indigo-400 hover:bg-white/10 transition-all duration-200"
              >
                צפייה בשירותים נוספים
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
