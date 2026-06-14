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
      title: "בניית אתרים לעסק | אתרי תדמית, דפי נחיתה וחנויות",
      description:
        "בניית אתרים לעסקים בישראל: אתרי תדמית, דפי נחיתה ממירים וחנויות איקומרס. Next.js מהיר, עיצוב מקצועי ותשתית לידים — JT Solutions.",
      keywords: ["בניית אתרים", "אתר תדמית", "דף נחיתה", "חנות אינטרנט", "איקומרס"],
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
      title: "מיתוג לעסק | זהות ויזואלית ושפה מותגית אחידה",
      description:
        "מיתוג דיגיטלי לעסקים: לוגו, צבעים, טיפוגרפיה ושפה ויזואלית עקבית. בסיס מקצועי לפני בניית אתר, דף נחיתה או קמפיינים.",
      keywords: ["מיתוג לעסק", "זהות מותגית", "עיצוב לוגו", "מיתוג דיגיטלי"],
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
      title: "אוטומציה לעסקים | חיבור CRM, בוט וואטסאפ ותורים",
      description:
        "אוטומציה עסקית בישראל: חיבור אתרים ל-CRM, בוט וואטסאפ, בוטים לקביעת תורים ותהליכי n8n. פחות עבודה ידנית, תגובה מהירה יותר.",
      keywords: ["אוטומציה לעסקים", "בוט וואטסאפ", "חיבור CRM", "אוטומציה עסקית"],
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
      title: "שיווק דיגיטלי לעסקים | ניהול קמפיינים וליווי שוטף",
      description:
        "שיווק דיגיטלי מקצה לקצה: Meta, Google Ads, תשתית מדידה, אופטימיזציה וליווי חודשי. קמפיינים שמביאים פניות איכותיות.",
      keywords: ["שיווק דיגיטלי", "ניהול קמפיינים", "גוגל אדס", "פרסום בפייסבוק"],
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
