# SaddlePoint radial delta logo editor

A standalone browser app for the selected D22 radial delta mark. Open `index.html` directly in a browser. The app has separate controls for contour, background, and center-dot colours; six-digit hex entry; separate Saddle and Point ink-strength sliders; a Cinzel wordmark preview; a transparent-background export option; and SVG download.

## Source mark

`D22-source.svg` is the original radial delta mark with the initial navy contour and red center dot. `index.html` contains the editable path data inline. `Cinzel.ttf` supplies the wordmark font and is distributed under the included SIL Open Font License. The app requires no build step or JavaScript libraries.

## Use

- Adjust colours with the pickers or enter a hex code.
- Enable transparent background to omit the background rectangle from the exported SVG.
- Select **Download SVG** to save the current colour configuration.
