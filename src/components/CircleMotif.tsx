import type { CSSProperties } from 'react'
import s from './CircleMotif.module.css'

/* Concentric rings: dash = ceil(2πr), draw-in staggered outward. */
const CIRCLES = [
  { r: 60, dash: 377, delay: 150, stroke: 'rgba(20, 23, 26, 0.16)', width: 1 },
  { r: 110, dash: 692, delay: 240, stroke: 'rgba(20, 23, 26, 0.13)', width: 1 },
  { r: 160, dash: 1006, delay: 330, stroke: 'rgba(20, 23, 26, 0.11)', width: 1 },
  { r: 210, dash: 1320, delay: 420, stroke: 'rgba(44, 74, 99, 0.55)', width: 1.25 },
  { r: 260, dash: 1634, delay: 510, stroke: 'rgba(20, 23, 26, 0.09)', width: 1 },
]

/**
 * Decorative concentric-circle motif behind the content: strokes draw in
 * on load, then the whole group rotates imperceptibly slowly. The wrapper
 * tilts in 3D with the cursor via --mx/--my set on the page element.
 */
export function CircleMotif() {
  return (
    <div className={s.motif} aria-hidden="true">
      <svg className={s.svg} viewBox="0 0 600 600">
        <g className={s.rotor}>
          {CIRCLES.map((c) => (
            <circle
              key={c.r}
              cx="300"
              cy="300"
              r={c.r}
              fill="none"
              stroke={c.stroke}
              strokeWidth={c.width}
              data-draw=""
              style={{ '--dash': c.dash, '--d': `${c.delay}ms` } as CSSProperties}
            />
          ))}
          <line
            x1="300"
            y1="40"
            x2="300"
            y2="90"
            stroke="rgba(20, 23, 26, 0.14)"
            strokeWidth="1"
            data-draw=""
            style={{ '--dash': 50, '--d': '620ms', '--draw-dur': '700ms' } as CSSProperties}
          />
          <circle
            cx="300"
            cy="90"
            r="6.5"
            fill="#2c4a63"
            data-fade=""
            style={{ '--d': '820ms' } as CSSProperties}
          />
          <circle
            cx="300"
            cy="540"
            r="3"
            fill="rgba(20, 23, 26, 0.28)"
            data-fade=""
            style={{ '--d': '900ms' } as CSSProperties}
          />
        </g>
      </svg>
    </div>
  )
}
