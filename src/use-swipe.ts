import { useState, type PointerEvent } from "react"

const SWIPE_PX = 60
const MAX_DRAG_PX = 96

type Start = { readonly x: number; readonly y: number }

export type Swipe = {
  readonly offset: number
  readonly handlers: {
    readonly onPointerDown: (event: PointerEvent) => void
    readonly onPointerMove: (event: PointerEvent) => void
    readonly onPointerUp: (event: PointerEvent) => void
    readonly onPointerCancel: () => void
  }
}

export function useSwipe(onLeft: () => void, onRight: () => void): Swipe {
  const [start, setStart] = useState<Start | undefined>(undefined)
  const [offset, setOffset] = useState(0)

  const reset = () => {
    setStart(undefined)
    setOffset(0)
  }

  return {
    offset,
    handlers: {
      onPointerDown: (event) => setStart({ x: event.clientX, y: event.clientY }),
      onPointerMove: (event) => {
        if (start === undefined) {
          return
        }
        const dx = event.clientX - start.x
        setOffset(Math.max(-MAX_DRAG_PX, Math.min(MAX_DRAG_PX, dx)))
      },
      onPointerUp: (event) => {
        if (start === undefined) {
          return
        }
        const dx = event.clientX - start.x
        const dy = event.clientY - start.y
        if (Math.abs(dx) >= SWIPE_PX && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) {
            onLeft()
          } else {
            onRight()
          }
        }
        reset()
      },
      onPointerCancel: reset,
    },
  }
}
