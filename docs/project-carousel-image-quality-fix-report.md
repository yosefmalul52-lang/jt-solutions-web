# Project Carousel Image Quality Fix Report

## 1) Root causes of image cropping

- The project screenshots used `object-fit: cover`, which cropped edges and hid important UI parts.
- The card overlay gradient was tall and dark, masking too much of the lower screenshot area.
- 3D side-card transforms were too aggressive (`rotateY`, `scale`), visually cutting side previews.
- Parent wrappers used clipping behavior that made side cards feel over-trimmed.

## 2) Root causes of image quality loss

- `unoptimized` was enabled on `next/image`, bypassing Next image optimization pipeline behavior.
- Side cards used visual processing and heavy perspective, which made screenshots look less sharp.
- Previous side-card styling reduced clarity (`brightness/saturate`) too much on non-active cards.

## 3) Problem type classification

- `object-cover`: **Yes** (main cropping source)
- `scale/transform`: **Yes** (side-card blur/softness perception)
- `overflow`: **Yes** (card edges and shadows appeared cut)
- `asset quality`: **Partially** (assets are mostly fine; one asset is much larger than others)
- `sizes`: **Yes** (updated to responsive values better matching carousel layout)

## 4) Files changed

- `components/projects/CurvedPortfolioCarousel.tsx`
- `components/projects/curved-portfolio-carousel.css`

## 5) Image frame improvements

- Added a clean browser-like frame in the card (`screen-browser-bar` + inner image shell).
- Switched screenshot fit to `object-fit: contain` to preserve full screenshot content.
- Added subtle light frame styling, inner padding, and consistent border/shadow for a premium clean look.
- Reduced dark framing effects and tuned card shadows to avoid “heavy black box” visuals.

## 6) Side cards improvements

- Reduced side-card 3D intensity (smaller `rotateY/rotateZ`, gentler scaling).
- Removed blur-based rendering from side cards in slot transforms.
- Increased side-card opacity so previews remain readable and clean.
- Kept side previews visually subordinate without making them look smeared.

## 7) Mobile improvements

- Flattened mobile behavior (no aggressive rotations on side cards).
- Increased stage/card spacing to avoid clipping and to keep controls clear.
- Kept screenshot display as full `contain` in mobile too.
- Preserved clean layout with no horizontal overflow from carousel content.

## 8) Asset replacement status

- Current assets in `public/projects` are usable and mostly consistent (`1024x~589` for four screenshots).
- `ai-automation.png` is much larger (`2560x1440`) but not low quality; no forced replacement needed now.
- No better local replacement asset was required for this fix.

## 9) Lint status

- `npm run lint` passed with **no errors**.
- There are **2 existing warnings** in `lib/studio-shell.ts` unrelated to carousel changes.

## 10) Build status

- `npm run build` passed successfully after the carousel fixes.
