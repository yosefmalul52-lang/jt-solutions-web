import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceTemplate from "@/components/templates/ServiceTemplate";
import { Gauge, Globe, LayoutDashboard, ShieldCheck, Timer } from "lucide-react";

export const metadata: Metadata = {
  title: "בניית אתר תדמית לעסק | JT Solutions - סוכנות דיגיטל",
  description:
    "בניית אתרי תדמית מותאמים אישית לעסקים: עד 10 עמודים, חוויית משתמש מקצועית, אופטימיזציית מהירות ב-Next.js, התאמה למובייל ונגישות להגדלת פניות.",
};

export default function BusinessWebsitesServicePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ServiceTemplate
          badge="שלב הגדילה: הנכסים הדיגיטליים"
          title="אתר תדמית מקצועי שמייצר אמון ופניות קבועות"
          description="אנחנו בונים אתר תדמית מדויק לעסק שלך - כזה שמציג סמכות, מסביר ערך בצורה ברורה ומכוון את המבקר לפנייה."
          targetAudience={[
            "עסקים שרוצים נוכחות דיגיטלית ברמה גבוהה",
            "עסקים עם כמה שירותים שצריכים מבנה תוכן מסודר",
            "עסקים שרוצים אתר שמוכן גם לצמיחה וגם לשיווק שוטף",
          ]}
          timeframe="בדרך כלל בין 3 ל-5 שבועות, בהתאם להיקף התוכן והחומרים."
          deliverables={[
            { icon: LayoutDashboard, text: "אתר תדמית עד 10 עמודים במבנה ברור וממיר" },
            { icon: Gauge, text: "אופטימיזציית מהירות וביצועים ב-Next.js" },
            { icon: ShieldCheck, text: "התאמות נגישות בסיסיות לפי תקן" },
            { icon: Globe, text: "התאמה מלאה למובייל, טאבלט ודסקטופ" },
            { icon: Timer, text: "השקה מסודרת עם הדרכה קצרה לניהול שוטף" },
          ]}
          faq={[
            { question: "אפשר לעלות לאוויר עם תוכן קיים?", answer: "כן. אם יש לך טקסטים, תמונות או מצגת קיימת — אפשר לבנות על זה. אנחנו גם מסייעים לשדרג ולחדד תוכן כחלק מהתהליך." },
            { question: "האתר בנוי לקידום ושיווק בהמשך?", answer: "כן. המבנה הטכני, מהירות הטעינה והמבנה הסמנטי מותאמים לעבודה שיווקית — קידום אורגני, קמפיינים ממומנים ועוד." },
            { question: "אפשר להוסיף עמודים בעתיד?", answer: "בהחלט. האתר נבנה כמודולרי ומוכן לצמיחה — הוספת שירותים, בלוג, עמודי נחיתה ועוד." },
            { question: "כמה עמודים כלולים בפרויקט?", answer: "בדרך כלל עד 10 עמודים. אם צריך יותר, מתאמים היקף מדויק בשיחת האפיון." },
            { question: "האתר מותאם לכלל המכשירים?", answer: "כן. כל אתר עובר בדיקות תאימות מלאות — מובייל, טאבלט ודסקטופ — לפני שיוצא לאוויר." },
            { question: "כמה זמן עד שרואים את האתר באינטרנט?", answer: "בדרך כלל בין 3 ל-5 שבועות מתחילת העבודה, תלוי בהיקף התוכן וזמינות החומרים." },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
