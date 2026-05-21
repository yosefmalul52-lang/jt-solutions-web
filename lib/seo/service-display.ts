import type { ServiceSlug } from "@/lib/seo/services";

export type ServiceDisplayExtras = {
  seoIntro: string[];
  whyUs: string[];
  relatedProjectIds: string[];
  relatedBlogSlugs: string[];
};

export const serviceDisplayExtras: Record<ServiceSlug, ServiceDisplayExtras> = {
  "landing-pages": {
    seoIntro: [
      "דף נחיתה ממיר בישראל הוא הכלי המהיר ביותר להפוך תנועה מקמפיין לפניות — כשהמסר חד, העיצוב בנוי להמרה והמדידה מחוברת מהיום הראשון.",
      "ב-JT Solutions בונים דפי נחיתה עם אפיון שיווקי, עיצוב רספונסיבי, חיבור לוואטסאפ וטפסים, והטמעת פיקסל Meta ו-GA4. זמן טיפוסי: 7–14 ימי עבודה.",
      "מתאים לעסקים עם הצעה ממוקדת, קמפיין ב-Meta או Google, או שירות מוביל שצריך להציג בצורה ברורה ומקצועית.",
    ],
    whyUs: [
      "אפיון שיווקי לפני עיצוב — לא מתחילים מפיקסלים",
      "מדידה מלאה: טופס, וואטסאפ, שיחות",
      "ליווי ישיר 1:1 עם יוסף מלול",
    ],
    relatedProjectIds: ["eb-hair"],
    relatedBlogSlugs: ["landing-page-vs-full-website", "measure-landing-page-success"],
  },
  "business-websites": {
    seoIntro: [
      "אתר תדמית לעסק בישראל הוא הבסיס לנוכחות מקצועית, אמון לטווח ארוך וקידום אורגני בגוגל — לא רק כרטיס ביקור דיגיטלי.",
      "אנחנו בונים אתרים עד 10 עמודים על Next.js: מהירים, נגישים, מותאמים למובייל ומוכנים לטפסי לידים ולקמפיינים.",
      "המחיר נקבע לפי היקף, אינטגרציות ורמת התוכן. בשיחת התאמה תקבלו טווח ברור ותוכנית שמחברת אתר להמרות.",
    ],
    whyUs: [
      "ארכיטקטורת SEO ומהירות מובנית",
      "מבנה ברור שמוביל לפנייה בכל עמוד",
      "אפשרות להרחבה לחנות או אוטומציה בהמשך",
    ],
    relatedProjectIds: ["eb-hair"],
    relatedBlogSlugs: ["website-cost-israel-2026", "website-spec-before-development"],
  },
  ecommerce: {
    seoIntro: [
      "חנות אינטרנט לעסק קטן–בינוני בישראל דורשת יותר מתבנית: קטלוג מסודר, תהליך קנייה חלק במובייל, תשלום וניהול הזמנות שעובדים יחד.",
      "ב-JT Solutions מקימים חנויות איקומרס עם דגש על המרה, מהירות טעינה ואוטומציה של סטטוסי הזמנה — כדי שהצוות ימכור ולא יכבה שריפות.",
      "מתאים לעסקים עם קטלוג מוצרים, מכירה אונליין או שילוב בין חנות פיזית לדיגיטל.",
    ],
    whyUs: [
      "חוויית קנייה מהירה בנייד",
      "דשבורד הזמנות ואוטומציות",
      "תשתית מדידה למכירות",
    ],
    relatedProjectIds: ["magadim"],
    relatedBlogSlugs: ["ecommerce-mistakes-small-business", "before-after-case-studies"],
  },
  branding: {
    seoIntro: [
      "מיתוג דיגיטלי לעסק קטן בונה אמון לפני כל קמפיין או אתר — לוגו, צבעים, טיפוגרפיה ושפה ויזואלית עקבית בכל נקודת מגע.",
      "תהליך המיתוג אצלנו קודם לפיתוח: מגדירים מסר, קהל ומראה מקצועי, ואז מיישמים באתר, בדף נחיתה ובפרסום.",
      "זמן טיפוסי: שבועיים עד חודש, לפי היקף החומרים.",
    ],
    whyUs: [
      "מיתוג לפני אתר — סדר נכון",
      "שפה מותגית שמדברת לקהל היעד",
      "יישום עקבי בכל הערוצים",
    ],
    relatedProjectIds: ["eb-hair"],
    relatedBlogSlugs: ["digital-branding-small-business", "how-to-choose-digital-agency"],
  },
  "ad-infrastructure": {
    seoIntro: [
      "ניהול קמפיינים בלי תשתית נכונה שורף תקציב: צריך דף ממיר, פיקסלים, אירועי המרה ותהליך מעקב לידים לפני שמדליקים פרסום.",
      "אנחנו בונים תשתית פרסום ב-Meta וב-Google: הגדרות חשבון, פיקסלים, קהלים, דפי נחיתה ואופטימיזציה שבועית.",
      "מתאים לעסקים שרוצים לידים במודל מדיד ולשפר עלות לפנייה לאורך זמן.",
    ],
    whyUs: [
      "תשתית לפני תקציב — לא להפך",
      "דוחות ברורים ושיפור שבועי",
      "חיבור לדפי נחיתה שבנינו",
    ],
    relatedProjectIds: ["eb-hair"],
    relatedBlogSlugs: ["ads-infrastructure-before-campaigns", "measure-landing-page-success"],
  },
  "whatsapp-bot": {
    seoIntro: [
      "בוט וואטסאפ לעסק חוסך זמן לצוות ומונע איבוד לידים בשעות עומס — מענה מהיר, איסוף פרטים וסינון פניות אוטומטי.",
      "מחברים את הבוט לטפסים, CRM ותהליכי המשך, כך שכל פנייה מתועדת ומגיעה לאדם הנכון בזמן.",
      "משתלם כשמגיעות עשרות פניות ביום בוואטסאפ ויש עיכובים שגורמים ללקוחות לעבור למתחרה.",
    ],
    whyUs: [
      "תסריטים בעברית לקהל ישראלי",
      "חיבור ל-CRM ולידים",
      "הקמה מהירה יחסית",
    ],
    relatedProjectIds: ["ai-automation"],
    relatedBlogSlugs: ["whatsapp-automation-worth-it"],
  },
  "ai-automation": {
    seoIntro: [
      "אוטומציה עסקית בישראל מחברת בין מקורות לידים, CRM, וואטסאפ ומערכות פנימיות — בלי העתקות ידניות ובלי לידים שנשכחים במייל.",
      "אנחנו בונים תהליכי n8n, התראות בזמן אמת וסוכני AI לפי צורך העסק, עם דגש על מדידה ושקיפות.",
      "מתאים לעסקים עם נפח פניות, צוות מכירות או תפעול שצריך סדר ומהירות תגובה.",
    ],
    whyUs: [
      "מיפוי תהליך לפני אוטומציה",
      "חיבורים מותאמים — לא תבנית כללית",
      "תחזוקה ושיפור מתמשך",
    ],
    relatedProjectIds: ["ai-automation"],
    relatedBlogSlugs: ["whatsapp-automation-worth-it", "monthly-growth-retainer"],
  },
  "web-development": {
    seoIntro: [
      "פיתוח אתרים ומערכות מותאם לעסקים שצריכים יותר מתבנית: לוגיקה עסקית, אינטגרציות, דשבורדים או מוצר דיגיטלי ייחודי.",
      "עובדים ב-Next.js לביצועים, אבטחה ויכולת צמיחה — עם אפיון ברור לפני קוד.",
      "רלוונטי כשיש דרישות שלא נכנסות לחבילת אתר תדמית סטנדרטית.",
    ],
    whyUs: [
      "ארכיטקטורה לטווח ארוך",
      "קוד נקי ותיעוד",
      "חיבור למערכות קיימות",
    ],
    relatedProjectIds: ["magadim", "ai-automation"],
    relatedBlogSlugs: ["website-spec-before-development", "website-launch-checklist-14-days"],
  },
};

export function getServiceDisplayExtras(slug: ServiceSlug): ServiceDisplayExtras {
  return serviceDisplayExtras[slug];
}
