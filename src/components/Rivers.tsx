import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './Rivers.module.css'

const RIVERS = [
  {
    label: 'River One',
    title: 'Structural Growth',
    body: 'A genuine, multi-decade tailwind — tested for persistence, penetration headroom and demographic grounding, not a two-year theme dressed as a trend.',
  },
  {
    label: 'River Two',
    title: 'Exceptional Execution',
    body: 'A management team with a proven record of integrity, capital allocation and candid communication — the difference between an industry that grows and a business that wins within it.',
  },
  {
    label: 'River Three',
    title: 'Competitive Advantage',
    body: 'A durable moat — brand, distribution, switching costs or scale — that protects the returns the first two rivers create from being competed away.',
  },
] as const

export function Rivers() {
  return (
    <section className="section" aria-labelledby="rivers-title">
      <div className="container">
        <ScrollReveal className={s.head}>
          <p className="eyebrow">Sangam — Where Three Rivers Meet</p>
          <h2 id="rivers-title" className={s.title}>
            Our Investment Thesis
          </h2>
        </ScrollReveal>
        <ScrollReveal group className={s.grid}>
          {RIVERS.map((r, i) => (
            <article key={r.title} className={`onDark ${s.card}`} {...srItem(i)}>
              <p className={s.num}>{r.label}</p>
              <h3 className={s.cardTitle}>{r.title}</h3>
              <p className={s.cardBody}>{r.body}</p>
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
