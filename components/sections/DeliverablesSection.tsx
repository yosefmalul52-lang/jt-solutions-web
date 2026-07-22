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

const FEATURED = new Set(["מדידה של מקורות פנייה", "CRM / Google Sheet לפי צורך", "אתר או דף נחיתה"]);

const CATEGORIES: Record<string, string> = {
  "אפיון עסקי קצר": "אפיון",
  "מסר וקופי בסיסי": "מסר",
  "עיצוב מותאם מובייל": "עיצוב",
  "אתר או דף נחיתה": "אתר",
  "טופס פנייה ברור": "המרה",
  "חיבור וואטסאפ": "וואטסאפ",
  "מדידה של מקורות פנייה": "מדידה",
  "אירועי המרה": "מדידה",
  "CRM / Google Sheet לפי צורך": "CRM",
  "הדרכה קצרה בסיום": "ליווי",
};

export default function DeliverablesSection() {
  return (
    <section id="deliverables" className="home-section home-section--deliverables section-shell" dir="rtl">
      <div className="home-section__atmosphere" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          before="מה מקבלים "
          accent="בפועל"
          after="?"
          accentColor="#2563EB"
          subline={deliverablesSection.subline}
        />

        <ul className="home-bento home-bento--productized mt-10 lg:mt-12">
          {deliverablesSection.items.map((item, index) => {
            const Icon = ICONS[item.title] ?? ClipboardList;
            const featured = FEATURED.has(item.title);
            const category = CATEGORIES[item.title] ?? "תוצר";
            return (
              <PremiumReveal
                key={item.title}
                as="li"
                variant="rise"
                delay={0.03 + index * 0.03}
                className={`home-bento__item home-bento__item--blue${
                  featured ? " home-bento__item--lg home-bento__item--featured" : ""
                }`}
              >
                <div className="home-bento__meta">
                  <span className="home-bento__category">{category}</span>
                  {featured ? <span className="home-bento__featured">ליבה</span> : null}
                </div>
                <span className="home-bento__icon">
                  <Icon size={featured ? 22 : 18} strokeWidth={2} aria-hidden />
                </span>
                <h3 className="home-bento__title">{item.title}</h3>
                <p className="home-bento__text">{item.text}</p>
                {"detail" in item && item.detail ? (
                  <p className="home-bento__detail">{item.detail}</p>
                ) : null}
              </PremiumReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
