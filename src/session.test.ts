import { beforeEach, describe, expect, it, vi } from "vitest"
import {
  activate,
  currentStep,
  hoursLeft,
  open,
  readSession,
  toggle,
  touch,
  writeSession,
} from "./session"

const HOUR = 60 * 60 * 1000
const now = 1_000 * HOUR

const memoryStorage = (): Pick<Storage, "getItem" | "setItem" | "removeItem"> => {
  const items = new Map<string, string>()
  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => void items.set(key, value),
    removeItem: (key) => void items.delete(key),
  }
}

beforeEach(() => vi.stubGlobal("localStorage", memoryStorage()))

describe("session storage", () => {
  it("reads back a written session", () => {
    const session = activate("beans", now)
    writeSession(session)
    expect(readSession(now + HOUR)).toEqual(session)
  })

  it("drops a session older than 24 hours", () => {
    writeSession(activate("beans", now))
    expect(readSession(now + 24 * HOUR)).toBeUndefined()
    expect(localStorage.getItem("session")).toBeNull()
  })

  it("drops a malformed session", () => {
    localStorage.setItem("session", JSON.stringify({ recipeId: "beans" }))
    expect(readSession(now)).toBeUndefined()
  })

  it("writing undefined clears the store", () => {
    writeSession(activate("beans", now))
    writeSession(undefined)
    expect(readSession(now)).toBeUndefined()
  })
})

describe("session logic", () => {
  it("touch moves the expiry forward", () => {
    const session = touch(activate("beans", now), now + 10 * HOUR)
    expect(hoursLeft(session, now + 10 * HOUR)).toBe(24)
  })

  it("open keeps the session of the same recipe and replaces another", () => {
    const session = { ...activate("beans", now), ticked: [1], done: [0] }
    expect(open(session, "beans", now + HOUR)).toEqual({ ...session, activatedAt: now + HOUR })
    expect(open(session, "dal", now + HOUR)).toEqual(activate("dal", now + HOUR))
    expect(open(undefined, "dal", now)).toEqual(activate("dal", now))
  })

  it("hoursLeft rounds up", () => {
    expect(hoursLeft(activate("beans", now), now + 2.5 * HOUR)).toBe(22)
  })

  it("toggle adds and removes an index", () => {
    expect(toggle([1], 3)).toEqual([1, 3])
    expect(toggle([1, 3], 1)).toEqual([3])
  })

  it("currentStep is the first index not done", () => {
    expect(currentStep([], 3)).toBe(0)
    expect(currentStep([0, 2], 3)).toBe(1)
  })

  it("currentStep is the count when every step is done", () => {
    expect(currentStep([0, 1, 2], 3)).toBe(3)
    expect(currentStep([0, 1, 2, 7], 3)).toBe(3)
  })
})
