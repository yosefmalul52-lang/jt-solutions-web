# Figma-Level Redesign Plan — JT Solutions

כיוון: **Light Premium Strategic Tech Studio**.
לא מוסיפים עוד אפקטים — בונים Design System אחיד ומורידים את הכאוס שהצטבר.

## הבעיות העיצוביות המרכזיות (מצב נוכחי)

1. **כותרות לא אחידות** — כל סקשן בונה ידנית `home-eyebrow` + `home-headline` + `home-subline` + scribble. אין מקור אמת אחד.
2. **יותר מדי צבעים במקביל** — בלוק ההזדהות מכיל 5 צבעי accent שונים (כחול/אדום/תכלת/סגול/ירוק) באותו סקשן → תחושת קשת בענן ולא מערכת.
3. **יותר מדי תנועה אמביינטית** — blob drift על ה‑mesh, floating chips, ריחוף של כרטיס המערכת, ו‑marquee נע. תנועה שלא משרתת מסר.
4. **marquee** של שירותים נראה גימיקי ולא פרימיום.
5. **ריווחים לא אחידים** — חלק מהסקשנים `home-section` (clamp), אחרים דורסים עם `py-14 md:py-20`.
6. **scribble מוגזם** — strokeWidth 5 על כל כותרת + scribble צף עצמאי מתחת לכותרות עמודים נראה כמו קשקוש.
7. **CSS מצטבר** — `globals.css` מעל 3000 שורות עם aliases ישנים (dark-page, cinematic) שכבר לא בשימוש ויזואלי.

## מה צריך להחליש או להסיר

- להסיר את אנימציות הריחוף: `cm-blob-drift` (mesh), `cm-float` (chips), `cm-float-soft` (system card), `cm-marquee` (track).
- להפוך את ה‑marquee לשורת trust סטטית, ממורכזת ונקייה.
- להוריד את ה‑scribble ל‑stroke עדין (3px) ולשמור אותו רק על מילה אחת בכותרת.
- לאחד את צבעי ההזדהות לצבע מוביל אחד (כחול) במקום 5.

## מה צריך לאחד

- **SectionHeader** אחד: badge/eyebrow + H2 + תת־כותרת + הדגשת מילה אחת. כל סקשני הבית עוברים אליו.
- **ריווח**: כל הסקשנים על `home-section` (ללא דריסות py). max-width אחיד.
- **כרטיסים**: `home-card` / `home-bento__item` נשארים מקור אחד; `accent-card` הוא ה‑modifier היחיד לפס עליון.

## מה צריך לשדרג

- היררכיה טיפוגרפית עקבית (H1 hero גדול, H2 סקשנים אחיד, תת־כותרת קצרה).
- ריתמוס בדף הבית: Hero גדול → trust קצר → הזדהות → before/after → flow → bento → projects → process → packages → faq → contact.
- שמירה על הקרוסלה (כבר coverflow מאופק) והורדת זוויות אם צריך.

## קומפוננטות הבסיס החדשות

- `components/ui/SectionHeader.tsx` — כותרת סקשן אחידה (eyebrow + H2 + accent word + underline + subline).
- `components/motion/ScribbleUnderline.tsx` — מעודן (stroke דק).
- `components/home/ServiceMarquee.tsx` — הופך לשורת trust סטטית.
- מערכת המחלקות הקיימת (`home-section`, `home-card`, `home-bento__item`, `accent-card`, `flow-node`) נשארת כשפת ה‑Design System.

## Design System

- **Backgrounds**: `#F8FAFC` בסיס, `#FFFFFF` surface, `#F1F5F9` soft (`home-section--alt`).
- **Text**: `#0F172A` / `#334155` / `#64748B`.
- **Accents**: כחול ראשי, ושאר הצבעים כתוספת ממוקדת — צבע מוביל אחד לכל סקשן.
- **Spacing**: `home-section` padding-block clamp(4rem, 8vw, 7rem); max-w-6xl.
- **Motion**: fade up + stagger + hover lift + flow dot. בלי ריחוף אמביינטי, בלי marquee נע.

## מובייל / נגישות / ביצועים

- חוט צדדי מוסתר מתחת ל‑xl; chips רק ב‑lg; bento עמודה אחת; קרוסלה→swipe.
- כל תנועה מאחורי `prefers-reduced-motion`; אין Math.random / hydration mismatch / layout shift; H1 יחיד.
- אין ספריות חדשות; האנימציות מבוססות transform; דקורציה `aria-hidden`.
