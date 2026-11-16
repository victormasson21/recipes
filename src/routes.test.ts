import { describe, expect, it } from "vitest"
import { hrefTo, parseRoute } from "./routes"

describe("parseRoute", () => {
  it.each([
    ["", { screen: "search" }],
    ["#/", { screen: "search" }],
    ["#/r/beans", { screen: "recipe", id: "beans" }],
    ["#/r/beans/", { screen: "recipe", id: "beans" }],
    ["#/r/beans/shop", { screen: "shop", id: "beans" }],
    ["#/r/beans/cook", { screen: "cook", id: "beans" }],
    ["#/r/beans/eat", { screen: "search" }],
    ["#/r/", { screen: "search" }],
    ["#/nope", { screen: "search" }],
  ])("%s", (hash, route) => {
    expect(parseRoute(hash)).toEqual(route)
  })
})

describe("hrefTo", () => {
  it("round-trips every route", () => {
    for (const route of [
      { screen: "search" as const },
      { screen: "recipe" as const, id: "beans" },
      { screen: "shop" as const, id: "beans" },
      { screen: "cook" as const, id: "beans" },
    ]) {
      expect(parseRoute(hrefTo(route))).toEqual(route)
    }
  })
})
