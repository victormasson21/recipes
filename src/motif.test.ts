import { describe, expect, it } from "vitest"
import { MOTIF_IDS, randomMotif } from "./motif"

describe("randomMotif", () => {
  it("never returns the excluded motif", () => {
    for (const exclude of MOTIF_IDS) {
      for (const random of [0, 0.33, 0.66, 0.999]) {
        expect(randomMotif(exclude, random)).not.toBe(exclude)
      }
    }
  })

  it("covers every motif when nothing is excluded", () => {
    const picked = [0, 0.26, 0.51, 0.76].map((random) => randomMotif(null, random))
    expect(picked).toEqual([...MOTIF_IDS])
  })

  it("ignores an unknown last id", () => {
    expect(MOTIF_IDS).toContain(randomMotif("teapot", 0.5))
  })
})
