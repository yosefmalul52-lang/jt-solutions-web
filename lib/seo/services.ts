import { createPageMetadata } from "@/lib/seo/metadata";
import type { ServiceFaqItem } from "@/lib/types/faq";

export type ServiceSlug =
  | "landing-pages"
  | "business-websites"
  | "ecommerce"
  | "branding"
  | "ad-infrastructure"
  | "whatsapp-bot"
  | "ai-automation"
  | "web-development";

export type ServiceSeoConfig = {
  slug: ServiceSlug;
  path: string;
  title: string;
  description: string;
  serviceName: string;
  keywords: string[];
  extraFaq: ServiceFaqItem[];
};

export const servicePages: Record<ServiceSlug, ServiceSeoConfig> = {
  "landing-pages": {
    slug: "landing-pages",
    path: "/services/websites#landing",
    title: "דף נחיתה שמוביל לפנייה ומוכן לפרסום",
    description:
      "לעסקים עם הצעה ממוקדת או קמפיין קרוב — דף נחיתה עם מסר ברור, פעולה אחת ומדידה שמראה מאיפה הגיעו הפניות.",
    serviceName: "בניית דף נחיתה ממיר",
    keywords: ["דף נחיתה", "בניית דף נחיתה", "דף נחיתה ממיר", "landing page"],
    extraFaq: [
      {
        question: "כמה עולה דף נחיתה ממיר?",
        answer:
          "המחיר תלוי בהיקף התוכן, העיצוב והאינטגרציות. בשיחת התאמה קצרה נבנה הצעה ברורה לפי המטרה העסקית שלך.",
      },
      {
        question: "למי מתאים דף נחיתה?",
        answer:
          "לעסקים עם הצעה ממוקדת, קמפיין ממומן או שירות אחד מוביל שרוצים להמיר תנועה לפניות מהירות.",
      },
    ],
  },
  "business-websites": {
    slug: "business-websites",
    path: "/services/websites#corporate",
    title: "אתר תדמית שמציג את העסק ומוביל לפנייה",
    description:
      "לעסקים שרוצים נוכחות מקצועית ברורה — אתר תדמית מותאם מובייל, עם מסר, פנייה ומדידה שמראה מה עובד.",
    serviceName: "בניית אתר תדמית לעסק",
    keywords: ["אתר תדמית", "בניית אתר לעסק", "אתר עסקי", "בניית אתרים"],
    extraFaq: [
      {
        question: "כמה עולה אתר תדמית בישראל?",
        answer:
          "טווח המחיר נקבע לפי מספר העמודים, רמת העיצוב והאינטגרציות. נציג טווח ברור לאחר שיחת אפיון קצרה.",
      },
      {
        question: "למי מתאים אתר תדמית?",
        answer:
          "לעסקים שרוצים נוכחות מקצועית, להציג מספר שירותים ולייצר פניות קבועות — לפני הרחבה לחנות או קמפיינים גדולים.",
      },
    ],
  },
  ecommerce: {
    slug: "ecommerce",
    path: "/services/websites#ecommerce",
    title: "חנות אונליין עם סדר בהזמנות וניהול",
    description:
      "לעסקים שמוכרים מוצרים אונליין — חנות עם זרימת קנייה ברורה, ניהול הזמנות במקום אחד ותשתית למדידה.",
    serviceName: "בניית חנות אינטרנט",
    keywords: ["חנות אינטרנט", "איקומרס", "בניית חנות אונליין", "חנות איקומרס"],
    extraFaq: [
      {
        question: "כמה עולה להקים חנות אינטרנט?",
        answer:
          "ההיקף תלוי במספר מוצרים, אמצעי תשלום ואוטומציות. נגדיר תוכנית והצעת מחיר מדויקת לפי המטרה העסקית.",
      },
      {
        question: "למי מתאימה חנות איקומרס?",
        answer:
          "לעסקים עם קטלוג מוצרים או שירותים שנמכרים אונליין ורוצים לשלוט בתהליך המכירה וההזמנות.",
      },
    ],
  },
  branding: {
    slug: "branding",
    path: "/services/branding",
    title: "מיתוג שמחזק אמון לפני כל פנייה",
    description:
      "לעסקים שרוצים נראות מקצועית אחידה — לוגו, צבעים ושפה ויזואלית שמכינים את הקרקע לאתר, לדף נחיתה ולפרסום.",
    serviceName: "מיתוג וזהות לעסק",
    keywords: ["מיתוג לעסק", "זהות מותגית", "עיצוב לוגו", "מיתוג דיגיטלי"],
    extraFaq: [
      {
        question: "כמה זמן לוקח תהליך מיתוג?",
        answer: "בדרך כלל בין שבועיים לחודש, בהתאם למורכבות והיקף החומרים.",
      },
      {
        question: "למי מתאים שירות מיתוג?",
        answer: "לעסקים חדשים או עסקים שעוברים ריענון ורוצים מראה אחיד ומקצועי בכל ערוץ דיגיטלי.",
      },
    ],
  },
  "ad-infrastructure": {
    slug: "ad-infrastructure",
    path: "/services/digital-marketing#full-funnel",
    title: "פרסום מדיד שמחובר לפניות",
    description:
      "לעסקים שרוצים לפרסם בביטחון — תשתית מדידה, דף ממוקד ומעקב אחרי פניות לפני הגדלת תקציב.",
    serviceName: "ניהול קמפיינים ותשתית פרסום",
    keywords: ["ניהול קמפיינים", "פרסום בפייסבוק", "גוגל אדס", "שיווק ממומן"],
    extraFaq: [
      {
        question: "מה צריך לפני שמתחילים לפרסם?",
        answer: "דף נחיתה או אתר ממיר, מדידה תקינה ומסר ברור — נבנה את התשתית לפני הפעלת תקציב.",
      },
      {
        question: "למי מתאים שירות תשתית פרסום?",
        answer: "לעסקים שרוצים לייצר לידים במודל מדיד ולשפר עלות לפנייה לאורך זמן.",
      },
    ],
  },
  "whatsapp-bot": {
    slug: "whatsapp-bot",
    path: "/services/automations#whatsapp",
    title: "וואטסאפ שמסנן פניות ולא מאבד הודעות",
    description:
      "לעסקים שמקבלים הרבה פניות בוואטסאפ — מענה ראשוני, איסוף פרטים והעברה למעקב מסודר בלי שהכול יתפזר בצ'אטים.",
    serviceName: "בוט וואטסאפ לעסק",
    keywords: ["בוט וואטסאפ", "וואטסאפ לעסק", "אוטומציה וואטסאפ", "צ'אטבוט"],
    extraFaq: [
      {
        question: "כמה עולה בוט וואטסאפ לעסק?",
        answer: "המחיר נקבע לפי מורכבות התסריטים, האינטגרציות ונפח הפניות. נציג הצעה ברורה בשיחה.",
      },
      {
        question: "למי מתאים בוט וואטסאפ?",
        answer: "לעסקים שמקבלים פניות רבות בוואטסאפ ורוצים מענה מהיר בלי להעמיס על הצוות.",
      },
    ],
  },
  "ai-automation": {
    slug: "ai-automation",
    path: "/services/automations#site-integration",
    title: "סדר בלידים — מכל מקור פנייה למעקב אחד",
    description:
      "לעסקים עם פניות מטפסים, וואטסאפ וקמפיינים — חיבור מקורות הפנייה למעקב מרכזי, התראות ותזכורות לחזרה.",
    serviceName: "אוטומציה עסקית",
    keywords: ["אוטומציה לעסקים", "אוטומציה עסקית", "חיבור CRM", "AI לעסקים"],
    extraFaq: [
      {
        question: "מתי אוטומציה משתלמת לעסק?",
        answer: "כשיש נפח פניות חוזר, העברת נתונים בין מערכות או עיכובים שגורמים לאיבוד לידים.",
      },
      {
        question: "אילו מערכות אפשר לחבר?",
        answer: "טפסים, וואטסאפ, CRM, גיליונות, מערכות פנימיות ועוד — לפי הצורך העסקי.",
      },
    ],
  },
  "web-development": {
    slug: "web-development",
    path: "/services/automations#site-integration",
    title: "תשתית דיגיטלית מותאמת לתהליך העסק",
    description:
      "לעסקים עם לוגיקה או תהליכים ייחודיים — פתרון מותאם שמחבר נוכחות דיגיטלית, פניות ומעקב לפי הצורך האמיתי.",
    serviceName: "פיתוח אתרים ומערכות",
    keywords: ["פיתוח אתרים", "פיתוח מערכות", "Next.js", "בניית אתרים מותאם"],
    extraFaq: [
      {
        question: "מה ההבדל בין אתר תדמית לפיתוח מותאם?",
        answer: "אתר תדמית מתאים לרוב העסקים. פיתוח מותאם רלוונטי כשיש לוגיקה עסקית, אינטגרציות או מוצר דיגיטלי ייחודי.",
      },
      {
        question: "למי מתאים פיתוח מותאם?",
        answer: "לעסקים עם תהליכים ייחודיים, דשבורדים, מערכות פנימיות או דרישות שלא נכנסות לחבילה סטנדרטית.",
      },
    ],
  },
};

export function getServiceMetadata(slug: ServiceSlug) {
  const config = servicePages[slug];
  return createPageMetadata({
    title: config.title,
    description: config.description,
    path: config.path,
    keywords: config.keywords,
  });
}

export function mergeServiceFaq(base: ServiceFaqItem[], slug: ServiceSlug) {
  return [...base, ...servicePages[slug].extraFaq];
}
