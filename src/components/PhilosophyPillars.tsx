import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './PhilosophyPillars.module.css'

const PILLARS = [
  {
    title: 'Competitive Moat',
    body: "A structural, durable reason competitors cannot replicate the business's economics.",
  },
  {
    title: 'Capital Allocation',
    body: 'Cash reinvested at returns that consistently exceed the cost of capital.',
  },
  {
    title: 'Financial Strength',
    body: 'A balance sheet that survives a genuinely bad cycle without a forced raise.',
  },
  {
    title: 'Scalability',
    body: 'Revenue that grows faster than the capital required to support it.',
  },
  {
    title: 'Growth Runway',
    body: 'Long, credible headroom before the business approaches saturation.',
  },
  {
    title: 'Governance',
    body: 'Alignment between promoter/management interests and minority shareholders.',
  },
] as const

export function PhilosophyPillars() {
  return (
    <section className={s.pillars} aria-labelledby="pillars-title">
      <div className="container">
        <ScrollReveal className={s.head}>
          <p className="eyebrow">The 6 Pillars</p>
          <h2 className={s.title} id="pillars-title">
            How we score every business we consider
          </h2>
          <p className={s.sub}>
            Every business we own has passed all three River tests, then been scored against
            six dimensions of quality before a single rupee is committed.
          </p>
        </ScrollReveal>
        <ScrollReveal group className={s.grid}>
          {PILLARS.map((p, i) => (
            <div key={p.title} className={s.card} {...srItem(i)}>
              <div className={s.num} aria-hidden="true">
                {i + 1}
              </div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
