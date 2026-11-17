import { useEffect } from "react"
import { CookScreen } from "./cook-screen"
import type { Recipe } from "./recipe"
import { RecipeScreen } from "./recipe-screen"
import { findRecipe, recipes } from "./recipes"
import type { Screen } from "./routes"
import { SearchScreen } from "./search-screen"
import { ShopScreen } from "./shop-screen"
import ui from "./ui.module.css"
import { useHashRoute } from "./use-hash-route"
import { useSession, type SessionStore } from "./use-session"

const NotFound = () => (
  <main className={ui.screen}>
    <p className={ui.empty}>
      Recipe not found. <a href="#/">Back to recipes</a>
    </p>
  </main>
)

type ActiveRecipeProps = { readonly recipe: Recipe; readonly screen: Screen; readonly store: SessionStore }

const ActiveRecipe = ({ recipe, screen, store }: ActiveRecipeProps) => {
  const { session, open } = store
  useEffect(() => {
    open(recipe.id)
  }, [recipe.id, open])
  if (session?.recipeId !== recipe.id) {
    return null
  }
  return screen === "shop" ? (
    <ShopScreen recipe={recipe} session={session} update={store.update} />
  ) : (
    <CookScreen recipe={recipe} session={session} update={store.update} />
  )
}

export const App = () => {
  const route = useHashRoute()
  const store = useSession()
  const { session, update } = store
  const activeRecipe = session === undefined ? undefined : findRecipe(session.recipeId)

  useEffect(() => {
    if (session !== undefined && activeRecipe === undefined) {
      update(undefined)
    }
  }, [session, update, activeRecipe])

  useEffect(() => {
    scrollTo(0, 0)
  }, [route])

  if (route.screen === "search") {
    return <SearchScreen recipes={recipes} session={session} activeRecipe={activeRecipe} />
  }
  const recipe = findRecipe(route.id)
  if (recipe === undefined) {
    return <NotFound />
  }
  if (route.screen === "recipe") {
    return <RecipeScreen recipe={recipe} recipes={recipes} />
  }
  return <ActiveRecipe recipe={recipe} screen={route.screen} store={store} />
}
