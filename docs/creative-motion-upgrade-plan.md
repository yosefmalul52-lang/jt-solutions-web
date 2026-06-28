# תוכנית שדרוג Creative Motion — JT Solutions

**תאריך:** 26 ביוני 2026  
**כיוון:** Light Premium Futuristic Studio  
**מסמכי ייחוס:** `docs/conversion-messaging-strategy.md`, `docs/site-audit-ux-ui-seo.md`, `docs/final-qa-report.md`, `docs/light-premium-redesign-report.md`

---

## 0. בדיקת בטיחות (Git)

| מדד | ערך |
|-----|-----|
| קבצים בסטטוס | **140** |
| Untracked | **67** |

> ⚠️ **אזהרה:** יש הרבה עבודה שלא נשמרה ב-git (committed). לא מתבצע `git reset`, מחיקת קבצים או rollback. כל העבודה קדימה בלבד, על בסיס הקוד הקיים. מומלץ לבצע commit מסודר אחרי השדרוג.

---

## 1. מה חסר כרגע בעיצוב

- העיצוב בהיר ונקי אבל **שטוח** — כרטיסים אחידים, מעט עומק, מעט תנועה.
- Hero עם flow card סטטי — לא מרגיש כמו מערכת חיה.
- אין micro-interactions (hover חכם, reveal הדרגתי, פידבק).
- אין ויזואל "מערכת לידים" שמספר את הסיפור: תנועה → פנייה → CRM → מעקב → סגירה.
- אין תחושת התקדמות במסע הגלילה.
- בלוקים (הזדהות, בעיה, מה מקבלים) נראים כמו רשימות, לא חוויה.

---

## 2. אלמנטים מתוחכמים שיתווספו

| # | אלמנט | איפה |
|---|-------|------|
| 1 | Hero visual חי — כרטיסי flow צפים, קו SVG עם נקודה זזה, pulse | Hero |
| 2 | Floating mini-chips (ליד, CRM, וואטסאפ, מדידה) | Hero (דסקטופ) |
| 3 | Service marquee עדין | מתחת ל-Hero |
| 4 | Sticky scroll progress + mini-nav צדדי (דסקטופ) | דף הבית |
| 5 | כרטיסי הזדהות עם hover שחושף את "הפתרון" | הזדהות |
| 6 | Before / After panels | בעיה |
| 7 | Flow עם קו SVG ונקודה זזה | פתרון |
| 8 | Bento grid (כרטיסים בגדלים שונים) | מה מקבלים |
| 9 | Hover image lift + בלוק "מה אפשר ללמוד" | עבודות |
| 10 | Timeline עם קו מתמלא | תהליך |
| 11 | Gradient border + animated checkmarks | מסלולים |
| 12 | Accordion חלק + רקע gradient עדין | FAQ |
| 13 | כרטיס "מה קורה אחרי הפנייה?" | טופס |
| 14 | Navbar shadow בגלילה | Navbar |

---

## 3. קבצים שייגעו

- `app/globals.css` — בלוק Creative Motion חדש (keyframes, bento, flow, marquee)
- `components/home/HomeHeroFlowCard.tsx` — ויזואל מערכת לידים חי
- `components/sections/HeroContent.tsx` — floating chips
- `components/home/HomeScrollProgress.tsx` — **חדש**
- `components/home/ServiceMarquee.tsx` — **חדש**
- `components/sections/IdentificationSection.tsx` — hover reveal
- `components/sections/ProblemSection.tsx` — before/after
- `components/sections/SolutionSection.tsx` — קו SVG + נקודה
- `components/sections/DeliverablesSection.tsx` — bento
- `components/sections/Projects.tsx` — hover + insights
- `components/sections/Pricing.tsx` — gradient border
- `components/sections/Contact.tsx` — "מה קורה אחרי"
- `components/layout/Navbar.tsx` — shadow
- `lib/home-funnel.ts` — הוספת `solution` לכרטיסי הזדהות (ללא שינוי קופי מרכזי / מספרים)
- `app/(home)/page.tsx` — חיווט progress + marquee

---

## 4. שמירה על ביצועים

- **אנימציות ב-CSS** ככל האפשר (keyframes), gated תחת `@media (prefers-reduced-motion: no-preference)`.
- ללא ספריות חדשות — שימוש ב-Framer Motion הקיים בלבד.
- ללא `Math.random` ב-render — ערכים דטרמיניסטיים (כמו ב-HeroFlowVisual).
- ללא תמונות כבדות חדשות; SVG/divs בלבד.
- Client components רק היכן שצריך אינטראקציה.
- שמירה על LCP — Hero טקסט נשאר ראשון, הוויזואל לא חוסם.

---

## 5. שמירה על נגישות

- כל הוויזואלים הדקורטיביים — `aria-hidden`.
- מידע חיוני לא מוסתר באנימציה בלבד (תמיד טקסט נגיש).
- `prefers-reduced-motion` מכבה תנועה.
- focus states נשמרים; כפתורים/קישורים אמיתיים.
- H1 יחיד; היררכיית headings תקינה.

---

## 6. מניעת עומס מוגזם

- תנועה **עדינה**: floating קל, pulse, fade-up, hover lift — בלי parallax כבד.
- במובייל: תנועה מופחתת, scroll progress מוסתר, flow אנכי.
- בוחרים אלמנטים שמשפרים הבנה (flow, before/after) ולא סתם זזים.

---

*אחרי אישור התוכנית — מתבצע השדרוג בפועל. ראה `docs/creative-motion-upgrade-report.md`.*
