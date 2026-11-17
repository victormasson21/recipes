# Recipes

Personal recipe PWA: search by ingredient, shop, cook. Vite, React, TypeScript, pnpm. Recipes are JSON files under `src/recipes/`; the 24-hour session lives in the browser's `localStorage`; there is no backend. Visual design: `docs/design/design-brief.md` as restyled by `docs/design/transition-brief.md` (Bohemian), exact values in `docs/design/screens/*.html`. Spec and plan: `docs/superpowers/`.

## Git

- Commit directly on `main`. This repo has one maintainer and no outside contributors, so a branch and PR add nothing. Revert to branches and PRs if the repo ever takes outside contributions.
- Push as the personal GitHub account: `GH_TOKEN=$(gh auth token --user victormasson21) git push`. The active `gh` account is a work account with no access here.
- A push to `main` deploys to `recipes.vicm.dev` through `.github/workflows/deploy.yml`.

## Commands

- `pnpm dev` — dev server on `localhost:5173`
- `pnpm test` — Vitest on the pure logic and on every recipe file's shape
- `pnpm lint` — oxlint
- `pnpm build` — type-check, then build `dist` with the PWA manifest, icons and service worker
- `/add-recipe <url or text>` — turn a recipe into a `src/recipes/<id>.json` file and commit it

## Data contract

`Recipe` in `src/recipe.ts` is the shape of every file under `src/recipes/`. `pnpm test` parses each file and names a bad one. `Session` in `src/session.ts` is the `localStorage` key `session`; it holds ingredient and step indexes, so reordering a recipe's ingredients or steps shifts a live session.
