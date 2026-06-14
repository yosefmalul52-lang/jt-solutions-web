"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const testimonials = [
  {
    quote:
      "השירות האישי הורגש מהשיחה הראשונה. קיבלנו זמינות גבוהה, פתרונות מהירים וביצוע מדויק בלי לרדוף אחרי כמה ספקים במקביל.",
    name: "אורי כהן",
    role: "בעלים, חנות איקומרס",
  },
  {
    quote:
      "המעבר היה מהיר וחלק - מתהליך ידני למערכת מסודרת. זמן הטיפול ירד משמעותית והלקוחות מרגישים את הרמה המקצועית מיד.",
    name: "מיכל לוי",
    role: "מנכ\"לית, עסק לשירותי מזון",
  },
  {
    quote:
      "יש כאן שילוב חזק של מומחיות טכנית עם הבנה שיווקית. כל החלטה קודמה עם חשיבה עסקית ותוצאה שמורגשת בשטח.",
    name: "דניאל פרץ",
    role: "מנהל שיווק, חברת שירותים",
  },
  {
    quote:
      "הזמינות והאחריות היו יוצאות דופן. כל שאלה קיבלה מענה מהיר, והפרויקט התקדם בקצב גבוה עם שקיפות מלאה לכל אורך הדרך.",
    name: "נועה אברג'יל",
    role: "בעלים, סטודיו לעיצוב",
  },
  {
    quote:
      "מה שאהבנו במיוחד זה היכולת לקחת מורכבות טכנולוגית ולהפוך אותה למערכת פשוטה לתפעול יומיומי. מקצוענות ברמה גבוהה מאוד.",
    name: "רועי חדד",
    role: "שותף, מותג קמעונאות דיגיטלית",
  },
];

export default function Testimonials() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 lg:py-32 section-shell"
      style={{ background: "linear-gradient(180deg, #F6F8FF 0%, #F9FAFB 60%, #F7F9FF 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-10 md:mb-12"
          dir="rtl"
        >
          <h2 className="premium-title">
            לקוחות מספרים על העבודה איתנו
          </h2>
          <p className="premium-subtitle mx-auto mt-3 max-w-2xl">
            עסקים שבחרו להפוך אתר, מיתוג ואוטומציה למערכת שמייצרת פניות.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5" dir="rtl">
          {testimonials.map((item, index) => (
            <motion.article
              key={`${item.name}-${index}`}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.55, delay: reduceMotion ? 0 : index * 0.06, ease: EASE }}
              className="bg-white/70 backdrop-blur-md border border-white/40 shadow-premium rounded-[var(--radius)] p-5 sm:p-6"
            >
              <div className="flex items-center justify-end gap-1.5 text-yellow-400 text-base" aria-label="5 כוכבים">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 text-right">&ldquo;{item.quote}&rdquo;</p>

              <div className="mt-4 pt-3 border-t border-white/40 text-right">
                <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs mt-1 text-slate-500">{item.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
