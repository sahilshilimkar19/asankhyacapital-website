import type { CSSProperties } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './Pillars.module.css'

// `score` is the illustrative scoring that used to sit on the hero scorecard —
// it moved here when the hero was given over to the video.
const PILLARS = [
  { n: 1, title: 'Competitive Moat', blurb: 'A durable advantage competitors cannot replicate', score: 88 },
  { n: 2, title: 'Capital Allocation', blurb: 'Cash reinvested at high, durable rates of return', score: 82 },
  { n: 3, title: 'Financial Strength', blurb: 'A balance sheet that survives a genuinely bad cycle', score: 79 },
  { n: 4, title: 'Scalability', blurb: 'Margins that expand structurally as the business scales', score: 74 },
  { n: 5, title: 'Growth Runway', blurb: 'Long, credible headroom still ahead of the business', score: 70 },
  { n: 6, title: 'Governance', blurb: 'Alignment with minority shareholders, proven not assumed', score: 80 },
] as const

export function Pillars() {
  return (
    <section id="pillars" className="section" aria-labelledby="pillars-title">
      <div className={`container ${s.wrap}`}>
        <ScrollReveal>
          <p className="eyebrow">Our Investment Discipline</p>
          <h2 id="pillars-title" className={s.title}>
            The 6 Pillars of Business Quality
          </h2>
          <p className={s.sub}>
            Every business we consider is scored against six dimensions of quality — the same
            research framework our investment committee uses internally, in full detail on our
            Investment Philosophy page.
          </p>
        </ScrollReveal>
        <ScrollReveal group className={s.grid}>
          {PILLARS.map((p, i) => (
            <article key={p.n} className={s.card} {...srItem(i)}>
              <span className={s.num} aria-hidden="true">
                {p.n}
              </span>
              <h3 className={s.cardTitle}>{p.title}</h3>
              <p className={s.blurb}>{p.blurb}</p>
              <span className={s.barTrack} aria-hidden="true">
                <span className={s.barFill} style={{ '--bar': `${p.score}%` } as CSSProperties} />
              </span>
            </article>
          ))}
        </ScrollReveal>
        <ScrollReveal as="p" className={s.footnote}>
          Illustrative scoring, shown for explanatory purposes only — not a live holding.
        </ScrollReveal>
      </div>
    </section>
  )
}
