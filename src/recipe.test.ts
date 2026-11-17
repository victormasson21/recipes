import { describe, expect, it } from "vitest"
import { parseRecipe } from "./recipe"
import { recipeFiles } from "./recipes"

const sample = {
  id: "sample",
  title: "Sample",
  tag: "staples",
  source: { url: "https://example.com", site: "Example", title: "Sample" },
  ingredients: [{ name: "Salt", amount: "1 tsp" }],
  instructions: ["Add the salt."],
  steps: [
    { kind: "add", items: [{ name: "Salt", amount: "1 tsp", note: "flaky" }] },
    { kind: "wait", duration: "2 minutes" },
  ],
}

describe("parseRecipe", () => {
  it("accepts a valid recipe", () => {
    expect(parseRecipe(sample, "sample")).toBe(sample)
  })

  it("accepts a recipe without a source", () => {
    const { source: _source, ...noSource } = sample
    expect(parseRecipe(noSource, "no-source")).toBe(noSource)
  })

  it("rejects a source without a url", () => {
    const bad = { ...sample, source: { site: "Example", title: "Sample" } }
    expect(() => parseRecipe(bad, "bad")).toThrow()
  })

  it("rejects a recipe without steps", () => {
    const { steps: _steps, ...noSteps } = sample
    expect(() => parseRecipe(noSteps, "no-steps.json")).toThrow("no-steps.json is not a valid recipe")
  })

  it("rejects an unknown step kind", () => {
    const bad = { ...sample, steps: [{ kind: "stir", duration: "1 minute" }] }
    expect(() => parseRecipe(bad, "bad")).toThrow()
  })

  it("rejects an unknown tag", () => {
    expect(() => parseRecipe({ ...sample, tag: "weeknight" }, "bad")).toThrow()
  })
})

describe("recipe files", () => {
  it.each(Object.entries(recipeFiles))("%s is a valid recipe", (path, raw) => {
    const recipe = parseRecipe(raw, path)
    expect(path).toBe(`./recipes/${recipe.id}.json`)
  })
})
