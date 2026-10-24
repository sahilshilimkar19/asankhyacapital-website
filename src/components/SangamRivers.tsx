import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './SangamRivers.module.css'

interface River {
  num: string
  title: string
  lede: string
  tests: readonly { name: string; detail: string }[]
}

// Investor deck, Section 03 — "The Three Rivers"
const RIVERS: readonly River[] = [
  {
    num: 'River One',
    title: 'Structural Growth',
    lede: 'Five tests for a genuine tailwind — not a fad wearing a structural costume.',
    tests: [
      { name: 'Persistence', detail: 'True in fifteen years, not a 2–3 year cyclical upswing' },
      { name: 'Penetration headroom', detail: '15–25% penetration = runway; 70%+ = nearly finished' },
      { name: 'Policy alignment', detail: 'Regulation pushing with the trend, not against it' },
      { name: 'Demographic dividend', detail: 'Anchored in slow-moving shifts, not sentiment' },
      { name: 'Second-order beneficiary', detail: 'Who actually captures the economics of the trend' },
    ],
  },
  {
    num: 'River Two',
    title: 'Exceptional Execution',
    lede: 'Four dimensions of management excellence, scored across 3+ reporting cycles.',
    tests: [
      {
        name: 'Integrity',
        detail: 'A record that would survive hostile scrutiny — the one absolute veto',
      },
      { name: 'Capability', detail: 'Guidance actually met, not merely aspirational' },
      { name: 'Capital allocation track record', detail: 'Return on incremental capital deployed' },
      {
        name: 'Communication candour',
        detail: 'Naming what went wrong as readily as what went right',
      },
    ],
  },
  {
    num: 'River Three',
    title: 'Competitive Advantage',
    lede: 'The Saraswati river — four tests for a durable moat, unseen but decisive.',
    tests: [
      {
        name: 'Replication difficulty',
        detail: 'What stops a well-capitalised competitor within five years?',
      },
      { name: 'Trend direction', detail: 'Widening or narrowing, based on 3–5 year market-share data' },
      {
        name: 'Archetype durability',
        detail:
          'Brand, distribution, switching costs, network effects, cost leadership — which, and is it historically durable?',
      },
      {
        name: 'Pricing power',
        detail: 'Can it pass through input-cost inflation without losing volume?',
      },
    ],
  },
]

export function SangamRivers() {
  return (
    <section className={s.rivers} aria-labelledby="three-rivers-title">
      <div className="container">
        <ScrollReveal className={s.head}>
          <p className="eyebrow">Our Investment Thesis</p>
          <h2 className={s.title} id="three-rivers-title">
            The Three Rivers
          </h2>
        </ScrollReveal>
        <ScrollReveal group className={s.grid}>
          {RIVERS.map((r, i) => (
            // River One sits on white; Two and Three are navy, as in the deck
            <article
              key={r.num}
              className={i === 0 ? s.card : `onDark ${s.card} ${s.dark}`}
              {...srItem(i)}
            >
              <p className="eyebrow">{r.num}</p>
              <h3 className={s.cardTitle}>{r.title}</h3>
              <p className={s.lede}>{r.lede}</p>
              <dl className={s.tests}>
                {r.tests.map((t) => (
                  <div key={t.name} className={s.test}>
                    <dt>{t.name}</dt>
                    <dd>{t.detail}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
