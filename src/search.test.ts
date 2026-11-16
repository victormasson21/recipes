import { describe, expect, it } from "vitest"
import type { Recipe } from "./recipe"
import { addTerm, search } from "./search"

const recipe = (id: string, tag: Recipe["tag"], ...names: string[]): Recipe => ({
  id,
  title: id,
  tag,
  source: { url: "", site: "", title: "" },
  ingredients: names.map((name) => ({ name, amount: "" })),
  instructions: [],
  steps: [{ kind: "wait", duration: "" }],
})

const stew = recipe("Butter bean and carrot stew", "staples", "Butter beans", "Carrots")
const beans = recipe("Butter beans with tahini", "to-try", "Butter beans in water", "Tahini")
const noodles = recipe("Tahini noodles", "staples", "Tahini", "Noodles")
const all = [noodles, stew, beans]

describe("addTerm", () => {
  it("trims and lowercases", () => {
    expect(addTerm([], "  Butter Beans ")).toEqual(["butter beans"])
  })

  it("ignores empty and duplicate terms", () => {
    expect(addTerm(["tahini"], "   ")).toEqual(["tahini"])
    expect(addTerm(["tahini"], "Tahini")).toEqual(["tahini"])
  })
})

describe("search", () => {
  it("lists every recipe alphabetically when there are no terms", () => {
    expect(search(all, [], "all").map((r) => r.recipe.id)).toEqual([stew.id, beans.id, noodles.id])
  })

  it("filters by tag", () => {
    expect(search(all, [], "to-try").map((r) => r.recipe.id)).toEqual([beans.id])
  })

  it("ranks by match count then title and drops non-matches", () => {
    const results = search(all, ["butter beans", "tahini"], "all")
    expect(results.map((r) => r.recipe.id)).toEqual([beans.id, stew.id, noodles.id])
    expect(results[0]?.matched).toEqual(["butter beans", "tahini"])
    expect(results[1]?.matched).toEqual(["butter beans"])
  })

  it("matches substrings case-insensitively", () => {
    expect(search(all, ["carrot"], "all").map((r) => r.recipe.id)).toEqual([stew.id])
  })

  it("returns nothing when no recipe matches", () => {
    expect(search(all, ["saffron"], "all")).toEqual([])
  })
})
