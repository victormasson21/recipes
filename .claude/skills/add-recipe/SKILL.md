---
name: add-recipe
description: Turn a recipe (a URL, pasted text, or a PDF the user points at) into the app's Recipe JSON and a plain-text Cook sequence. Use when the user says "add recipe", "import this recipe", "/add-recipe <url>", or pastes a recipe and asks for the cook format. On "add", writes src/recipes/<id>.json and commits it.
---

# Add recipe

Input: `$ARGUMENTS` is a URL, pasted recipe text, or a path to a PDF. No argument: ask for one.

## 1. Read the source

- URL: fetch the page. Take `og:image`, the site name (`og:site_name`, else the domain), and the page title.
- PDF or pasted text: read it. Set `source.url` to the URL printed in the PDF footer or given by the user, and leave `image` out when there is none.
- A page that refuses the fetch: ask the user for a PDF or the text.

## 2. Build the Recipe object

The shape is `Recipe` in `src/recipe.ts`. Rules:

- `id`: kebab-case from the recipe title, without the author's name. The file is `src/recipes/<id>.json`.
- `title`: the dish, in sentence case, without the author ("Tahini beans with basil and pine nuts").
- `tag`: `"to-try"` unless the user says `"staples"`.
- `source.title`: the page's own title. `source.site`: "The Guardian", "NYT Cooking", and so on.
- `ingredients`: the source's ingredient list, in its order. `name` is the ingredient alone, in sentence case; `amount` holds the quantity and the purchase note ("2 × 400g tins", "1, for zest", "to serve"). This is the shopping list, so one row per thing to buy.
- `instructions`: the source's method, one string per paragraph or numbered step, written in your own words and kept short.
- `steps`: the Cook sequence, derived from the method in order.
  - An `add` step groups every ingredient that goes in at the same moment. `name` is the ingredient as it goes in ("Lemon zest", not "Lemons"), `amount` the quantity used at that moment, `note` the prep or the action ("peeled and finely chopped", "stir to mix", "in a small dry pan").
  - A `wait` step follows every timed or watched action. `duration` is the time ("8 minutes", "4 to 5 minutes") or, when the source gives none, the cue ("until the leaves crackle"). `note` is what to watch for or do meanwhile.
  - Serving items ("Parmesan, to serve") go in a last `add` step with `note: "to serve"`.
  - Pantry basics the source assumes (water, salt to taste) appear in `steps` where they go in, and in `ingredients` only when the source lists them.

## 3. Print the Cook sequence

Print the steps as plain text so they work outside the app: for an add step one line per item, `Name (amount, note)`; for a wait step one line, `Wait: duration (note)`; a blank line between steps. Then print the JSON.

## 4. On "add"

Only when the user says add:

1. Write `src/recipes/<id>.json`.
2. Run `pnpm test`. The recipe-files test parses every file; fix the file until it passes.
3. Commit on `main`: `feat(recipes): add <title>`.
4. Offer the push: `GH_TOKEN=$(gh auth token --user victormasson21) git push`.
