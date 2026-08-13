import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageEnter from "@/components/motion/PageEnter";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "מדיניות פרטיות",
  description: "מדיניות הפרטיות של JT Solutions - כיצד אנו אוספים, משתמשים ומגנים על המידע שלך.",
  path: "/privacy-policy",
});

const sections = [
  {
    title: "מידע שאנו אוספים",
    content: `אנו אוספים מידע שאתה מספק לנו באופן ישיר, כגון שמך, כתובת הדוא"ל ומספר הטלפון שלך כאשר אתה ממלא טופס יצירת קשר באתר. בנוסף, ייתכן שנאסוף מידע טכני כגון כתובת IP, סוג דפדפן ונתוני גלישה באמצעות כלי אנליטיקה.`,
  },
  {
    title: "כיצד אנו משתמשים במידע",
    content: `המידע שנאסף משמש אותנו אך ורק למטרות הבאות: מענה לפניותיך וקשר עסקי שוטף, שיפור חוויית השימוש באתר, שליחת עדכונים רלוונטיים (בהסכמתך בלבד), וציות לדרישות חוקיות. איננו מוכרים או מעבירים את פרטיך לצדדים שלישיים למטרות שיווק.`,
  },
  {
    title: "עוגיות (Cookies)",
    content: `האתר משתמש בעוגיות לצורך ניתוח תנועה ושיפור הביצועים. אנו עשויים להשתמש בשירותי Google Analytics ו-Meta Pixel לצורך מדידת ביצועים ופרסום. באפשרותך להשבית עוגיות דרך הגדרות הדפדפן שלך, אך חלק מפונקציות האתר עלולות שלא לפעול כראוי בעקבות זאת.`,
  },
  {
    title: "שיתוף מידע עם צדדים שלישיים",
    content: `איננו מוכרים, סוחרים או מעבירים את פרטיך האישיים לגורמים חיצוניים, למעט ספקי שירות המסייעים לנו בהפעלת האתר ומתן שירותינו (כגון פלטפורמות אנליטיקה ואחסון), ובלבד שהם מחויבים לשמור על סודיות המידע.`,
  },
  {
    title: "אבטחת מידע",
    content: `אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע האישי שלך מפני גישה בלתי מורשית, שינוי, חשיפה או השמדה. עם זאת, אין אפשרות להבטיח אבטחה מוחלטת בכל עסקה אלקטרונית.`,
  },
  {
    title: "זכויותיך",
    content: `בהתאם לחוק הגנת הפרטיות הישראלי, יש לך זכות לעיין במידע האישי שנשמר אצלנו, לבקש תיקון מידע שגוי ולבקש מחיקתו. לבקשות בנושא פרטיות, ניתן לפנות אלינו בדוא"ל: jtsolutions.officee@gmail.com`,
  },
  {
    title: "שינויים במדיניות",
    content: `אנו שומרים לעצמנו את הזכות לעדכן מדיניות פרטיות זו מעת לעת. שינויים מהותיים יפורסמו בעמוד זה עם עדכון התאריך בתחתית הדף. המשך השימוש באתר לאחר פרסום שינויים מהווה הסכמה לתנאים המעודכנים.`,
  },
];

export default function PrivacyPolicyPage() {
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
                  מסמך משפטי
                </span>
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
                מדיניות פרטיות
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
              לשאלות בנוגע למדיניות הפרטיות ניתן לפנות אלינו בכתובת{" "}
              <a
                href="mailto:jtsolutions.officee@gmail.com"
                className="font-semibold text-cyan-300 hover:underline"
              >
                jtsolutions.officee@gmail.com
              </a>
            </div>
          </section>
        </PageEnter>
      </main>
      <Footer />
    </>
  );
}
