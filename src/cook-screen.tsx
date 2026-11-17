import { useEffect, useRef, useState } from "react"
import styles from "./cook-screen.module.css"
import { ArrowLeft, Motif } from "./icons"
import { pickMotif } from "./motif"
import type { Recipe } from "./recipe"
import { hrefTo } from "./routes"
import { currentStep, toggle, type Session } from "./session"
import { StepCard, type StepState } from "./step-card"
import ui from "./ui.module.css"
import { navigate } from "./use-hash-route"
import { useWakeLock } from "./use-wake-lock"

type CookScreenProps = {
  readonly recipe: Recipe
  readonly session: Session
  readonly update: (session: Session | undefined) => void
}

const stepState = (index: number, current: number, done: readonly number[]): StepState =>
  done.includes(index) ? "done" : index === current ? "current" : "upcoming"

const segmentClass = (state: StepState): string | undefined =>
  state === "done" ? styles.segmentDone : state === "current" ? styles.segmentCurrent : styles.segment

export const CookScreen = ({ recipe, session, update }: CookScreenProps) => {
  useWakeLock()
  const [motif] = useState(pickMotif)
  const listRef = useRef<HTMLOListElement>(null)
  const count = recipe.steps.length
  const current = currentStep(session.done, count)
  const doneCount = recipe.steps.filter((_, index) => session.done.includes(index)).length
  const finished = current === count

  useEffect(() => {
    const target = listRef.current?.querySelector(`#step-${current + 1}`)
    target?.scrollIntoView({ block: "start", behavior: "smooth" })
  }, [current])

  const setDone = (index: number) => update({ ...session, done: toggle(session.done, index) })
  const stop = () => {
    update(undefined)
    navigate({ screen: "search" })
  }

  return (
    <main className={ui.screen}>
      <div className={ui.header}>
        <a className={ui.back} href={hrefTo({ screen: "recipe", id: recipe.id })} aria-label="Back to recipe">
          <ArrowLeft />
        </a>
        <nav className={styles.links} aria-label="Stop and shopping">
          <button type="button" className={ui.textLink} onClick={stop}>
            Stop
          </button>
          <span aria-hidden="true" className={styles.slash}>
            /
          </span>
          <a className={ui.textLink} href={hrefTo({ screen: "shop", id: recipe.id })}>
            Shopping
          </a>
        </nav>
      </div>

      <div className={styles.titleBlock}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{recipe.title}</h1>
          <Motif id={motif} width={64} height={80} />
        </div>
        <div className={styles.progress} aria-hidden="true">
          {recipe.steps.map((_, index) => (
            <div key={index} className={segmentClass(stepState(index, current, session.done))} />
          ))}
        </div>
        <p className={styles.caption}>
          <span className={styles.captionCount}>
            {doneCount} of {count} done.
          </span>{" "}
          Swipe a step left when it's done, right to undo.
        </p>
      </div>

      <ol ref={listRef} className={`${ui.scroll} ${styles.list}`}>
        {recipe.steps.map((step, index) => (
          <StepCard
            key={index}
            step={step}
            index={index}
            state={stepState(index, current, session.done)}
            onDone={() => setDone(index)}
            onUndo={() => setDone(index)}
          />
        ))}
        {finished && (
          <li id={`step-${count + 1}`} className={`${ui.card} ${styles.finished}`}>
            <span className={ui.heading}>All done</span>
            <button type="button" className={ui.accentButton} onClick={stop}>
              Finish
            </button>
          </li>
        )}
      </ol>
    </main>
  )
}
