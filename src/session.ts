export type Session = {
  readonly recipeId: string
  readonly activatedAt: number
  readonly ticked: readonly number[]
  readonly done: readonly number[]
}

const STORAGE_KEY = "session"
const HOUR_MS = 60 * 60 * 1000
export const SESSION_HOURS = 24

const isSession = (value: unknown): value is Session =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as Session).recipeId === "string" &&
  typeof (value as Session).activatedAt === "number" &&
  Array.isArray((value as Session).ticked) &&
  Array.isArray((value as Session).done)

export const hoursLeft = (session: Session, now: number): number =>
  Math.ceil((session.activatedAt + SESSION_HOURS * HOUR_MS - now) / HOUR_MS)

export function readSession(now: number): Session | undefined {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === null) {
    return undefined
  }
  const parsed: unknown = JSON.parse(stored)
  if (!isSession(parsed) || hoursLeft(parsed, now) <= 0) {
    localStorage.removeItem(STORAGE_KEY)
    return undefined
  }
  return parsed
}

export function writeSession(session: Session | undefined): void {
  if (session === undefined) {
    localStorage.removeItem(STORAGE_KEY)
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  }
}

export const activate = (recipeId: string, now: number): Session => ({
  recipeId,
  activatedAt: now,
  ticked: [],
  done: [],
})

export const touch = (session: Session, now: number): Session => ({ ...session, activatedAt: now })

export const open = (session: Session | undefined, recipeId: string, now: number): Session =>
  session?.recipeId === recipeId ? touch(session, now) : activate(recipeId, now)

export const toggle = (list: readonly number[], index: number): readonly number[] =>
  list.includes(index) ? list.filter((i) => i !== index) : [...list, index]

export const currentStep = (done: readonly number[], count: number): number => {
  const next = Array.from({ length: count }, (_, i) => i).find((i) => !done.includes(i))
  return next ?? count
}
