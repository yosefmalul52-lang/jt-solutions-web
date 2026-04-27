import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceTemplate from "@/components/templates/ServiceTemplate";
import { CreditCard, PackageCheck, Repeat, ShoppingCart, Warehouse } from "lucide-react";

export const metadata: Metadata = {
  title: "בניית חנות איקומרס | JT Solutions - סוכנות דיגיטל",
  description:
    "בניית חנות וירטואלית לעסקים עם סליקה, ניהול מלאי, אוטומציות הזמנה וחשבוניות, ושחזור עגלות נטושות למקסום המרות וחוויית קנייה מתקדמת.",
};

export default function EcommerceServicePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ServiceTemplate
          badge="שלב הגדילה: הנכסים הדיגיטליים"
          title="חנות איקומרס שמנהלת מכירה ותפעול במקום אחד"
          description="אנחנו מקימים חנות דיגיטלית חכמה שמייצרת חוויית קנייה חלקה, מקצרת תהליכי תפעול ומאפשרת לך לצמוח עם שליטה מלאה."
          targetAudience={[
            "עסקים שרוצים למכור אונליין בצורה מסודרת ורווחית",
            "עסקים עם קטלוג מוצרים מתרחב",
            "עסקים שצריכים תהליכי תשלום, מלאי ומשלוח אוטומטיים",
          ]}
          timeframe="בדרך כלל בין 4 ל-8 שבועות לפי היקף מוצרים ואינטגרציות."
          deliverables={[
            { icon: ShoppingCart, text: "מבנה חנות ברור עם חוויית קנייה ממירה" },
            { icon: CreditCard, text: "מערכת סליקה מאובטחת ונוחה" },
            { icon: Warehouse, text: "ניהול מלאי ומוצרים בממשק אחד" },
            { icon: PackageCheck, text: "אוטומציה לתהליכי הזמנה וחשבונית" },
            { icon: Repeat, text: "שחזור עגלות נטושות לשיפור שיעור ההמרה" },
          ]}
          faq={[
            { question: "החנות מתאימה גם למובייל?", answer: "כן. כל תהליך הרכישה — עיון, הוספה לעגלה, תשלום — מותאם מלאה לנייד, כי רוב הקניות מתבצעות ממנו." },
            { question: "אפשר לנהל מוצרים לבד אחרי ההשקה?", answer: "כן. המערכת מגיעה עם ממשק ניהול ידידותי שמאפשר להוסיף מוצרים, לעדכן מחירים ולנהל מלאי בקלות." },
            { question: "אפשר לחבר מערכות חיצוניות?", answer: "כן. ניתן לחבר שירותי סליקה, חברות משלוחים, מערכות חשבוניות וכלי ניהול נוספים לפי הצורך." },
            { question: "מה זה שחזור עגלות נטושות ולמה זה חשוב?", answer: "כ-70% מהגולשים עוזבים את העגלה לפני הרכישה. מנגנון שחזור שולח תזכורת אוטומטית ומחזיר חלק מהם לסגירת הקנייה." },
            { question: "כמה מוצרים אפשר לנהל בחנות?", answer: "אין הגבלה עקרונית. החנות בנויה לצמוח — מעשרה מוצרים ועד קטלוגים בני אלפי פריטים." },
            { question: "האם יש תמיכה אחרי ההשקה?", answer: "כן. לאחר ההשקה יש ליווי ראשוני, ואפשר להמשיך בתחזוקה שוטפת ותמיכה טכנית לפי הצורך." },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
