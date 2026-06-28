"use client";

import {
  BarChart3,
  Database,
  ClipboardList,
  PenLine,
  Smartphone,
  Globe,
  FileText,
  MessageCircle,
  Target,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import PremiumReveal from "@/components/motion/PremiumReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { deliverablesSection } from "@/lib/home-funnel";

const ICONS: Record<string, LucideIcon> = {
  "אפיון עסקי קצר": ClipboardList,
  "מסר וקופי בסיסי": PenLine,
  "עיצוב מותאם מובייל": Smartphone,
  "אתר או דף נחיתה": Globe,
  "טופס פנייה ברור": FileText,
  "חיבור וואטסאפ": MessageCircle,
  "מדידה של מקורות פנייה": BarChart3,
  "אירועי המרה": Target,
  "CRM / Google Sheet לפי צורך": Database,
  "הדרכה קצרה בסיום": GraduationCap,
};

const FEATURED = new Set(["מדידה של מקורות פנייה", "CRM / Google Sheet לפי צורך"]);

const ACCENTS: Record<string, "cyan" | "blue" | "violet" | "green"> = {
  "מדידה של מקורות פנייה": "cyan",
  "CRM / Google Sheet לפי צורך": "violet",
  "חיבור וואטסאפ": "green",
  "אירועי המרה": "cyan",
  "טופס פנייה ברור": "blue",
  "הדרכה קצרה בסיום": "green",
};

export default function DeliverablesSection() {
  return (
    <section id="deliverables" className="home-section home-section--alt section-shell" dir="rtl">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="מה בפועל"
          before="מה מקבלים "
          accent="בפועל"
          after="?"
          accentColor="#06B6D4"
          subline={deliverablesSection.subline}
        />

        <ul className="home-bento mt-10">
          {deliverablesSection.items.map((item, index) => {
            const Icon = ICONS[item.title] ?? ClipboardList;
            const featured = FEATURED.has(item.title);
            return (
              <PremiumReveal
                key={item.title}
                as="div"
                variant="rise"
                delay={0.03 + index * 0.03}
                className={`home-bento__item home-bento__item--${ACCENTS[item.title] ?? "blue"}${
                  featured ? " home-bento__item--lg" : ""
                }`}
              >
                <span className="home-bento__icon">
                  <Icon size={featured ? 22 : 18} strokeWidth={2} aria-hidden />
                </span>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                {"detail" in item && item.detail ? (
                  <p className="mt-1.5 text-xs text-slate-500">{item.detail}</p>
                ) : null}
              </PremiumReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
