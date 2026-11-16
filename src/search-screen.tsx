import { useState, type KeyboardEvent, type SubmitEvent } from "react"
import { ChevronRight, Cross, MagnifyingGlass } from "./icons"
import type { Recipe, Tag as TagKind } from "./recipe"
import { TAG_LABELS, TAGS } from "./recipe"
import { hrefTo } from "./routes"
import { addTerm, search, type Filter, type Result } from "./search"
import styles from "./search-screen.module.css"
import { currentStep, hoursLeft, type Session } from "./session"
import { Tag } from "./tag"
import ui from "./ui.module.css"

const FILTERS: readonly { readonly value: Filter; readonly label: string }[] = [
  { value: "all", label: "All" },
  ...TAGS.map((tag: TagKind) => ({ value: tag, label: TAG_LABELS[tag] })),
]

const plural = (count: number, noun: string): string => `${count} ${noun}${count === 1 ? "" : "s"}`

type BannerProps = { readonly session: Session; readonly recipe: Recipe }

const OnNowBanner = ({ session, recipe }: BannerProps) => {
  const [now] = useState(() => Date.now())
  const steps = recipe.steps.length
  const step = Math.min(currentStep(session.done, steps) + 1, steps)
  const hours = hoursLeft(session, now)
  return (
    <a className={styles.banner} href={hrefTo({ screen: "cook", id: recipe.id })}>
      <span className={styles.bannerText}>
        <span className={styles.overline}>On now</span>
        <span className={styles.bannerTitle}>{recipe.title}</span>
        <span className={styles.bannerMeta}>
          Step {step} of {steps} · stays on for {plural(hours, "more hour")}
        </span>
      </span>
      <ChevronRight />
    </a>
  )
}

type ResultCardProps = { readonly result: Result; readonly termCount: number }

const ResultCard = ({ result: { recipe, matched }, termCount }: ResultCardProps) => {
  const full = matched.length === termCount
  return (
    <li>
      <a className={styles.result} href={hrefTo({ screen: "recipe", id: recipe.id })}>
        <span className={styles.resultText}>
          <span className={styles.resultTitle}>{recipe.title}</span>
          <span className={styles.resultMeta}>
            <Tag tag={recipe.tag} />
            {matched.length > 0 && <span className={styles.has}>Has {matched.join(", ")}</span>}
          </span>
        </span>
        {termCount > 0 && (
          <span className={full ? styles.countFull : styles.count}>
            {matched.length} of {termCount}
          </span>
        )}
      </a>
    </li>
  )
}

type SearchScreenProps = {
  readonly recipes: readonly Recipe[]
  readonly session: Session | undefined
  readonly activeRecipe: Recipe | undefined
}

export const SearchScreen = ({ recipes, session, activeRecipe }: SearchScreenProps) => {
  const [terms, setTerms] = useState<readonly string[]>([])
  const [draft, setDraft] = useState("")
  const [filter, setFilter] = useState<Filter>("all")
  const results = search(recipes, terms, filter)

  const commitDraft = () => {
    setTerms(addTerm(terms, draft))
    setDraft("")
  }
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault()
    commitDraft()
  }
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ",") {
      event.preventDefault()
      commitDraft()
    }
    if (event.key === "Backspace" && draft === "") {
      setTerms(terms.slice(0, -1))
    }
  }

  return (
    <main className={styles.screen}>
      <h1 className={styles.title}>Recipes</h1>

      {session !== undefined && activeRecipe !== undefined && (
        <OnNowBanner session={session} recipe={activeRecipe} />
      )}

      <form className={styles.search} onSubmit={onSubmit}>
        <label className={ui.caption} htmlFor="ingredient-search">
          Search by ingredient
        </label>
        <div className={styles.field}>
          <span className={styles.fieldIcon}>
            <MagnifyingGlass />
          </span>
          {terms.map((term) => (
            <button
              key={term}
              type="button"
              className={styles.chip}
              aria-label={`Remove ${term}`}
              onClick={() => setTerms(terms.filter((t) => t !== term))}
            >
              <span>{term}</span>
              <Cross />
            </button>
          ))}
          <input
            id="ingredient-search"
            className={styles.input}
            type="text"
            autoComplete="off"
            placeholder="Add an ingredient"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>
      </form>

      <div className={styles.filters}>
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={styles.filter}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <section className={styles.results}>
        {results.length === 0 ? (
          <p className={ui.empty}>{terms.length > 0 ? "No recipes match" : "No recipes yet"}</p>
        ) : (
          <>
            <p className={ui.caption}>
              {plural(results.length, "recipe")}
              {terms.length > 0 && ", best match first"}
            </p>
            <ul className={styles.list}>
              {results.map((result) => (
                <ResultCard key={result.recipe.id} result={result} termCount={terms.length} />
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  )
}
