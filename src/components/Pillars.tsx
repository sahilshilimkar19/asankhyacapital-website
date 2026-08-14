import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './Pillars.module.css'

const PILLARS = [
  { n: 1, title: 'Competitive Moat', blurb: 'A durable advantage competitors cannot replicate' },
  { n: 2, title: 'Capital Allocation', blurb: 'Cash reinvested at high, durable rates of return' },
  { n: 3, title: 'Financial Strength', blurb: 'A balance sheet that survives a genuinely bad cycle' },
  { n: 4, title: 'Scalability', blurb: 'Margins that expand structurally as the business scales' },
  { n: 5, title: 'Growth Runway', blurb: 'Long, credible headroom still ahead of the business' },
  { n: 6, title: 'Governance', blurb: 'Alignment with minority shareholders, proven not assumed' },
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
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
