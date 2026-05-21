import type { ServiceSlug } from "@/lib/seo/services";
import {
  howToChooseAgencyExpanded,
  howToChooseAgencyFaq,
  landingPageVsWebsiteExpanded,
  landingPageVsWebsiteFaq,
  websiteCostIsrael2026Expanded,
  websiteCostIsrael2026Faq,
} from "@/lib/blog/expanded-top-posts";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  keywords: string[];
  relatedServices: ServiceSlug[];
  sections: BlogSection[];
  faq: { question: string; answer: string }[];
};

const posts: BlogPost[] = [
  {
    slug: "website-cost-israel-2026",
    title: "כמה עולה אתר תדמית בישראל ב-2026? טווחי מחיר ומה משפיע",
    description:
      "מדריך מעשי לטווחי מחיר של אתר תדמית בישראל: מה כלול, מה מעלה עלות, ואיך לבחור הצעה שמייצרת פניות ולא רק עיצוב יפה.",
    publishedAt: "2026-01-15",
    keywords: ["כמה עולה אתר תדמית", "מחיר אתר לעסק", "בניית אתרים ישראל"],
    relatedServices: ["business-websites", "landing-pages"],
    sections: websiteCostIsrael2026Expanded,
    faq: websiteCostIsrael2026Faq,
  },
  {
    slug: "landing-page-vs-full-website",
    title: "דף נחיתה או אתר מלא — מה מתאים לעסק שלך?",
    description:
      "השוואה ברורה בין דף נחיתה לאתר תדמית: מתי כל אחד עדיף, כמה עולה, ואיך לא לבחור פתרון שמאחר את הצמיחה.",
    publishedAt: "2026-01-22",
    keywords: ["דף נחיתה", "אתר תדמית", "landing page"],
    relatedServices: ["landing-pages", "business-websites"],
    sections: landingPageVsWebsiteExpanded,
    faq: landingPageVsWebsiteFaq,
  },
  {
    slug: "how-to-choose-digital-agency",
    title: "איך בוחרים סוכנות דיגיטל בלי להתחרט",
    description:
      "צ'ק-ליסט לבחירת סוכנות דיגיטל בישראל: שאלות לשאול, דגלים אדומים, ומה צריך לקבל לפני חתימה.",
    publishedAt: "2026-02-01",
    keywords: ["סוכנות דיגיטל", "בחירת סוכנות", "שירותי דיגיטל"],
    relatedServices: ["business-websites", "branding"],
    sections: howToChooseAgencyExpanded,
    faq: howToChooseAgencyFaq,
  },
  {
    slug: "ecommerce-mistakes-small-business",
    title: "טעויות נפוצות בבניית חנות איקומרס קטנה",
    description:
      "הטעויות שעולות לעסקים כסף בחנות אונליין — ומה לעשות במקום כדי להגדיל מכירות.",
    publishedAt: "2026-02-08",
    keywords: ["חנות אינטרנט", "איקומרס", "טעויות חנות"],
    relatedServices: ["ecommerce"],
    sections: [
      {
        heading: "הטעויות המובילות",
        paragraphs: [
          "תהליך קנייה מסורבל במובייל, חוסר מדידה, קטלוג לא מסודר, ואוטומציה חלקית של הזמנות.",
          "חנות יפה שלא מחוברת לניהול הזמנות יוצרת עומס ידני וטעויות.",
        ],
      },
    ],
    faq: [],
  },
  {
    slug: "website-spec-before-development",
    title: "מה צריך לכלול אפיון אתר לפני פיתוח",
    description:
      "רשימת בדיקה לאפיון אתר: קהל יעד, מסרים, מבנה עמודים, המרות ומדידה — כדי לא לשרוף תקציב על תיקונים.",
    publishedAt: "2026-02-15",
    keywords: ["אפיון אתר", "תכנון אתר", "UX"],
    relatedServices: ["business-websites", "web-development"],
    sections: [
      {
        heading: "רכיבי אפיון חובה",
        paragraphs: [
          "מטרה עסקית אחת, מפת עמודים, תוכן לכל עמוד, זרימת ליד, אינטגרציות ו-KPI למדידה.",
        ],
      },
    ],
    faq: [],
  },
  {
    slug: "whatsapp-automation-worth-it",
    title: "אוטומציה וואטסאפ לעסק — מתי זה משתלם",
    description:
      "מתי בוט וואטסאפ חוסך זמן אמיתי, מתי הוא מיותר, ואיך לחבר אותו ללידים ו-CRM.",
    publishedAt: "2026-02-22",
    keywords: ["בוט וואטסאפ", "אוטומציה וואטסאפ"],
    relatedServices: ["whatsapp-bot", "ai-automation"],
    sections: [
      {
        heading: "מתי כן",
        paragraphs: [
          "כשמגיעות פניות חוזרות, יש שעות שיא, והצוות מאבד לידים בגלל עיכוב במענה.",
        ],
      },
    ],
    faq: [],
  },
  {
    slug: "digital-branding-small-business",
    title: "מיתוג דיגיטלי לעסק קטן — צעדים מעשיים",
    description:
      "איך בונים זהות מותגית שמייצרת אמון: לוגו, צבעים, שפה ויזואלית ויישום באתר ובפרסום.",
    publishedAt: "2026-03-01",
    keywords: ["מיתוג לעסק", "זהות מותגית"],
    relatedServices: ["branding", "landing-pages"],
    sections: [
      {
        heading: "סדר עבודה מומלץ",
        paragraphs: [
          "מיתוג לפני אתר, אתר לפני קמפיינים גדולים. עקביות בכל נקודת מגע מגדילה המרה.",
        ],
      },
    ],
    faq: [],
  },
  {
    slug: "measure-landing-page-success",
    title: "איך למדוד הצלחה של דף נחיתה (פיקסל ו-GA4)",
    description:
      "מדריך מדידה לדף נחיתה: אירועים, פיקסל Meta, GA4 ומה לבדוק בשבוע הראשון.",
    publishedAt: "2026-03-08",
    keywords: ["מדידת המרות", "GA4", "פיקסל"],
    relatedServices: ["landing-pages", "ad-infrastructure"],
    sections: [
      {
        heading: "מה למדוד",
        paragraphs: [
          "צפיות, זמן בעמוד, שליחות טופס, לחיצות וואטסאפ/טלפון, ועלות לפנייה בקמפיין.",
        ],
      },
    ],
    faq: [],
  },
  {
    slug: "ads-infrastructure-before-campaigns",
    title: "תשתית פרסום: מה צריך לפני שמפעילים קמפיינים",
    description:
      "צ'ק-ליסט לפני הפעלת פרסום: דף ממיר, מדידה, מסר, תקציב ותהליך מעקב לידים.",
    publishedAt: "2026-03-15",
    keywords: ["תשתית פרסום", "קמפיינים", "שיווק ממומן"],
    relatedServices: ["ad-infrastructure", "landing-pages"],
    sections: [
      {
        heading: "לפני שמדליקים תקציב",
        paragraphs: [
          "בלי דף ממיר ומדידה — כל קליק הוא הוצאה בלי למידה. תשתית נכונה מקצרת זמן ל-ROI.",
        ],
      },
    ],
    faq: [],
  },
  {
    slug: "before-after-case-studies",
    title: "דוגמאות לפני/אחרי: מה משנה פרויקט דיגיטלי נכון",
    description:
      "מה למדוד בפרויקט לפני ואחרי: זמן תגובה, המרה, סדר תפעולי ותחושת מותג.",
    publishedAt: "2026-03-22",
    keywords: ["case study", "פרויקטים דיגיטל"],
    relatedServices: ["ecommerce", "landing-pages"],
    sections: [
      {
        heading: "מה להסתכל בפרויקט",
        paragraphs: [
          "לא רק עיצוב — זמן טיפול, אחוז סגירה, עלות לפנייה ושקט תפעולי לצוות.",
        ],
      },
    ],
    faq: [],
  },
  {
    slug: "monthly-growth-retainer",
    title: "ריטיינר חודשי לצמיחה דיגיטלית — למי זה מתאים",
    description:
      "מתי ריטיינר חודשי עדיף מפרויקט חד-פעמי, ומה צריך לכלול כדי לראות תוצאות.",
    publishedAt: "2026-03-29",
    keywords: ["ריטיינר שיווק", "צמיחה דיגיטלית"],
    relatedServices: ["ad-infrastructure", "ai-automation"],
    sections: [
      {
        heading: "למי מתאים",
        paragraphs: [
          "לעסק שכבר עלה לאוויר ורוצה שיפור מתמשך בפרסום, תוכן, אוטומציה וניתוח נתונים.",
        ],
      },
    ],
    faq: [],
  },
  {
    slug: "website-launch-checklist-14-days",
    title: "צ'ק-ליסט השקת אתר חדש ב-14 ימים",
    description:
      "תוכנית השקה מסודרת: תוכן, QA, מדידה, SEO בסיסי והדרכת צוות — בלי הפתעות ביום העלייה.",
    publishedAt: "2026-04-05",
    keywords: ["השקת אתר", "צ'ק ליסט אתר"],
    relatedServices: ["business-websites", "web-development"],
    sections: [
      {
        heading: "14 ימים מומלצים",
        paragraphs: [
          "ימים 1–5: אפיון ותוכן. 6–10: עיצוב ופיתוח. 11–12: QA ומדידה. 13–14: השקה ומעקב.",
        ],
      },
    ],
    faq: [],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}
