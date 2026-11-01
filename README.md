# SaddlePoint radial delta logo editor

A standalone browser app for the selected D22 radial delta mark. Open `index.html` directly in a browser. The app has separate controls for contour, background, and center-dot colours; six-digit hex entry; separate Saddle and Point ink-strength sliders; a Cinzel wordmark preview; a transparent-background export option; and separate SVG downloads for the logo, wordmark, or both together.

## Source mark

`D22-source.svg` is the original radial delta mark with the initial navy contour and red center dot. `index.html` contains the editable path data inline. `Cinzel.ttf` supplies the wordmark font and is distributed under the included SIL Open Font License. The app requires no build step or JavaScript libraries.

## Use

- Adjust colours with the pickers or enter a hex code.
- Enable transparent background to omit the background rectangle from the exported SVG.
- Select **Download logo SVG**, **Download text SVG**, or **Download both together SVG** to save the current configuration.
- Adjust **Logo size** and **Text size** independently from 25% to 400%. Defaults are 150% logo and 100% text. Equal percentages match measured heights; 100% is 160 SVG units tall, with 24 units of outer padding. Preview and exports share the same layout and vertically center the logo and text.
- Exported SVGs embed the Cinzel font so no adjacent font file is needed. The embedded copy in `index.html` comes from the bundled `Cinzel.ttf`.

## Presets and ready-to-use assets

- **Default**: foreground `#18343c`, center dot `#17191b`.
- **Neon Lime**: foreground and center dot `#c5ff40`, intended for dark backgrounds. The dark editor preview is not included in exports.

Both presets use a transparent background, logo size **150%**, Saddle ink **50%**, and Point ink **75%**. Reset restores Default. Select either preset in the editor and then adjust any control.

`presets/default/` and `presets/neon-lime/` each contain six files: `logo.svg`, `text.svg`, `logo-text.svg`, and matching `.png` files. PNGs render at 2× SVG resolution with transparency preserved. The editor also offers PNG download buttons for custom configurations.

## Goodnotes video templates

Two standalone 16:9 PDF templates are available in [`templates/`](templates/):

- [Light template](templates/saddlepoint-template-light.pdf) uses the pale-yellow background and default foreground.
- [Dark template](templates/saddlepoint-template-dark.pdf) uses a dark background and neon-lime foreground.

Each PDF has two pages: an unboxed logo-only cover placeholder and a blank branded page for notes or diagrams. Neither page has a slide number.

To regenerate all assets, install Playwright and run `node scripts/export-presets.cjs`. Optionally set `BROWSER_EXECUTABLE` to an existing Chromium browser executable.
