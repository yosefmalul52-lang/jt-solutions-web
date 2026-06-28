# Scroll Thread Journey — Design Audit

**פרויקט:** JT Solutions · דף הבית · סקשן `#problem`  
**תאריך:** יוני 2026  
**מטרה:** אבחון לפני שדרוג — ללא שינוי קוד (מסמך ייחוס)

---

## 1. איך הסקשן בנוי טכנית

### ארכיטקטורה

| שכבה | קובץ | תפקיד |
|------|------|--------|
| Wrapper | `ProblemSection.tsx` | כותרת עריכתית + `SectionHeader` |
| Journey | `ProblemScrollThreadJourney.tsx` | כרטיסים, SVG, אנימציה, IO |
| Data | `lib/home-funnel.ts` → `problemSection` | 7 שלבים + closing |
| Styles | `problem-journey-section.css` | מקור עיצוב יחיד (`.stjourney-*`) |
| Page | `app/(home)/page.tsx` | `dynamic()` אחרי Identification, לפני Solution |

### אין sticky section

הסקשן בזרימת מסמך רגילה. אין `position: sticky`, אין `useScroll` מ־Framer Motion. הגובה נקבע לפי 7 כרטיסים + רווחים + closing — גבוה בכוונה (~1,500–2,000px+), לא מוגזם לטכניקה אלא לחוויית גלילה.

### מנוע אנימציה

- **IntersectionObserver** — מתי להתחיל קטע קו / לחשוף שלב
- **Framer Motion** — כניסת כרטיסים (opacity, y, x) על `.stjourney-leader__card-motion` בלבד
- **SVG + stroke-dashoffset** — ציור קו (~1.1s קבוע, לא scroll-linked)
- **ResizeObserver** — עדכון גיאומטריה
- **useHydrated** — SVG רק אחרי mount

### מיקום כרטיסים

מערכת מסודרת ב־data: `side: "right" | "left"` לכל שלב.

- **מובייל** (stacked, &lt;1024px): עמודה מרכזית, `max-width` מלא
- **דסקטופ**: zigzag — כרטיסים ב־`max-width: ~21rem`, ימין/שמאל לסירוגין

### אין useScroll scroll-linked

הגלילה מפעילה את הרצף; הקו עצמו לא נמשך לפי `scrollY` אלא בטיימר קבוע אחרי trigger.

---

## 2. בעיות עיצוביות (קומפוזיציה) — מקור האבחון

| בעיה | תיאור |
|------|--------|
| רווח מרכזי גדול | כרטיסים ב־47% השאירו ~54% ריק באמצע |
| חוסר ציר מרכזי | אין spine אנכי; העין לא תמיד יודעת לאן להמשיך |
| כותרת vs מסלול | bar טכני מול כותרת חזקה |
| נקודת נתק חלשה | אדום עדין, אותה היררכיה כרטיס |
| שלבי repair (05–07) | כמעט זהים לרגילים |
| CSS כפול | `globals.css` + `problem-journey-section.css` — סתירות |
| Dead CSS | `.stjourney-scroll--mobile` וכו׳ — שאריות |

---

## 3. בעיות באנימציה — מקור האבחון

| בעיה | תיאור |
|------|--------|
| לא scroll-driven | קו נמשך בטיימר אחרי IO |
| דסנכרון קו ↔ כרטיס | `getBoundingClientRect()` על אלמנט עם transform |
| `aria-hidden` | שלבים 2–7 מוסתרים מקוראי מסך |
| Remount ב־breakpoint | `key={stacked ? "mobile" : "desktop"}` |
| Pending placeholders | `min-height: 6.5rem` — חורים ריקים |
| משך | ~15–20 שניות למסלול מלא |

---

## 4. בעיות בחוט — מקור האבחון

- SVG `<path>` עם cubic Bezier (`connectorPath`)
- עוגן: מרכז תחתון → מרכז עליון של כרטיס
- Sockets CSS מול SVG — אי־התאמה 2–4px
- Bezier אחד — «חבל רפוי»
- Plugs כפולים + glow — עמוס

---

## 5. תיקונים שיושמו (יוני 2026)

| נושא | פעולה |
|------|--------|
| מדידת קו | עוגנים סטטיים `[data-journey-anchor]` על `.stjourney-leader__card-wrap`; motion רק על פנים |
| נגישות | הוסר `aria-hidden`; תוכן נשאר ב-DOM (opacity מופחת לפני reveal) |
| Breakpoint | הוסר remount ב־`key` |
| חוט | הוסרו plugs, glow, sockets מ-SVG |
| Bar | «מסלול פנייה אמיתי» + `problemSection.insight` |
| Repair | תג «החיבור», רקע `--repair-bg` לפי שלב |
| משך קו | `LINE_DRAW_MS`: 1100 |
| CSS | איחוד ל־`problem-journey-section.css`; ניקוי `globals.css` |
| פריסה דסקטופ | כרטיסים `max-width: 21–22rem` במקום 47% |
| break | כרטיס רחב יותר, accent אנכי אדום, microcopy |
| reduced motion | `StaticTimeline` ללא אנימציה |

### לא יושם (בכוונה)

- **Scroll-linked path** — נשאר Leader Line Journey לפי בקשת משתמש (לא Connected Spine / Floating Zigzag)

---

## 6. קבצים רלוונטיים

```
components/sections/ProblemSection.tsx
components/sections/ProblemScrollThreadJourney.tsx
components/sections/problem-journey-section.css
lib/home-funnel.ts
```
