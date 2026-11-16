import { Tick, Timer } from "./icons"
import type { Step } from "./recipe"
import styles from "./step-card.module.css"
import { useSwipe } from "./use-swipe"

export type StepState = "upcoming" | "current" | "done"

type StepCardProps = {
  readonly step: Step
  readonly index: number
  readonly state: StepState
  readonly onDone: () => void
  readonly onUndo: () => void
}

const DoneBadge = ({ index, onUndo }: Pick<StepCardProps, "index" | "onUndo">) => (
  <button type="button" className={styles.done} aria-label={`Undo step ${index + 1}`} onClick={onUndo}>
    <Tick />
    <span>Done</span>
  </button>
)

const NextBadge = ({ index, onDone }: Pick<StepCardProps, "index" | "onDone">) => (
  <button type="button" className={styles.next} aria-label={`Mark step ${index + 1} done`} onClick={onDone}>
    Next
  </button>
)

const Badge = ({ state, index, onDone, onUndo }: Omit<StepCardProps, "step">) => {
  switch (state) {
    case "current":
      return <NextBadge index={index} onDone={onDone} />
    case "done":
      return <DoneBadge index={index} onUndo={onUndo} />
    case "upcoming":
      return null
  }
}

export const StepCard = (props: StepCardProps) => {
  const { step, index, state, onDone, onUndo } = props
  const swipe = useSwipe(
    () => state !== "done" && onDone(),
    () => state === "done" && onUndo(),
  )
  const stateClass = state === "done" ? styles.stepDone : state === "current" ? styles.stepCurrent : ""

  return (
    <li
      id={`step-${index + 1}`}
      className={`${styles.step} ${stateClass}`}
      style={{ transform: `translateX(${swipe.offset}px)` }}
      {...swipe.handlers}
    >
      {step.kind === "add" ? (
        <div className={styles.add}>
          <div className={styles.addHeader}>
            <span className={styles.overline}>Add</span>
            <Badge state={state} index={index} onDone={onDone} onUndo={onUndo} />
          </div>
          <ul className={styles.items}>
            {step.items.map(({ name, amount, note }) => (
              <li key={name} className={styles.item}>
                <span className={styles.itemText}>
                  <span className={styles.itemName}>{name}</span>
                  {note !== undefined && <span className={styles.note}>{note}</span>}
                </span>
                <span className={styles.amount}>{amount}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.wait}>
          <Timer />
          <span className={styles.waitText}>
            <span className={styles.duration}>{step.duration}</span>
            {step.note !== undefined && <span className={styles.waitNote}>{step.note}</span>}
          </span>
          <Badge state={state} index={index} onDone={onDone} onUndo={onUndo} />
        </div>
      )}
    </li>
  )
}
