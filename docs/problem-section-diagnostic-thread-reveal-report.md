# שדרוג סקשן הבעיה — Diagnostic Thread Reveal

סקשן: `#problem`  
קבצים: `components/sections/ProblemSection.tsx`, `lib/home-funnel.ts` (`problemSection`), `app/globals.css` (`.dthread-*`).

---

## 1. מה היה חלש בגרסה הקודמת

- הקנבס היה גדול אך דליל — grid וצללים חלשים, הרבה רווח ריק.
- השלבים היו קטנים מדי (כרטיסי `xray-step` דקים) ולא הרגישו כמו nodes של אבחון.
- החוט היה SVG סטטי ללא תחושת "חשיפה חיה" — לא היה dot נע, לא רצף ברור.
- נקודת הנתק הייתה פאנל קטן בצד, לא node מרכזי בזרימה.
- מסלול התיקון נראה כמו כרטיס ירוק פשוט, לא repair path מקצועי.
- אין badge "הבעיה" בכותרת.

## 2. איך נבנה Diagnostic Canvas

- קנבס `dthread-canvas`: `rounded-[36px]`, `border-slate-200`, `shadow-[0_30px_90px_rgba(15,23,42,0.10)]`, `max-w-7xl`.
- שכבות עומק: grid פנימי עדין, gradient mesh בפינות, corner highlights, inset shadow.
- כותרת פנימית: tag "אבחון זרימה" + "איפה הפנייה נשברת בדרך".
- padding גדול יותר בדסקטופ (2.75rem).

## 3. איך עובד החוט הנחשף

- 6 nodes בשורה (דסקטופ): קמפיין → אתר → ליד → **נקודת נתק** → CRM → מעקב.
- SVG עם 4 מקטעים:
  1. **Main** — gradient כתום→ירוק→כחול (עד ליד)
  2. **Break** — מקווקו אדום בין ליד לנתק
  3. **Dim** — מקווקו אפור אחרי הנתק (מנותק)
  4. **Repair** — עקומה ירוק→תכלת→סגול מתחת: ליד → CRM → מעקב
- `useThreadStep` מפעיל רצף timed (0–3.8s) בכניסה ל-viewport.
- `pathLength` animation על כל מקטע; dot כחול נע לאורך החוט.
- `prefers-reduced-motion`: כל החוט מוצג מלא, ללא dot נע, ללא pulse.

## 4. איך מוצגת נקודת הנתק

- Node ייעודי `dthread-node--break` ברצף (לא בין שני segments).
- רקע `#FEF2F2`, border אדום עדין, אייקון `TriangleAlert`.
- Pulse עדין בזמן שלב 4–5 (`dthread-break-pulse`).
- קו מקווקו אדום ב-SVG לפני/אחרי הנתק.

## 5. איך מוצג Repair Path

- `dthread-repair` מתחת ל-insight.
- Badge "הפתרון" + טקסט: "מחברים קמפיין, אתר, ליד, CRM ומעקב למערכת אחת…"
- קו gradient אופקי (`scaleX` reveal).
- Chips: ליד → CRM → תזכורת חזרה → מדידה.
- מופיע בשלב 6+ של האנימציה (או מיד ב-reduced-motion).

## 6. אילו אנימציות נוספו

| אנימציה | מימוש |
|---------|--------|
| Canvas fade up | `motion.div` על הקנבס |
| Nodes stagger | הדלקה לפי `step` (lit/dim) |
| Thread draw | `pathLength` על מקטעי SVG |
| Moving dot | `motion.circle` על החוט |
| Break pulse | CSS keyframes + opacity pulse על path |
| Repair reveal | path + `RepairPath` opacity/scaleX |
| Hover | `dthread-node--hover` — translateY + shadow |

## 7. איך נשמר מובייל

- `dthread-flow--mobile` בלבד מתחת ל-1024px (CSS `@media`, לא Tailwind בלבד).
- זרימה אנכית: 6 nodes + joins אנכיים (gradient / break / dim).
- אין horizontal scroll, אין SVG רחב.
- Repair path מתחת ל-flow (לא בתוך SVG אנכי).
- max-width 20rem לכל node.

## 8. איך נשמרה נגישות

- כל הטקסט ב-DOM תמיד (גם לפני אנימציה).
- `prefers-reduced-motion`: fallback סטטי מלא (`COMPLETE_STEP`).
- `aria-label` על ה-flow, `role="note"` על נקודת נתק.
- אייקונים דקורטיביים עם `aria-hidden`.
- היררכיית כותרות: eyebrow + H2 דרך `SectionHeader`.
- Contrast: slate על לבן, אדום רק לנתק.

## 9. Lint

עבר — 0 errors (2 warnings קיימים ב-`lib/studio-shell.ts`).

## 10. Build

`npm run build` עבר בהצלחה.

---

### סיכום קצר

- **Diagnostic Canvas** — קנבס לבן premium עם grid, mesh, corners, shadow עמוק.
- **Thread Reveal** — SVG רב-מקטעי + dot נע + רצף timed בגלילה.
- **Break Point** — node אדום עם warning + pulse + קו מקווקו.
- **Repair Path** — מסלול תיקון ירוק/תכלת עם chips.
- **Mobile** — flow אנכי נקי, ללא dual-layout.
- **Lint/Build** — עברו.
