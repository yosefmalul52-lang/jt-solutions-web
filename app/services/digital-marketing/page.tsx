import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PillarStructuredData from "@/components/seo/PillarStructuredData";
import PillarTemplate from "@/components/templates/PillarTemplate";
import FloatingMockup from "@/components/ui/FloatingMockup";
import { getPillarBySlug } from "@/lib/pillars";
import { mergeLegacyFaq } from "@/lib/pillar-faq";
import { getPillarMetadata } from "@/lib/seo/pillars";
import { getServiceDisplayExtras } from "@/lib/seo/service-display";

const slug = "digital-marketing" as const;
const pillar = getPillarBySlug(slug);
export const metadata = getPillarMetadata(slug);

const adExtras = getServiceDisplayExtras("ad-infrastructure");

const faq = mergeLegacyFaq(
  [
    { question: "כמה תקציב פרסום צריך כדי להתחיל?", answer: "מגדירים תקציב ריאלי לפי התחום, קהל היעד והיעדים. יש לנו ניסיון עם מגוון רחב של תקציבים — גם קטנים וגם גדולים." },
    { question: "אפשר לנהל כמה ערוצי פרסום במקביל?", answer: "כן. בונים תמהיל ערוצים חכם — Meta, Google, ועוד — לפי המקום שבו נמצא קהל היעד שלך." },
    { question: "איך עוקבים אחרי התוצאות?", answer: "מקבלים דוח חודשי ברור עם נתוני ביצועים, עלויות, המרות וניתוח מה עובד — בלי ז'רגון מיותר." },
    { question: "כמה זמן עד שרואים תוצאות?", answer: "תוצאות ראשוניות בדרך כלל בתוך 2–4 שבועות. שיפור יציב ומשמעותי מתבסס לאורך 2–3 חודשים של אופטימיזציה." },
    { question: "מה זה בדיקות A/B ולמה זה חשוב?", answer: "מריצים גרסאות שונות של מודעות, דפי נחיתה וקהלים במקביל, ומשאירים מה שמניב תוצאות — שיטה שמשפרת ביצועים לאורך זמן." },
    { question: "האם צריך לדעת פרסום כדי לעבוד איתכם?", answer: "לא. אנחנו מנהלים הכל מקצה לקצה ומסבירים בפשטות מה קורה, מה עובד ומה אנחנו מתכננים לשפר." },
    {
      question: "מה כולל הליווי השוטף?",
      answer:
        "פגישות תיאום, ניתוח ביצועים, המלצות לשיפור קמפיינים, דפי נחיתה ותוכן — עם דגש על החזר השקעה ולא רק על מדדים טכניים.",
    },
    {
      question: "אפשר לעבוד רק עם ליווי בלי ניהול קמפיינים מלא?",
      answer:
        "כן. חלק מהלקוחות מנהלים את הפרסום בעצמם ומקבלים מאיתנו הכוונה אסטרטגית, ביקורת תשתית ותוכנית פעולה חודשית.",
    },
  ],
  ["ad-infrastructure"],
);

export default function DigitalMarketingPillarPage() {
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
          seoIntro={adExtras.seoIntro}
          faq={faq}
          ctaLocation={slug}
          sections={[
            {
              id: "full-funnel",
              title: "ניהול קמפיינים מקצה לקצה",
              subtitle:
                "מערך פרסום מלא ב-Meta וב-Google — אסטרטגיה, תשתית מדידה, דפי נחיתה, בקרה יומית ואופטימיזציה שמטרתה להגדיל החזר השקעה.",
              timeframe: "תוצאות ראשוניות רואים לרוב בתוך 2 עד 4 שבועות, ושיפור יציב לאורך החודשים הבאים.",
              deliverables: [
                "אסטרטגיית קמפיין ותכנון קהלים מדויק",
                "הטמעת מדידה מלאה בכל שלבי המשפך",
                "ניהול קמפיינים שוטף ב-Meta וב-Google",
                "בדיקות A/B רציפות לשיפור ביצועים",
                "דוח חודשי ברור עם המלצות להמשך",
              ],
              audience: [
                "עסקים שכבר מפרסמים ורוצים לשפר ביצועים",
                "עסקים שרוצים שקיפות מלאה על מה עובד ומה לא",
                "עסקים שצריכים ניהול רציף ולא רק הקמה חד-פעמית",
              ],
              visualProof: (
                <FloatingMockup
                  src="/projects/eb-hair.png"
                  alt="דוגמה לדף נחיתה וקמפיין — EB Hair"
                  variant="mobile"
                  showCaption={false}
                />
              ),
            },
            {
              id: "ongoing-guidance",
              title: "ליווי שוטף והכוונה",
              subtitle:
                "ליווי חודשי שמחבר בין פרסום, אתר ותוכן — עם תוכנית פעולה ברורה, ניתוח ביצועים והמלצות מעשיות לצמיחה.",
              deliverables: [
                "פגישת תיאום חודשית ותוכנית פעולה",
                "ניתוח ביצועי קמפיינים ודפי נחיתה",
                "המלצות לשיפור המרה ותוכן",
                "תיאום עם בניית אתרים ואוטומציות כשצריך",
                "דוח ברור עם צעדים הבאים — בלי ז'רגון",
              ],
              audience: [
                "עסקים שרוצים שותף אסטרטגי ולא רק מנהל קמפיין",
                "עסקים בצמיחה שצריכים כיוון ברור כל חודש",
                "בעלי עסקים שמנהלים חלק מהפרסום בעצמם",
              ],
              ctaLabel: "רוצה ליווי שוטף",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
