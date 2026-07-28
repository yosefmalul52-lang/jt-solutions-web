# צ'ק-ליסט הקמת SEO — JT Solutions

סמן ✓ כשהושלם. זמן משוער: 30–60 דקות אחרי deploy.

## לפני Search Console — ודא שהאתר חי

- [ ] פתח `https://www.jt-solutions.org/robots.txt` — Allow `/`, מצביע ל-sitemap
- [ ] פתח `https://www.jt-solutions.org/sitemap.xml` — **סטטוס 200**, XML תקין עם:
  - `https://www.jt-solutions.org/`
  - `https://www.jt-solutions.org/accessibility`
  - `https://www.jt-solutions.org/privacy-policy`
- [ ] ב-Vercel: `jt-solutions.org` (apex) מפנה ב-301 ל-`www.jt-solutions.org`

## Google Search Console (חובה לאינדוקס)

בלי השלבים האלה האתר עלול להישאר בלתי נראה בגוגל במשך שבועות.

1. [ ] היכנס ל-[Google Search Console](https://search.google.com/search-console)
2. [ ] הוסף נכס URL-prefix: `https://www.jt-solutions.org`
3. [ ] אימות בעלות — אחת מהאפשרויות:
   - **DNS** (מומלץ ב-Vercel): רשומת TXT לפי ההוראות ב-GSC
   - **HTML tag**: הוסף ב-Vercel Environment Variables:
     ```
     NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=הקוד-מ-GSC
     ```
     ואז redeploy (האתר קורא את המשתנה ב-[`app/layout.tsx`](../app/layout.tsx))
4. [ ] Sitemaps → הוסף: `https://www.jt-solutions.org/sitemap.xml`
5. [ ] URL Inspection על `https://www.jt-solutions.org/` → **Request indexing**
6. [ ] (אופציונלי) Request indexing גם ל-`/accessibility` ו-`/privacy-policy`

## אחרי האימות

- [ ] תוך ימים–שבועות: חיפוש `site:jt-solutions.org` — אמור להראות לפחות את דף הבית
- [ ] ב-GSC → Pages / Coverage: אין שגיאות קריטיות על `/sitemap.xml` או על `/`

## Google Business Profile (מומלץ לדירוג מקומי)

- [ ] צור/עדכן פרופיל: [Google Business](https://business.google.com)
- [ ] קטגוריה: שיווק דיגיטלי / בניית אתרים
- [ ] NAP זהה בכל מקום:
  - **שם:** JT Solutions
  - **טלפון:** 052-8240230
  - **אתר:** https://www.jt-solutions.org
  - **אימייל:** jtsolutions.officee@gmail.com
  - **אזור:** ישראל (קריית אתא + שירות מרחוק)
- [ ] 5+ תמונות (לוגו, צילומי מסך פרויקטים)
- [ ] בקש 3–5 ביקורות מלקוחות מרוצים

## GA4 — המרות

- [ ] ודא `NEXT_PUBLIC_GA_ID=G-XXXXXXXX` ב-Vercel
- [ ] ב-GA4 → Admin → Events → סמן כ-Conversions:
  - `generate_lead`
  - `click_phone`
  - `click_whatsapp`
  - `click_cta`
- [ ] דוח חודשי: Sessions אורגניות + המרות

## הערות

- האתר הוא דף נחיתה אחד + שני דפי משפטיים. דירוג על מילות מפתח תחרותיות (“בניית אתרים”) לוקח זמן וקישורים — קודם חייבים אינדוקס.
- אל תצפו להופעה מיידית אחרי Request indexing; בדקו שוב אחרי כמה ימים.
