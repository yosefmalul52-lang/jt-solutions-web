# תוכנית עיצוב Dark Premium — JT Solutions

**תאריך:** יוני 2026  
**מקור השראה:** Hero cinematic `#05060A`  
**ייחוס:** `docs/conversion-messaging-strategy.md`

---

## 1. בעיות נוכחיות

| # | בעיה |
|---|------|
| 1 | body ועמודי משנה עדיין `#F9FAFB` — קפיצה מה-homepage הכהה |
| 2 | עמודי שירות עברו ל-light canvas — לא תואם Hero חדש |
| 3 | `.premium-card` לבן — לא glass |
| 4 | CTA gradient cyan — לא pill לבן כמו Hero |
| 5 | Navbar light על `/services/*` |
| 6 | FaqAccordion / טפסים light |
| 7 | tokens כפולים (premium-* vs dark) |

---

## 2. כיוון עיצובי

**Premium Digital Operating System — Dark**

- רקע: `#05060A` / `#080A12`
- טקסט: white / white@68% / white@48%
- Glass: `rgba(255,255,255,0.04)` + border `white/10`
- Accents: cyan / violet / indigo — עדין בלבד
- Buttons: pill — primary לבן, secondary glass
- Cards: `rounded-3xl`, hover `white/20`

**קופי:** נשאר לפי conversion strategy — לא קופי Hero לדוגמה.

---

## 3. קבצים לשינוי

### Tokens & Global
- `app/globals.css` — tokens, cards, sections, forms, surfaces
- `app/layout.tsx` — body dark, themeColor

### Layout / UI
- `lib/studio-shell.ts` — nav תמיד dark
- `components/ui/CtaButton.tsx` — pill white/glass
- `components/layout/DarkPageShell.tsx` — **חדש**
- `components/layout/Navbar.tsx` — polish

### Hero
- `lib/hero-content.ts`, `Hero.tsx`, `HeroContent.tsx`, `HeroTypewriterHeadline.tsx`

### Pages
- `app/services/page.tsx`, `app/projects/page.tsx`, `app/contact/page.tsx`
- `app/about/page.tsx`, `app/blog/page.tsx`, legal pages

### Templates & Sections
- `StudioServiceTemplate.tsx`, section components, `FaqAccordion`, `ContactForm`, `PillarSectionNav`, `ProjectHubCard`

---

## 4. סיכונים

- Contrast על טקסט muted — לבדוק WCAG
- OG/themeColor — לעדכן ל-#05060A
- Lucide Server→Client — לא להעביר icons ל-CtaButton מ-Server

---

## 5. ביצועים ונגישות

- רקע CSS — ללא canvas JS
- prefers-reduced-motion — נשמר
- אין Math.random ב-render
- typewriter סטטי במובייל
