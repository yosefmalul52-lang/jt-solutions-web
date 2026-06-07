import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PillarStructuredData from "@/components/seo/PillarStructuredData";
import PillarTemplate from "@/components/templates/PillarTemplate";
import FloatingMockup from "@/components/ui/FloatingMockup";
import { getPillarBySlug } from "@/lib/pillars";
import { mergeLegacyFaq } from "@/lib/pillar-faq";
import { getPillarMetadata } from "@/lib/seo/pillars";
import { getServiceDisplayExtras } from "@/lib/seo/service-display";

const slug = "automations" as const;
const pillar = getPillarBySlug(slug);
export const metadata = getPillarMetadata(slug);

const aiExtras = getServiceDisplayExtras("ai-automation");
const whatsappExtras = getServiceDisplayExtras("whatsapp-bot");
const webExtras = getServiceDisplayExtras("web-development");

const seoIntro = [aiExtras.seoIntro[0], whatsappExtras.seoIntro[0], webExtras.seoIntro[0]];

const faq = mergeLegacyFaq(
  [
    { question: "צריך צוות טכני כדי להפעיל את זה?", answer: "לא. הפתרון נבנה כך שיהיה נוח לתפעול יומיומי גם בלי צוות פיתוח פנימי. מספקים הדרכה מלאה בסיום." },
    { question: "אפשר להטמיע על מערכות שכבר קיימות אצלנו?", answer: "כן. כל תכנון האוטומציה מותאם לכלים ולמערכות שכבר עובדים בעסק, בלי להכריח לעבור לפלטפורמה חדשה." },
    { question: "האם הבוט מחליף לגמרי בן אדם?", answer: "לא בהכרח. הבוט מטפל בשכבה הראשונה — מידע, סינון ואיסוף פרטים — ומעביר אליכם כשצריך החלטה אישית או מכירה." },
    { question: "הבוט עובד 24/7?", answer: "כן. אחד היתרונות המרכזיים הוא שהבוט עונה גם בלילה, בסופי שבוע ובחגים — בלי שתצטרכו להיות זמינים." },
    { question: "אפשר לחבר למערכות שאנחנו כבר עובדים איתן?", answer: "בהרבה מקרים כן. בשיחת האפיון נבדוק אילו חיבורים נדרשים — CRM, גיליון, מייל — ומה הכי פרקטי לעסק שלכם." },
    { question: "איך עובד בוט לקביעת תורים?", answer: "הבוט אוסף פרטים, מציג זמינות, מאשר תור ושולח תזכורות — עם חיבור ליומן או למערכת ניהול תורים שכבר יש לכם." },
    { question: "כמה זמן לוקח לבנות ולהטמיע אוטומציה?", answer: "בדרך כלל בין 2 ל-6 שבועות, תלוי במספר התסריטים, החיבורים והמערכות הקיימות." },
  ],
  ["ai-automation", "whatsapp-bot", "web-development"],
);

export default function AutomationsPillarPage() {
  return (
    <>
      <PillarStructuredData slug={slug} faq={faq} />
      <Navbar />
      <main className="flex-1">
        <PillarTemplate
          pillarId={slug}
          badge={pillar.badge}
          title={pillar.heroTitle}
          description={pillar.heroDescription}
          seoIntro={seoIntro}
          faq={faq}
          ctaLocation={slug}
          sections={[
            {
              id: "site-integration",
              title: "חיבור אתרים לאוטומציות",
              subtitle:
                "טפסים, לידים ונתונים זורמים אוטומטית ל-CRM, מיילים ומערכות פנימיות — בלי העתקות ידניות ובלי לידים שנשכחים.",
              timeframe: "בדרך כלל בין 2 ל-6 שבועות עד הטמעה מלאה והדרכת צוות.",
              deliverables: [
                "מיפוי תהליכים ובחירת נקודות אוטומציה",
                "חיבור טפסים באתר ל-CRM ולערוצי המשך",
                "בניית תרחישי n8n וסוכני AI לפי צורך",
                "חיבור מערכות וזרימת נתונים רציפה",
                "תיעוד והדרכה להפעלה יומיומית בטוחה",
              ],
              audience: [
                "עסקים עם עומס תפעולי גבוה במשימות חוזרות",
                "עסקים שצריכים חיבור חכם בין מערכות ומידע",
                "עסקים עם אתר שמייצר לידים שלא מטופלים בזמן",
              ],
              visualProof: (
                <FloatingMockup
                  src="/projects/ai-automation.png"
                  alt="דוגמה לפרויקט אוטומציה — חיבור מערכות ולידים"
                  variant="laptop"
                  showCaption={false}
                />
              ),
            },
            {
              id: "whatsapp",
              title: "בוט וואטסאפ",
              subtitle:
                "בוט שמקבל פניות, עונה לשאלות חוזרות, אוסף מידע מסודר ומעביר אליכם רק את מה שבאמת דורש טיפול אנושי.",
              timeframe: "בדרך כלל בין 2 ל-5 שבועות, לפי מורכבות התסריטים והחיבורים.",
              deliverables: [
                "אפיון תסריטי שיחה, שאלות נפוצות ונקודות מעבר לנציג",
                "בניית הבוט והטמעה בערוץ הוואטסאפ העסקי",
                "ניסוחים ברורים בעברית שמתאימים לקול המותג",
                "חיסכון בזמן — סינון פניות, איסוף פרטים ותיעוד",
                "הדרכה קצרה להפעלה שוטפת ועדכונים לתסריטים",
              ],
              audience: [
                "עסקים שמקבלים הרבה הודעות בוואטסאפ ונתקעים על שאלות חוזרות",
                "עסקים שרוצים לייצר לידים מסודרים בלי לפספס פניה",
                "עסקים שצריכים מענה ראשוני מקצועי גם כשאין מישהו פנוי",
              ],
              ctaLabel: "רוצה בוט וואטסאפ חכם",
            },
            {
              id: "scheduling",
              title: "בוטים לקביעת תורים",
              subtitle:
                "תיאום פגישות אוטומטי בוואטסאפ או באתר — איסוף פרטים, הצגת זמינות, אישור ותזכורות, עם חיבור ליומן שלכם.",
              timeframe: "בדרך כלל בין 2 ל-4 שבועות, לפי מערכת התורים הקיימת.",
              deliverables: [
                "אפיון תהליך קביעת תור מקצה לקצה",
                "חיבור ליומן Google, Calendly או מערכת פנימית",
                "תזכורות אוטומטיות לפני הפגישה",
                "סינון ואיסוף מידע לפני קביעת התור",
                "דוחות בסיסיים על תורים שנקבעו ובוטלו",
              ],
              audience: [
                "קליניקות, יועצים ומטפלים עם לוח תורים עמוס",
                "עסקי שירות שמתאמים פגישות בטלפון או בוואטסאפ",
                "עסקים שרוצים לצמצם ביטולים ואי-הגעות",
              ],
              ctaLabel: "בואו נאוטמט את התורים",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
