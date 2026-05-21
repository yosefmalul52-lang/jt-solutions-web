# צ'ק-ליסט הקמת SEO — JT Solutions

סמן ✓ כשהושלם. זמן משוער: 2–3 שעות.

## Google Search Console

- [ ] היכנס ל-[Google Search Console](https://search.google.com/search-console)
- [ ] הוסף נכס: `https://www.jt-solutions.org`
- [ ] אימות בעלות — אחת מהאפשרויות:
  - **DNS** (מומלץ ב-Vercel): רשומת TXT לפי ההוראות ב-GSC
  - **HTML tag**: הוסף ל-`.env.local`:
    ```
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=הקוד-מ-GSC
    ```
    ואז deploy (האתר קורא את המשתנה ב-[`app/layout.tsx`](../app/layout.tsx))
- [ ] שלח Sitemap: `https://www.jt-solutions.org/sitemap.xml`
- [ ] בקשת אינדוקס לדפים: `/`, `/about`, `/blog`, 8 דפי `/services/*`

## Google Business Profile

- [ ] צור/עדכן פרופיל: [Google Business](https://business.google.com)
- [ ] קטגוריה: שיווק דיגיטלי / בניית אתרים
- [ ] NAP זהה בכל מקום:
  - **שם:** JT Solutions
  - **טלפון:** 052-8240230
  - **אתר:** https://www.jt-solutions.org
  - **אימייל:** jtsolutions.officee@gmail.com
  - **אזור:** ישראל (קריית אתא + שירות מרחוק)
- [ ] 5+ תמונות (לוגו, צילומי מסך פרויקטים)
- [ ] פוסט שבועי עם קישור לדף שירות או `/blog`
- [ ] בקש 3–5 ביקורות מלקוחות מרוצים

## GA4 — המרות

- [ ] ודא `NEXT_PUBLIC_GA_ID=G-XXXXXXXX` ב-Vercel
- [ ] ב-GA4 → Admin → Events → סמן כ-Conversions:
  - `generate_lead`
  - `click_phone`
  - `click_whatsapp`
  - `click_cta`
- [ ] דוח חודשי: Sessions אורגניות + המרות

## אחרי deploy אחרון

- [ ] בדוק ב-GSC → Coverage שאין שגיאות 404 על `/about`
- [ ] חיפוש `site:jt-solutions.org` בגוגל — כמה עמודים מאונדקסים
