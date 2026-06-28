# דוח שדרוג Dark Premium — JT Solutions

**תאריך:** יוני 2026  
**כיוון:** Premium Digital Operating System — Dark (Hero `#05060A`)  
**תוכנית:** `docs/dark-premium-design-plan.md`

---

## 1. מה שונה בעיצוב הכללי

- **רקע גלובלי** — `#05060A` על `body`, `themeColor`, וכל עמודי המשנה
- **Design tokens** — `--bg-primary`, `--surface-glass`, `--border-soft`, `--text-primary/secondary/muted`, accent cyan/violet
- **כרטיסים** — glass אחיד: `rounded-3xl`, border `white/10`, backdrop-blur, hover עדין
- **כפתורים** — pill: primary לבן/שחור, secondary glass
- **Navbar** — תמיד dark shell (blur + border `white/10`)
- **טפסים** — inputs dark glass + focus cyan
- **FAQ** — accordion glass כהה
- **עמודי שירות** — חזרה ל-canvas כהה (לא light canvas)
- **Hero** — קופי אסטרטגי מעודכן, pills עם CRM, mobile ללא 100vh כפוי

---

## 2. קבצים ששונו

| קובץ | שינוי |
|------|--------|
| `app/globals.css` | tokens, cards, forms, surfaces, sections |
| `app/layout.tsx` | body dark, themeColor |
| `lib/studio-shell.ts` | nav תמיד dark |
| `lib/hero-content.ts` | badge, h1, pills |
| `components/layout/DarkPageShell.tsx` | **חדש** — canvas glow+grid |
| `components/ui/CtaButton.tsx` | pill white/glass |
| `components/ui/FaqAccordion.tsx` | dark glass |
| `components/ui/ContactForm.tsx` | glass inputs |
| `components/ui/PillarSectionNav.tsx` | dark sticky nav |
| `components/templates/StudioServiceTemplate.tsx` | dark sections |
| `components/sections/Hero*.tsx` | mobile min-h, copy |
| `app/services/page.tsx` | dark hub |
| `app/projects/page.tsx` | DarkPageShell |
| `app/contact/page.tsx` | DarkPageShell |
| `app/about/page.tsx`, `app/blog/page.tsx` | dark bg |
| `app/privacy-policy/page.tsx`, `app/accessibility/page.tsx`, `app/areas/[slug]/page.tsx`, `app/not-found.tsx` | dark classes |
| Section components (websites, automations, marketing, branding) | dark text/borders |
| `components/projects/ProjectHubCard.tsx` | dark glass card |
| `docs/dark-premium-design-plan.md` | **חדש** |
| `docs/dark-premium-design-report.md` | **חדש** |

---

## 3. קומפוננטות ששודרגו

- `DarkPageShell` — רקע cinematic לעמודי משנה
- `CtaButton` — pill primary/secondary
- `PremiumCard` / `.premium-card` — dark glass
- `FaqAccordion` — premium-faq-item dark
- `GlassPanel` / surfaces — glass dark
- `StudioServiceTemplate` — hero + body dark
- `ProjectHubCard` — case study glass

---

## 4. השפעת ה-Hero על שאר האתר

ה-Hero הגדיר:
- radial glow + grid → `dark-page-glow/grid`, `hero-cinematic-*`
- badge pill glass → `.dark-section-badge`
- כרטיסי pills → `.hero-pill-card`
- CTA pill → `CtaButton` גלובלי

כל עמודי משנה (/services, /projects, /contact) משתמשים באותה שפה: hero zone + glass cards + typography לבן.

---

## 5. אנימציות

- **נשמרו:** typewriter (desktop), Reveal/Stagger, FAQ smooth, CTA hover עדין
- **הוסר/הופחת:** magnetic CTA, scale מוגזם, gradient glow על primary
- **mobile:** Hero ללא 100vh; typewriter סטטי

---

## 6. נגישות

- `prefers-reduced-motion` — Framer + typewriter
- focus ring cyan + offset dark
- sr-only על typewriter
- contrast: white/96 על #05060A, muted white/48+
- H1 אחד לעמוד — לא שונה

---

## 7. ביצועים

- רקע CSS בלבד — ללא canvas JS
- build static 55 routes
- אין Math.random ב-render
- CtaButton ללא magnetic על links

---

## 8. מובייל

- Hero: `min-h-0` + CTA מוקדם
- pills 2×2
- כפתורים min-h 3rem, full width כשצריך
- navbar dark glass

---

## 9. Lint

**עבר** — 0 errors, warnings קיימים (unused vars ב-hooks ישנים).

---

## 10. Build

**עבר** — `next build` הצליח.

---

## 11. מה נשאר פתוח

1. **Blog post inner** (`BlogPostView`) — לבדוק קריאות prose על dark
2. **Project detail** (`/projects/[id]`) — light remnants אפשריים
3. **Areas pages** — gradient inline styles — לעבור ל-DarkPageShell מלא
4. **StaggerGroup wiring** — אופציונלי ל-grids
5. **Legal pages** — content panels עדיין יכולים להרגיש flat; אפשר premium-card wrapper

---

## 12. המלצות

- Visual QA: contrast על `text-white/50`
- Lighthouse mobile על `/` ו-`/services`
- איחוד `BlogPostView` + `ProjectDetail` ל-dark shell

**סיכום:** האתר עבר לשפה dark premium אחידה הממשיכה מה-Hero. קופי אסטרטגי נשמר. lint/build עוברים.
