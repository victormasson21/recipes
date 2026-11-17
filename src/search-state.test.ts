import { beforeEach, describe, expect, it, vi } from "vitest"
import { readSearchState, writeSearchState } from "./search-state"

const memoryStorage = (): Pick<Storage, "getItem" | "setItem"> => {
  const items = new Map<string, string>()
  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => void items.set(key, value),
  }
}

beforeEach(() => vi.stubGlobal("sessionStorage", memoryStorage()))

describe("search state", () => {
  it("is empty before anything is written", () => {
    expect(readSearchState()).toEqual({ terms: [], filter: "all" })
  })

  it("reads back what was written", () => {
    writeSearchState({ terms: ["tahini"], filter: "staples" })
    expect(readSearchState()).toEqual({ terms: ["tahini"], filter: "staples" })
  })

  it("falls back to empty on an unknown filter", () => {
    sessionStorage.setItem("search", JSON.stringify({ terms: [], filter: "weeknight" }))
    expect(readSearchState()).toEqual({ terms: [], filter: "all" })
  })
})
