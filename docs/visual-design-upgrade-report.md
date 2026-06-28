# דוח שדרוג עיצובי — JT Solutions

**תאריך:** יוני 2026  
**כיוון:** Premium Digital Operating System  
**מסמכי ייחוס:** `docs/visual-design-upgrade-plan.md`, `docs/conversion-messaging-strategy.md`

---

## 1. בעיות עיצוב מרכזיות (לפני)

1. **פיצול בהיר/כהה** — דף הבית cinematic כהה, עמודי שירות ו-hub כולם על רקע `#0b0f19`, בעוד projects/contact כבר היו בהירים — מעבר שבור בין עמודים.
2. **כרטיסים לא אחידים** — inline `glassCardStyle` ב-projects, `studio-hub-pillar` כהה, styles שונים בכל hub.
3. **גרדיאנטים ו-glow מוגזמים** — CTA cyan→violet, hover scale חזק, accent icons בהירים על רקע כהה.
4. **טיפוגרפיה** — חסר max-width עקבי לפרוזה; כותרות סקשן ללא hierarchy אחיד בין עמודי שירות.
5. **ריווחים** — padding סקשנים קיים אך כרטיסים פנימיים צפופים; CTA ללא מרווח מספיק במובייל.
6. **Navbar theme** — dark על כל `/services/*` גם כשגוף העמוד עבר לבהיר.
7. **טפסים** — classNames כפולים לשדות, focus states לא אחידים.
8. **סקשנים ייעודיים** — websites/automations/marketing/branding blocks עם `border-white/10`, `text-slate-100` — לא תואמים shell חדש.

---

## 2. מה שונה

### Design System (`app/globals.css`)
- עדכון `:root` tokens: navy/cyan, shadows רכים, `--prose-max`, `--premium-canvas`.
- מחלקות אחידות: `.premium-card` (+ `--interactive`, `--subtle`), `.section-container`, `.form-input`, `.link-underline`, `.focus-ring`, `.gradient-text--on-light`.
- Shell שירותים: `.studio-service-page` → canvas בהיר; `.studio-service-hero-zone` → פס hero navy.
- כרטיסי hub/process/CTA/project proof מותאמים לרקע בהיר.
- טיפוגרפיה: `text-display`, `text-section`, `text-lead`, eyebrow colors.

### עמודי שירות + Hub
- `StudioServiceTemplate` — hero navy band, גוף light עם `GlassPanel tone="light"`, טקסט slate-900/600.
- `app/services/page.tsx` — hero navy, body light, כרטיסי urgency/offerings מעודכנים.
- `lib/studio-shell.ts` — nav theme **light** לכל העמודים מלבד `/` (homepage).
- `PillarSectionNav` — sticky nav בהיר (white/90).

### סקשנים ייעודיים (light pass)
- `WebsitesSharedDeliverables`, `WebsitesFitTable`
- `AutomationsBeforeAfter`, `AutomationsUseCases`
- `MarketingProblemBlock`, `MarketingFlowBlock`
- `BrandingIntroBlocks`

### Projects
- `ProjectHubCard` — `.premium-card`
- `app/projects/page.tsx` — הסרת inline glass styles; trust cards + CTA block עם `.premium-card` ו-`CtaButton`.

### UI / Motion
- `PremiumCard.tsx` — wrapper אחיד לכרטיסים.
- `StaggerGroup.tsx` — stagger scroll reveal (מוכן לשימוש; לא נדרש wiring בכל grid כדי לא להעמיס).
- `CtaButton` — min-h 3rem, focus ring, hover עדין (scale 1.02), secondary נקי.
- `ContactForm` — `.form-input` אחיד.

### Homepage
- נשאר cinematic כהה (story-driven) — לא redesign מלא כדי לא לשבור את ה-funnel הקיים.
- tokens וכרטיסים (`premium-editorial-card`, `funnel-panel`) נשארים תואמים ל-dark story.

---

## 3. קבצים ששונו

| קובץ | סוג שינוי |
|------|-----------|
| `app/globals.css` | Design tokens + utility classes |
| `lib/studio-shell.ts` | Nav theme light מלבד homepage |
| `components/templates/StudioServiceTemplate.tsx` | Hero navy + body light |
| `app/services/page.tsx` | Hub light redesign |
| `components/ui/PillarSectionNav.tsx` | Light sticky nav |
| `components/ui/CtaButton.tsx` | CTA polish |
| `components/ui/ContactForm.tsx` | Form inputs unified |
| `components/ui/PremiumCard.tsx` | **חדש** |
| `components/motion/StaggerGroup.tsx` | **חדש** |
| `components/projects/ProjectHubCard.tsx` | Premium card |
| `app/projects/page.tsx` | Cards + CTA |
| `components/sections/websites/*` | Light theme |
| `components/sections/automations/*` | Light theme |
| `components/sections/digital-marketing/*` | Light theme |
| `components/sections/branding/*` | Light theme |
| `docs/visual-design-upgrade-plan.md` | **חדש** |
| `docs/visual-design-upgrade-report.md` | **חדש** |

---

## 4. קומפוננטות שאוחדו / שודרגו

| לפני | אחרי |
|------|------|
| inline `glassCardStyle` (projects) | `.premium-card` |
| `studio-hub-pillar` dark | `.premium-card` / `.studio-hub-pillar` light |
| classNames כפולים בטופס | `.form-input` |
| Reveal בלבד | + `StaggerGroup` (אופציונלי) |
| CTA scale 1.04 + glow | scale 1.02, shadow רך, focus ring |

---

## 5. אנימציות

- **קיימות ונשמרו:** `Reveal`, `PremiumReveal`, `ParallaxLayer`, typewriter (עם `prefers-reduced-motion`).
- **חדש:** `StaggerGroup` / `StaggerItem` — fade-up + stagger עדין לרשימות.
- **CtaButton:** magnetic/hover מופחת; לא scale חזק.
- **לא נוסף:** parallax כבד, bounce, random values, אנימציות שגורמות layout shift.

---

## 6. נגישות

- `prefers-reduced-motion` — נשמר ב-motion hooks ו-Framer.
- Focus states: `.focus-ring`, `CtaButton`, `.form-input`.
- Contrast: טקסט slate-900/600 על רקע בהיר; hero navy עם טקסט בהיר.
- Headings hierarchy לא שונה (SEO headings נשמרו).
- Alt text — לא נגע.
- FAB / navbar — לא שונה מבחינת מנגנון; mobile min-height לכפתורים 3rem.

---

## 7. ביצועים

- אין `Math.random` ב-render.
- Build static — 55 routes, ללא hydration errors.
- CSS utilities במקום inline styles רבים (projects) — פחות repaint.
- `StaggerGroup` client-only — לא wired בכל עמוד כדי לא להעמיס JS.
- Lucide icons לא מועברים מ-Server ל-Client ב-CTA (נמנע prerender error).

---

## 8. מובייל

- `.premium-card` padding אחיד `p-5 sm:p-6`.
- CTA `min-h-[3rem]` — touch target טוב.
- `WebsitesFitTable` — cards במקום טבלה במובייל.
- Marketing flow — wrap עם gap.
- Navbar mobile — theme light על עמודי שירות (קריא יותר).
- Homepage dark — CTA hero נשאר גבוה ב-viewport (לא שונה במהלך שדרוג זה).

---

## 9. Lint

**עבר** — 0 errors, 2 warnings קיימים (לא קשורים לשדרוג):
- `hooks/useRotatingTypewriter.ts` — unused var
- `lib/studio-shell.ts` — unused `_scrollY`

---

## 10. Build

**עבר** — `next build` הצליח, 55 static routes, TypeScript clean.

---

## 11. מה נשאר פתוח

1. **Homepage full polish** — cards/spacing בין סקשנים dark; אופציונלי ליישר spacing עם tokens חדשים בלי לשבור story.
2. **StaggerGroup wiring** — grids נבחרים (services urgency, projects) אם רוצים reveal נוסף.
3. **Project detail pages** (`/projects/[id]`) — עדיין dark-leaning; אפשר light pass עתידי.
4. **Footer / Navbar** — polish CSS-only מינימלי; אפשר fine-tune spacing.
5. **Testimonials / Pricing / Contact section** על homepage — dark by design; לבדוק contrast אם מוסיפים תוכן.
6. **Warnings lint** — ניקוי unused vars (לא חוסם).

---

## 12. המלצות להמשך

1. Light pass ל-`/projects/[id]` ו-`/contact` page shell (לא רק form).
2. Wire `StaggerGroup` ל-2–3 grids מרכזיים בלבד.
3. Visual QA ידני: mobile overflow, FAB vs CTA תחתון, hero navy contrast.
4. Lighthouse mobile על `/services` ו-`/services/websites` אחרי שינויי רקע.
5. איחוד `funnel-panel` / `premium-editorial-card` עם `.premium-card--subtle` variant אם רוצים פחות classNames.

---

**סיכום:** האתר עבר לשפה עיצובית אחידה «Premium Digital Operating System» — canvas בהיר, hero navy אסטרטגי, כרטיסים וטפסים מאוחדים, CTA נקי. דף הבית נשאר cinematic כהה. lint ו-build עוברים.
