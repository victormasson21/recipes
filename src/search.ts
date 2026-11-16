import type { Recipe, Tag } from "./recipe"

export type Filter = "all" | Tag

export type Result = { readonly recipe: Recipe; readonly matched: readonly string[] }

export const addTerm = (terms: readonly string[], raw: string): readonly string[] => {
  const term = raw.trim().toLowerCase()
  if (term === "" || terms.includes(term)) {
    return terms
  }
  return [...terms, term]
}

const matchedTerms = (recipe: Recipe, terms: readonly string[]): readonly string[] =>
  terms.filter((term) =>
    recipe.ingredients.some((ingredient) => ingredient.name.toLowerCase().includes(term)),
  )

const byRank = (a: Result, b: Result): number =>
  b.matched.length - a.matched.length || a.recipe.title.localeCompare(b.recipe.title)

export const search = (
  recipes: readonly Recipe[],
  terms: readonly string[],
  filter: Filter,
): readonly Result[] =>
  recipes
    .filter((recipe) => filter === "all" || recipe.tag === filter)
    .map((recipe) => ({ recipe, matched: matchedTerms(recipe, terms) }))
    .filter((result) => terms.length === 0 || result.matched.length > 0)
    .sort(byRank)
