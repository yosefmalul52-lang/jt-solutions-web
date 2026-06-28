# דוח — Button Motion Upgrade v2 | JT Solutions

**תאריך:** 26 ביוני 2026  
**היקף:** מערכת כפתורים + motion לכל האתר

> לא בוצעו פעולות Git.

---

## 1. מה היה חלש בכפתורים לפני

- Primary נראה כמו כפתור שחור שטוח — shadow חלש, ללא accent, hover של -1px בלבד
- Secondary כמעט נעלם — border `#e2e8f0`, shadow מינימלי
- Shine דרך `<span>` נפרד, לא `::before` — פחות פרימיום
- Auto-shine הופעל על **כל** primary/gradient/whatsapp כברירת מחדל — יותר מדי רעש
- גובה אחיד 52px בלבד — לא 58px בדסקטופ
- חץ זז 2px בלבד, ללא נקודת accent תכלת
- Gradient בזווית 120deg במקום 135deg

---

## 2. אילו variants נבנו או שודרגו

| Variant | שדרוג v2 |
|---------|----------|
| **primary** | 58px דסקטופ / 52px מובייל, shadow `0 18px 45px`, accent dot תכלת, hover -2px, חץ -3px |
| **gradient** | `135deg` כחול→תכלת→סגול, brightness עדין ב-hover, Hero בלבד |
| **secondary** | border `#cbd5e1`, shadow `0 10px 30px`, hover `blue-50/40` + border כחול |
| **soft** | לשירותים קטנים — ללא shine |
| **whatsapp** | gradient ירוק עדין, shine חלש יותר |
| **ghost** | ללא shine |
| **loading** | spinner + `aria-busy`, גובה קבוע |
| **disabled** | ללא shine, ללא hover |

---

## 3. איך עובד shine effect

- מימוש: **`::before`** על `.btn--shine` / `.btn--shine-auto`
- מידות: 52px רוחב, 140% גובה, `skewX(-14deg)`
- gradient: `rgba(255,255,255,.42)` — barely visible
- **Hover/focus:** אנימציה חד-פעמית `btn-shine-hover` (0.72s)
- **Auto:** כל 6 שניות רק עם `shine="auto"` מפורש
- RTL: keyframes נפרדים (`btn-shine-hover-rtl`, `btn-shine-auto-rtl`)
- `prefers-reduced-motion`: `::before { display: none }`
- ללא JS, ללא layout shift

---

## 4. איפה הופעל auto-shine

רק ב-CTA מרכזיים עם `shine="auto"`:

- Hero (`HomeCtaButton` gradient)
- Footer CTA
- Navbar mobile
- Contact form submit
- Blog post CTA
- Areas primary
- Services hub (hero, offerings, footer)
- Studio service pages (hero, sections, footer)
- About, Projects hub, Project detail
- Pricing — מסלול פופולרי בלבד

**לא** auto-shine: secondary, soft, ghost, cookie, WhatsApp success (hover בלבד)

---

## 5. איך שודרגו כפתורים משניים

- border `#cbd5e1` (במקום `#e2e8f0`)
- shadow `0 10px 30px rgba(15,23,42,.06)`
- hover: `bg-blue-50/40`, `border-blue-300`, translateY(-1px)
- חץ זז 3px ב-hover
- `shine={false}` מפורש — ללא shine כלל

---

## 6. איך שודרגו כפתורי WhatsApp

- gradient ירוק `#10B981 → #059669`
- shine opacity מופחת (0.22 במקום 0.42)
- FAB צף: `::before` shine ב-hover בלבד
- נפרד ויזואלית מ-primary CTA

---

## 7. איך נשמר מובייל

- `min-height: 52px` במובייל, `58px` מ-768px
- `fullWidth` / `btn--full` בטופס ו-CTA רלוונטיים
- `white-space: nowrap` — טקסט לא נשבר
- FAB עם safe-area bottom

---

## 8. איך נשמרה נגישות

- `<button>` / `<Link>` / `<a>` לפי סוג הפעולה
- `focus-visible` ring כחול + offset 3px
- `aria-busy` ב-loading
- `disabled` אמיתי
- contrast תקין על כל variants
- reduced motion מבטל shine ו-spinner animation

---

## 9. האם lint עבר

**כן** — 0 errors.

---

## 10. האם build עבר

**כן** — `npm run build` הצליח.

---

## קבצים עיקריים

- `components/ui/button-system.css` — v2 מלא
- `components/ui/CtaButton.tsx` — accent dot, shine via CSS class
- `lib/button-variants.ts` — auto-shine רק ב-`shine="auto"`
- `components/home/HomeCtaButton.tsx` — gradient + auto
