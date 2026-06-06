import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceTemplate from "@/components/templates/ServiceTemplate";
import ServiceStructuredData from "@/components/seo/ServiceStructuredData";
import { getServiceDisplayExtras } from "@/lib/seo/service-display";
import { getServiceMetadata, mergeServiceFaq, servicePages } from "@/lib/seo/services";
import { Bot, Database, Workflow, TimerReset, Sparkles } from "lucide-react";

const slug = "ai-automation" as const;
const seo = servicePages[slug];
export const metadata = getServiceMetadata(slug);

const faq = mergeServiceFaq(
  [
    { question: "צריך צוות טכני כדי להפעיל את זה?", answer: "לא. הפתרון נבנה כך שיהיה נוח לתפעול יומיומי גם בלי צוות פיתוח פנימי. מספקים הדרכה מלאה בסיום." },
    { question: "אפשר להטמיע על מערכות שכבר קיימות אצלנו?", answer: "כן. כל תכנון האוטומציה מותאם לכלים ולמערכות שכבר עובדים בעסק, בלי להכריח לעבור לפלטפורמה חדשה." },
    { question: "מה קורה אחרי ההשקה?", answer: "לאחר ההשקה יש ליווי ראשוני לתקופת ייצוב, דיוקים לפי הצורך ותמיכה שוטפת עד שהתהליך עובד חלק לחלוטין." },
    { question: "איזה תהליכים אפשר לאוטמט?", answer: "תיאום פגישות, שליחת מיילים ועדכונים אוטומטיים, עיבוד טפסים ולידים, חיבור בין מערכות, דוחות אוטומטיים ועוד — תלוי בצרכי העסק." },
    { question: "כמה זמן עד שרואים חיסכון בזמן?", answer: "ברוב המקרים מרגישים את ההשפעה תוך ימים ספורים מהשקת האוטומציה הראשונה." },
    { question: "האם זה מתאים לעסק קטן?", answer: "כן. אוטומציה לא שמורה לחברות גדולות — גם עסק קטן שמקבל עשרות פניות בשבוע יכול לחסוך שעות עבודה בשבוע." },
  ],
  slug,
);
const extras = getServiceDisplayExtras(slug);

export default function AIAutomationPage() {
  return (
    <>
      <ServiceStructuredData path={seo.path} serviceName={seo.serviceName} description={seo.description} faq={faq} />
      <Navbar />
      <main className="flex-1">
        <ServiceTemplate
          badge="שלב הניהול: שיווק ותחזוקה"
          title="אוטומציה לעסקים — תהליכים חכמים שמפנים זמן לצמיחה"
          description="אנחנו הופכים תהליכים ידניים ומעייפים לזרימות אוטומטיות חכמות, כדי שהצוות שלך יתמקד במכירות, שירות וצמיחה במקום בתפעול חוזר."
          targetAudience={[
            "עסקים עם עומס תפעולי גבוה במשימות חוזרות",
            "עסקים שרוצים לשפר יעילות בלי להגדיל כוח אדם",
            "עסקים שצריכים חיבור חכם בין מערכות ומידע",
          ]}
          timeframe="בדרך כלל בין 2 ל-6 שבועות עד הטמעה מלאה והדרכת צוות."
          deliverables={[
            { icon: Workflow, text: "מיפוי תהליכים ובחירת נקודות אוטומציה" },
            { icon: Bot, text: "בניית תרחישי אוטומציה וסוכני AI לפי צורך" },
            { icon: Database, text: "חיבור מערכות וזרימת נתונים רציפה" },
            { icon: TimerReset, text: "הקמת ניטור, בקרה והתראות שוטפות" },
            { icon: Sparkles, text: "תיעוד והדרכה להפעלה יומיומית בטוחה" },
          ]}
          faq={faq}
          seoIntro={extras.seoIntro}
          whyUs={extras.whyUs}
          relatedProjectIds={extras.relatedProjectIds}
          relatedBlogSlugs={extras.relatedBlogSlugs}
          ctaLocation={slug}
        />
      </main>
      <Footer />
    </>
  );
}
