export const MOTIF_IDS = ["herb-sprig", "eggs", "chilli", "pepper-mill"] as const

export type MotifId = (typeof MOTIF_IDS)[number]

const STORAGE_KEY = "last-motif"

export const randomMotif = (exclude: string | null, random: number): MotifId => {
  const pool = MOTIF_IDS.filter((id) => id !== exclude)
  const index = Math.min(Math.floor(random * pool.length), pool.length - 1)
  return pool[index] ?? MOTIF_IDS[0]
}

export function pickMotif(): MotifId {
  const motif = randomMotif(localStorage.getItem(STORAGE_KEY), Math.random())
  localStorage.setItem(STORAGE_KEY, motif)
  return motif
}
