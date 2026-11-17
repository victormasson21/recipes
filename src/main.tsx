import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./app"
import "@fontsource/dm-sans/latin-400.css"
import "@fontsource/dm-sans/latin-500.css"
import "@fontsource/dm-sans/latin-600.css"
import "@fontsource/dm-sans/latin-700.css"
import "@fontsource/cormorant-garamond/latin-600.css"
import "@fontsource/cormorant-garamond/latin-600-italic.css"
import "./index.css"

const root = document.getElementById("root")
if (!root) {
  throw new Error("Missing #root element")
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
