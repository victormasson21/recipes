import { useEffect, useState } from "react"
import { hrefTo, parseRoute, type Route } from "./routes"

export function useHashRoute(): Route {
  const [route, setRoute] = useState(() => parseRoute(location.hash))
  useEffect(() => {
    const onChange = () => setRoute(parseRoute(location.hash))
    addEventListener("hashchange", onChange)
    return () => removeEventListener("hashchange", onChange)
  }, [])
  return route
}

export function navigate(route: Route): void {
  location.hash = hrefTo(route)
}
