import {
  Megaphone,
  MonitorSmartphone,
  Palette,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { buildContactHref } from "@/lib/contact/service-prefill";

export const servicesHubHero = {
  eyebrow: "לפי הבעיה - לא לפי רשימת שירותים",
  headline: "כל מה שהעסק צריך כדי להפוך נראות דיגיטלית לפניות מסודרות",
  subline:
    "במקום לבחור שירותים טכניים, מתחילים מהמצב של העסק: אתר שלא מביא פניות, קמפיין בלי מדידה, לידים שמתבלגנים בוואטסאפ או צורך לבנות תשתית מאפס.",
  sublineMobile:
    "מתחילים מהמצב של העסק - אתר, פרסום, לידים או תשתית מאפס - ולא מרשימת שירותים.",
  ctaLabel: "קבל אבחון דיגיטלי חינם",
  secondaryCtaLabel: "ראה עבודות לדוגמה",
} as const;

export type UrgencyCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
};

export const urgencyCards: UrgencyCard[] = [
  {
    id: "professional-site",
    title: "אני צריך אתר מקצועי",
    description: "אתר שמשדר את הרמה של העסק ומוביל לפנייה ברורה - לא רק «נוכחות באינטרנט».",
    href: "/services/websites#corporate",
    ctaLabel: "למסלול אתר תדמית",
  },
  {
    id: "landing-campaign",
    title: "אני צריך דף נחיתה לקמפיין",
    description: "נכס אחד ממוקד לקמפיין - מסר חד, פעולה אחת ומדידה שמראה מה עובד.",
    href: "/services/websites#landing",
    ctaLabel: "למסלול דף נחיתה",
  },
  {
    id: "more-leads",
    title: "אני רוצה יותר פניות",
    description: "אתר או דף שממירים תנועה לפניות - במקום צפיות בלי המשך.",
    href: "/services/websites",
    ctaLabel: "למסלול אתרים",
  },
  {
    id: "campaigns",
    title: "אני רוצה קמפיינים שמביאים פניות",
    description: "נבנה תשתית מדידה, דף נחיתה וקמפיינים שמובילים לפניות שאפשר לעקוב אחריהן.",
    href: "/services/digital-marketing",
    ctaLabel: "למסלול קמפיינים ומדידה",
  },
  {
    id: "lead-sources",
    title: "אני רוצה לדעת מאיפה הלידים מגיעים",
    description: "מדידה שמראה אם הפנייה הגיעה מפרסום, חיפוש או המלצה - ומה שווה להמשיך.",
    href: "/services/digital-marketing",
    ctaLabel: "למסלול מדידה ופרסום",
  },
  {
    id: "organize-leads",
    title: "אני רוצה לסדר לידים בוואטסאפ/CRM",
    description: "כל פנייה נכנסת לרשימה או CRM - לא נעלמת בין הודעות וצ'אטים.",
    href: "/services/automations#whatsapp",
    ctaLabel: "למסלול סדר בלידים",
  },
  {
    id: "online-store",
    title: "אני רוצה חנות אונליין",
    description: "מכירה אונליין עם זרימת קנייה ברורה וסדר בהזמנות.",
    href: "/services/websites#ecommerce",
    ctaLabel: "למסלול חנות",
  },
  {
    id: "save-manual-work",
    title: "אני צריך אוטומציה שתחסוך עבודה ידנית",
    description: "פחות העתקות, פחות תזכורות ידניות - תהליכים שחוזרים על עצמם רצים לבד.",
    href: "/services/automations#site-integration",
    ctaLabel: "למסלול אוטומציה",
  },
];

export type ServiceOffering = {
  id: string;
  title: string;
  problem: string;
  deliverables: string;
  outcome: string;
  forWho: string;
  nextStep: string;
  href: string;
  contactHref: string;
  icon: LucideIcon;
  accent: "sky" | "violet" | "cyan" | "rose";
};

export const serviceOfferings: ServiceOffering[] = [
  {
    id: "websites",
    title: "אתר או דף נחיתה שמציגים את העסק נכון ומובילים לפנייה",
    problem: "האתר לא משדר את הרמה של העסק - או שפשוט לא מביא מספיק פניות.",
    deliverables: "אתר תדמית, דף נחיתה או חנות - מותאם מובייל, טופס פנייה, חיבור וואטסאפ ומדידה בסיסית.",
    outcome: "נכס דיגיטלי שמציג את העסק נכון ומוביל מתעניין לפעולה ברורה.",
    forWho: "בעלי עסקים שצריכים נוכחות מקצועית, נכס להמרה או חנות אונליין.",
    nextStep: "נבין יחד אם צריך אתר, דף נחיתה או חנות - ומה חסר לפני שמתחילים.",
    href: "/services/websites",
    contactHref: buildContactHref("website"),
    icon: MonitorSmartphone,
    accent: "sky",
  },
  {
    id: "branding",
    title: "מראה מקצועי שבונה אמון לפני השיחה",
    problem: "העסק נראה מקצועי בשטח, אבל אונליין המסר לא חד או לא אחיד.",
    deliverables: "לוגו, שפה ויזואלית ומדריך מותג - בסיס אחיד לכל הערוצים.",
    outcome: "הלקוח מרגיש שהעסק ברמה הנכונה עוד לפני שהוא יוצר קשר.",
    forWho: "מי שמקים נכס חדש או רוצה ליישר קו לפני פרסום.",
    nextStep: "נבדוק אם מיתוג הוא הצעד הראשון - או שצריך קודם נכס שממיר.",
    href: "/services/branding",
    contactHref: buildContactHref("branding"),
    icon: Palette,
    accent: "violet",
  },
  {
    id: "automations",
    title: "סדר בלידים ומעקב אחרי כל פנייה",
    problem: "פניות מתפזרות בוואטסאפ, אין מעקב ברור, וקשה לדעת מאיפה הגיע כל ליד.",
    deliverables: "חיבור טפסים לרשימה או CRM, התראות לצוות, ומדידת מקורות פנייה.",
    outcome: "כל פנייה נכנסת מסודר - פחות לידים שנשכחים בדרך.",
    forWho: "עסקים עם נפח פניות או כמה ערוצי כניסה במקביל.",
    nextStep: "נמפה מאיפה מגיעות הפניות היום - ואיפה הן הולכות לאיבוד.",
    href: "/services/automations",
    contactHref: buildContactHref("automation"),
    icon: Workflow,
    accent: "cyan",
  },
  {
    id: "digital-marketing",
    title: "ניהול קמפיינים ופרסום שאפשר למדוד ולשפר",
    problem: "רוצים לפרסם אבל חסר דף נחיתה, מדידה או הבנה מה באמת עובד.",
    deliverables: "ניהול קמפיינים, תשתית פרסום, דף נחיתה ומעקב אחרי עלות לפנייה - מחוברים לנכס הדיגיטלי.",
    outcome: "יודעים מה שווה להמשיך לפרסם, מה לשפר ומה לעצור.",
    forWho: "עסקים שמוכנים לפרסם או כבר משלמים בלי מספיק שקיפות.",
    nextStep: "נבדוק אם יש תשתית מוכנה לפרסום - או מה חסר לפני שמפעילים תקציב.",
    href: "/services/digital-marketing",
    contactHref: buildContactHref("marketing"),
    icon: Megaphone,
    accent: "rose",
  },
];

export const servicesHubFinalCta = {
  headline: "לא בטוחים מה מתאים לעסק?",
  subline: "בשיחת אבחון של כ־15 דקות נבין את המצב, נציע מסלול וניתן כיוון ברור - בלי התחייבות.",
} as const;
