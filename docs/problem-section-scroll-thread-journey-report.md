# סקשן הבעיה — Leader Line Journey (גלילה בין שלבים)

עדכון: החלפת דיאגרמת sticky ב-**מסלול גלילה עם קווים נוזליים** בסגנון Leader Line, בצבעי JT Solutions.

קבצים: `ProblemScrollThreadJourney.tsx`, `ProblemSection.tsx`, `lib/home-funnel.ts`, `.stjourney-leader-*` ב-`globals.css`.

---

## מה השתנה

- הוסר: קנבס sticky + SVG קבוע + תזמון timed.
- נוסף: שלבים בזרימת מסמך (`step_1` … `step_7` + `step_closing`).
- קווים **fluid** בין כל שלב לשלב הבא — נמשכים בגלילה (IntersectionObserver).
- צבע קו לפי accent של השלב (כתום → כחול → ירוק → אדום בנתק → סגול/תכלת/ירוק).
- אנימציית `stroke-dashoffset` (1.4s, cubic-bezier כמו בווידג'ט).
- קו מקווקו + dash אנימציה בנקודת הנתק.
- נקודת disc בסוף כל קו (כמו `endPlug: 'disc'`).
- מובייל: `stacked` — sockets אנכיים (bottom → top).

## IDs (כמו בווידג'ט)

| ID | תוכן |
|----|------|
| `step_1` | קמפיין |
| `step_2` | אתר / דף נחיתה |
| `step_3` | ליד |
| `step_4` | נקודת נתק |
| `step_5` | וואטסאפ / CRM |
| `step_6` | מעקב |
| `step_7` | מדידה |
| `step_closing` | מסר מסכם |

## נגישות

- `prefers-reduced-motion`: timeline סטטי עם כל השלבים.
- ללא ספריית `leader-line` חיצונית — SVG מקומי, ללא DOM זר.
- ResizeObserver לעדכון מסלולים.

## Lint / Build

עברו.
