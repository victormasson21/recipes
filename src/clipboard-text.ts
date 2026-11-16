import type { Recipe } from "./recipe"

export const missingText = (recipe: Recipe, ticked: readonly number[]): string =>
  recipe.ingredients
    .filter((_, index) => !ticked.includes(index))
    .map(({ name, amount }) => `${name} (${amount})`)
    .join("\n")
