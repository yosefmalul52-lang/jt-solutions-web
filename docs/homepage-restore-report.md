# דוח שחזור דף הבית — JT Solutions

**תאריך:** 15 ביוני 2026  
**מטרה:** החזרת דף הבית למצב תקין אחרי redesign בהיר אגרסивי — **ללא שיפורי עיצוב נוספים**

**מסמכי ייחוס:** `docs/homepage-upgrade-report.md`, `docs/homepage-light-redesign-report.md`, `docs/final-qa-report.md`

---

## 1. מה נשבר

בסבב **Light Premium Redesign** (`docs/homepage-light-redesign-report.md`):

| בעיה | פירוט |
|------|--------|
| **Hero חלקי** | הוחלף ב-`HomeHeroHeadline` סטטי + `HomeHeroFlowCard`; נעלמו typewriter, `HeroFlowVisual`, `CtaButton` המקוריים |
| **ProblemSection הוסר** | הוסר מ-`app/(home)/page.tsx` בטענה של כפילות |
| **רקע cinematic** | `HomepageBackgroundStory` הוסר; shell שונה ל-`homepage-light-shell` |
| **סקשנים שוכתבו** | כל הסקשנים עברו ל-`.home-*` classes בהירים — parallax, glass כהה, flow visual ועוד |
| **Contact** | גרסת story (דף הבית) הוחלפה בעיצוב בהיר שונה מהמסלול |

מבנה ה-funnel מ-`homepage-upgrade` **לא היה ב-git commit** (commit אחרון: מבנה ישן עם Services/Proof/Testimonials). השחזור בוצע **ידנית** מתוך דוחות + קוד שוחזר, לא `git checkout`.

---

## 2. קבצים ששוחזרו

| קובץ | פעולה |
|------|--------|
| `app/(home)/page.tsx` | כל 10 הסקשנים + `HomepageBackgroundStory` + `homepage-story-shell` |
| `components/sections/Hero.tsx` | רקע בהיר `#F9FAFB`, `hero-grid` |
| `components/sections/HeroContent.tsx` | badge, typewriter, CTAs, trust line, `HeroFlowVisual` (md+) |
| `components/hero/HeroTypewriterHeadline.tsx` | כותרת typewriter / סטטית במובייל |
| `components/sections/IdentificationSection.tsx` | גרסת cinematic/story |
| `components/sections/ProblemSection.tsx` | לא נדרש שינוי — היה שלם |
| `components/sections/SolutionSection.tsx` | גרסת upgrade |
| `components/sections/DeliverablesSection.tsx` | גרסת upgrade |
| `components/sections/Projects.tsx` | parallax + layout featured |
| `components/sections/ProcessSection.tsx` | גרסת upgrade |
| `components/sections/Pricing.tsx` | מסלולים (3 pathways) |
| `components/sections/HomeFaq.tsx` | FAQ homepage |
| `components/sections/HomeFaqAccordion.tsx` | accordion story mode |
| `components/sections/Contact.tsx` | story surface — glass panel + form `variant="glass"` |
| `lib/studio-shell.ts` | nav כהה על `/` |

**לא נמחקו (יתומים, לא בשימוש):**  
`components/home/HomeCtaButton.tsx`, `HomeHeroFlowCard.tsx`, `HomeHeroHeadline.tsx`  
**CSS יתום (לא מחובר):** `.homepage-light-shell`, `.home-*` ב-`app/globals.css`

---

## 3. סקשנים שחזרו

מבנה `app/(home)/page.tsx` לאחר שחזור:

```
Hero → הזדהות → בעיה → פתרון/Flow → מה מקבלים → עבודות נבחרות → תהליך → מסלולים → FAQ → CTA + טופס
```

| # | סקשן | קומפוננטה | סטטוס |
|---|------|-----------|--------|
| 1 | Hero | `Hero` | ✅ |
| 2 | הזדהות | `IdentificationSection` | ✅ |
| 3 | בעיה | `ProblemSection` | ✅ |
| 4 | פתרון/Flow | `SolutionSection` | ✅ |
| 5 | מה מקבלים | `DeliverablesSection` | ✅ |
| 6 | עבודות נבחרות | `Projects` | ✅ |
| 7 | תהליך | `ProcessSection` | ✅ |
| 8 | מסלולים | `Pricing` | ✅ |
| 9 | FAQ | `HomeFaq` | ✅ |
| 10 | CTA + טופס | `Contact` | ✅ |

---

## 4. Hero — האם חזר

| אלמנט | סטטוס | מקור |
|-------|--------|------|
| Badge | ✅ | `heroCopy.badge` |
| H1 (שורה 1 + 2) | ✅ | `HeroTypewriterHeadline` — typewriter בדסקטופ, סטטי במובייל |
| תת־כותרת | ✅ | `subline` / `sublineMobile` |
| CTA ראשי «קבל אבחון דיגיטלי חינם» | ✅ | `#contact` |
| CTA משני «ראה עבודות לדוגמה» | ✅ | `#projects` |
| Visual / Flow | ✅ | `HeroFlowVisual` — `hidden md:block` |
| שורת אמון + microcopy | ✅ | `trustLine`, `microcopy` (microcopy מוסתר במובייל לפי upgrade) |

---

## 5. האם כל דף הבית מוצג (בדיקת קוד)

- ✅ `HomepageBackgroundStory` — רקע cinematic
- ✅ `homepage-story-shell` + `homepage-story-content`
- ✅ כל 10 הסקשנים מיובאים ומוצגים ב-JSX
- ✅ `Navbar` + `Footer` עוטפים את העמוד
- ✅ JSON-LD FAQ (`getHomeFaqJsonLd`)

---

## 6. Lint

```
npm run lint
```

| תוצאה | פירוט |
|-------|--------|
| **עבר** | 0 errors |
| אזהרות | 2 (לא קשורות לדף הבית): `useRotatingTypewriter.ts`, `studio-shell.ts` |

---

## 7. Build

```
npm run build
```

| תוצאה | פירוט |
|-------|--------|
| **עבר** | Next.js 16.2.9 — compile + TypeScript + 55 routes |
| `/` | Static prerender ✅ |

---

## 8. מה עדיין דורש בדיקה ידנית

- [ ] **Hero במובייל** — כותרת סטטית, CTA גלוי מוקדם, ללא flow visual
- [ ] **Hero בדסקטופ** — typewriter + `HeroFlowVisual` מוצגים ולא חופפים לטקסט
- [ ] **גלילה רציפה** — כל 10 הסקשנים נראים בסדר, ללא קפיצות layout
- [ ] **ProblemSection** — מופיע אחרי הזדהות (לא כפילות מבלבלת)
- [ ] **Solution flow** — ללא scroll אופקי במובייל
- [ ] **Projects** — 3 קייסים + קישור לעמוד פרויקטים
- [ ] **Contact** — טופס story (`variant="glass"`) על רקע cinematic
- [ ] **Navbar** — nav כהה/שקוף על רקע story
- [ ] **Reduced motion** — אנימציות מכובות כשצריך
- [ ] **Lighthouse / CLS** — לא נבדק בסבב זה

---

## 9. מה לא בוצע (בכוונה)

- ❌ שיפורי עיצוב נוספים
- ❌ מחיקת קומפוננטות light redesign
- ❌ ניקוי CSS `.homepage-light-*` מ-`globals.css`
- ❌ שינוי עמודי שירות, API, routes

---

**סיכום:** דף הבית שוחזר למבנה funnel מ-`homepage-upgrade`. Hero מלא. כל הסקשנים קיימים בקוד. Lint ו-build עברו.
