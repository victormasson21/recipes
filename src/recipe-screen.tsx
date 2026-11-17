import { ArrowLeft, External } from "./icons"
import type { Recipe, Source } from "./recipe"
import styles from "./recipe-screen.module.css"
import { hrefTo } from "./routes"
import { Tag } from "./tag"
import ui from "./ui.module.css"

const SourceCard = ({ source }: { readonly source: Source }) => (
  <div className={`${ui.card} ${styles.preview}`}>
    {source.image === undefined ? (
      <div className={styles.placeholder}>Link preview image</div>
    ) : (
      <img className={styles.image} src={source.image} alt="" />
    )}
    <div className={styles.previewText}>
      <span className={styles.site}>{source.site}</span>
      <span className={styles.sourceTitle}>{source.title}</span>
      <a className={ui.textLink} href={source.url} target="_blank" rel="noreferrer">
        <span>Open original</span>
        <External />
      </a>
    </div>
  </div>
)

export const RecipeScreen = ({ recipe }: { readonly recipe: Recipe }) => (
  <main className={ui.screen}>
    <div className={ui.header}>
      <a className={ui.back} href={hrefTo({ screen: "search" })} aria-label="Back to search">
        <ArrowLeft />
      </a>
    </div>

    <div className={`${ui.scroll} ${styles.content}`}>
      <div className={styles.titleBlock}>
        <Tag tag={recipe.tag} />
        <h1 className={ui.title}>{recipe.title}</h1>
      </div>

      {recipe.source !== undefined && <SourceCard source={recipe.source} />}

      <section className={styles.section}>
        <h2 className={ui.heading}>Ingredients</h2>
        <ul className={`${ui.card} ${styles.ingredients}`}>
          {recipe.ingredients.map(({ name, amount }) => (
            <li key={name} className={styles.ingredient}>
              <span className={styles.name}>{name}</span>
              <span className={ui.amount}>{amount}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={ui.heading}>Instructions</h2>
        <ol className={styles.instructions}>
          {recipe.instructions.map((text, index) => (
            <li key={text} className={styles.instruction}>
              <span className={styles.number}>{index + 1}</span>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>

    <nav className={ui.bottomBar} aria-label="Shop or cook">
      <a className={ui.button} href={hrefTo({ screen: "shop", id: recipe.id })}>
        Shop
      </a>
      <a className={ui.accentButton} href={hrefTo({ screen: "cook", id: recipe.id })}>
        Cook
      </a>
    </nav>
  </main>
)
