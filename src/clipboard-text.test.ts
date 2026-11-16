import { expect, it } from "vitest"
import type { Recipe } from "./recipe"
import { missingText } from "./clipboard-text"

const recipe: Recipe = {
  id: "beans",
  title: "Beans",
  tag: "staples",
  source: { url: "", site: "", title: "" },
  ingredients: [
    { name: "Tahini", amount: "3 tbsp" },
    { name: "Lemon", amount: "1" },
    { name: "Salt", amount: "1 tsp" },
  ],
  instructions: [],
  steps: [{ kind: "wait", duration: "" }],
}

it("lists unticked ingredients in order, one per line", () => {
  expect(missingText(recipe, [1])).toBe("Tahini (3 tbsp)\nSalt (1 tsp)")
})

it("is empty when everything is ticked", () => {
  expect(missingText(recipe, [0, 1, 2])).toBe("")
})
