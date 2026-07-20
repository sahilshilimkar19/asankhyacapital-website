import s from './AmbientBackground.module.css'

/**
 * Fixed background: paper gradient wash, two slow-drifting light blobs on a
 * parallax plane, and a soft bronze spotlight that trails the cursor.
 * All positions are driven by CSS custom properties — no re-renders.
 */
export function AmbientBackground() {
  return (
    <div className={s.ambient} aria-hidden="true">
      <div className={s.parallax}>
        <div className={s.blobA} />
        <div className={s.blobB} />
      </div>
      <div className={s.spotlight} />
    </div>
  )
}
