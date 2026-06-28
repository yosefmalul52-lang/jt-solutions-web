# תוכנית שדרוג עיצובי — JT Solutions

**תאריך:** יוני 2026  
**כיוון:** Premium Digital Operating System  
**מסמכי ייחוס:** `docs/conversion-messaging-strategy.md`, דוחות השדרוג הקודמים

---

## 1. בעיות עיצוביות מרכזיות

| # | בעיה | איפה |
|---|------|------|
| 1 | **פיצול בהיר/כהה** — דף הבית cinematic כהה, עמודי שירות כולם `#0b0f19`, projects/contact בהירים | `studio-service-page`, homepage story |
| 2 | **גרדיאנטים מוגזמים** — CTA cyan→violet, gradient-text, glow כבד | `:root`, `CtaButton`, hero |
| 3 | **כרטיסים לא אחידים** — inline styles ב-projects, `studio-hub-pillar` כהה, `funnel-panel`, `premium-editorial-card` | projects, services hub, homepage |
| 4 | **טיפוגרפיה** — weights טובים אך חסר max-width עקבי לפרוזה | sections ארוכים |
| 5 | **ריווחים** — section padding קיים (`--space-section-y`) אך כרטיסים פנימיים צפופים במובייל | hub cards, FAQ |
| 6 | **אנימציות** — Reveal/PremiumReveal קיימים; חסר stagger אחיד; typewriter עלול לעכב הבנה | homepage hero |
| 7 | **CTA** — scale 1.04 + magnetic על כפתורים; secondary פחות מובחן | `CtaButton` |
| 8 | **Navbar** — dark על כל `/services/*` גם כשהתוכן יכול להיות בהיר | `lib/studio-shell.ts` |
| 9 | **טפסים** — classNames כפולים, focus indigo/cyan לא אחיד | `ContactForm` |
| 10 | **UI ישן** — accent icons בהירים על רקע כהה ב-hub | `app/services/page.tsx` |

---

## 2. קבצים לשינוי

### Design system
- `app/globals.css` — tokens, cards, typography, forms, service shell

### Layout
- `components/layout/Navbar.tsx` — polish (CSS-driven)
- `components/layout/Footer.tsx` — spacing
- `lib/studio-shell.ts` — nav theme: light מלבד homepage

### UI / Motion
- `components/ui/CtaButton.tsx`
- `components/ui/PremiumCard.tsx` (חדש)
- `components/ui/ContactForm.tsx`
- `components/motion/StaggerGroup.tsx` (חדש)

### Templates / Sections
- `components/templates/StudioServiceTemplate.tsx` — hero navy band + light body
- `app/services/page.tsx` — hub light cards
- `components/projects/ProjectHubCard.tsx`
- `components/sections/websites/WebsitesFitTable.tsx` — premium-card
- `components/studio/StudioPanel.tsx` — hover transitions

---

## 3. סגנון עיצובי חדש

**Premium Digital Operating System**

| אלמנט | ערך |
|--------|-----|
| רקע בסיס | `#F9FAFB` / slate-50 |
| Navy (ראשי) | `#0f172a` / `#1e3a5f` |
| אקשן | `#0ea5e9` / cyan-500 |
| נגיעה | indigo/violet רק ב-badge וקישורים |
| טקסט | slate-950 / slate-600 |
| גבולות | slate-200, opacity 8% |
| radius | 14px (--radius), 8px soft |
| shadow | רך, ללא glow מוגזם |

**עקרונות:** אלגנטי, נקי, פרימיום, לא «מופע אנימציות».

---

## 4. רכיבי UI לאיחוד

| לפני | אחרי |
|------|------|
| inline card styles (projects) | `.premium-card` / `PremiumCard` |
| `studio-hub-pillar` (dark) | `.premium-card` על רקע בהיר |
| `funnel-panel` | `.premium-card` variant subtle |
| `glassInputClass` ×3 | `.form-input` + modifiers |
| Reveal / PremiumReveal | + `StaggerGroup` לרשימות |

---

## 5. אנימציות מומלצות

| סוג | שימוש | כלל |
|-----|--------|-----|
| fade-up (y: 16–20) | sections, cards | `prefers-reduced-motion` → static |
| stagger 0.06–0.08s | grids | max 8 items visible |
| hover translateY(-2px) | cards | `@media (hover:hover)` |
| CTA scale 1.02 | buttons | לא 1.04 |
| FAQ | height/opacity קיים | ללא bounce |
| **לא** | parallax כבד, blur גבוה, random | LCP / hydration |

---

## 6. סיכונים

| סיכון | מitigation |
|-------|------------|
| שבירת prerender (Lucide → Client) | לא להעביר icons מ-Server ל-CtaButton |
| CLS מאנימציות | initial state = visible ב-SSR / reduced-motion |
| ניגודיות על hero navy | WCAG AA לטקסט לבן |
| regression מובייל overflow | `overflow-x-hidden`, min-h buttons 44px |
| שינוי מראה קיצוני | hero navy נשמר; body → light |

---

## 7. ביצועים ונגישות

- CSS variables — אין runtime cost
- Motion רק ב-client wrappers עם `useHydrated` + `useReducedMotion`
- focus-visible על כפתורים ושדות
- alt text — לא נוגעים
- build + lint אחרי כל batch

---

## 8. סדר ביצוע

1. globals.css tokens + premium-card + form-input  
2. studio-shell nav light על service pages  
3. StudioServiceTemplate light body  
4. services hub + project cards  
5. CtaButton + ContactForm  
6. StaggerGroup + PremiumCard  
7. lint/build + דוח
