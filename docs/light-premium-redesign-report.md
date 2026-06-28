# דוח Light Premium Redesign — JT Solutions

**תאריך:** 26 ביוני 2026  
**כיוון:** Light Premium Digital Studio  
**מסמכי ייחוס:** `docs/conversion-messaging-strategy.md`, `docs/pre-light-redesign-git-status.md`

---

## 1. מה הבעיה בעיצוב הקודם

- `body` גלובלי כהה (`#05060A`) + `themeColor` כהה
- `studio-shell.ts` החזיר `dark` לכל העמודים
- דף הבית: `HomepageBackgroundStory` + `homepage-story-shell` — רקע cinematic כהה על כל ה-funnel
- סקשני בית עם `premium-*-dark`, glass כהה, `text-white`
- Navbar/Footer כהים
- עמודי שירות, פרויקטים, contact — `DarkPageShell` + כרטיסי glass כהה
- CTA לבן על רקע כהה (התאים ל-dark, לא ל-light)

---

## 2. מה שונה בפועל

### שפה עיצובית גלובלית

| אלמנט | לפני | אחרי |
|--------|------|------|
| רקע body | `#05060A` | `#F8FAFC` |
| טקסט | לבן / slate בהיר | `#0F172A` / `#334155` / `#64748B` |
| כרטיסים | glass כהה | `bg-white`, `border-slate-200`, shadow עדין |
| CTA ראשי | לבן על כהה | `bg-slate-950 text-white` |
| CTA משני | glass כהה | לבן + border slate |
| Navbar | `nav-shell--dark` | `nav-shell--light` (תמיד) |
| Footer | gradient כהה | לבן + border slate |

### דף הבית

- הוסר `HomepageBackgroundStory`
- shell: `homepage-light-shell` + `homepage-light-content`
- כל 10 הסקשנים נשמרו; עברו ל-`home-section`, `home-card`, `home-headline`
- Hero: H1 סטטי (`HomeHeroHeadline`), flow card בהיר (`HomeHeroFlowCard`), `HomeCtaButton`
- ללא typewriter ארוך; ללא parallax בפרויקטים
- Solution flow: grid 4 עמודות — ללא scroll אופקי

### עמודי שירות

- `StudioServiceTemplate`: `GlassPanel tone="light"`, טקסט slate, borders בהירים
- Hub `/services`: hero כחול בהיר, כרטיסים לבנים
- `PillarSectionNav`: sticky nav לבן
- סקשנים ייעודיים (websites, automations, marketing, branding): עודכנו ל-light

### פרויקטים ו-contact

- `LightPageShell` במקום `DarkPageShell`
- כרטיסי פרויקט לבנים (`ProjectHubCard`, `Projects` section)
- טופס: `variant="section"` + `home-contact-form` — inputs לבנים

---

## 3. קבצים ששונו (עיקריים)

```
docs/pre-light-redesign-git-status.md (חדש)
docs/light-premium-redesign-report.md (חדש)
app/layout.tsx
app/globals.css
app/(home)/page.tsx
lib/studio-shell.ts
components/layout/LightPageShell.tsx (חדש)
components/layout/Navbar.tsx
components/layout/Footer.tsx
components/sections/Hero.tsx
components/sections/HeroContent.tsx
components/sections/IdentificationSection.tsx
components/sections/ProblemSection.tsx
components/sections/SolutionSection.tsx
components/sections/DeliverablesSection.tsx
components/sections/Projects.tsx
components/sections/ProcessSection.tsx
components/sections/Pricing.tsx
components/sections/HomeFaq.tsx
components/sections/HomeFaqAccordion.tsx
components/sections/Contact.tsx
components/ui/CtaButton.tsx
components/ui/FaqAccordion.tsx
components/ui/PillarSectionNav.tsx
components/studio/StudioPanel.tsx
components/templates/StudioServiceTemplate.tsx
components/projects/ProjectHubCard.tsx
components/projects/ProjectDetail.tsx
app/services/page.tsx
app/projects/page.tsx
app/contact/page.tsx
app/about/page.tsx
app/blog/page.tsx
app/not-found.tsx
app/privacy-policy/page.tsx
app/accessibility/page.tsx
app/areas/[slug]/page.tsx
components/sections/websites/*
components/sections/automations/*
components/sections/digital-marketing/*
components/sections/branding/*
```

---

## 4. איפה הוסרו רקעים כהים

| מיקום | שינוי |
|--------|--------|
| `app/layout.tsx` body | `#05060A` → `#F8FAFC` |
| `app/(home)/page.tsx` | הוסר `HomepageBackgroundStory` |
| כל סקשני בית | `homepage-story-section` → `home-section` |
| `studio-service-page` / hero zone | gradient כחול בהיר |
| `studio-footer` | לבן |
| `dark-page-shell` | alias ל-light (`#F8FAFC`) |
| עמודי legal / areas / 404 | `bg-[#05060A]` → `#F8FAFC` |

---

## 5. סקשנים בדף הבית — כולם קיימים

| # | סקשן | סטטוס |
|---|------|--------|
| 1 | Hero | ✅ |
| 2 | הזדהות | ✅ |
| 3 | בעיה | ✅ |
| 4 | פתרון/Flow | ✅ |
| 5 | מה מקבלים | ✅ |
| 6 | עבודות נבחרות | ✅ |
| 7 | תהליך | ✅ |
| 8 | מסלולים | ✅ |
| 9 | FAQ | ✅ |
| 10 | CTA + טופס | ✅ |

---

## 6. מצב `/services`

- Hero בהיר עם gradient `#EEF6FF`
- כרטיסי urgency ו-offerings לבנים
- CTA block כחול בהיר (`studio-cta-block`)
- קישורי SEO ל-anchors נשמרו

---

## 7. מצב `/projects`

- `LightPageShell` + hero בהיר
- `ProjectHubCard` — כרטיסים לבנים
- trust block + CTA — `home-card`

---

## 8. מצב `/contact`

- Hero בהיר + 3 כרטיסי פרטי קשר לבנים
- טופס לבן (`ContactForm variant="section"`)
- FAQ תחתון בכרטיסים לבנים

---

## 9. Lint

**עבר** — 0 errors, 4 warnings (קיימים: `scrollY` ב-Navbar, `useRotatingTypewriter`, פרמטרים ב-`studio-shell`)

---

## 10. Build

**עבר** — Next.js 16.2.9, 55 routes static, TypeScript clean.

---

## 11. CSS ישן לא מחובר (דווח, לא נמחק)

| קובץ / class | הערה |
|--------------|------|
| `components/motion/HomepageBackgroundStory.tsx` | לא מיובא יותר לדף הבית |
| `components/layout/DarkPageShell.tsx` | לא בשימוש (הוחלף ב-`LightPageShell`) |
| `.homepage-story-shell`, `.homepage-background-story` ב-`globals.css` | legacy — לא מחובר ל-shell הנוכחי |
| `.homepage-light-*` ב-CSS | **מחובר** — בשימוש פעיל |
| `components/home/*` | **מחובר** — Hero, CTA, flow card |

---

## 12. מה נשאר לבדיקה ידנית

- [ ] Hero במובייל — CTA מוקדם, flow card מתחת לטקסט
- [ ] גלילה רציפה בדף הבית — 10 סקשנים, ללא קפיצות
- [ ] FAB WhatsApp + EqualWeb — לא חוסמים CTA תחתון
- [ ] טופס E2E בדפדפן (API לא שונה)
- [ ] Lighthouse mobile אחרי deploy
- [ ] `BlogPostView` — לבדוק קריאות prose
- [ ] commit + deploy

---

**סיכום:** האתר עבר לשפה בהירה אחידה. קופי, routes, redirects ו-API טופס לא שונו. lint ו-build עוברים.
