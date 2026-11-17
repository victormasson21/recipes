import { TAGS } from "./recipe"
import type { Filter } from "./search"

export type SearchState = { readonly terms: readonly string[]; readonly filter: Filter }

const STORAGE_KEY = "search"
const EMPTY: SearchState = { terms: [], filter: "all" }

const isFilter = (value: unknown): value is Filter => value === "all" || TAGS.some((tag) => tag === value)

const isSearchState = (value: unknown): value is SearchState =>
  typeof value === "object" &&
  value !== null &&
  Array.isArray((value as SearchState).terms) &&
  (value as SearchState).terms.every((term) => typeof term === "string") &&
  isFilter((value as SearchState).filter)

export function readSearchState(): SearchState {
  const stored = sessionStorage.getItem(STORAGE_KEY)
  if (stored === null) {
    return EMPTY
  }
  const parsed: unknown = JSON.parse(stored)
  return isSearchState(parsed) ? parsed : EMPTY
}

export function writeSearchState(state: SearchState): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
