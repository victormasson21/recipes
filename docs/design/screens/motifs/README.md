# Cooking app: food motifs

Four small decorative illustrations in the Bohemian style: a herb sprig, eggs, a chilli and a pepper mill. The app shows one at random each time.

## What's here

| Path | Format | Use it for |
| --- | --- | --- |
| `svg/*.svg` | Standalone SVG, one per motif | Anything that takes an image file: `<img>`, CSS backgrounds, design tools, print |
| `sprite.svg` | One SVG with four `<symbol>`s (`motif-herb-sprig`, `motif-eggs`, `motif-chilli`, `motif-pepper-mill`) | Inline once in the page, then `<svg><use href="#motif-eggs"/></svg>` |
| `motifs.js` | ES module exporting `motifs` and `randomMotif()` | Web apps: each entry has an inline `svg` string ready to insert |
| `motifs.json` | The same data as plain JSON | Any other language or build step |
| `png/*@1x.png`, `@2x`, `@4x` | Transparent PNG at 120 × 150, 240 × 300 and 480 × 600 | Places that cannot use SVG (email, some native views, social images) |

Prefer SVG wherever it is supported. It stays sharp at any size.

## Geometry

- Every motif is drawn on the same 120 × 150 canvas (4:5), so they swap without layout shift.
- Set either width or height and let the other follow.
- Sizes used in the app: 40 × 50 beside the Search title, 64 × 80 beside the Cook title.
- Below about 40px wide the pepper mill starts to lose its shape. The herb sprig and eggs hold up best when small.

## Colour

The fills are fixed and match the Bohemian palette:

| Colour | Hex |
| --- | --- |
| Charcoal | `#2B2622` |
| Terracotta | `#C2714F` |
| Ochre | `#DDA24A` |
| Sage | `#9AA58A` |
| Sand | `#DCCDB4` |
| Cream | `#FBF6EC` |

They are designed for the cream backgrounds (`#EFE4D2` and `#FBF6EC`). On a dark background the charcoal shapes will disappear.

## Showing one at random

- Pick a motif when a screen that shows one is opened, and keep it for as long as that screen stays open. Do not change it on re-render or scroll.
- `randomMotif(lastId)` skips the one shown last, so the same motif never appears twice in a row.

```js
import { randomMotif } from "./motifs.js";

const motif = randomMotif(previousId);
container.innerHTML = motif.svg; // then size the <svg> with CSS
```

## Accessibility

The motifs are decoration. Hide them from assistive tech (`aria-hidden="true"`, or an empty `alt` on an `<img>`) and never make one the only way to convey something.
