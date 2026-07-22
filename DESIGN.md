---
name: JT Solutions
description: Premium Israeli B2B digital studio — confident clarity for lead conversion
colors:
  canvas-white: "#ffffff"
  canvas-soft: "#f8fbff"
  canvas-base: "#f8fafc"
  ink-primary: "#0f172a"
  ink-secondary: "#475569"
  ink-muted: "#64748b"
  ink-placeholder: "#94a3b8"
  accent-navy: "#1e3a8a"
  accent-blue: "#2563eb"
  accent-blue-deep: "#1d4ed8"
  accent-cyan: "#0ea5e9"
  border-soft: "#e2e8f0"
  border-card: "#e8edf3"
  success-whatsapp: "#10b981"
typography:
  display:
    fontFamily: "Heebo, system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 4.2vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.038em"
  headline:
    fontFamily: "Heebo, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3.2vw, 2.375rem)"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.028em"
  body:
    fontFamily: "Heebo, system-ui, sans-serif"
    fontSize: "clamp(0.9375rem, 1.4vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Heebo, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "10px"
  md: "14px"
  lg: "16px"
  pill: "9999px"
spacing:
  section-y: "clamp(4rem, 6.5vw, 6.5rem)"
  card-padding: "1.25rem"
  btn-padding-md: "0.72rem 1.65rem"
components:
  button-primary:
    backgroundColor: "{colors.accent-blue-deep}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "{spacing.btn-padding-md}"
  button-primary-hover:
    backgroundColor: "{colors.accent-navy}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "{spacing.btn-padding-md}"
  button-secondary:
    backgroundColor: "{colors.canvas-white}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.btn-padding-md}"
  input-field:
    backgroundColor: "{colors.canvas-white}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1rem"
---

# Design System: JT Solutions

## 1. Overview

**Creative North Star: "The Digital Studio"**

JT Solutions reads as a premium Israeli B2B digital studio: confident, expert, and direct — never flashy for its own sake. Surfaces are clean white and cool-tinted off-white (`#f8fbff`), typography does the heavy lifting in Hebrew RTL, and conversion paths (diagnostic form, primary CTA) are visually unmistakable. Motion reinforces state and funnel narrative; it never hides content or blocks the task.

The system rejects generic SaaS cream templates, neon agency theatrics, and AI-slop scaffolding (uppercase eyebrows on every section, numbered 01/02/03 markers without real sequence, decorative glassmorphism, gradient text as a default accent trick).

**Key Characteristics:**
- Light, cool-tinted canvas — not warm cream/sand
- Single sans family (Heebo) across display, UI, and body
- Navy-to-blue accent with restrained cyan focus rings
- Flat surfaces at rest; hover lift via border + shadow shift
- RTL-first layouts with mobile-real breakpoints
- Primary conversion: diagnostic call / contact form

## 2. Colors

A cool professional palette anchored in slate ink on white, with deep navy blue as the committed accent.

### Primary
- **Studio Navy** (`#1e3a8a`): Deep anchor for CTA gradients, hero accent range, and premium emphasis. Used where confidence and authority must read instantly.
- **Signal Blue** (`#2563eb`): Primary interactive accent — links, eyebrow labels, scribble underlines, featured tier borders. The main "act here" hue.
- **Action Blue** (`#1d4ed8`): Button gradient mid-tone; primary CTA fill.

### Secondary
- **Focus Cyan** (`#0ea5e9`): Focus rings and input active states only — not decorative fills.

### Tertiary
- **WhatsApp Green** (`#10b981` / `#059669`): Reserved exclusively for WhatsApp CTAs and success-adjacent actions.

### Neutral
- **Canvas White** (`#ffffff`): Primary section backgrounds, cards, form fields, navbar shell.
- **Canvas Soft** (`#f8fbff`): Alternate section wash; hero and CTA gradient endpoints.
- **Canvas Base** (`#f8fafc`): Global body fallback; soft UI surfaces.
- **Ink Primary** (`#0f172a`): Headlines, button secondary text, form values.
- **Ink Secondary** (`#475569`): Body copy, sublines — minimum contrast target for long prose.
- **Ink Muted** (`#64748b`): Supporting microcopy, trust pills.
- **Ink Placeholder** (`#94a3b8`): Placeholders and de-emphasized hints — must still meet WCAG AA on white.
- **Border Soft** (`#e2e8f0`): Inputs, dividers, card borders at rest.
- **Border Card** (`#e8edf3`): Slightly softer card outline variant.

### Named Rules
**The One Voice Rule.** Signal Blue and Studio Navy together carry action and authority. They appear on CTAs, one accent word per section heading, and key interactive states — not as ambient page tint. If more than ~10% of a viewport reads as saturated blue, pull back.

**The Cool Canvas Rule.** Section backgrounds stay white or cool `#f8fbff`. Warm cream, sand, and beige tints are prohibited — warmth comes from copy and proof, not from page wash.

## 3. Typography

**Display Font:** Heebo (with `system-ui, sans-serif`)
**Body Font:** Heebo (with `system-ui, sans-serif`)
**Label Font:** Heebo (same family — product register; no display/body pairing)

**Character:** Geometric-humanist Hebrew sans — confident weights (700–800 on headings), tight negative tracking on display, generous line-height on body for RTL readability.

### Hierarchy
- **Display** (800, `clamp(2.125rem, 4.2vw, 3rem)`, line-height 1.1): Hero H1 only. `text-wrap: balance`. Letter-spacing ≥ -0.038em.
- **Headline** (700, `clamp(1.875rem, 3.2vw, 2.375rem)`, line-height 1.18): Section H2 via `.home-headline`. One optional accent word with scribble underline.
- **Title** (600–700, ~1rem–1.125rem): Card titles, pricing tier names, nav items.
- **Body** (400, `clamp(0.9375rem, 1.4vw, 1.0625rem)`, line-height 1.65): Subline and prose. Cap at ~42rem (`--prose-max`) / 65–75ch where long-form.
- **Label** (600, 0.75rem): Form labels, trust pills, compact UI chrome.

### Named Rules
**The Single Family Rule.** Heebo carries every role. Do not introduce a second sans or a display serif without explicit system revision.

**The Balance Rule.** Apply `text-wrap: balance` on H1–H2; `text-wrap: pretty` on long Hebrew paragraphs to reduce orphans.

## 4. Elevation

Flat at rest. Depth is earned through hover and featured states — not ambient drop shadows on every surface.

Surfaces default to 1px borders (`#e2e8f0` / `#e8edf3`) on white. Featured cards and primary buttons receive slightly stronger shadow stacks. The navbar may use light glass (`rgba(255,255,255,0.92)`) on scroll — functional separation, not decoration.

### Shadow Vocabulary
- **Hairline** (`0 1px 2px rgba(15, 23, 42, 0.03)`): Cards and pricing tiles at rest.
- **Lift** (`0 10px 28px rgba(15, 23, 42, 0.06)`): Card hover; interactive `.home-card` states.
- **CTA** (`0 10px 28px rgba(15, 23, 42, 0.14)`): Primary button default stack.
- **Featured** (`0 12px 32px rgba(37, 99, 235, 0.08)`): Highlighted pricing tier.

### Named Rules
**The Flat-By-Default Rule.** No shadow on static body sections. Shadows appear on hover, focus, featured emphasis, or primary CTAs only.

## 5. Components

### Buttons
- **Character:** Tactile and confident — navy gradient fill, firm focus ring, optional restrained shine on hero CTA.
- **Shape:** 16px radius (`1rem`), min-height 48px (md), 40px (sm).
- **Primary:** Navy-to-blue gradient (`#1e3a8a` → `#1d4ed8`), white text, hairline + CTA shadow stack. Hover: slight translateY(-1px), deeper shadow.
- **Secondary:** White fill, `#0f172a` text, `#e2e8f0` border.
- **Soft:** `#f8fafc` fill, `#1e40af` text — tertiary actions on light surfaces.
- **WhatsApp:** Green gradient — only for WhatsApp actions.
- **Focus:** `outline: 2px solid rgba(37, 99, 235, 0.55); outline-offset: 2px`.
- **Motion:** 280ms `cubic-bezier(0.22, 1, 0.36, 1)`.

### Chips / Trust pills
- **Style:** Pill radius, white background, `#e8edf3` border, 0.75rem semibold, `#64748b` text.
- **State:** Static informational — not filter toggles unless explicitly interactive.

### Cards / Containers
- **Corner Style:** 16px (`1rem`).
- **Background:** `#ffffff`.
- **Border:** 1px `#e8edf3`.
- **Shadow Strategy:** Hairline at rest; Lift on hover for `.home-card--interactive`.
- **Internal Padding:** ~1.25rem; pricing and FAQ variants follow same vocabulary.

### Inputs / Fields
- **Style:** White fill, `#e2e8f0` border, 10px radius, min-height 44px.
- **Focus:** Cyan ring — `border-color: rgba(14, 165, 233, 0.5); box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.12)`.
- **Placeholder:** `#94a3b8` — verify contrast.
- **Error:** `#ef4444` / `text-red-500` alert copy below field.

### Navigation
- **Style:** Floating glass bar on homepage — white/translucent, soft border, logo + hash-linked sections.
- **Typography:** Semibold nav labels, active state via background tint and Signal Blue accent.
- **Mobile:** Full-screen menu sheet; same link vocabulary as desktop.

### Section Header (signature)
- **Structure:** Optional eyebrow → H2 with one accent word + scribble SVG underline → subline.
- **Accent word:** Signal Blue scribble; never more than one highlighted word per heading.

### Hero Headline (signature)
- **Line 1:** Ink primary (`#0f172a` / slate-900).
- **Line 2:** Controlled gradient accent (navy → blue → ink) — hero only; do not propagate to body UI.

## 6. Do's and Don'ts

### Do:
- **Do** keep body backgrounds white or cool `#f8fbff` — premium Israeli B2B clarity.
- **Do** use Heebo at 700–800 for headings and 400–600 for UI/body with verified contrast.
- **Do** make the diagnostic CTA the visually dominant action on every conversion surface.
- **Do** use flat cards with 1px borders; add lift shadow only on hover or featured state.
- **Do** provide `prefers-reduced-motion` alternatives for all scroll and entrance animations.
- **Do** test Hebrew headlines at mobile/tablet widths — no overflow from large clamp scales.

### Don't:
- **Don't** use generic SaaS templates — cream backgrounds, hero-metric cards, identical icon-card grids.
- **Don't** use gradient text (`background-clip: text`) outside the hero accent line — PRODUCT.md forbids it as a default pattern.
- **Don't** add tiny uppercase tracked eyebrows above every section — one deliberate eyebrow per page section maximum.
- **Don't** use numbered 01/02/03 section markers unless the section is a real ordered sequence.
- **Don't** use glassmorphism, neon accents, or side-stripe colored borders as decoration.
- **Don't** gate content visibility on animation — reveals must enhance an already-visible default.
- **Don't** animate layout properties (width, height, top) — transform and opacity only.
