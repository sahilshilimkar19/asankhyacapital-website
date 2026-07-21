import s from './Backdrop.module.css'

/**
 * Ambient page backdrop: paper grain plus a faint drafting grid that
 * blooms softly around the cursor (fine-pointer devices only). Purely
 * decorative — pinned behind the motif and content, ignores pointers.
 */
export function Backdrop() {
  return <div className={s.backdrop} aria-hidden="true" />
}
