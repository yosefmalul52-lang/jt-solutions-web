# דוח Foundation Fixes — JT Solutions

**תאריך:** 15 ביוני 2026  
**היקף:** תיקוני בסיס בלבד — ללא שינוי מבנה עמוד הבית, ללא redesign, ללא מחיקת קומפוננטות, ללא שינוי מנגנון הטופס.

**מסמכי ייחוס:** `docs/conversion-messaging-strategy.md`, `docs/site-audit-ux-ui-seo.md`

---

## 1. מה תוקן

### 1.1 CTA אחיד — «קבל אבחון דיגיטלי חינם»

עודכנו כפתורי המרה מרכזיים ב:

| מיקום | לפני | אחרי |
|-------|------|------|
| Hero (`lib/hero-content.ts`) | קבל אבחון דיגיטלי ללא התחייבות | קבל אבחון דיגיטלי חינם |
| Pricing (3 מסלולים) | מתאים לי / רוצה מעטפת / מערכת מורכבת | קבל אבחון דיגיטלי חינם (ברירת מחדל `CtaButton`) |
| טופס יצירת קשר | שליחת פנייה / קובעים שיחת התאמה | קבל אבחון דיגיטלי חינם |
| Hub שירותים (`/services`) | קובעים שיחת התאמה | קבל אבחון דיגיטלי חינם |
| תיק עבודות (`/projects`) | קובעים שיחת התאמה | קבל אבחון דיגיטלי חינם |
| בלוג (CTA בסוף מאמר) | קובעים שיחת התאמה | קבל אבחון דיגיטלי חינם |
| תפריט מובייל (Navbar) | קבל אבחון דיגיטלי | קבל אבחון דיגיטלי חינם |
| עמודי אזור (`/areas/*`) | יצירת קשר | קבל אבחון דיגיטלי חינם |
| תבנית שירות (Studio) | בואו נדבר / קבל אבחון דיגיטלי | ברירת מחדל אחידה |
| `CtaButton` default | קבלו אבחון דיגיטלי חינם | קבל אבחון דיגיטלי חינם |
| שיווק דיגיטלי — סקשן ליווי (`digital-marketing/page.tsx`) | רוצה ליווי שוטף | קבל אבחון דיגיטלי חינם |

**CTA שנשארו בנוסח אחר (מכוון):**

| נוסח | מיקום | סיבה |
|------|--------|------|
| צור קשר | ניווט ראשי (`lib/navigation.ts`) | קישור ניווט לעמוד `/contact`, לא CTA המרה |
| ראה עבודות לדוגמה | Hero secondary | ניווט לסקשן תיק עבודות |
| לכל השירותים והמסלולים | `HomeServices` (legacy, לא בדף הבית) | ניווט ל-hub שירותים |
| תיק עבודות | עמודי אזור (כפתור משני), Footer | ניווט לתוכן |
| שיחה ב-WhatsApp | Footer, FAB | ערוץ תקשורת ספציפי |
| שולח... | טופס (מצב שליחה) | מצב טעינה |
| `serviceSpecificCtaLabel` | `ProjectDetail` — כותרת מעל הכפתור | שאלה מותאמת לפרויקט; **הכפתור** אחיד |
| לצפייה בפרויקט | כרטיסי פרויקט בדף הבית | ניווט לקייס, לא בקשת ליד |

### 1.2 `CtaButton` — קישורים אמיתיים

`components/ui/CtaButton.tsx`:

- **עם `href` פנימי** (`/…`) → `Link` של Next.js
- **עם `href` חיצוני / hash** (`#contact`, `https://…`) → `<a>` / `motion.a`
- **בלי `href` או `type="submit"`** → `<button>`
- נשמרו: `className`, `variant`, `disabled`, `ctaLocation`, אנימציות, analytics

### 1.3 קישורים פנימיים ישנים

| קובץ | שינוי |
|------|--------|
| `lib/services-hub.ts` | כל ה-`href` ל-routes ישנים → עמודי תווך + anchor |
| `lib/seo/services.ts` | `servicePages[*].path` עודכן ל-anchors (בלוג, אזורים, 404) |

| ישן | חדש |
|-----|-----|
| `/services/landing-pages` | `/services/websites#landing` |
| `/services/business-websites` | `/services/websites#corporate` |
| `/services/ecommerce` | `/services/websites#ecommerce` |
| `/services/whatsapp-bot` | `/services/automations#whatsapp` |
| `/services/ai-automation` | `/services/automations#site-integration` |
| `/services/web-development` | `/services/automations#site-integration` |
| `/services/ad-infrastructure` | `/services/digital-marketing#full-funnel` |

Redirects ב-`lib/seo/legacy-redirects.ts` — **לא שונו**.

Canonical (`lib/seo/metadata.ts` → `toCanonicalPath`) — **מסיר hash** אוטומטית.

### 1.4 Sitemap

`app/sitemap.ts` — רק base URLs ללא hash:

- `/services/websites`, `/services/branding`, `/services/automations`, `/services/digital-marketing`
- אין כתובות עם `#` ב-sitemap

### 1.5 אמון ופרויקטים

| מיקום | שינוי |
|-------|--------|
| `heroTrustPillars` (הוסר/עודכן) | «20+ פרויקטים באוויר» → שורת אמון ללא מספר מנופח |
| סקשן Projects (דף הבית) | «עבודות נבחרות» + «פרויקטים לדוגמה» |
| `lib/projects-page.ts` | «עבודות נבחרות שבנו תשתית…» |

לא נוספו פרויקטים או מספרים מומצאים.

**הערה:** `ProofContent.tsx` (dead code) עדיין מכיל «20+ פרויקטים» — לא מחובר לאתר החי.

### 1.6 מובייל — תיקונים קטנים

| תיקון | קובץ |
|-------|------|
| `pb-28` בסקשן Contact — מניעת חפיפה עם FAB | `components/sections/Contact.tsx` |
| גודל מינימלי לכפתור וואטסאפ (3.25rem) + safe-area | `app/globals.css` |
| CTA ב-Hero: `w-full sm:w-auto` | `components/sections/HeroContent.tsx` |

לא נבנה Hero חדש ולא בוצע redesign.

### 1.7 Dead code — רשימה בלבד (לא נמחק)

| קובץ | סטטוס |
|------|--------|
| `components/motion/HeroTypewriterHeadline.tsx` | כפילות — לא מחובר |
| `components/motion/HeroRotatingHeadline.tsx` | לא בשימוש |
| `components/motion/CountUpValue.tsx` | לא מיובא |
| `components/sections/Proof.tsx` / `ProofContent.tsx` | לא מחובר לזרימה |
| `components/sections/Services.tsx` | לא מחובר לזרימה |
| `components/sections/About.tsx` | לא מחובר |
| `components/sections/CaseStudy.tsx` | לא מחובר |
| `components/sections/ServicePage.tsx` | לא מחובר |
| `components/sections/HomeServices.tsx` | לא בדף הבית הנוכחי |
| `components/ui/GlassCard.tsx`, `BentoCard.tsx`, `SectionDivider.tsx` | לא מיובאים |
| `hooks/useRotatingTypewriter.ts` | לא מיובא |
| `app/services/landing-pages/page.tsx` (+ 7 leaf pages) | קיימים — מופנים ב-301 |

---

## 2. קבצים ששונו

```
app/areas/[slug]/page.tsx
app/globals.css
app/manifest.ts
app/projects/page.tsx
app/services/digital-marketing/page.tsx
app/services/page.tsx
app/sitemap.ts
components/blog/BlogPostView.tsx
components/layout/Footer.tsx
components/layout/NavbarMenu.tsx
components/motion/CountUpValue.tsx
components/projects/ProjectDetail.tsx
components/sections/Contact.tsx
components/sections/HeroContent.tsx
components/sections/Pricing.tsx
components/sections/Projects.tsx
components/sections/ProofContent.tsx
components/templates/StudioServiceTemplate.tsx
components/ui/ContactForm.tsx
components/ui/CtaButton.tsx
lib/hero-content.ts
lib/seo/services.ts
lib/services-hub.ts
docs/foundation-fixes-report.md
```

---

## 3. בעיות שנשארו פתוחות

| עדיפות | נושא |
|--------|------|
| בינונית | פוטר — תיאור מותג כללי («אתרים ממירים…») |
| בינונית | ניווט «הוכחות» → `/#projects` (עובד; תווית לא תואמת יעד) |
| בינונית | `ProcessSection` — שני מבני DOM (desktop/mobile) נגישים לסריקה; לא overflow אמיתי |
| נמוכה | `ProofContent.tsx` — «20+» ב-dead code |
| נמוכה | ESLint warnings: `useRotatingTypewriter.ts`, `studio-shell.ts` |
| נמוכה | Cookie banner + FAB + EqualWeb — חפיפה אפשרית בפינות תחתונות |
| נמוכה | Preload `hero-mobile.webp` בכל העמודים |

**מחוץ להיקף Foundation (שלבים הבאים):** מבנה עמוד הבית, פישוט טופס, redesign, ניקוי dead code.

---

## 4. Lint

**עבר** — `npm run lint` עם **0 errors**.

אזהרות (לא חוסמות):

- `hooks/useRotatingTypewriter.ts` — `typeChars` לא בשימוש
- `lib/studio-shell.ts` — `_scrollY` לא בשימוש

---

## 5. Build

**עבר** — `npm run build` הושלם בהצלחה (Next.js 16).

---

## 6. השלב הבא המומלץ

1. **Homepage conversion** — לפי `docs/conversion-messaging-strategy.md` (כבר מיושם חלקית; לוודא עקביות ויזואלית Hero/גוף).
2. **פוטר וניווט** — יישור תוויות («הוכחות» / «פרויקטים») וקופי מותג.
3. **ניקוי dead code** — אחרי אימות שלא נדרש לשלב עתידי.
4. **Lighthouse mobile** — אימות ריווח Contact + FAB.
5. **QA מלא** — ראה `docs/final-qa-report.md`.
