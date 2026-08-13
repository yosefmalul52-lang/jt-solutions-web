import {
  Megaphone,
  MonitorSmartphone,
  Palette,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ServiceSlug } from "@/lib/seo/services";

export type ServiceHubPillar = {
  id: string;
  title: string;
  outcome: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: "sky" | "violet" | "cyan" | "rose";
  links: { label: string; href: string }[];
};

export const serviceHubPillars: ServiceHubPillar[] = [
  {
    id: "websites",
    title: "אתרים, דפי נחיתה ואיקומרס",
    outcome: "נכס דיגיטלי שממיר מתעניינות לפניות",
    description:
      "אתרי תדמית, דפי נחיתה ממירים וחנויות אונליין - מהירים, נגישים ומחוברים למדידה.",
    href: "/services/websites",
    icon: MonitorSmartphone,
    accent: "sky",
    links: [
      { label: "אתרי תדמית", href: "/services/websites#corporate" },
      { label: "דפי נחיתה", href: "/services/websites#landing" },
      { label: "חנויות אונליין", href: "/services/websites#ecommerce" },
    ],
  },
  {
    id: "branding",
    title: "מיתוג וזהות",
    outcome: "מראה מקצועי שבונה אמון לפני השיחה",
    description: "לוגו, שפה ויזואלית ומדריך מותג - בסיס אחיד לכל הערוצים.",
    href: "/services/branding",
    icon: Palette,
    accent: "violet",
    links: [
      { label: "מיתוג לעסק", href: "/services/branding" },
      { label: "זהות ויזואלית", href: "/services/branding" },
    ],
  },
  {
    id: "automations",
    title: "אוטומציה ומדידה",
    outcome: "לידים שמגיעים מסודר - בלי ליפול בין הכיסאות",
    description: "חיבור CRM, בוט וואטסאפ, תורים ותהליכים - פחות עבודה ידנית.",
    href: "/services/automations",
    icon: Workflow,
    accent: "cyan",
    links: [
      { label: "אוטומציה עסקית", href: "/services/automations" },
      { label: "בוט וואטסאפ", href: "/services/automations#whatsapp" },
      { label: "אוטומציה עם AI", href: "/services/automations#site-integration" },
    ],
  },
  {
    id: "digital-marketing",
    title: "שיווק דיגיטלי וצמיחה",
    outcome: "תשתית שמאפשרת לצמוח בצורה מדידה",
    description: "קמפיינים, תשתית פרסום וליווי שוטף - מחוברים לתוצאות עסקיות.",
    href: "/services/digital-marketing",
    icon: Megaphone,
    accent: "rose",
    links: [
      { label: "ניהול קמפיינים", href: "/services/digital-marketing" },
      { label: "תשתית פרסום", href: "/services/digital-marketing#full-funnel" },
    ],
  },
];

/** All leaf service slugs for SEO - linked from hub footer area */
export const allServiceSeoLinks: { label: string; href: string; slug: ServiceSlug }[] = [
  { slug: "landing-pages", label: "דפי נחיתה", href: "/services/websites#landing" },
  { slug: "business-websites", label: "אתרי תדמית", href: "/services/websites#corporate" },
  { slug: "ecommerce", label: "חנויות אונליין", href: "/services/websites#ecommerce" },
  { slug: "branding", label: "מיתוג", href: "/services/branding" },
  { slug: "ad-infrastructure", label: "תשתית פרסום", href: "/services/digital-marketing#full-funnel" },
  { slug: "whatsapp-bot", label: "בוט וואטסאפ", href: "/services/automations#whatsapp" },
  { slug: "ai-automation", label: "אוטומציה עם AI", href: "/services/automations#site-integration" },
  { slug: "web-development", label: "פיתוח אתרים", href: "/services/automations#site-integration" },
];
