import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceTemplate from "@/components/templates/ServiceTemplate";
import { BarChart3, Megaphone, MousePointerClick, Radar, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "ניהול קמפיינים ותשתית פרסום | JT Solutions - סוכנות דיגיטל",
  description:
    "ניהול קמפיינים ממומנים ותשתית פרסום דיגיטלית: אסטרטגיית מדיה, הטמעת מדידה, אופטימיזציה שוטפת, בדיקות A/B ודוחות ביצועים לשיפור ROI.",
};

export default function AdInfrastructurePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ServiceTemplate
          badge="שלב הניהול: שיווק ותחזוקה"
          title="ניהול קמפיינים ותשתית פרסום שמובילה תוצאות"
          description="אנחנו מנהלים את מערך הפרסום שלך מקצה לקצה - עם אסטרטגיה ברורה, בקרה יומית ואופטימיזציה קבועה שמטרתה להגדיל החזר השקעה."
          targetAudience={[
            "עסקים שכבר מפרסמים ורוצים לשפר ביצועים",
            "עסקים שרוצים שקיפות מלאה על מה עובד ומה לא",
            "עסקים שצריכים ניהול רציף ולא רק הקמה חד-פעמית",
          ]}
          timeframe="תוצאות ראשוניות רואים לרוב בתוך 2 עד 4 שבועות, ושיפור יציב לאורך החודשים הבאים."
          deliverables={[
            { icon: Target, text: "אסטרטגיית קמפיין ותכנון קהלים מדויק" },
            { icon: Radar, text: "הטמעת מדידה מלאה בכל שלבי המשפך" },
            { icon: Megaphone, text: "ניהול קמפיינים שוטף ב-Meta וב-Google" },
            { icon: MousePointerClick, text: "בדיקות A/B רציפות לשיפור ביצועים" },
            { icon: BarChart3, text: "דוח חודשי ברור עם המלצות להמשך" },
          ]}
          faq={[
            { question: "כמה תקציב פרסום צריך כדי להתחיל?", answer: "מגדירים תקציב ריאלי לפי התחום, קהל היעד והיעדים. יש לנו ניסיון עם מגוון רחב של תקציבים — גם קטנים וגם גדולים." },
            { question: "אפשר לנהל כמה ערוצי פרסום במקביל?", answer: "כן. בונים תמהיל ערוצים חכם — Meta, Google, ועוד — לפי המקום שבו נמצא קהל היעד שלך." },
            { question: "איך עוקבים אחרי התוצאות?", answer: "מקבלים דוח חודשי ברור עם נתוני ביצועים, עלויות, המרות וניתוח מה עובד — בלי ז'רגון מיותר." },
            { question: "כמה זמן עד שרואים תוצאות?", answer: "תוצאות ראשוניות בדרך כלל בתוך 2–4 שבועות. שיפור יציב ומשמעותי מתבסס לאורך 2–3 חודשים של אופטימיזציה." },
            { question: "מה זה בדיקות A/B ולמה זה חשוב?", answer: "מריצים גרסאות שונות של מודעות, דפי נחיתה וקהלים במקביל, ומשאירים מה שמניב תוצאות — שיטה שמשפרת ביצועים לאורך זמן." },
            { question: "האם צריך לדעת פרסום כדי לעבוד איתכם?", answer: "לא. אנחנו מנהלים הכל מקצה לקצה ומסבירים בפשטות מה קורה, מה עובד ומה אנחנו מתכננים לשפר." },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
