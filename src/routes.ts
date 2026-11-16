export type Screen = "recipe" | "shop" | "cook"

export type Route = { readonly screen: "search" } | { readonly screen: Screen; readonly id: string }

const SCREENS: readonly Screen[] = ["recipe", "shop", "cook"]

const isScreen = (value: string | undefined): value is Screen => SCREENS.some((s) => s === value)

export function parseRoute(hash: string): Route {
  const [, prefix, id, screen] = hash.replace(/^#/, "").split("/")
  if (prefix !== "r" || id === undefined || id === "") {
    return { screen: "search" }
  }
  if (screen === undefined || screen === "") {
    return { screen: "recipe", id }
  }
  return isScreen(screen) ? { screen, id } : { screen: "search" }
}

export function hrefTo(route: Route): string {
  switch (route.screen) {
    case "search":
      return "#/"
    case "recipe":
      return `#/r/${route.id}`
    case "shop":
    case "cook":
      return `#/r/${route.id}/${route.screen}`
  }
}
