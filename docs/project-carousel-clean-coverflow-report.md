# Project Carousel — Clean Coverflow Report

## 1) What was missing in the previous version

- Side cards were positioned too close to center (`x: ±108px`) with high opacity overlap, making them feel like background noise rather than visible previews.
- Only offset `±1` was shown on desktop; deeper coverflow depth was removed.
- The center image was too wide (`1100px`), leaving little room for side previews.
- No subtle `rotateY` or vertical offset (`y`) for depth — the carousel felt flat and like a single large image.

## 2) How coverflow feel was restored

- Reintroduced multi-layer desktop slots for offsets `±1`, `±2`, and `±3`.
- Side 1: `x ±380px`, `scale 0.85`, `opacity 0.7`, `rotateZ ±3deg`, `rotateY ±6deg`.
- Side 2: `x ±590px`, `scale 0.72`, `opacity 0.4`, `rotateZ ±4deg`, `rotateY ±8deg`.
- Side 3: `x ±700px`, `scale 0.55`, `opacity 0.16` — faint depth cue only.
- Added `perspective: 1400px` and `transform-style: preserve-3d` on the stage for gentle depth.
- Transition set to `460ms` with smooth easing for fluid motion between slides.

## 3) How image-only display was preserved

- No browser bar, mockup frame, dark overlay, or on-image text.
- Each card shows only `portfolio-image-wrap` + screenshot.
- Project title, type, description, and CTA remain in `ActiveInfoPanel` below the carousel.

## 4) How image quality was preserved

- `object-fit: contain` — no cropping.
- `quality={100}` on `next/image`.
- `sizes="(max-width: 768px) 92vw, (max-width: 1200px) 76vw, 960px"`.
- No blur, brightness, or saturate filters on images.
- Transform scale applied only to the card wrapper, not the image element itself.

## 5) How side cards were tuned

- Center card reduced to `min(52vw, 900px)` to free horizontal space for sides.
- Stage widened to `max-width: 1380px` with `padding-inline: 4.5rem`.
- Side cards at `±1` and `±2` are clickable (`pointerEvents: auto`).
- No blur on any slot.
- Side 1 opacity kept at `0.7` so previews stay clearly visible.

## 6) How clipping was avoided

- `overflow: visible` on shell and stage.
- Section uses `overflow-x: clip` to prevent page horizontal scroll without aggressive masking.
- Extra `min-height` on stage accounts for vertical `y` offsets on side cards.
- `object-contain` ensures screenshot content is never cropped inside the card.

## 7) Mobile behavior

- Center image at `92vw`, no `rotateY`.
- Subtle side hints at `±68px`, `scale 0.9`, `opacity 0.48` — visible but not distracting.
- No blur, no 3D perspective emphasis.
- Arrows and dots remain outside/below the image area.

## 8) Lint status

- `npm run lint` passed with **0 errors** (2 unrelated warnings in `lib/studio-shell.ts`).

## 9) Build status

- `npm run build` passed successfully.

## Files changed

- `components/projects/CurvedPortfolioCarousel.tsx`
- `components/projects/curved-portfolio-carousel.css`
