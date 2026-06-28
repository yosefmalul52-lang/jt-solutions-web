# דוח שדרוג SEO ונגישות — JT Solutions

**תאריך:** יוני 2026  
**היקף:** כל האתר — metadata, canonical, OG, sitemap, JSON-LD, נגישות בסיסית  
**מסמכי ייחוס:** `docs/conversion-messaging-strategy.md`, `docs/site-audit-ux-ui-seo.md`

---

## 1. סיכום

שודרגו כותרות ותיאורים לשפה עסקית (תוצאה לפני טכנולוגיה), תוקנו canonical ו-Open Graph, עודכנו עמודי אזור ושירותים, ושופרו מספר נקודות נגישות — בלי הבטחות לא מגובות.

---

## 2. Meta titles & descriptions

### עקרונות

- כותרות מדברות על **תוצאה עסקית** — פניות, סדר בלידים, מדידה, אמון.
- הוסר «סוכנות דיגיטל» מ-metadata ברירת מחדל ומעמודי אזור.
- תוקן **כפילות suffix** — `createPageMetadata` מנרמל `| JT Solutions` לפני template.

### עמודים מרכזיים (דוגמאות)

| עמוד | Title (לפני template) |
|------|------------------------|
| `/` | מערכת דיגיטלית לפניות מסודרות |
| `/services` | שירותים לפי הבעיה של העסק |
| `/services/websites` | בניית אתרים ודפי נחיתה שמובילים לפניות |
| `/services/automations` | אוטומציות ו-CRM לעסקים שרוצים סדר בלידים |
| `/services/digital-marketing` | פרסום דיגיטלי שאפשר למדוד ולשפר |
| `/services/branding` | מיתוג לעסקים שרוצים להיראות ברורים ואמינים |
| `/contact` | אבחון דיגיטלי חינם |
| `/about` | יוסף מלול — ליווי דיגיטלי מקצה לקצה |
| `/projects` | עבודות נבחרות ואתרים שנבנו לעסקים |
| `/blog` | מדריכים לבעלי עסקים — אתרים, פניות ומדידה |

### שירותי leaf (canonical לעמוד תווך)

כל `path` ב-`lib/seo/services.ts` עודכן ל-base URL בלי hash (למשל `/services/websites` במקום `#landing`). העמודים עצמם מופנים ב-301 — ה-metadata תואם את היעד.

### עמודי אזור (10)

כותרות ותיאורים עודכנו לתשתית דיגיטלית / פניות / מדידה — בלי «סוכנות דיגיטל».

---

## 3. Canonical

**`lib/seo/metadata.ts`:**
- פונקציה `toCanonicalPath()` — מסירה hash fragments מכל canonical.
- `alternates.canonical` תמיד URL מלא: `https://www.jt-solutions.org/...`

---

## 4. Sitemap

**`app/sitemap.ts`** — כבר ללא hash fragments (רק עמודי base, blog, projects, areas, pillars). לא נדרש שינוי נוסף.

---

## 5. Open Graph & Twitter

**תיקונים ב-`createPageMetadata`:**
- `openGraph.url` — URL מלא (לא path יחסי)
- `openGraph.title` / `twitter.title` — כותרת תצוגה מלאה
- `openGraph.images` / `twitter.images` — URL מוחלט לתמונות

**`app/layout.tsx`** — OG/Twitter ברירת מחדל עודכנו לשפה עסקית.

**`lib/seo/og-images.ts`** — alt טקסטים בעברית לפי עמוד תווך.

---

## 6. Heading hierarchy

| עמוד | H1 | הערה |
|------|-----|------|
| דף הבית | `HeroTypewriterHeadline` | H1 אחד + sr-only לנגישות |
| עמודי תווך | `StudioServiceTemplate` | H1 ב-hero, H2 בסקשנים |
| `/projects` | כותרת עמוד | H1 אחד |
| `/about` | יוסף מלול | H1 אחד |
| 404 | «הדף לא נמצא» | `404` עם `aria-hidden` |

לא בוצעו שינויי מבנה מרחיקי לכת — ההיררכיה הקיימת תקינה.

---

## 7. Alt text

- OG images — alt בעברית, ממוקד תוצאה.
- `LazyViewportImage` — `alt=""` כברירת מחדל (תיקון אזהרת lint).
- תמונות פרויקטים — alt קיים ב-`lib/projects.ts`.

---

## 8. נגישות

| נושא | פעולה |
|------|--------|
| Focus states | קיימים ב-globals; נוסף `focus-visible` ל-FAB וואטסאפ |
| Labels בטופס | קיימים מעודכן בטופס אבחון (שיחה קודמת) |
| שגיאות טופס | `role="alert"` על הודעות שגיאה |
| FAB / EqualWeb | `padding-bottom` על `body` למניעת חסימת תוכן תחתון |
| WhatsApp FAB | `aria-label="שיחה ב-WhatsApp"` — קיים |

**לא שונה:** EqualWeb (סקריפט חיצוני), מבנה Hero typewriter.

---

## 9. Structured data (JSON-LD)

| סכמה | שינוי |
|------|--------|
| Organization | תיאור — שותף דיגיטלי, לא «סוכנות דיגיטל» |
| ContactPage | שם «אבחון דיגיטלי» |
| Blog Collection | תיאור ללא «להגדיל מכירות» |
| FAQ (בית) | ללא שינוי — מחירים מגובים ב-FAQ |
| Pillar Service | OfferCatalog עם hash לעוגנים — תקין לסכמה, לא ב-sitemap |

---

## 10. קבצים ששונו

```
lib/seo/metadata.ts
lib/seo/pillars.ts (דרך lib/pillars.ts seo blocks)
lib/pillars.ts
lib/seo/services.ts
lib/seo/organization.ts
lib/seo/og-images.ts
lib/seo/local-pages.ts
lib/projects.ts
app/layout.tsx
app/(home)/page.tsx
app/about/page.tsx
app/blog/page.tsx
app/contact/page.tsx
app/projects/page.tsx
app/services/page.tsx
app/services/websites/page.tsx
app/services/automations/page.tsx
app/areas/[slug]/page.tsx
app/globals.css
components/ui/LazyViewportImage.tsx
docs/seo-accessibility-upgrade-report.md
```

---

## 11. Lint & Build

| בדיקה | תוצאה |
|--------|--------|
| `npm run build` | **עבר** |
| `npm run lint` | **לא עבר** — `CountUpValue.tsx` (קיים מראש); אזהרת `LazyViewportImage` **תוקנה** |

---

## 12. בעיות שנשארו פתוחות

| נושא | הערה |
|------|------|
| `CountUpValue.tsx` lint | שגיאת `set-state-in-effect` — לא קשור ל-SEO |
| בלוג posts metadata | נשענים על `generateMetadata` per post — לא עודכנו אחד-אחד |
| עמודי leaf בשירותים | 301 ל-pillar+anchor — Google אמור לעקוב אחרי redirect |
| Lighthouse מלא | לא הורץ במסגרת דוח זה |
| `CtaButton` כ-`<button>` עם href | תוקן בעבר — links מרונדרים כ-`<Link>`/`<a>` |

---

## 13. המלצות המשך (לא בוצעו)

- הרצת Lighthouse לכל עמוד מרכזי אחרי deploy.
- עדכון metadata לפוסטי בלוג בודדים לשפה עסקית.
- בדיקת n8n/אנליטיקס — ללא קשר ל-SEO.
