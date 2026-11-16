import type { Recipe } from "./recipe"

export const recipeFiles: Readonly<Record<string, unknown>> = import.meta.glob("./recipes/*.json", {
  eager: true,
  import: "default",
})

const byTitle = (a: Recipe, b: Recipe): number => a.title.localeCompare(b.title)

export const recipes: readonly Recipe[] = Object.values(recipeFiles)
  .map((raw) => raw as Recipe)
  .sort(byTitle)

export const findRecipe = (id: string): Recipe | undefined => recipes.find((recipe) => recipe.id === id)
