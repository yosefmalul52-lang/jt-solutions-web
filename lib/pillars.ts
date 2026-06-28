import {
  Megaphone,
  MonitorSmartphone,
  Palette,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type PillarSlug = "websites" | "branding" | "automations" | "digital-marketing";

export type PillarSectionAnchor = {
  id: string;
  title: string;
};

export type PillarConfig = {
  slug: PillarSlug;
  path: string;
  title: string;
  tagline: string;
  badge: string;
  heroTitle: string;
  heroDescription: string;
  icon: LucideIcon;
  accentRgb: string;
  accentSecondaryRgb: string;
  sections: PillarSectionAnchor[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export const pillars: Record<PillarSlug, PillarConfig> = {
  websites: {
    slug: "websites",
    path: "/services/websites",
    title: "בניית אתרים",
    tagline: "אתרי תדמית, דפי נחיתה וחנויות שממירים",
    badge: "בניית אתרים",
    heroTitle: "אתרים שמייצרים פניות — מותאמים לשלב של העסק",
    heroDescription:
      "מאתר תדמית מקצועי ועד דף נחיתה ממיר או חנות איקומרס — הכל ב-Next.js מהיר, נגיש ומוכן למדידה.",
    icon: MonitorSmartphone,
    accentRgb: "59, 130, 246",
    accentSecondaryRgb: "99, 102, 241",
    sections: [
      { id: "corporate", title: "אתרי תדמית" },
      { id: "landing", title: "דפי נחיתה" },
      { id: "ecommerce", title: "חנויות אינטרנט" },
    ],
    seo: {
      title: "בניית אתרים ודפי נחיתה שמובילים לפניות",
      description:
        "לעסקים בישראל שצריכים אתר תדמית, דף נחיתה או חנות — מסר ברור, פנייה קלה ומדידה שמראה מאיפה הפניות מגיעות.",
      keywords: ["בניית אתרים", "אתר תדמית", "דף נחיתה", "חנות אונליין", "פניות מהאתר"],
    },
  },
  branding: {
    slug: "branding",
    path: "/services/branding",
    title: "מיתוג",
    tagline: "זהות ויזואלית שמחזקת אמון לפני כל קמפיין",
    badge: "מיתוג וזהות",
    heroTitle: "זהות שמחזקת אמון — לפני שמביאים תנועה",
    heroDescription:
      "פלטת צבעים, ספר מותג דיגיטלי ולוגו — בסיס מקצועי שמיישר קו בכל נקודת מגע עם הלקוח.",
    icon: Palette,
    accentRgb: "168, 85, 247",
    accentSecondaryRgb: "109, 40, 217",
    sections: [
      { id: "palette", title: "בחירת פלטת צבעים" },
      { id: "brand-book", title: "ספר מותג דיגיטלי" },
      { id: "logo", title: "לוגו" },
    ],
    seo: {
      title: "מיתוג שמחזק אמון לפני כל פנייה",
      description:
        "לעסקים שרוצים נראות מקצועית אחידה — לוגו, צבעים ושפה ויזואלית שמכינים את הקרקע לאתר, לדף נחיתה ולפרסום.",
      keywords: ["מיתוג לעסק", "זהות מותגית", "עיצוב לוגו", "שפה ויזואלית"],
    },
  },
  automations: {
    slug: "automations",
    path: "/services/automations",
    title: "אוטומציות",
    tagline: "חיבור מערכות, בוטים ותורים — בלי עבודה ידנית",
    badge: "אוטומציה עסקית",
    heroTitle: "פחות עבודה ידנית — יותר לידים שמגיעים מסודר",
    heroDescription:
      "מחברים אתרים, טפסים, CRM ו-WhatsApp לתהליכים אוטומטיים — מענה מהיר, פחות טעויות, יותר מכירות.",
    icon: Workflow,
    accentRgb: "16, 185, 129",
    accentSecondaryRgb: "59, 130, 246",
    sections: [
      { id: "site-integration", title: "חיבור אתרים לאוטומציות" },
      { id: "whatsapp", title: "בוט וואטסאפ" },
      { id: "scheduling", title: "בוטים לקביעת תורים" },
    ],
    seo: {
      title: "סדר בלידים ומעקב אחרי פניות",
      description:
        "לעסקים שמקבלים פניות מכמה מקורות — חיבור טפסים, וואטסאפ והתראות כך שכל ליד נכנס למעקב מסודר.",
      keywords: ["סדר בלידים", "מעקב פניות", "וואטסאפ לעסק", "חיבור CRM", "אוטומציה לעסקים"],
    },
  },
  "digital-marketing": {
    slug: "digital-marketing",
    path: "/services/digital-marketing",
    title: "שיווק דיגיטלי",
    tagline: "קמפיינים מקצה לקצה עם ליווי שוטף",
    badge: "שיווק דיגיטלי",
    heroTitle: "קמפיינים מדידים — מתשתית ועד תוצאות",
    heroDescription:
      "Meta, Google, תשתית מדידה ואופטימיזציה מתמשכת — עם ליווי אסטרטגי שמחבר פרסום לתוצאות עסקיות.",
    icon: Megaphone,
    accentRgb: "236, 72, 153",
    accentSecondaryRgb: "109, 40, 217",
    sections: [
      { id: "full-funnel", title: "ניהול קמפיינים מקצה לקצה" },
      { id: "ongoing-guidance", title: "ליווי שוטף והכוונה" },
    ],
    seo: {
      title: "פרסום מדיד שמחובר לפניות ולמדידה",
      description:
        "לעסקים שרוצים לפרסם בביטחון — תשתית מדידה, דף ממוקד ומעקב אחרי פניות לפני הגדלת תקציב.",
      keywords: ["שיווק דיגיטלי", "פרסום מדיד", "ניהול קמפיינים", "מדידת פניות"],
    },
  },
};

export const pillarList: PillarConfig[] = Object.values(pillars);

export function getPillarBySlug(slug: PillarSlug): PillarConfig {
  return pillars[slug];
}

export function getAllPillarSlugs(): PillarSlug[] {
  return Object.keys(pillars) as PillarSlug[];
}

export function getAllPillarPaths(): string[] {
  return pillarList.map((p) => p.path);
}
