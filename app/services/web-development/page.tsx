import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceTemplate from "@/components/templates/ServiceTemplate";
import ServiceStructuredData from "@/components/seo/ServiceStructuredData";
import { getServiceDisplayExtras } from "@/lib/seo/service-display";
import { getServiceMetadata, mergeServiceFaq, servicePages } from "@/lib/seo/services";
import { Code2, Gauge, LayoutTemplate, Rocket, ShieldCheck } from "lucide-react";

const slug = "web-development" as const;
const seo = servicePages[slug];
export const metadata = getServiceMetadata(slug);

const faq = mergeServiceFaq(
  [
    { question: "אפשר לשלב עם מערכת קיימת?", answer: "כן. אנחנו מתחברים למערכות קיימות כמו CRM, מחסן, מערכת תשלומים ועוד — הכל נבחן בשיחת אפיון ראשונה." },
    { question: "הקוד נשאר בבעלות העסק?", answer: "בהחלט. הבעלות המלאה על הקוד, הנכסים והתשתית נשארת אצלך לחלוטין." },
    { question: "אפשר להמשיך להרחיב את המערכת בעתיד?", answer: "כן. הפיתוח מתוכנן מלכתחילה עם ארכיטקטורה שמאפשרת הוספת תכונות, שירותים ושילובים בלי לשבור מה שכבר בנוי." },
    { question: "איזה טכנולוגיות אתם עובדים איתן?", answer: "אנחנו עובדים בעיקר עם Next.js, React ו-Node.js לצד תשתיות ענן מודרניות — כדי שתקבל מוצר מהיר, יציב ומתוחזק לאורך זמן." },
    { question: "כמה אנשים נדרשים מצד הלקוח?", answer: "מספיק נקודת קשר אחת. אנחנו מנהלים את כל התהליך ומעדכנים בכל שלב, בלי לטרוד אותך בפרטים טכניים." },
    { question: "מה כולל תהליך הבדיקות לפני ההשקה?", answer: "בודקים פונקציונליות, ביצועים, תאימות מכשירים, אבטחה ועוד — כדי שתעלה לאוויר עם ביטחון מלא." },
    { question: "יש תמיכה לאחר ההשקה?", answer: "כן. לאחר ההשקה יש ליווי ראשוני לתקופת ייצוב, ואפשר להמשיך בתחזוקה שוטפת לפי הצורך." },
  ],
  slug,
);
const extras = getServiceDisplayExtras(slug);

export default function WebDevelopmentPage() {
  return (
    <>
      <ServiceStructuredData path={seo.path} serviceName={seo.serviceName} description={seo.description} faq={faq} />
      <Navbar />
      <main className="flex-1">
        <ServiceTemplate
          badge="שלב הגדילה: הנכסים הדיגיטליים"
          title="פיתוח אתר מתקדם שמוכן לצמיחה אמיתית"
          description="אנחנו מפתחים עבורך נכס דיגיטלי יציב, מהיר ומדויק, כזה שמשרת את היעדים העסקיים שלך ולא רק נראה טוב על המסך."
          targetAudience={[
            "עסקים שצריכים מערכת מותאמת ולא פתרון מדף",
            "עסקים עם דרישות פיתוח מורכבות ותהליכים ייחודיים",
            "עסקים שרוצים בסיס טכנולוגי ארוך טווח",
          ]}
          timeframe="בדרך כלל בין 3 ל-8 שבועות, בהתאם למורכבות הפרויקט והאינטגרציות."
          deliverables={[
            { icon: LayoutTemplate, text: "אפיון מבנה מערכת וזרימות משתמש" },
            { icon: Code2, text: "פיתוח אתר או מערכת בהתאמה מלאה לעסק" },
            { icon: Gauge, text: "אופטימיזציית ביצועים ומהירות טעינה" },
            { icon: ShieldCheck, text: "אבטחה, יציבות ובדיקות לפני השקה" },
            { icon: Rocket, text: "השקה מסודרת ותמיכה ראשונית לאחר עלייה לאוויר" },
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
