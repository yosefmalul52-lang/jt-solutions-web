# דוח שדרוג — Premium Diagnostic Closing Section

**תאריך:** 26 ביוני 2026  
**היקף:** אזור CTA סופי / `#contact` בדף הבית בלבד  
**כיוון:** Light Premium · אבחון דיגיטלי קצר · סגירה חזקה של האתר

> לא בוצעו פעולות Git. API, schema, routes ו־`/contact` (standalone) לא שונו מבחינת לוגיקה.

---

## 1. מה היה חלש בעיצוב הקודם

- הטופס נראה כמו טופס רגיל — כרטיס קטן, צל חלש, שדות נמוכים, בלי תחושת מוצר פרימיום.
- צד השלבים היה רשימה שטוחה עם מספרים שחורים — בלי עומק, בלי journey, בלי חוט מחבר.
- הכותרת הייתה קצרה מדי ולא הזכירה **קמפיינים** כחלק מהאבחון.
- לא הייתה הפרדה ברורה בין "מה קורה אחרי הפנייה" לבין "איך שולחים פרטים".
- חסר רקע עשיר (mesh + grid עדין) שמסמן סגירת האתר.
- trust chips ופרטי קשר היו צמודים לרשימה במקום שכבת סיום נפרדת.

---

## 2. איך נבנה Form Diagnostic Card

קומפוננטה: `Contact.tsx` → `HomeFinalCta` + `DiagnosticFormProgress.tsx` + `ContactForm variant="compact"`.

**מאפיינים:**
- `bg-white`, `rounded-[36px]` (2.25rem), `border-slate-200`
- `shadow-[0_30px_90px_rgba(15,23,42,0.12)]`
- פס gradient עליון: כחול → תכלת → ירוק (`.diagnostic-form-card__rule`)
- padding גדול (`clamp(1.35rem … 2rem)`)
- Badge פנימי: "אבחון דיגיטלי חינם" + microcopy "2 שדות חובה + בחירת צורך"
- Progress rail מותאם: 3 שלבים עם מספרים צבעוניים וקווי חיבור אנימטיביים
- Inputs: `min-height: 3.1rem`, `rounded-2xl`, focus `border-blue-500` + shadow עדין
- Submit: `bg-slate-950`, `rounded-full`, hover lift, אייקון שליחה
- Success state: אייקון ירוק, טקסט נקי, כפתור WhatsApp משני

---

## 3. איך נבנה What Happens Next Panel

קומפוננטה חדשה: `components/sections/diagnostic/DiagnosticJourneyPanel.tsx`

**מאפיינים:**
- כרטיס לבן `rounded-[36px]` עם shadow עדין
- כותרת: "מה קורה אחרי הפנייה?"
- טקסט מבוא: "הגולש לא צריך לנחש..."
- 3 שלבים בתוך **mini cards** — לא רשימה שטוחה
- כל node: טבעת צבעונית + מספר accent (כחול / תכלת / ירוק)
- חוט אנכי gradient בצד (inline-end ב־RTL) שמחבר בין השלבים

---

## 4. איך שולבו קמפיינים

- **כותרת משנה:** "אבחון דיגיטלי קצר שמחבר בין העסק שלך, האתר, **הקמפיינים**, הפניות והמעקב..."
- **Choice chip ייעודי:** "אני צריך דף נחיתה לקמפיין" — צבע תכלת `#06B6D4`
- שאר הצ'יפים ממופים לשירותים מרכזיים (אתר, פניות, הכוונה)

---

## 5. איך עובד החוט האנימטיבי

**ב־Journey Panel:**
- SVG אנכי עם קו אפור סטטי + path gradient שמצויר ב־`pathLength` (Framer Motion)
- נקודה קטנה (`circle` + SVG `animate`) נעה לאורך הקו — רק כשלא `prefers-reduced-motion` ואחרי hydration
- `useHydrated` + `useReducedMotion` → fallback סטטי מלא ללא אנימציה

**ב־Form Progress:**
- קווי חיבור אופקיים בין 3 השלבים עם `scaleX` reveal מדורג

אין `Math.random`, אין hydration mismatch, אין layout shift.

---

## 6. מה שודרג בבחירת הצורך

- מעבר מ־pills פשוטים ל־**choice chips** עם dot צבעוני לכל אפשרות
- Grid 1–2 עמודות במובייל לפי רוחב
- Selected state: רקע כחול בהיר + border + shadow עדין
- Hover lift עדין בדסקטופ
- `aria-pressed` על כל chip
- הערכים נשמרים ב־`service` — אותו שדה schema/API

---

## 7. איך נשמר API/schema

- `ContactForm` variant `compact` — אותם שדות: `name`, `phone`, `service` (hidden + chips)
- `contactSchema` / `/api/contact` — ללא שינוי
- default `service`: "אני לא בטוח — צריך הכוונה"
- אין שדות חדשים, אין שינוי payload

---

## 8. איך נראה מובייל

סדר:
1. Header (badge + H2 + subline)
2. Journey Panel
3. Form Diagnostic Card
4. Trust chips + Contact mini cards

- שדות רחבים, submit `min-height: 3.25rem`
- `padding-bottom` מוגדל בסקשן (`~7–9rem`) כדי שלא יוסתר ע"י WhatsApp/EqualWeb
- chips ב־grid 1–2 עמודות
- אנימציות מופחתות ב־`prefers-reduced-motion`
- אין horizontal scroll

---

## 9. איך נשמרה נגישות

- `label` אמיתיים לכל input
- `role="alert"` על שגיאות (קיים ב־`FieldError`)
- `focus-visible` על inputs, chips, submit, קישורי קשר
- `aria-label` על progress steps
- `aria-labelledby` על Journey panel
- `aria-pressed` על choice chips
- reduced motion → קווים ונקודות סטטיים
- כפתור submit הוא `<button type="submit">` אמיתי
- קישורי טלפון / וואטסאפ / מייל — `<a href>` אמיתיים

---

## 10. האם lint עבר

**כן** — `npm run lint` עבר (2 אזהרות קיימות ב־`lib/studio-shell.ts`, לא קשורות לשינוי).

---

## 11. האם build עבר

**כן** — `npm run build` עבר בהצלחה (55 עמודים סטטיים).

---

## קבצים שנגעו

| קובץ | שינוי |
|------|--------|
| `components/sections/Contact.tsx` | מבנה Premium Diagnostic |
| `components/sections/contact-final-cta.css` | עיצוב מלא |
| `components/sections/diagnostic/DiagnosticJourneyPanel.tsx` | חדש |
| `components/sections/diagnostic/DiagnosticFormProgress.tsx` | חדש |
| `components/ui/ContactForm.tsx` | chips משודרגים + input classes |
| `lib/home-funnel.ts` | קופי + chip meta |
