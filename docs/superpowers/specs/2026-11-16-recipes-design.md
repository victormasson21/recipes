# Recipes: design

Personal recipe PWA at `recipes.vicm.dev`. Four screens: Search, Recipe, Shop, Cook. One maintainer, no backend, no accounts. Visual design: `docs/design/design-brief.md`, restyled by `docs/design/transition-brief.md`, and the reference HTML under `docs/design/screens/`; the HTML wins on exact values.

## Intent

Cook from a phone with messy hands and half attention. Pick a recipe by what is in the fridge, shop for what is missing, then follow the steps as a plain sequence: what to add, how much, how long to wait.

## Goals

- Find a recipe by one or more ingredients.
- Shop: tick ingredients, copy the missing ones.
- Cook: swipe steps done, the list follows the current step, state survives closing the app.
- Add a recipe from a link with a Claude skill; a push deploys it.

## Non-goals

- Editing recipes in the app. Recipes are files in the repo.
- Export and import. The only stored data is a 24-hour session.
- Several active recipes at once.
- Dark theme, tablet and desktop layouts. Phone layout, centred on wider screens.
- Timers that count down. A wait step shows its duration; the user watches the clock.

## Anti-goals

- A step that needs a second read in Cook mode.
- A second accent colour.

## Constraints

- Vite, React, TypeScript strict, pnpm, oxlint, Vitest on the pure logic. Setup copied from `counters`.
- `vite-plugin-pwa`, `registerType: "autoUpdate"`, standalone display, offline use. Icons 192 and 512 in `any` and `maskable`, apple-touch-icon, favicon.
- Vite `base` stays `/`. Hash routes, so GitHub Pages needs no fallback.
- Fonts self-hosted through `@fontsource` so the installed app works offline.
- Commits go on `main`. Push with the `victormasson21` token.

## Approaches

**Recipes as repo data, session in `localStorage`** (chosen). The skill writes a JSON file and commits; the build bundles every file under `src/recipes/`. The app never writes recipes. Simplest, and the data is versioned.

**Recipes in `localStorage` with an in-app editor.** Needs an editor and an export flow; the skill would have nothing to commit. Rejected.

**Hash routing without a router library** (chosen) over `react-router`. Four routes, one `hashchange` listener.

## Data

### Recipe (`src/recipes/<id>.json`)

```ts
type Tag = "staples" | "to-try"

type Ingredient = { name: string; amount: string }

type AddItem = { name: string; amount: string; note?: string }

type Step =
  | { kind: "add"; items: AddItem[] }
  | { kind: "wait"; duration: string; note?: string }

type Recipe = {
  id: string
  title: string
  tag: Tag
  source: { url: string; site: string; title: string; image?: string }
  ingredients: Ingredient[]
  instructions: string[]
  steps: Step[]
}
```

- `id` is the file name without `.json`, kebab-case.
- `ingredients` is the shopping list, in the source's order. `amount` is free text ("2 × 400g tins").
- `instructions` is the source's prose, one string per numbered step, shown on the Recipe screen.
- `steps` is the Cook sequence. Add steps group every ingredient that goes in at the same moment. `note` is the prep ("peeled and finely chopped"). A wait step's `duration` is free text ("4 to 5 minutes"), `note` is what to watch for.
- `source.image` is the page's `og:image` URL, loaded from the source site. Offline, the placeholder shows.
- A Vitest test parses every file under `src/recipes/` with `parseRecipe(raw: unknown): Recipe` and fails the build on a bad file.

### Session (`localStorage` key `session`)

```ts
type Session = {
  recipeId: string
  activatedAt: number
  ticked: number[]
  done: number[]
}
```

- `ticked` holds ingredient indexes, `done` holds step indexes.
- Tapping Shop or Cook on the Recipe screen activates the recipe. Activating a different recipe replaces the session.
- Every visit to Shop or Cook sets `activatedAt` to now. A session older than 24 hours is dropped on read.
- The current step is the first index not in `done`.

## Screens

### Search (`#/`)

- Title "Recipes". The On now banner shows while a session exists: recipe title, "Step N of M · stays on for H more hours", opens Cook.
- Ingredient field: typing a word and pressing Enter or comma adds a chip; a chip's button removes it. Matching is case-insensitive substring on ingredient names.
- Filters All / Staples / To try.
- Results: with no chip, every recipe in the filter, alphabetical, caption "N recipes". With chips, recipes with at least one match, ranked by match count then title, caption "N recipes, best match first". Each card shows the title, tag, "Has a, b" and "k of n", bold ink on a full match, muted otherwise.
- Empty states: "No recipes match" with chips, "No recipes yet" without.

### Recipe (`#/r/<id>`)

- Back to Search. Tag, title, link preview card (image or placeholder, site, source title, "Open original" in a new tab), ingredients card, numbered instructions.
- Bottom bar: Shop (outlined) and Cook (accent). Either activates the recipe and opens its screen.
- An unknown id shows "Recipe not found" with a link back to Search.

### Shop (`#/r/<id>/shop`)

- Back to Recipe. Title "Shopping list", recipe title, "T of N ticked".
- One checkbox row per ingredient. Ticked rows are muted with a strikethrough.
- Bottom bar: copy button and Cook. The copy button reads "Copy K missing", "Copied" for two seconds after a tap, "Nothing missing" when all are ticked. It copies one `name (amount)` line per unticked ingredient.

### Cook (`#/r/<id>/cook`)

- Header: back to Recipe, links "Recipe" (the source URL, new tab) and "Shopping".
- Title, progress strip (accent done, ink current, line upcoming), caption "D of M done. Swipe a step left when it's done, right to undo."
- Steps as designed. The current step carries an ink "Next" badge which is a button that marks it done. A done step carries a tick and "Done", a button that undoes it. Swipe left on a step marks it done, swipe right undoes. A swipe is a horizontal pointer move of at least 60px that started on the step.
- After a step is marked done, and when the screen opens, the current step scrolls to the top of the list.
- When every step is done, a last card reads "All done" with a "Finish" button that clears the session and opens Search.
- The screen holds a wake lock while open and re-requests it when the tab becomes visible.

## Add-recipe skill

`.claude/skills/add-recipe/SKILL.md`, invoked as `/add-recipe <url or text>`.

1. Read the source: fetch the URL, or read a pasted recipe or a PDF the user points at.
2. Produce the `Recipe` object. Steps follow the source's instructions in order; one add step per moment ingredients go in, one wait step per timed action.
3. Print the Cook sequence as plain text, one line per item, blank line between steps, so it is usable outside the app.
4. On "add": write `src/recipes/<id>.json`, run `pnpm test`, commit `feat(recipes): add <title>`.

## Seed recipes

- Meera Sodha, tahini beans with basil and pine nuts (Guardian)
- Meera Sodha, vegan Malaysian dal curry (Guardian)
- Crisp gnocchi with Brussels sprouts and brown butter (NYT Cooking)

## Left to the builder

- Exact component split and CSS module names.
- Icon artwork, within the brief's palette and "no emoji" rule.
- How the swipe gesture is implemented, as long as it does not fight vertical scrolling.
