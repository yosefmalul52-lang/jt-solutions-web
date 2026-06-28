import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageEnter from "@/components/motion/PageEnter";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "הצהרת נגישות",
  description: "הצהרת הנגישות של JT Solutions — מחויבותנו לנגישות דיגיטלית לכלל המשתמשים.",
  path: "/accessibility",
});

const sections = [
  {
    title: "מחויבותנו לנגישות",
    content: `JT Solutions מחויבת לעשות את האתר נגיש לכלל המשתמשים, לרבות אנשים עם מוגבלויות. אנו פועלים בהתאם לתקן ישראלי ת"י 5568 ולהנחיות WCAG 2.1 ברמה AA, ומשקיעים מאמצים מתמשכים לשיפור הנגישות.`,
  },
  {
    title: "אמצעי הנגישות שיושמו",
    content: `האתר כולל מספר התאמות נגישות: תמיכה בניווט מקלדת בכל חלקי האתר, מבנה כותרות היררכי ברור, תיאורי alt לתמונות, יחסי ניגודיות עומדים בדרישות, תמיכה מלאה בכיוון RTL (ימין לשמאל) בהתאם לשפה העברית, ותיוג ARIA לרכיבים אינטראקטיביים.`,
  },
  {
    title: "דפדפנים וטכנולוגיות מסייעות",
    content: `האתר נבדק ותואם לדפדפנים הנפוצים: Chrome, Firefox, Safari ו-Edge. האתר תוכנן לעבוד עם קוראי מסך מובילים כגון NVDA ו-VoiceOver, וכן עם תוכנות הגדלת טקסט.`,
  },
  {
    title: "תכנים שאינם נגישים במלואם",
    content: `למרות מאמצינו, ייתכן שחלק מהתכנים טרם הותאמו במלואם: חלק מהסרטונים אינם כוללים כתוביות, ותכנים מסוימים הנוצרים על ידי צדדים שלישיים עשויים שלא לעמוד בכל דרישות הנגישות. אנו פועלים לשיפור מתמיד.`,
  },
  {
    title: "יצירת קשר בנושא נגישות",
    content: `נתקלת בבעיית נגישות או שיש לך הצעה לשיפור? אנו מעוניינים לשמוע. ניתן לפנות אלינו בדוא"ל jtsolutions.officee@gmail.com או בטלפון 052-8240230 ונטפל בפנייתך בהקדם האפשרי.`,
  },
  {
    title: "אכיפה",
    content: `אם אינך מרוצה מתגובתנו לפנייתך בנושא נגישות, ניתן לפנות לנציב שוויון זכויות לאנשים עם מוגבלות במשרד המשפטים.`,
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F8FAFC]">
        <PageEnter>
          <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24" dir="rtl">
            <div className="mb-10">
              <span
                className="inline-flex p-[1px] rounded-full mb-4"
                style={{ background: "var(--gradient-cta)" }}
              >
                <span className="inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#F8FAFC]/90 text-slate-600">
                  נגישות דיגיטלית
                </span>
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
                הצהרת נגישות
              </h1>
              <p className="text-sm text-slate-900/50">עדכון אחרון: אפריל 2025</p>
            </div>

            <div
              className="rounded-[var(--radius)] bg-[#F8FAFC] border border-slate-200 shadow-premium divide-y divide-slate-200"
            >
              {sections.map((s) => (
                <div key={s.title} className="px-7 py-6">
                  <h2 className="text-base font-bold text-slate-900 mb-2">{s.title}</h2>
                  <p className="text-sm leading-[1.8] text-slate-900/65">{s.content}</p>
                </div>
              ))}
            </div>

            <div
              className="mt-6 rounded-[var(--radius)] p-5 border text-sm leading-relaxed text-slate-900/65"
              style={{ borderColor: "rgba(79,70,229,0.14)", background: "rgba(79,70,229,0.04)" }}
            >
              לפניות בנושא נגישות:{" "}
              <a
                href="mailto:jtsolutions.officee@gmail.com"
                className="font-semibold text-cyan-300 hover:underline"
              >
                jtsolutions.officee@gmail.com
              </a>{" "}
              |{" "}
              <a href="tel:0528240230" className="font-semibold text-cyan-300 hover:underline">
                052-8240230
              </a>
            </div>
          </section>
        </PageEnter>
      </main>
      <Footer />
    </>
  );
}
