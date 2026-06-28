# דוח Redesign בהיר — דף הבית

**תאריך:** יוני 2026  
**כיוון:** Light Premium Digital Studio  
**תוכנית:** `docs/homepage-light-redesign-plan.md`

---

## 1. מה היה מבולגן לפני

- רקע cinematic כהה (`HomepageBackgroundStory`, `#05060A`)
- Hero כהה עם typewriter, pills כהים, ללא flow card ברור
- סקשנים עם glass כהה, glow, parallax בפרויקטים
- `ProblemSection` כפול מול כרטיסי הזדהות
- Solution flow עם overflow אופקי בדסקטופ
- Navbar dark, CTA pill לבן/שחור (סגנון dark)
- כרטיסי pricing/process/projects לא אחידים

---

## 2. מה שונה בעיצוב

| אזור | שינוי |
|------|--------|
| Shell | `homepage-light-shell` — `#F9FAFB`, ללא רקע כהה |
| Hero | בהיר, grid עדין, H1 סטטי, flow card (תנועה→CRM→מעקב), `HomeCtaButton` |
| Navbar | light על `/` בלבד |
| סקשנים | `.home-section`, `.home-card`, typography אחיד |
| Identification | כרטיסים לבנים, 5 pain points |
| Solution | grid 3 עמודות, ללא scroll אופקי |
| Deliverables | grid נקי 10 פריטים |
| Projects | 3 כרטיסים לבנים אחידים, ללא parallax |
| Process | 4 cards / timeline mobile |
| Pricing | light pricing cards + `HomeCtaButton` |
| FAQ | accordion לבן |
| Contact | רקע `#EEF6FF` עדין, טופס עם inputs בהירים |
| ProblemSection | **הוסר** מהעמוד (כפילות) |

---

## 3. קבצים ששונו

- `app/(home)/page.tsx`
- `app/globals.css` — block `.homepage-light-*`, `.home-*`
- `lib/studio-shell.ts`, `lib/hero-content.ts`
- `components/home/HomeCtaButton.tsx`, `HomeHeroFlowCard.tsx`, `HomeHeroHeadline.tsx`
- `components/sections/Hero.tsx`, `HeroContent.tsx`
- `components/sections/IdentificationSection.tsx`, `SolutionSection.tsx`, `DeliverablesSection.tsx`, `Projects.tsx`, `ProcessSection.tsx`, `Pricing.tsx`, `HomeFaq.tsx`, `HomeFaqAccordion.tsx`, `Contact.tsx`
- `docs/homepage-light-redesign-plan.md`, `docs/homepage-light-redesign-report.md`

**לא שונו:** עמודי שירות, projects hub, contact standalone, API, routes.

---

## 4. אנימציות

| הוסר | נשמר |
|------|------|
| Typewriter ב-Hero | PremiumReveal fade/rise |
| Parallax בפרויקטים | Stagger במסלולים |
| Glow כבד / timeline gradient | FAQ smooth open |
| | prefers-reduced-motion |

---

## 5. מובייל

- Hero ללא `100vh` — CTA אחרי כותרת + subline
- Flow card אנכי מתחת לטקסט (grid → column)
- Solution flow — grid 1 col
- Process — timeline אנכי
- כרטיסים עם padding נדיב, ללא horizontal scroll

---

## 6. Lint

**עבר** — 0 errors (2 warnings קיימים לא קשורים).

---

## 7. Build

**עבר** — 55 routes.

---

## 8. בדיקה ידנית מומלצת

- [ ] Hero + flow card ב-375px / 768px
- [ ] contrast טקסט slate-600 על `#F9FAFB`
- [ ] FAB WhatsApp לא מסתיר submit
- [ ] Footer dark → מעבר מ-homepage בהיר (מכוון)
