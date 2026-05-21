import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceTemplate from "@/components/templates/ServiceTemplate";
import ServiceStructuredData from "@/components/seo/ServiceStructuredData";
import { getServiceDisplayExtras } from "@/lib/seo/service-display";
import { getServiceMetadata, mergeServiceFaq, servicePages } from "@/lib/seo/services";
import { FileText, Palette, PenTool, Sparkles, SwatchBook } from "lucide-react";

const slug = "branding" as const;
const seo = servicePages[slug];
export const metadata = getServiceMetadata(slug);

const faq = mergeServiceFaq(
  [
    { question: "אפשר לעשות רענון למותג קיים ולא להתחיל מאפס?", answer: "כן. אפשר לבצע מיתוג מחדש מדורג — לשמר מה שעובד ולשדרג מה שצריך שינוי, בלי לאבד זיהוי קיים." },
    { question: "כמה סבבי תיקונים כלולים?", answer: "התהליך כולל מספר סבבי דיוק מסודרים עד שמגיעים לתוצאה שנראית ומרגישה בדיוק כמו שצריך." },
    { question: "מקבלים קבצים לעבודה שוטפת?", answer: "כן. בסיום מקבלים חבילת קבצים מלאה — וקטורים, PNG, פורמטים לרשתות, פרינט ועוד — לכל שימוש עתידי." },
    { question: "מה ההבדל בין לוגו לשפה ויזואלית?", answer: "לוגו הוא הסמל של המותג, בעוד שפה ויזואלית כוללת צבעים, פונטים, סגנון צילום ואלמנטים גרפיים שיוצרים מראה אחיד בכל נקודת מגע עם הלקוח." },
    { question: "כמה כיוונים עיצוביים מקבלים בתהליך?", answer: "בשלב הראשוני מציגים מספר כיוונים עיצוביים שונים. לאחר בחירת הכיוון מבצעים דיוקים עד לתוצאה הסופית." },
    { question: "האם המיתוג מתאים גם לדיגיטל וגם לפרינט?", answer: "כן. השפה ויזואלית שנבנה מותאמת לשימוש בכל הפורמטים — אתר, רשתות חברתיות, כרטיסי ביקור, מצגות ועוד." },
  ],
  slug,
);
const extras = getServiceDisplayExtras(slug);

export default function BrandingPage() {
  return (
    <>
      <ServiceStructuredData path={seo.path} serviceName={seo.serviceName} description={seo.description} faq={faq} />
      <Navbar />
      <main className="flex-1">
        <ServiceTemplate
          badge="שלב ההקמה: מיתוג ונוכחות"
          title="חבילת מיתוג שבונה זיהוי, אמון ובידול ברור"
          description="אנחנו מגדירים לעסק שלך שפה מותגית מלאה - מהלוגו ועד הקווים הגרפיים - כדי שכל מפגש עם הלקוח ייראה מקצועי, אחיד ובלתי נשכח."
          targetAudience={[
            "עסקים חדשים שצריכים זהות ברורה כבר מהיום הראשון",
            "עסקים קיימים שרוצים לעלות מדרגה בנראות ובתדמית",
            "עסקים שרוצים שפה אחידה בכל הערוצים הדיגיטליים והפיזיים",
          ]}
          timeframe="בדרך כלל בין 3 ל-5 שבועות, כולל סבבי דיוק ומסירה מלאה."
          deliverables={[
            { icon: PenTool, text: "עיצוב לוגו כולל 3 כיוונים ראשוניים" },
            { icon: SwatchBook, text: "בחירת פונטים ופלטת צבעים מותאמת למותג" },
            { icon: Palette, text: "שפה ויזואלית אחידה לדיגיטל ולפרינט" },
            { icon: FileText, text: "מסמך הנחיות מותג לשימוש שוטף" },
            { icon: Sparkles, text: "פורמטים מוכנים לרשתות, מצגות וחומרי שיווק" },
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
