import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./app"
import "@fontsource/figtree/latin-400.css"
import "@fontsource/figtree/latin-500.css"
import "@fontsource/figtree/latin-600.css"
import "@fontsource/figtree/latin-700.css"
import "@fontsource-variable/fraunces/opsz.css"
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
