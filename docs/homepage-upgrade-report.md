# דוח שדרוג עמוד הבית — JT Solutions

**תאריך:** 15 ביוני 2026  
**היקף:** עמוד הבית בלבד (`/`)  
**מסמכי ייחוס:** `docs/conversion-messaging-strategy.md`, `docs/site-audit-ux-ui-seo.md`, `docs/foundation-fixes-report.md`

---

## 1. מה שינית

### מבנה המסלול (10 סקשנים + טופס)

| # | סקשן | תוכן |
|---|------|------|
| 1 | **Hero** | גרסה א׳ מהאסטרטגיה — כותרת, תת־כותרת, CTA «קבל אבחון דיגיטלי חינם», «ראה עבודות לדוגמה», שורת אמון |
| 2 | **הזדהות** | 5 כרטיסי כאב — «אם זה נשמע מוכר…» |
| 3 | **בעיה** | כותרת + הסבר קצר על ניתוק בין אתר, פנייה ומעקב |
| 4 | **פתרון** | Flow: תנועה → אתר/דף → פנייה → וואטסאפ/CRM → מעקב → סגירה |
| 5 | **מה מקבלים בפועל** | 10 deliverables — תוצאה עסקית לפני טכנולוגיה |
| 6 | **עבודות נבחרות** | 3 קייסים: סוג עסק, בעיה, מה נבנה, תוצאה תפעולית |
| 7 | **תהליך** | אבחון → אפיון → בנייה → מדידה ושיפור |
| 8 | **מסלולים** | 3 מסלולים לפי מצב הלקוח |
| 9 | **FAQ** | 6 שאלות חובה + 2 משלימות |
| 10 | **CTA סופי + טופס** | «רוצה להבין מה נכון לעסק שלך?» + טופס קיים |

**לא בשימוש בעמוד הבית (נשארו בקוד):** Testimonials, HomeServices, Proof.

### שינויים בסבב הנוכחי

| אזור | שינוי |
|------|--------|
| **בעיה** | תת־כותרת מעודכנת: «מסר ברור, מדידה, CTA ותהליך מעקב» |
| **פתרון** | תת־כותרת: «…ויוכל להבין מה עובד»; flow אנכי במובייל (ללא scroll אופקי) |
| **Deliverables** | «GA4 + Meta Pixel» → «מדידה של מקורות פנייה» + הערת פרט קטנה; «הדרכה קצרה בסיום» |
| **מסלולים** | «GA4 + Meta Pixel» → «מדידת מקורות פנייה» |
| **תהליך** | שלב אפיון — «לפני שמתחילים לבנות» (במקום «שורת קוד») |
| **פרויקטים** | כותרת H2: «עבודות נבחרות» (ללא «20+») |
| **Hero מובייל** | spacer קטן יותר, CTA מוקדם יותר, microcopy מוסתר במובייל |

### Hero — מובייל ודסקטופ

- **דסקטופ:** typewriter, HeroFlowVisual, microcopy «שיחת התאמה…»
- **מובייל:** כותרת סטטית, תת־כותרת מקוצרת, CTA מוקדם, ללא typewriter, ללא flow visual

### עקרונות שנשמרו

- CTA אחיד: «קבל אבחון דיגיטלי חינם»
- ללא «20+ פרויקטים» וללא מספרים מומצאים
- מנגנון הטופס לא שונה
- עמודי שירות ופרויקטים פנימיים לא שונו

---

## 2. קבצים ששונו

```
lib/home-funnel.ts
lib/hero-content.ts
lib/home-projects.ts
components/hero/HeroTypewriterHeadline.tsx
components/sections/HeroContent.tsx
components/sections/IdentificationSection.tsx
components/sections/ProblemSection.tsx
components/sections/SolutionSection.tsx
components/sections/DeliverablesSection.tsx
components/sections/Projects.tsx
components/sections/ProcessSection.tsx
components/sections/Pricing.tsx
components/sections/HomeFaq.tsx
components/sections/Contact.tsx
app/(home)/page.tsx
docs/homepage-upgrade-report.md
```

*(רוב הקבצים עודכנו בסבבים קודמים; בסבב זה: `home-funnel`, `DeliverablesSection`, `Projects`, `HeroContent`, `SolutionSection`, דוח)*

---

## 3. חלקים שנשארו פתוחים

| נושא | הערה |
|------|------|
| פיצול ויזואלי Hero בהיר / גוף כהה | מכוון — story shell; לא redesign בשלב זה |
| FAQ — טווחי מחיר (4,500 / 8,500 ₪) | קיימים באתר (contact + FAQ); לא הומצאו בסבב זה |
| טופס — 7 שדות vs «אבחון קצר» | מחוץ להיקף — לא שונה מנגנון |
| Preload `hero-mobile.webp` בכל העמודים | נושא layout גלובלי |
| ProcessSection — שני DOM (desktop/mobile) | `hidden`/`lg:hidden` — תקין visually |

---

## 4. Lint

**עבר** — `npm run lint` עם **0 errors** (2 warnings קיימים ב-dead code).

---

## 5. Build

**עבר** — `npm run build` הושלם בהצלחה.

---

## 6. בעיות UX/UI להמשך

- **Hero / גוף:** רקע בהיר ב-Hero וסקשנים כהים — לשקול יישור עדין בעתיד
- **FAB + Cookie + EqualWeb:** לבדוק חפיפה בפינה התחתונה במובייל אחרי שינויי Contact
- **Parallax בכרטיסי פרויקט:** לשקול `prefers-reduced-motion` / כיבוי במובייל אם מורגש כבד
- **Typewriter בדסקטופ:** ~5 שניות עד CTA מלא — מקובל בדסקטופ; במובייל כבר סטטי

---

## 7. השלב הבא המומלץ

1. **פישוט טופס** — «מה הכי דחוף?» לפי האסטרטגיה (בלי לשנות API)
2. **CTA דביק במובייל** — אופציונלי, אחרי בדיקת Lighthouse
3. **עמודי שירות** — יישור קופי לפי אותה שפה עסקית
4. **Lighthouse mobile** על `/` — אימות overflow, FAB, LCP
5. **QA מלא** — ראה `docs/final-qa-report.md`
