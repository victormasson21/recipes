# Cooking app: transition brief, mint and tangerine to Bohemian

This brief describes how to restyle the app from the mint and tangerine design (the earlier `design-brief.md`) to the Bohemian design. It is a visual change only.

## What does not change

- Screens, layout and content order on all four screens.
- Behaviour: swipe to mark a step done, the 60% opacity done state, auto-scroll to the next step, ticking ingredients, the copy button, the 24-hour "on" recipe.
- Screen padding (20px), gaps between cards, the 2px ink outline weight, 44px minimum touch targets, 50px bottom-bar buttons.
- All wording, apart from letter case where noted below.

If the build uses design tokens, most of this is a token swap plus the handful of shape and type changes listed under "Component changes".

## Files in this folder

| File | What it is |
| --- | --- |
| `search.png`, `recipe.png`, `shop.png`, `cook.png` | Each Bohemian screen at 390 × 844 (2x) |
| `recipe-full.png`, `cook-full.png` | The two long screens at full scroll length |
| `search.html`, `recipe.html`, `shop.html`, `cook.html` | Static reference markup with inline styles. Source of truth for exact values. Interactions are not wired up |
| `motif.svg` | The arch and sun motif used beside two screen titles |

Where this brief and the HTML disagree, the HTML wins.

## Design intent

Warm, earthy and calm: cream paper, ochre and terracotta, a fine high-contrast serif against a plain sans, and arch shapes. It should still read at a glance in Cook mode, so the decorative touches stay small and the content layout is untouched.

## Colour tokens

| Token | Mint (old) | Bohemian (new) | Notes |
| --- | --- | --- | --- |
| `ground` | `#D8F0E8` | `#EFE4D2` | App background, chips in fields, row dividers inside cards |
| `surface` | `#FFFFFF` | `#FBF6EC` | Cards, search field, unselected filter pills |
| `ink` | `#0F2E2A` | `#2B2622` | Text, icons, outlines, selected pill, "Next" badge, checkbox fill |
| `muted` | `#3F5F58` | `#6B5D52` | Secondary text, ticked items |
| `accent` | `#FF8A3D` | `#DDA24A` | Timers, Cook button, "On now" banner, instruction numbers |
| `accent-tint` | `#FFD9BF` | `#F3D9AE` | "To try" tag |
| `line` | `#B5DDD0` | `#DCCDB4` | Bottom bar border, upcoming progress segments, image placeholder |
| `on-ink` | `#FFFFFF` | `#FBF6EC` | Text on ink fills |
| `staples-tint` (new) | used `ground` | `#D9DEC9` | "Staples" tag now has its own sage tint |
| `terracotta` (new) | none | `#C2714F` | Completed progress segments and the motif only |

Rules:

- Text on `accent` (ochre) is always `ink`. Cream or white text on ochre fails contrast.
- `terracotta` is decorative. Never put text on it.
- Completed progress segments move from `accent` to `terracotta`. Everything else that was `accent` stays `accent`.

## Typography

Both new families are on Google Fonts.

- **Fraunces → Cormorant Garamond** (weight 600, roman and italic).
- **Figtree → DM Sans** (weights 400 to 700).

Cormorant Garamond looks much smaller than Fraunces at the same pixel size, so every serif size goes up. Do not carry the old sizes over.

**Numerals:** every element set in Cormorant Garamond that can contain a digit needs `font-variant-numeric: lining-nums`. Without it the font's default old-style "1" looks like a capital "I" ("1 minute" reads as "I minute").

| Role | Mint (old) | Bohemian (new) |
| --- | --- | --- |
| Search title | Fraunces 32 / 38 | Cormorant 42 / 42 |
| Recipe and Shop title | Fraunces 30 / 35 | Cormorant 36 / 36 |
| Cook title | Fraunces 27 / 32 | Cormorant 34 / 34 |
| Section heading | Fraunces 22 / 28 | Cormorant 28 / 30 |
| Timer duration | Fraunces 24 / 28 | Cormorant 30 / 30 |
| "On now" recipe name | Fraunces 19 / 24 | Cormorant 25 / 26 |
| Cook ingredient name | Figtree 17 / 24, 700 | DM Sans 17 / 24, 600 |
| Cook ingredient amount | Fraunces 17 / 24, 500 | Cormorant italic 21 / 24, 600 |
| Amounts in Recipe and Shop lists | Figtree 14 / 20, muted | Cormorant italic 19 / 24, 600, ink (muted when ticked) |
| Match count on results | Figtree 14, 700 | Cormorant italic 20 / 24, 600 (ink for a full match, muted for partial) |
| Result card title | Figtree 16 / 22, 700 | DM Sans 16 / 22, 600 |
| Body, list items, notes | Figtree | DM Sans, same sizes |
| Instruction number | Fraunces 15 | Cormorant 18 |

Italic is used only for amounts and counts.

### Small labels become spaced capitals

These keep their wording but change to uppercase with wide tracking. Apply the case in CSS, not in the strings.

| Element | Mint (old) | Bohemian (new) |
| --- | --- | --- |
| Overlines ("Add", "On now") | 11px, 700, 1.5px tracking | 11px, 600, 2.5px tracking |
| "Search by ingredient" label | 13px, 600, sentence case | Overline style |
| "7 of 12 ticked" count | 14px, 700, sentence case | Overline style, ink |
| Buttons (Shop, Cook) | 16px, 700, sentence case | 13px, 700, uppercase, 2px tracking |
| Copy button | 16px, 700 | 13px, 700, uppercase, 1.2px tracking |
| Filter pills | 14px, 600 | 12px, 600, uppercase, 1.5px tracking |
| Tags ("To try", "Staples") | 12px, 700 | 10px, 700, uppercase, 1.5px tracking |
| "Next" and "Done" badges | 12px, 700 | 11px, 600, uppercase, 1.5px tracking |
| Cook header links ("Recipe / Shopping") | 15px, 600, underlined | 12px, 600, uppercase, 2px tracking, underlined |
| "Open original" link | 15px, 600, underlined | 12px, 600, uppercase, 2px tracking, underlined |

## Component changes

| Component | Mint (old) | Bohemian (new) |
| --- | --- | --- |
| Card radius | 22px | 26px |
| Card padding | 14px × 18px | 14px × 20px |
| Search field radius | 22px | 26px |
| Timer step shape | Pill, 30px radius | Arch top: `48px 48px 18px 18px` |
| Timer step padding | 12px × 18px | 18px top, 20px sides, 14px bottom |
| "On now" banner shape | 22px radius | Arch top: `48px 48px 18px 18px`, padding 20px 16px 14px 22px |
| Progress segments | 6px tall pills, 5px gap | 14px tall arches (`999px 999px 0 0`), 6px gap |
| Progress colours | done `accent`, current `ink`, upcoming `line` | done `terracotta`, current `ink`, upcoming `line` |
| Instruction number badge | 28px circle | 28 × 32px arch (`999px 999px 6px 6px`) |
| Icon stroke | 2px (tick 2.5px) | 1.75px (tick 2px) |
| Buttons, chips, pills, tags | Fully rounded | Unchanged |
| Current step outline | 2px `ink` | Unchanged |

### New: title motif

A small arch with a rising sun (`motif.svg`), decorative and hidden from assistive tech.

- **Search**: 40 × 50px, right of the "Recipes" title, bottom-aligned with it.
- **Cook**: 64 × 80px, right of the recipe title, bottom-aligned with it. The title wraps in the remaining width.
- Not used on Recipe or Shop.

## Screen notes

- **Search**: the title row gains the motif. The "On now" banner becomes an ochre arch. Match counts become serif italic. "Staples" tags turn sage.
- **Recipe**: amounts in the ingredient list become serif italic in ink. Instruction numbers sit in small ochre arches. The image placeholder uses `line`.
- **Shop**: amounts become serif italic and follow the row state (ink, or muted when ticked). The checkbox fill is `ink`.
- **Cook**: timers become ochre arches with a larger serif duration. The progress strip becomes a row of arches. The item name stays on the left with the amount on the right.

## Suggested order

1. Swap the colour tokens and add the two new ones.
2. Swap the font families, then apply the new serif sizes and the lining-numerals setting.
3. Apply the spaced-capitals label style.
4. Update radii and the three arch shapes (timer, "On now" banner, instruction badge).
5. Rebuild the progress strip segments.
6. Add the motif to Search and Cook.
7. Compare each screen against its PNG.

## Checks before calling it done

- No digit set in the serif reads as a letter.
- No cream or white text sits on ochre or terracotta.
- Done steps still dim to 60% and show the tick and "Done".
- The uppercase "Copy N missing" label fits on one line at 390px wide.
- Nothing from the mint palette or the old fonts remains.

## Still not designed

Same gaps as before, in either style: empty states, the all-done state in Cook mode, loading and offline states, a dark theme, and tablet or desktop layouts.
