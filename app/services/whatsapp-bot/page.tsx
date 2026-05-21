import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceTemplate from "@/components/templates/ServiceTemplate";
import ServiceStructuredData from "@/components/seo/ServiceStructuredData";
import { getServiceDisplayExtras } from "@/lib/seo/service-display";
import { getServiceMetadata, mergeServiceFaq, servicePages } from "@/lib/seo/services";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { BotMessageSquare, Clock, ListTree, ShieldCheck, Sparkles } from "lucide-react";

const slug = "whatsapp-bot" as const;
const seo = servicePages[slug];
export const metadata = getServiceMetadata(slug);

const faq = mergeServiceFaq(
  [
    { question: "האם הבוט מחליף לגמרי בן אדם?", answer: "לא בהכרח. הבוט מטפל בשכבה הראשונה — מידע, סינון ואיסוף פרטים — ומעביר אליכם כשצריך החלטה אישית או מכירה." },
    { question: "אפשר לחבר למערכות שאנחנו כבר עובדים איתן?", answer: "בהרבה מקרים כן. בשיחת האפיון נבדוק אילו חיבורים נדרשים — CRM, גיליון, מייל — ומה הכי פרקטי לעסק שלכם." },
    { question: "מה קורה אם לקוח כותב משהו שלא צפינו?", answer: "מגדירים מסלול ברירת מחדל חכם — למשל בקשה לפרטים נוספים או העברה ישירה לנציג — כדי שאף פנייה לא נופלת בין הכסאות." },
    { question: "הבוט עובד 24/7?", answer: "כן. אחד היתרונות המרכזיים הוא שהבוט עונה גם בלילה, בסופי שבוע ובחגים — בלי שתצטרכו להיות זמינים." },
    { question: "כמה זמן לוקח לבנות ולהטמיע את הבוט?", answer: "בדרך כלל בין שבועיים לחמישה שבועות, תלוי במספר התסריטים והחיבורים הנדרשים." },
    { question: "האם הניסוחים מותאמים לסגנון שלנו?", answer: "כן. הבוט מדבר בשפה שלכם — כתיבה ישירה ומקצועית שמתאימה לסגנון העסק ולקהל היעד." },
    { question: "מה קורה אם רוצים לשנות תסריט אחרי ההשקה?", answer: "אפשר לעדכן ולשנות תסריטים בכל עת. נספק הדרכה כדי שתוכלו לנהל שינויים בסיסיים בעצמכם." },
  ],
  slug,
);
const extras = getServiceDisplayExtras(slug);

export default function WhatsAppBotPage() {
  return (
    <>
      <ServiceStructuredData path={seo.path} serviceName={seo.serviceName} description={seo.description} faq={faq} />
      <Navbar />
      <main className="flex-1">
        <ServiceTemplate
          badge="שלב הגדילה: הנכסים הדיגיטליים"
          title="בוט וואטסאפ שמנהל את השיחה בשבילכם — ומשאיר לכם את הזמן למה שחשוב"
          description="אנחנו בונים עבורכם בוט בוואטסאפ שמקבל פניות, עונה לשאלות חוזרות, אוסף מידע מסודר ומעביר לכם רק את מה שבאמת דורש טיפול אנושי. פחות הפרעות, יותר סדר, ולקוחות שמרגישים שקיבלו מענה מהר."
          targetAudience={[
            "עסקים שמקבלים הרבה הודעות בוואטסאפ ונתקעים על שאלות חוזרות",
            "עסקים שרוצים לייצר לידים מסודרים בלי לפספס פניה",
            "עסקים שצריכים מענה ראשוני מקצועי גם כשאין מישהו פנוי",
          ]}
          timeframe="בדרך כלל בין 2 ל-5 שבועות, לפי מורכבות התסריטים והחיבורים הנדרשים."
          deliverables={[
            { icon: ListTree, text: "אפיון תסריטי שיחה, שאלות נפוצות ונקודות מעבר לנציג" },
            { icon: BotMessageSquare, text: "בניית הבוט והטמעה בערוץ הוואטסאפ העסקי" },
            { icon: WhatsAppIcon, text: "ניסוחים ברורים בעברית שמתאימים לקול המותג שלכם" },
            { icon: Clock, text: "חיסכון בזמן — סינון פניות, איסוף פרטים ותיעוד בסיסי" },
            { icon: ShieldCheck, text: "הנחיות פרטיות ושימוש בנתונים בצורה אחראית" },
            { icon: Sparkles, text: "הדרכה קצרה להפעלה שוטפת ועדכונים לתסריטים" },
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
