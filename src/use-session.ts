import { useCallback, useEffect, useState } from "react"
import { open, readSession, writeSession, type Session } from "./session"

export type SessionStore = {
  readonly session: Session | undefined
  readonly update: (next: Session | undefined) => void
  readonly open: (recipeId: string) => void
}

export function useSession(): SessionStore {
  const [session, setSession] = useState(() => readSession(Date.now()))

  useEffect(() => {
    writeSession(session)
  }, [session])

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        setSession(readSession(Date.now()))
      }
    }
    document.addEventListener("visibilitychange", onVisible)
    return () => document.removeEventListener("visibilitychange", onVisible)
  }, [])

  const openRecipe = useCallback(
    (recipeId: string) => setSession((current) => open(current, recipeId, Date.now())),
    [],
  )

  return { session, update: setSession, open: openRecipe }
}
