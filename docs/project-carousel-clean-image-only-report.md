# Project Carousel — Clean Image-Only Report

## 1) What was wrong in the previous fix

- The carousel was wrapped in a browser/mockup frame (`screen-browser-bar`, inner shell, extra padding).
- That frame made screenshots feel smaller, heavier, and less premium.
- A dark bottom overlay and on-image text still competed with the screenshot.
- 3D coverflow transforms (`rotateY`, perspective, deep z-offset) added visual noise.
- Side cards used filters and aggressive transforms that reduced perceived sharpness.

## 2) How browser/mockup frame was removed

- Removed `screen-browser-bar`, `screen-image-shell`, and inner frame padding.
- Replaced with a single `portfolio-image-wrap` that holds only the screenshot.
- Kept only a subtle border, light background, rounded corners, and soft shadow.

## 3) How overlay and on-image text were removed

- Removed `screen-overlay` from the carousel card entirely.
- Project title, type, description, tags, and CTA now live only in `ActiveInfoPanel` below the carousel.
- No dark gradient or text is rendered on top of the image.

## 4) How image quality was improved

- `next/image` now uses `quality={100}`.
- Responsive `sizes` set to `(max-width: 768px) 92vw, (max-width: 1200px) 76vw, 1100px`.
- `unoptimized` is not used.
- Images use `object-fit: contain` and `object-position: center` so content is not cropped.
- Removed blur, brightness, saturate, and opacity filters from carousel images.
- Carousel width increased up to `1100px` so screenshots are shown closer to their native resolution.

## 5) Low-quality assets that may still need replacement

| Asset | Resolution | Status |
|---|---|---|
| `magadim.png` | 1024×589 | Usable, but slightly below ideal for very large desktop displays |
| `tsameret-glass.png` | 1024×588 | Usable, same note as above |
| `md-finance.png` | 1024×588 | Usable, same note as above |
| `fashion-store.png` | 1024×589 | Usable, same note as above |
| `ai-automation.png` | 2560×1440 | High quality; best asset in the set |

No better local replacement files were found in `public/projects`. For maximum sharpness on large screens, exporting fresh 1600–1920px wide PNG/WebP screenshots would help the four 1024px assets.

## 6) How 3D/coverflow transforms were simplified

- Removed perspective, `rotateY`, z-depth, blur, and heavy scale jumps.
- Desktop now shows one main image with optional subtle side previews only at `±1`.
- Side previews: `scale 0.88`, `opacity 0.55`, `rotateZ ±1.5deg`, no blur.
- Mobile shows only the center image (`offset 0` only).
- Transition shortened to `420ms` with a smooth ease curve.

## 7) Mobile behavior

- Single centered image at `92vw`.
- No side rotated cards.
- No 3D transforms.
- `object-contain` preserved.
- Arrows stay outside the image area.
- Dots remain below the carousel.
- No on-image text or overlay.

## 8) Files changed

- `components/projects/CurvedPortfolioCarousel.tsx`
- `components/projects/curved-portfolio-carousel.css`

## 9) Lint status

- `npm run lint` passed with **0 errors**.
- 2 existing warnings remain in `lib/studio-shell.ts` (unrelated).

## 10) Build status

- `npm run build` passed successfully.
