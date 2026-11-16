import { TAG_LABELS, type Tag as TagKind } from "./recipe"
import ui from "./ui.module.css"

export const Tag = ({ tag }: { readonly tag: TagKind }) => (
  <span className={tag === "to-try" ? `${ui.tag} ${ui.tagTry}` : ui.tag}>{TAG_LABELS[tag]}</span>
)
