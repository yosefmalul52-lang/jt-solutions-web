import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PillarStructuredData from "@/components/seo/PillarStructuredData";
import PillarTemplate from "@/components/templates/PillarTemplate";
import FloatingMockup from "@/components/ui/FloatingMockup";
import { getPillarBySlug } from "@/lib/pillars";
import { mergeLegacyFaq } from "@/lib/pillar-faq";
import { getPillarMetadata } from "@/lib/seo/pillars";
import { getServiceDisplayExtras } from "@/lib/seo/service-display";

const slug = "websites" as const;
const pillar = getPillarBySlug(slug);
export const metadata = getPillarMetadata(slug);

const corporateExtras = getServiceDisplayExtras("business-websites");
const landingExtras = getServiceDisplayExtras("landing-pages");
const ecommerceExtras = getServiceDisplayExtras("ecommerce");

const seoIntro = [
  corporateExtras.seoIntro[0],
  landingExtras.seoIntro[0],
  ecommerceExtras.seoIntro[0],
];

const faq = mergeLegacyFaq(
  [
    { question: "אפשר לעלות לאוויר עם תוכן קיים?", answer: "כן. אם יש לך טקסטים, תמונות או מצגת קיימת — אפשר לבנות על זה. אנחנו גם מסייעים לשדרג ולחדד תוכן כחלק מהתהליך." },
    { question: "האתר בנוי לקידום ושיווק בהמשך?", answer: "כן. המבנה הטכני, מהירות הטעינה והמבנה הסמנטי מותאמים לעבודה שיווקית — קידום אורגני, קמפיינים ממומנים ועוד." },
    { question: "אפשר להוסיף עמודים בעתיד?", answer: "בהחלט. האתר נבנה כמודולרי ומוכן לצמיחה — הוספת שירותים, בלוג, עמודי נחיתה ועוד." },
    { question: "כמה עמודים כלולים בפרויקט?", answer: "בדרך כלל עד 10 עמודים. אם צריך יותר, מתאימים היקף מדויק בשיחת האפיון." },
    { question: "כמה זמן לוקח לעלות עם דף חדש?", answer: "בדרך כלל עד שבועיים מרגע סגירת התוכן. אם החומרים מוכנים מראש, אפשר גם מהר יותר." },
    { question: "הדף מתאים לקמפיינים ממומנים?", answer: "כן. הדף נבנה במיוחד כדי לתמוך בפרסום ממומן ב-Meta וב-Google, עם מדידה מלאה ועמוד מהיר בנייד." },
    { question: "מה ההבדל בין דף נחיתה לאתר תדמית?", answer: "דף נחיתה מוקדש למסר אחד וקריאה לפעולה אחת, בעיקר לתמיכה בקמפיינים. אתר תדמית מציג את כל פעילות העסק ומבנה מתאים לביקורים אורגניים חוזרים." },
    { question: "החנות מתאימה גם למובייל?", answer: "כן. כל תהליך הרכישה — עיון, הוספה לעגלה, תשלום — מותאם מלאה לנייד, כי רוב הקניות מתבצעות ממנו." },
    { question: "מה זה שחזור עגלות נטושות ולמה זה חשוב?", answer: "כ-70% מהגולשים עוזבים את העגלה לפני הרכישה. מנגנון שחזור שולח תזכורת אוטומטית ומחזיר חלק מהם לסגירת הקנייה." },
  ],
  ["business-websites", "landing-pages", "ecommerce"],
);

export default function WebsitesPillarPage() {
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
              id: "corporate",
              title: "אתרי תדמית לעסקים",
              subtitle:
                "אתר תדמית מקצועי שמציג סמכות, מסביר ערך בצורה ברורה ומכוון את המבקר לפנייה — מבנה ברור, מהירות Next.js ותשתית SEO.",
              timeframe: "בדרך כלל בין 3 ל-5 שבועות, בהתאם להיקף התוכן והחומרים.",
              deliverables: [
                "אתר תדמית עד 10 עמודים במבנה ברור וממיר",
                "אופטימיזציית מהירות וביצועים ב-Next.js",
                "התאמות נגישות בסיסיות לפי תקן",
                "התאמה מלאה למובייל, טאבלט ודסקטופ",
                "השקה מסודרת עם הדרכה קצרה לניהול שוטף",
              ],
              audience: [
                "עסקים שרוצים נוכחות דיגיטלית ברמה גבוהה",
                "עסקים עם כמה שירותים שצריכים מבנה תוכן מסודר",
                "עסקים שרוצים אתר שמוכן גם לצמיחה וגם לשיווק שוטף",
              ],
              visualProof: (
                <FloatingMockup
                  src="/projects/eb-hair.png"
                  alt="צילום מסך של אתר תדמית — EB Hair"
                  variant="laptop"
                  showCaption={false}
                />
              ),
            },
            {
              id: "landing",
              title: "דפי נחיתה ממירים",
              subtitle:
                "דף נחיתה מדויק שמציג את הערך בצורה חדה, יוצר אמון מיידי ומכוון את הלקוח לפעולה אחת ברורה — מותאם לקמפיינים ב-Meta וב-Google.",
              timeframe: "בדרך כלל בין 7 ל-14 ימי עבודה מרגע סגירת התוכן.",
              deliverables: [
                "אפיון שיווקי ממוקד קהל ומסר",
                "עיצוב רספונסיבי מלא למובייל ולדסקטופ",
                "חיבור לטפסים, וואטסאפ ומנגנוני פנייה",
                "הטמעת פיקסלים ומדידה לקבלת נתונים אמיתיים",
                "דף ביקורות ותוכן מחזק אמון",
              ],
              audience: [
                "עסקים שרוצים להגדיל כמות פניות איכותיות בזמן קצר",
                "עסקים שמתחילים קמפיינים וצריכים עמוד ממיר ומדויק",
                "עסקים עם שירות מוביל שרוצים להציג אותו בצורה ברורה",
              ],
              visualProof: (
                <FloatingMockup
                  src="/projects/eb-hair.png"
                  alt="צילום מסך של דף נחיתה ממיר"
                  variant="mobile"
                  showCaption={false}
                />
              ),
              ctaLabel: "רוצה דף נחיתה שממיר",
            },
            {
              id: "ecommerce",
              title: "חנויות אינטרנט",
              subtitle:
                "חנות דיגיטלית חכמה שמייצרת חוויית קנייה חלקה, מקצרת תהליכי תפעול ומאפשרת לך לצמוח עם שליטה מלאה.",
              timeframe: "בדרך כלל בין 4 ל-8 שבועות לפי היקף מוצרים ואינטגרציות.",
              deliverables: [
                "מבנה חנות ברור עם חוויית קנייה ממירה",
                "מערכת סליקה מאובטחת ונוחה",
                "ניהול מלאי ומוצרים בממשק אחד",
                "אוטומציה לתהליכי הזמנה וחשבונית",
                "שחזור עגלות נטושות לשיפור שיעור ההמרה",
              ],
              audience: [
                "עסקים שרוצים למכור אונליין בצורה מסודרת ורווחית",
                "עסקים עם קטלוג מוצרים מתרחב",
                "עסקים שצריכים תהליכי תשלום, מלאי ומשלוח אוטומטיים",
              ],
              visualProof: (
                <FloatingMockup
                  src="/projects/magadim.png"
                  alt="צילום מסך של חנות איקומרס — Magadim"
                  variant="auto"
                  showCaption={false}
                />
              ),
              ctaLabel: "בואו נדבר על החנות",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
