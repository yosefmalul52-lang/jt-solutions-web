# שדרוג סקשן הבעיה — Broken Funnel X-Ray (v2)

סקשן: `#problem`
קבצים: `components/sections/ProblemSection.tsx`, `lib/home-funnel.ts` (`problemSection`), `app/globals.css` (`.xray-*`).

## 1. תיקון באג תצוגה (גרסה v2)
בגרסה הקודמת הוצגו **בו-זמנית** זרימה אופקית ואנכית (צורת T) — נראה כמו wireframe לא מקצועי.
**סיבה:** `.xray-track--mobile { display: flex }` ב-CSS דרס את `hidden` / `lg:hidden` של Tailwind.
**תיקון:** הפרדה ל-`DesktopFlow` / `MobileFlow` עם `.xray-flow--desktop` / `.xray-flow--mobile` וכללי `@media` ב-CSS בלבד.

## 2. קונספט Broken Funnel X-Ray
Visual אחד רחב — "אבחון זרימה" של הפנייה:
קמפיין → אתר → ליד → **נקודת נתק** → וואטסאפ/CRM → מעקב.

Canvas לבן עם grid עדין, glows עדינים, וכרטיסי שלב ממוספרים (01–05) — לא wireframe של נקודות צבעוניות.

## 3. שינוי Layout
- **Header:** H2 בשתי שורות (ללא eyebrow "הבעיה"), subline עם קמפיין/טופס/וואטסאפ/מעקב.
- **Canvas** (`xray-canvas`): border, shadow, grid פנימי, tag "אבחון זרימה".
- **דסקטופ:** שורה אחת — 3 שלבים לפני הנתק | פאנל נתק | 2 שלבים אחרי (dim) + SVG path עם קטע מקווקו באדום.
- **מובייל:** זרימה אנכית בלבד — join → break panel → join מקווקו.
- **תחתית:** insight + מסלול תיקון עם rail gradient.

## 4. רכיבים חדשים
| רכיב | תפקיד |
|------|--------|
| `FlowStep` | כרטיס שלב עם מספר, accent bar, label + micro |
| `BreakPanel` | פאנל אדום עדין עם ! וטקסט נתק |
| `FlowConnector` | קו מחבר בין שלבים (מקווקו אחרי הנתק) |
| `DesktopFlow` / `MobileFlow` | layouts נפרדים — רק אחד גלוי לפי breakpoint |

## 5. שילוב קמפיינים
- Subline: "כש**קמפיין**, אתר, טופס, וואטסאפ ומעקב..."
- Node ראשון: **קמפיין** (`#F59E0B`).
- מסלול תיקון: קמפיין → אתר → ליד → CRM → מעקב.

## 6. נקודת הנתק
בין "ליד" ל"וואטסאפ / CRM":
- SVG path מקווקו אדום (דסקטופ)
- `BreakPanel`: רקע ורוד-אדום עדין, אייקון !, "נקודת נתק"
- שלבים 04–05 ב-`xray-step--dim`

## 7. אנימציות
- Canvas — fade up בכניסה (`framer-motion`, תמיד גלוי גם לפני `inView`).
- `prefers-reduced-motion`: ללא motion wrapper.
- אין Math.random, אין horizontal scroll.

## 8. Lint / Build
- `npm run lint` — 0 errors.
- `npm run build` — עבר בהצלחה.

---

### סיכום קצר
- **באג:** תוקן dual-layout (T-shape).
- **עיצוב:** כרטיסי שלב ממוספרים, פאנל נתק, canvas premium.
- **מובייל:** זרימה אנכית נקייה בלבד.
- **Campaigns:** node ראשון + subline + מסלול תיקון.
