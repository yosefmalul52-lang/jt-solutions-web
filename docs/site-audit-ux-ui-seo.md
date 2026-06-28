# דוח ביקורת אתר — UX, UI, SEO והמרה

**פרויקט:** JT Solutions (jt-solutions-site)  
**דומיין:** https://www.jt-solutions.org  
**תאריך:** יוני 2026  
**מקור:** ביקורת מתוך הקוד, מבנה הפרויקט, תוכן ו-lib — ללא שינוי קוד.

**מסמכי ייחוס:** `docs/conversion-messaging-strategy.md`

---

## 1. סקירת מבנה הפרויקט

### טכנולוגיה

| שכבה | טכנולוגיה |
|------|-----------|
| Framework | Next.js 16.2.9 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| אנימציות | Framer Motion 12 |
| טפסים | react-hook-form + Zod 4 |
| אימייל | Nodemailer + webhook n8n |
| אנליטיקס | GA4 (אחרי הסכמה), Meta Pixel |
| נגישות | EqualWeb |
| גופן | Heebo (Google Fonts) |

### מיקומי קבצים מרכזיים

| סוג | מיקום |
|-----|--------|
| עמודים | `app/**/page.tsx` |
| קומפוננטות | `components/sections/`, `components/ui/`, `components/hero/` |
| עיצוב | `app/globals.css`, `lib/premium-visual.ts` |
| תוכן/קופי | `lib/hero-content.ts`, `lib/home-funnel.ts`, `lib/projects.ts`, `lib/seo/` |
| ניווט | `lib/navigation.ts` |
| טפסים | `components/ui/ContactForm.tsx`, `lib/validation/contact.ts` |

### כפילויות וקבצים לא בשימוש

- `components/hero/HeroTypewriterHeadline.tsx` — פעיל ב-Hero
- `components/motion/HeroTypewriterHeadline.tsx` — כפילות, API שונה, לא מחובר
- `components/motion/HeroRotatingHeadline.tsx` — לא בשימוש
- `components/sections/Proof.tsx`, `Services.tsx`, `About.tsx`, `CaseStudy.tsx`, `ServicePage.tsx` — לא מחוברים לזרימה הנוכחית
- `components/ui/GlassCard.tsx`, `BentoCard.tsx`, `SectionDivider.tsx` — לא מיובאים
- 8 עמודי שירות leaf (`landing-pages`, `ai-automation` וכו׳) — קיימים בקוד אך מופנים ב-301 לעמודי תווך

---

## 2. מפת עמודים

| Route | מטרה | CTA מרכזי | עדיפות תיקון |
|-------|------|-----------|--------------|
| `/` | מכירה + לידים — Story Funnel | אבחון דיגיטלי | בינונית |
| `/services` | Hub 4 עמודי תווך | שיחת התאמה | בינונית |
| `/services/websites`, `branding`, `automations`, `digital-marketing` | שירותים pillar | אבחון דיגיטלי | נמוכה |
| `/services/*` (8 leaf) | מופנים 301 ל-pillar+anchor | — | גבוהה (קישורים פנימיים) |
| `/projects` | תיק עבודות (3 פרויקטים) | שיחת התאמה | בינונית |
| `/projects/[id]` | Case study | CTA ליצירת קשר | נמוכה |
| `/contact` | טופס + פרטי קשר | שליחת טופס | נמוכה |
| `/about` | אמון + יוסף מלול | אבחון דיגיטלי | נמוכה |
| `/blog` + 14 מאמרים | SEO זנב ארוך | — | נמוכה |
| `/areas/[slug]` (10 עמודים) | SEO מקומי | יצירת קשר | בינונית |
| `/privacy-policy`, `/accessibility` | משפטי | — | נמוכה |

---

## 3. ביקורת UX

| נושא | ממצא |
|------|------|
| הבנה תוך 5 שניות | חלקית — מסר קיים, typewriter מאט |
| Hero ממיר | CTA חזק; subline ארוכה; flow מוסתר במובייל |
| עומס קוגניטיבי | גבוה — 10 סקשנים בדף הבית |
| זרימה עד פנייה | ארוכה; אין CTA דביק במובייל |
| עקביות CTA | חלשה — 4+ ניסוחים שונים |
| טופס | 7 שדות — לא «אבחון» קצר |
| אמון | «20+ פרויקטים» מול 3 קייסים — פער אמון |
| פרויקטים | תוכן עשיר; מעט case studies |

---

## 4. ביקורת UI

- **פיצול ויזואלי:** Hero בהיר (`#F9FAFB`) מול גוף דף הבית כהה (`#05060a`)
- **היררכיה:** H1 יחיד ב-Hero — תקין
- **גרדיאנטים:** מרובים בסקשנים כהים — מעבר לאסטרטגיה המינימלית
- **כרטיסים:** מספר סגנונות (glass, studio, premium) — עקבי בתוך עמוד, לא בין עמודים
- **רדיוסים:** 14px — מקצועי

---

## 5. ביקורת מובייל

| נושא | ממצא |
|------|------|
| Hero | `100svh` — CTA מתחת ל-typewriter + subline |
| HeroFlowVisual | מוסתר <768px |
| כפתורים | `w-full` — טוב |
| FAB | WhatsApp שמאל + EqualWeb ימין |
| גלילה | 10 סקשנים — עומס |

---

## 6. ביקורת נגישות

- Hero typewriter: `sr-only` + `aria-hidden` על הוויזואל — **טוב**
- `CtaButton` עם `href` מרונדר כ-`<button>` — **בעיה**
- EqualWeb + WhatsApp בתחתית — עלול לחסום פינות
- Lighthouse Accessibility (מובייל, 14.6.2026): **97**

---

## 7. ביקורת SEO

| נושא | סטטוס |
|------|--------|
| metadata + canonical | תקין (`createPageMetadata`) |
| JSON-LD | Organization, FAQ, Service, Blog, Projects |
| sitemap | **בעיה:** URLs עם hash (`/services/websites#landing`) |
| robots | תקין |
| redirects ישנים | 301 מוגדרים ב-`legacy-redirects.ts` |
| קישורים פנימיים | עדיין מצביעים ל-URLs מופנים ב-`services-hub.ts` |

---

## 8. ביקורת ביצועים

| מדד (Lighthouse mobile, 14.6.2026) | ציון |
|-------------------------------------|------|
| Performance | 84 |
| Accessibility | 97 |
| Best Practices | 96 |
| SEO | 100 |

- Framer Motion + dynamic imports לסקשנים — חלקי
- EqualWeb נטען בדחייה — טוב
- Hydration ב-HeroFlowVisual — תוקן (ערכים דטרמיניסטיים)

---

## 9. המלצות לפי עדיפות

### דחוף
1. איחוד ניסוחי CTA בכל האתר
2. תיקון קישורים פנימיים ל-pillar (לא URLs מופנים)
3. תיקון sitemap — הסרת hash URLs
4. `CtaButton` → `<a>` כשיש href
5. הסרת/החלפת «20+ פרויקטים» — «עבודות נבחרות»

### חשוב
6. קיצור דף הבית / מיזוג סקשנים
7. CTA דביק במובייל
8. אחידות רקע Hero + גוף
9. מחיקת dead code (leaf pages, קומפוננטות מתות)
10. יישום אסטרטגיית `conversion-messaging-strategy.md`

### שיפורי המרה
- טופס «אבחון» קצר (שם, טלפון, מה דחוף)
- מחיר התחלתי visible (מ-FAQ: מ־4,500₪ / 8,500₪)
- עוד case studies או צמצום טענות

### SEO
- BreadcrumbList לעמודי שירות
- בדיקת אינדוקס ב-Search Console

### נגישות
- focus visible על כל CTA
- בדיקת מקלדת Navbar mobile

### ביצועים
- Performance 84 → 90+
- דחיית EqualWeb עד אינטראקציה

---

## 10. תוכנית עבודה מדורגת

| שלב | תוכן |
|-----|------|
| 1 | תיקוני בסיס: CTA, קישורים, sitemap, אמון |
| 2 | דף הבית: Hero, הזדהות, flow, קיצור |
| 3 | עמודי שירות: קופי עסקי, anchors |
| 4 | פרויקטים ואמון |
| 5 | טופס ו-CTA |
| 6 | SEO ונגישות |
| 7 | בדיקות סופיות (Lighthouse, טופס, UAT) |

---

## 10 הבעיות המרכזיות (סיכום מנהלים)

1. **פער אמון:** «20+ פרויקטים» ב-Hero מול 3 case studies באתר  
2. **CTA לא אחיד:** לפחות 4 ניסוחים שונים לאותה פעולה  
3. **קישורים פנימיים שבורים/מיותרים:** hub מקשר ל-URLs עם 301  
4. **Sitemap עם hash:** canonical/אינדוקס בעייתי  
5. **פיצול עיצובי:** Hero לבן / גוף כהה / עמודים בהירים  
6. **דף הבית ארוך:** 10 סקשנים, עומס קוגניטיבי, CTA רחוק במובייל  
7. **טופס כבד:** 7 שדות — לא תואם «אבחון» קצר  
8. **CtaButton כ-button:** נגישות ו-SEO לניווט  
9. **Dead code:** 8 עמודי leaf + קומפוננטות לא בשימוש  
10. **קופי לא תואם אסטרטגיה:** מסר «סוכנות דיגיטל» / טכני לפני תועלת עסקית

---

*סוף דוח — גרסה 1.0 | יוני 2026*

*לא שונו קבצי קוד במסגרת יצירת מסמך זה.*
