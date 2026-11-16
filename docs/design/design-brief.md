# Cooking app: design brief

A personal recipe PWA with four screens: Search, Recipe, Shop and Cook. This brief covers the visual design and interaction behaviour only. Data shape, storage, routing and the recipe-import tool are out of scope here.

## Files in this folder

| File | What it is |
| --- | --- |
| `search.png`, `recipe.png`, `shop.png`, `cook.png` | Each screen at 390 × 844 (2x), as it looks on first load |
| `recipe-full.png`, `cook-full.png` | The two long screens at full scroll length |
| `search.html`, `recipe.html`, `shop.html`, `cook.html` | Static HTML of each screen with inline styles. Use these as the source of truth for exact values. They are reference markup, not production code, and the interactions are not wired up |

Where this brief and the HTML disagree, the HTML wins.

## Design intent

Cool and minimal, with one warm colour for energy. The app is used with messy hands and half attention, so everything in Cook mode must read at a glance: what to add, how much, and how long to wait.

- One accent only. Tangerine marks time (timers), the primary action (Cook) and the active recipe. Do not use it for decoration.
- Soft shapes: large radii, pills, white cards on a mint ground. No shadows, no gradients.
- No emoji. Structure comes from layout and type.
- Two typefaces with distinct jobs (see Typography).

## Colour

| Token | Hex | Use |
| --- | --- | --- |
| `ground` | `#D8F0E8` | App background, chips inside white fields, row dividers inside white cards |
| `surface` | `#FFFFFF` | Cards, search field, unselected filter pills |
| `ink` | `#0F2E2A` | All primary text, icons, 2px outlines, selected filter pill, "Next" badge |
| `muted` | `#3F5F58` | Secondary text: prep notes, captions, amounts in lists, ticked items |
| `accent` | `#FF8A3D` | Timer steps, Cook button, "On now" banner, completed progress segments, instruction numbers |
| `accent-tint` | `#FFD9BF` | "To try" tag |
| `line` | `#B5DDD0` | Bottom bar top border, upcoming progress segments, image placeholder |

Rules:

- Text on `accent` is always `ink`, never white.
- White text appears only on `ink` fills (selected filter, "Next" badge).
- Tags: "To try" uses `accent-tint`, "Staples" uses `ground`. Both have `ink` text.

## Typography

Both families are on Google Fonts.

- **Fraunces** (serif, weights 500 and 600): screen titles, section headings, timer durations, the "On now" recipe name, amounts in Cook mode, instruction numbers.
- **Figtree** (sans, weights 400 to 700): everything else.

| Role | Family | Size / line height | Weight |
| --- | --- | --- | --- |
| Screen title (Search) | Fraunces | 32 / 38 | 600 |
| Screen title (Recipe, Shop) | Fraunces | 30 / 35 | 600 |
| Screen title (Cook) | Fraunces | 27 / 32 | 600 |
| Section heading | Fraunces | 22 / 28 | 600 |
| Timer duration | Fraunces | 24 / 28 | 600 |
| "On now" recipe name | Fraunces | 19 / 24 | 600 |
| Cook ingredient name | Figtree | 17 / 24 | 700 |
| Cook ingredient amount | Fraunces | 17 / 24 | 500 |
| Body, list items | Figtree | 16 / 24 | 400 to 500 |
| Result card title | Figtree | 16 / 22 | 700 |
| Buttons | Figtree | 16 | 700 |
| Notes, secondary lines | Figtree | 14 / 20 | 400 to 500 |
| Captions, tags, badges | Figtree | 12 to 13 / 16 | 600 to 700 |
| Overline ("ADD", "ON NOW") | Figtree | 11 / 16, uppercase, 1.5px tracking | 700 |

Titles use slight negative tracking (-0.2 to -0.4px).

## Shape and spacing

- Screen side padding: 20px.
- Cards: white, 22px radius, 14px × 18px padding, no border unless active.
- Timer steps: 30px radius, 12px × 18px padding.
- Buttons, chips, tags, filter pills, badges: fully rounded (999px).
- Outlines are 2px `ink`. Dividers inside cards are 1px `ground`.
- Gap between stacked cards: 8 to 10px. Gap between sections: 16 to 20px.
- Minimum touch target: 44px. Bottom-bar buttons are 50px tall.
- Icons: simple 2px stroke line icons, round caps, in the current text colour.

## Screens

### 1. Search

- Title "Recipes".
- **On now banner**: a tangerine card shown only while a recipe is active. It shows the recipe name, current step and time remaining, and opens Cook mode. This is how the user gets back to an active recipe.
- **Ingredient search**: a white field with a 2px ink outline. Each ingredient entered becomes a mint chip with a remove icon. More ingredients narrow and re-rank the results.
- **Filters**: All / Staples / To try pills. The selected pill is ink with white text, the others are white.
- **Results**: one white card per recipe, best match first. Each shows the title, its tag, which searched ingredients it has, and a match count ("2 of 2"). A full match shows the count in ink bold, partial matches in muted.

### 2. Recipe

- Back arrow, tag, title.
- **Link preview card**: image, source site, original title and an "Open original" link.
- **Ingredients**: one white card, a row per ingredient with the name on the left and the amount on the right in muted.
- **Instructions**: numbered steps on the mint ground. Numbers sit in tangerine circles.
- **Bottom bar** (pinned): Shop (outlined) and Cook (tangerine). Content scrolls behind it.

### 3. Shop

- Back arrow, title "Shopping list", recipe name, running count ("7 of 12 ticked").
- **List**: one white card, a row per ingredient with a checkbox, name and amount. A ticked row turns muted with a strikethrough. The checkbox fill is ink.
- **Bottom bar** (pinned): "Copy N missing" (outlined, with a copy icon) and Cook (tangerine). The copy button label shows the number of unticked items, changes to "Copied" after a tap, and reads "Nothing missing" when everything is ticked.

### 4. Cook

- Header: back arrow on the left, "Recipe / Shopping" text links on the right.
- Title, then a **progress strip** with one segment per step: tangerine for done, ink for the current step, `line` for upcoming.
- Caption with the done count and the swipe hint.
- **Steps** alternate between two kinds:
  - **Add step**: a white card with an "ADD" overline and one row per ingredient. The name is on the left in bold sans with any prep note beneath it in muted. The amount is on the right in serif, right-aligned. Name and amount are the same size and should feel equally important.
  - **Wait step**: a tangerine pill with a timer icon, the duration in large serif, and an optional note beneath.
- **Step states**:
  - Upcoming: as described above.
  - Current: a 2px ink outline and an ink "Next" badge.
  - Done: the whole step at 60% opacity with a tick and "Done" in place of the badge.

## Interaction

- **Marking a step done**: swipe the step left. It fades to 60% opacity and the list scrolls so the next step is at the top. Swiping right undoes it. The opacity change takes about 200ms.
- **Swipe area**: only react to swipes that start on a step card, so the gesture does not fight the system edge swipes.
- **Activating a recipe**: tapping Shop or Cook on the Recipe screen makes that recipe "on" for 24 hours, which is what drives the On now banner.
- **Persistence, as seen by the user**: the active recipe, ticked ingredients and done steps are all still there after closing and reopening the app.
- **Screen flow**: Search → Recipe → Shop or Cook. Shop and Cook link to each other. Back arrows step back up.

## Accessibility

- The text and background pairs above are chosen to meet 4.5:1 contrast at full opacity. Keep `ink` on `accent` and avoid white on `accent`. Done steps at 60% opacity fall below that on purpose, as they are finished content.
- State is never shown by colour alone: done steps have a tick and label, the current step has a badge, ticked items have a strikethrough.
- Use real buttons, links, inputs and labels. Icon-only controls need an accessible name.
- Swipe needs a non-gesture alternative for keyboard and assistive tech users. This is not designed yet (see Open questions).

## PWA notes that affect layout

- Pinned bottom bars need extra bottom padding for the home indicator (safe-area inset). The designs leave 20px, add the inset on top.
- There is no browser chrome when installed, so every screen below Search keeps its own back arrow.
- Cook mode should keep the screen awake where the device allows it.

## Not designed yet

- Empty states: no search results, no recipes saved, no active recipe.
- The finished state in Cook mode when all steps are done.
- Loading and offline states.
- A dark theme.
- Tablet and desktop layouts. The designs are phone-only at 390px wide.

## Open questions

- Should done steps in Cook mode collapse to save space, or stay full height at 60% opacity as drawn?
- What is the non-swipe way to mark a step done?
- Should "Recipe" in the Cook header open the Recipe screen (as drawn) or the original source site?
- Should the 24-hour timer reset when the user returns to an active recipe?

## Sample content

The recipe, search results and step text in the screens are sample content. The link preview shows placeholders for the source site and title.
