# דוח ניקוי קוד מת — JT Solutions

**תאריך:** יוני 2026

---

## 1. מה נמחק

| קובץ | סיבה |
|------|------|
| `components/ui/GlassCard.tsx` | אין import |
| `components/ui/BentoCard.tsx` | אין import |
| `components/ui/SectionDivider.tsx` | אין import |
| `components/motion/HeroRotatingHeadline.tsx` | אין import |
| `components/motion/HeroTypewriterHeadline.tsx` | duplicate — בשימוש רק `components/hero/` |
| `components/motion/TypewriterHeadline.tsx` | re-export לא בשימוש |
| `components/sections/Proof.tsx` | אין import |
| `components/sections/ProofContent.tsx` | רק Proof.tsx |
| `components/sections/Services.tsx` | אין import |
| `components/sections/About.tsx` | אין import |
| `components/sections/CaseStudy.tsx` | אין import |
| `components/sections/ServicePage.tsx` | אין import |

**סה״כ:** 12 קבצים (~75KB)

---

## 2. מה לא נמחק ולמה

| קובץ / נתיב | סיבה |
|-------------|------|
| `components/hero/HeroTypewriterHeadline.tsx` | בשימוש ב-`HeroContent.tsx` (דף הבית) |
| `app/services/landing-pages/` וכו' | routes פעילים + 301 redirects |
| `lib/seo/legacy-redirects.ts` | נדרש ל-SEO |
| `lib/services-hub.ts` — `serviceHubPillars` | לא בשימוש בעמוד hub — נשאר לתאימות |
| `hooks/useRotatingTypewriter.ts` | בשימוש — warning lint בלבד |

---

## 3. קבצים עדיין חשודים

| קובץ | הערה |
|------|------|
| `hooks/useRotatingTypewriter.ts` | משתנה לא בשימוש — warning |
| `lib/studio-shell.ts` | `_scrollY` לא בשימוש — warning |
| `heroRotatingWords` ב-`lib/hero-content.ts` | לא קיים — כבר הוסר |

---

## 4. Lint / Build

| בדיקה | תוצאה |
|-------|--------|
| Lint | ✓ 0 שגיאות, 2 אזהרות |
| Build | ✓ אחרי כל המחיקות |
