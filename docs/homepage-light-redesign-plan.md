# תוכנית Redesign בהיר — דף הבית בלבד

**תאריך:** יוני 2026  
**כיוון:** Light Premium Digital Studio

---

## 1. בעיות בדף הבית הנוכחי

| # | בעיה |
|---|------|
| 1 | רקע cinematic כהה (`#05060A`) + `HomepageBackgroundStory` — לא מתאים לכיוון בהיר |
| 2 | Hero כהה, pills כהים, typewriter — כבד ולא מקצועי |
| 3 | סקשנים עם `premium-*-dark` + glass כהה — לא אחיד |
| 4 | כרטיסי פרויקט/pricing/process כהים עם glow |
| 5 | `ProblemSection` חופף חלקית ל-Identification |
| 6 | Solution flow עם גלילה אופקית בדסקטופ |
| 7 | Navbar dark על דף הבית |
| 8 | CTA pill לבן/שחור (גלובלי dark) — לא מתאים ל-Hero בהיר |

---

## 2. כיוון חדש

- רקע `#F8FAFC` / `#F9FAFB`, כרטיסים לבנים, border `slate-200`
- טיפוגרפיה: `#0F172A` / `#475569`
- accent: `#0EA5E9` / `#0284C7` — עדין
- Hero: grid עדין, H1 סטטי, flow card בהיר (תנועה→פנייה→CRM→מעקב)
- CTA: primary `slate-900`, secondary לבן עם border
- אנימציות: fade-up / stagger בלבד — ללא typewriter, parallax, glow

---

## 3. קומפוננטות לשינוי

- `app/(home)/page.tsx` — shell בהיר, הסרת ProblemSection
- `lib/studio-shell.ts` — nav light על `/`
- `lib/hero-content.ts` — H1 עם em dash
- `app/globals.css` — `.homepage-light-*`, `.home-card`, `.home-hero`
- `Hero.tsx`, `HeroContent.tsx`, `HomeHeroFlowCard.tsx`, `HomeHeroHeadline.tsx`, `HomeCtaButton.tsx`
- כל `components/sections/*` שבדף הבית
- `HomeFaqAccordion.tsx`, `Contact.tsx` (surface=story בלבד)

---

## 4. מה לא נוגעים בו

- עמודי שירות, projects hub, contact page standalone
- API טופס, routes, SEO metadata (מלבד H1 קיים)
- `CtaButton` גלובלי, Footer, Navbar structure

---

## 5. איך נבדוק הצלחה

- [ ] אין רקע כהה גדול בדף הבית
- [ ] Hero: CTA מוקדם במובייל
- [ ] כרטיסים לבנים אחידים
- [ ] flow אנכי במובייל, ללא horizontal scroll
- [ ] lint + build עוברים
