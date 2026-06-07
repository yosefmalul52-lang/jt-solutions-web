import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PillarStructuredData from "@/components/seo/PillarStructuredData";
import PillarTemplate from "@/components/templates/PillarTemplate";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { getPillarBySlug } from "@/lib/pillars";
import { mergeLegacyFaq } from "@/lib/pillar-faq";
import { getPillarMetadata } from "@/lib/seo/pillars";
import { getServiceDisplayExtras } from "@/lib/seo/service-display";

const slug = "branding" as const;
const pillar = getPillarBySlug(slug);
export const metadata = getPillarMetadata(slug);

const extras = getServiceDisplayExtras("branding");

const faq = mergeLegacyFaq(
  [
    {
      question: "כמה עולה מיתוג לעסק?",
      answer:
        "חבילת מיתוג לעסק ב-JT Solutions נעה בדרך כלל בין 4,500 ל-12,000 שקלים, בהתאם להיקף: לוגו בלבד, זהות ויזואלית מלאה, מדריך שימוש במותג ויישום בערוצים דיגיטליים. המחיר משקף תהליך מסודר — אפיון מותג, מספר כיוונים עיצוביים, סבבי דיוק וקבצים מוכנים לשימוש שוטף.",
    },
    { question: "אפשר לעשות רענון למותג קיים ולא להתחיל מאפס?", answer: "כן. אפשר לבצע מיתוג מחדש מדורג — לשמר מה שעובד ולשדרג מה שצריך שינוי, בלי לאבד זיהוי קיים." },
    { question: "כמה סבבי תיקונים כלולים?", answer: "התהליך כולל מספר סבבי דיוק מסודרים עד שמגיעים לתוצאה שנראית ומרגישה בדיוק כמו שצריך." },
    { question: "מקבלים קבצים לעבודה שוטפת?", answer: "כן. בסיום מקבלים חבילת קבצים מלאה — וקטורים, PNG, פורמטים לרשתות, פרינט ועוד — לכל שימוש עתידי." },
    { question: "מה ההבדל בין לוגו לשפה ויזואלית?", answer: "לוגו הוא הסמל של המותג, בעוד שפה ויזואלית כוללת צבעים, פונטים, סגנון צילום ואלמנטים גרפיים שיוצרים מראה אחיד בכל נקודת מגע עם הלקוח." },
    { question: "כמה כיוונים עיצוביים מקבלים בתהליך?", answer: "בשלב הראשוני מציגים מספר כיוונים עיצוביים שונים. לאחר בחירת הכיוון מבצעים דיוקים עד לתוצאה הסופית." },
    { question: "האם המיתוג מתאים גם לדיגיטל וגם לפרינט?", answer: "כן. השפה ויזואלית שנבנה מותאמת לשימוש בכל הפורמטים — אתר, רשתות חברתיות, כרטיסי ביקור, מצגות ועוד." },
  ],
  ["branding"],
);

export default function BrandingPillarPage() {
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
          seoIntro={extras.seoIntro.slice(0, 3)}
          faq={faq}
          ctaLocation={slug}
          sections={[
            {
              id: "palette",
              title: "בחירת פלטת צבעים",
              subtitle:
                "צבעים שמעבירים את הערכים של המותג ויוצרים היררכיה ברורה — בדיגיטל ובפרינט, עם נגישות וקריאות מובנית.",
              timeframe: "שלב ראשון בתהליך המיתוג — בדרך כלל שבוע 1.",
              deliverables: [
                "מחקר קהל יעד ומתחרים לפני בחירת צבעים",
                "פלטת צבעים ראשית, משנית ואקסנט",
                "הנחיות שימוש לרקעים, כפתורים וטקסט",
                "בדיקת ניגודיות ונגישות בערוצים דיגיטליים",
                "קובץ צבעים מוכן לעיצוב ופיתוח",
              ],
              audience: [
                "עסקים חדשים שצריכים בסיס ויזואלי לפני אתר או קמפיין",
                "עסקים שרוצים ליישר קו בין פרינט לדיגיטל",
                "מותגים שמרגישים שהצבעים הנוכחיים לא משדרים מקצועיות",
              ],
            },
            {
              id: "brand-book",
              title: "ספר מותג דיגיטלי",
              subtitle:
                "מסמך הנחיות שמגדיר איך המותג נראה ונשמע — כדי שכל מי שמייצר תוכן ידבר באותה שפה, בלי תיקונים יקרים.",
              timeframe: "בדרך כלל שבוע 2–3 בתהליך המיתוג.",
              deliverables: [
                "מדריך שימוש במותג — לוגו, צבעים, טיפוגרפיה",
                "דוגמאות ליישום ברשתות, מצגות וחומרי שיווק",
                "כללי Do & Don't לשמירה על עקביות",
                "תבניות בסיסיות לפוסטים ומצגות",
                "מסירה בפורמט נוח לצוות ולספקים חיצוניים",
              ],
              audience: [
                "עסקים עם צוות שמייצר תוכן באופן שוטף",
                "עסקים שעובדים עם מספר ספקים (פרסום, פיתוח, עיצוב)",
                "מותגים שרוצים מראה אחיד בכל נקודת מגע",
              ],
              visualProof: (
                <BeforeAfterSlider
                  beforeSrc="/placeholders/branding-before.svg"
                  afterSrc="/placeholders/branding-after.svg"
                  beforeAlt="לפני מיתוג — זהות לא אחידה"
                  afterAlt="אחרי מיתוג — זהות פרימיום אחידה"
                />
              ),
            },
            {
              id: "logo",
              title: "עיצוב לוגו",
              subtitle:
                "לוגו שמזוהה מיד, עובד בגדלים קטנים וגדולים, ומשדר את מה שהעסק מייצג — עם מספר כיוונים עיצוביים וסבבי דיוק.",
              timeframe: "בדרך כלל בין 3 ל-5 שבועות לתהליך מיתוג מלא.",
              deliverables: [
                "3 כיוונים עיצוביים ראשוניים ללוגו",
                "בחירת פונטים מותאמים למותג",
                "שפה ויזואלית אחידה לדיגיטל ולפרינט",
                "פורמטים מוכנים לרשתות, מצגות וחומרי שיווק",
                "קבצי וקטור ו-PNG לכל שימוש עתידי",
              ],
              audience: [
                "עסקים חדשים שצריכים זהות ברורה כבר מהיום הראשון",
                "עסקים קיימים שרוצים לעלות מדרגה בנראות ובתדמית",
                "עסקים שרוצים שפה אחידה בכל הערוצים הדיגיטליים והפיזיים",
              ],
              ctaLabel: "בואו נבנה את הזהות",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
