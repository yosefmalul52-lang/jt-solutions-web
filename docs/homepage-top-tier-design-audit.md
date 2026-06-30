# Homepage Top-Tier Design Audit — JT Solutions

**Date:** June 2026  
**Scope:** Homepage only (`app/(home)/page.tsx` funnel)  
**Design language:** Light Premium Strategic Tech Studio

---

## Section inventory (actual homepage)

| # | Section | Component | On page |
|---|---------|-----------|---------|
| 1 | Hero + trust chips | `Hero`, `ServiceMarquee` | Yes |
| 2 | Identification | `IdentificationSection` | Yes |
| 3 | Problem Journey | `ProblemSection` | Yes |
| 4 | Solution / Flow | `SolutionSection` | Yes |
| 5 | Projects carousel | `Projects` → `CurvedPortfolioCarousel` | Yes |
| 6 | Packages | `Pricing` | Yes |
| 7 | FAQ | `HomeFaq` | Yes |
| 8 | Final CTA | `Contact` (story) | Yes |
| — | Process | `ProcessSection` | **Not on homepage** |
| — | Bento / Deliverables | `DeliverablesSection` | **Not on homepage** |

---

## What works well

- **Hero:** Strong H1 with gradient accent line, early CTA, Lead Orbit visual, typewriter support line, trust chips.
- **Identification:** Distinct digital-diagnosis card grid with central hub — different from Problem section.
- **Problem Journey:** Floating zigzag thread is unique and on-brand; break-point concept is clear.
- **Solution:** Dark hub canvas contrasts well with light page — reads as "system that works."
- **Projects carousel:** Clean image-only coverflow direction is correct; center image sharp, side previews visible.
- **Pricing:** Three clear pathways, featured tier, checkmarks, full-width CTAs.
- **FAQ:** Simple accordion, readable questions.
- **Final CTA:** Diagnostic form framing is professional.
- **Motion:** Reduced-motion paths exist; stagger/reveal is generally restrained.
- **Typography base:** `SectionHeader` gives consistent eyebrow + H2 + subline pattern.

---

## What looks unprofessional / off-brand

### 1. Gray background slabs (primary issue)

- `.home-section--alt { background-color: #f1f5f9 }` used on Problem, Projects, FAQ — reads as "office gray," not premium.
- `homepage-light-shell` base `#f8fafc` adds gray cast sitewide on homepage.
- Hero wrap alternates `#f8fafc` bands — feels stripy, not editorial.
- Portfolio section `#f1f5f9` flat fill.
- Final CTA `#f8fafc` + shimmer using `#f1f5f9`.
- **Impact:** Lowers contrast, makes white cards feel less crisp, site feels duller than Hero promises.

### 2. Section rhythm

- Padding is consistent but transitions between gray/white slabs feel abrupt.
- Inset box-shadow between adjacent sections (`home-polish.css`) adds subtle "divider fatigue."
- Some sections (Problem journey shell) have heavy top border + padding stacking.

### 3. Typography / hierarchy

- Section accent words use scribble underline but not the unified headline gradient everywhere.
- Hero uses `home-hero-accent` gradient; section accents are plain text + scribble — slight inconsistency.
- Pricing accent uses violet (`#7C3AED`) while primary brand gradient is blue/navy.

### 4. Color

- Too much slate-gray in backgrounds; not enough white + soft blue-white breathing room.
- Identification diag grid dots at 0.45 opacity add visual noise on already-busy section.

### 5. Spacing

- Problem journey mobile bottom padding accounts for FAB — good, but desktop has large dead zones in thread gaps.
- Portfolio header → stage spacing is acceptable; curve shell could use slightly more lateral breathing room.

### 6. Animation

- Identification line SVG glow filter is heavy on some GPUs.
- Carousel 3D transforms are now balanced; no blur — good.
- Generally animations help; nothing critical to remove except toning backdrop orbs.

### 7. Mobile

- Hero is full viewport — acceptable for conversion but long on small phones.
- Carousel: center-only with subtle sides — clean.
- Thread journey: simplified path — OK.
- FAB clearance in problem section — handled.

### 8. Carousel (minor)

- Black border on cards (recent request) is strong — OK if intentional.
- Side card z-depth fixed; layering correct now.

---

## Per-section notes

| Section | Grade | Main issue | Action |
|---------|-------|------------|--------|
| Hero | A- | Gray bands in wrap | White/blue gradient only |
| Trust chips | A | None major | Keep |
| Identification | B+ | Busy backdrop grid | Soften grid, keep white base |
| Problem | B | `home-section--alt` gray | Blue-white gradient, soften shell border |
| Solution | A- | Dark hub intentional | Keep white section base |
| Projects | B | Gray section bg | White/blue gradient |
| Pricing | B+ | Violet accent off-brand | Align accent to blue |
| FAQ | B | Gray alt background | White/blue gradient |
| Final CTA | B | Gray `#f8fafc` base | White/blue mesh |

---

## Planned fixes (implementation)

1. Homepage-scoped background system in `app/home-polish.css` — replace all `#f1f5f9` alt slabs with white / `#f8fbff` gradients.
2. Hero wrap → pure white/blue editorial gradient.
3. Portfolio + contact CSS backgrounds aligned.
4. Unified accent-word gradient on homepage section headings.
5. Softer identification backdrop grid.
6. Pricing headline accent → brand blue.
7. Section rhythm: consistent padding, remove harsh inset dividers.
8. Preserve Problem Journey structure, Solution hub, carousel image-only coverflow.

---

## Manual check still needed after polish

- Visual pass at 1280px, 768px, 390px.
- WhatsApp FAB vs CTA overlap on problem/contact.
- EqualWeb widget overlap.
- Carousel side cards at narrow desktop widths.
