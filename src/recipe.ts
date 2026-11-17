export type Tag = "staples" | "to-try"

export type Ingredient = { readonly name: string; readonly amount: string }

export type AddItem = { readonly name: string; readonly amount: string; readonly note?: string }

export type Step =
  | { readonly kind: "add"; readonly items: readonly AddItem[] }
  | { readonly kind: "wait"; readonly duration: string; readonly note?: string }

export type Source = {
  readonly url: string
  readonly site: string
  readonly title: string
  readonly image?: string
}

export type Recipe = {
  readonly id: string
  readonly title: string
  readonly tag: Tag
  readonly source?: Source
  readonly ingredients: readonly Ingredient[]
  readonly instructions: readonly string[]
  readonly steps: readonly Step[]
}

export const TAGS: readonly Tag[] = ["staples", "to-try"]

export const TAG_LABELS: Record<Tag, string> = { staples: "Staples", "to-try": "To try" }

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null

const isString = (value: unknown): value is string => typeof value === "string"

const isOptionalString = (value: unknown): value is string | undefined =>
  value === undefined || isString(value)

const isTag = (value: unknown): value is Tag => TAGS.some((tag) => tag === value)

const isIngredient = (value: unknown): value is Ingredient =>
  isRecord(value) && isString(value.name) && isString(value.amount)

const isAddItem = (value: unknown): value is AddItem =>
  isRecord(value) && isString(value.name) && isString(value.amount) && isOptionalString(value.note)

const isStep = (value: unknown): value is Step => {
  if (!isRecord(value)) {
    return false
  }
  switch (value.kind) {
    case "add":
      return Array.isArray(value.items) && value.items.length > 0 && value.items.every(isAddItem)
    case "wait":
      return isString(value.duration) && isOptionalString(value.note)
    default:
      return false
  }
}

const isSource = (value: unknown): value is Source =>
  isRecord(value) &&
  isString(value.url) &&
  isString(value.site) &&
  isString(value.title) &&
  isOptionalString(value.image)

const isRecipe = (value: unknown): value is Recipe =>
  isRecord(value) &&
  isString(value.id) &&
  isString(value.title) &&
  isTag(value.tag) &&
  (value.source === undefined || isSource(value.source)) &&
  Array.isArray(value.ingredients) &&
  value.ingredients.every(isIngredient) &&
  Array.isArray(value.instructions) &&
  value.instructions.every(isString) &&
  Array.isArray(value.steps) &&
  value.steps.length > 0 &&
  value.steps.every(isStep)

export function parseRecipe(raw: unknown, name: string): Recipe {
  if (!isRecipe(raw)) {
    throw new Error(`${name} is not a valid recipe`)
  }
  return raw
}
