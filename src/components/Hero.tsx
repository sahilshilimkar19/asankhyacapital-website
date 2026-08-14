import type { CSSProperties } from 'react'
import { Reveal } from './Reveal'
import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './Hero.module.css'

const PILLAR_SCORES = [
  { name: 'Competitive Moat', score: 88 },
  { name: 'Capital Allocation', score: 82 },
  { name: 'Financial Strength', score: 79 },
  { name: 'Scalability', score: 74 },
  { name: 'Growth Runway', score: 70 },
  { name: 'Governance', score: 80 },
] as const

const STATS = [
  { value: 'SEBI Registration', label: '[In Process]' },
  { value: '50+ YRS', label: 'Combined Leadership Experience' },
  { value: '₹1 CR', label: 'Minimum Contribution' },
] as const

export function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={`container ${s.inner}`}>
        <div>
          <Reveal i={0} as="p" className="eyebrow">
            Institutional Alternative Investment
          </Reveal>
          <Reveal i={1} as="h1" className={s.title} id="hero-title">
            Enduring businesses, at the intersection of{' '}
            <em className={s.accent}>structural growth</em> and exceptional execution.
          </Reveal>
          <Reveal i={2} as="p" className={s.lede}>
            Asankhya Capital is a SEBI-registered Category III AIF built for investors who
            measure returns in decades, not quarters — sector-agnostic, research-led, and
            disciplined by a proprietary five-part investment framework.
          </Reveal>
          <Reveal i={3} className={s.btnRow}>
            <a href="/philosophy" className="btn btnNavy">
              Read Our Philosophy
            </a>
          </Reveal>
          <Reveal i={4} className={s.stats}>
            {STATS.map((st) => (
              <div key={st.value} className={s.stat}>
                <b>{st.value}</b>
                <span>{st.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal i={5}>
          <aside className={`onDark ${s.card}`} aria-label="Illustrative pillar scoring">
            <p className={s.cardLabel}>Our 6 Pillars</p>
            <p className={s.cardTitle}>How we score every business</p>
            <ScrollReveal group as="ul" className={s.rows}>
              {PILLAR_SCORES.map((p, i) => (
                <li key={p.name} className={s.row} {...srItem(i)}>
                  <span className={s.num} aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className={s.rowBody}>
                    <span className={s.rowName}>{p.name}</span>
                    <span className={s.barTrack}>
                      <span
                        className={s.barFill}
                        style={{ '--bar': `${p.score}%`, '--sr-i': i } as CSSProperties}
                      />
                    </span>
                  </span>
                </li>
              ))}
            </ScrollReveal>
            <p className={s.footnote}>
              Illustrative scoring, shown for explanatory purposes only — not a live holding.
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  )
}
