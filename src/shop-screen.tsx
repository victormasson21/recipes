import { useEffect, useState } from "react"
import { missingText } from "./clipboard-text"
import { ArrowLeft, Copy } from "./icons"
import type { Recipe } from "./recipe"
import { hrefTo } from "./routes"
import { toggle, type Session } from "./session"
import styles from "./shop-screen.module.css"
import ui from "./ui.module.css"

const FEEDBACK_MS = 2000

type CopyState = "idle" | "copied" | "failed"

type ShopScreenProps = {
  readonly recipe: Recipe
  readonly session: Session
  readonly update: (session: Session) => void
}

const copyLabelFor = (missing: number, copyState: CopyState): string => {
  if (missing === 0) {
    return "Nothing missing"
  }
  switch (copyState) {
    case "idle":
      return `Copy ${missing} missing`
    case "copied":
      return "Copied"
    case "failed":
      return "Copy failed"
  }
}

export const ShopScreen = ({ recipe, session, update }: ShopScreenProps) => {
  const [copyState, setCopyState] = useState<CopyState>("idle")
  const missing = recipe.ingredients.length - session.ticked.length

  useEffect(() => {
    if (copyState === "idle") {
      return
    }
    const timer = setTimeout(() => setCopyState("idle"), FEEDBACK_MS)
    return () => clearTimeout(timer)
  }, [copyState])

  const copy = () =>
    navigator.clipboard.writeText(missingText(recipe, session.ticked)).then(
      () => setCopyState("copied"),
      () => setCopyState("failed"),
    )

  const copyLabel = copyLabelFor(missing, copyState)

  return (
    <main className={ui.screen}>
      <div className={ui.header}>
        <a className={ui.back} href={hrefTo({ screen: "recipe", id: recipe.id })} aria-label="Back to recipe">
          <ArrowLeft />
        </a>
      </div>

      <div className={styles.titleBlock}>
        <h1 className={ui.title}>Shopping list</h1>
        <p className={styles.recipeName}>{recipe.title}</p>
        <p className={styles.count}>
          {session.ticked.length} of {recipe.ingredients.length} ticked
        </p>
      </div>

      <div className={`${ui.scroll} ${styles.content}`}>
        <div className={`${ui.card} ${styles.list}`}>
          {recipe.ingredients.map(({ name, amount }, index) => {
            const ticked = session.ticked.includes(index)
            return (
              <label key={name} className={styles.row}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  checked={ticked}
                  onChange={() => update({ ...session, ticked: toggle(session.ticked, index) })}
                />
                <span className={ticked ? styles.nameTicked : styles.name}>{name}</span>
                <span className={styles.amount}>{amount}</span>
              </label>
            )
          })}
        </div>
      </div>

      <div className={ui.bottomBar}>
        <button type="button" className={`${ui.button} ${styles.copy}`} disabled={missing === 0} onClick={copy}>
          <Copy />
          <span aria-live="polite">{copyLabel}</span>
        </button>
        <a className={ui.accentButton} href={hrefTo({ screen: "cook", id: recipe.id })}>
          Cook
        </a>
      </div>
    </main>
  )
}
