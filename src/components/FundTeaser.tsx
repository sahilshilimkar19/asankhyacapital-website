import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './FundTeaser.module.css'

const FACTS = [
  { value: 'Category III', label: 'SEBI AIF Classification' },
  { value: '₹1 Cr', label: 'Minimum Contribution' },
  { value: 'Monthly', label: 'NAV Reporting Cadence' },
  { value: 'Multi-Asset', label: 'Listed + Pre-IPO Access' },
] as const

export function FundTeaser() {
  return (
    <section id="fund" className={`section onDark ${s.band}`} aria-labelledby="fund-title">
      <div className={`container ${s.grid}`}>
        <ScrollReveal>
          <p className="eyebrow">Our Flagship Vehicle</p>
          <h2 id="fund-title" className={s.title}>
            Asankhya Capital — Bharat Fund
          </h2>
          <p className={s.body}>
            A proposed SEBI-registered Category III Alternative Investment Fund, built to
            compound capital across listed equities, pre-IPO and anchor allotments, and
            structured instruments — for investors who think in decades.
          </p>
          <a href="/bharat-fund" className="btn btnGold">
            View Fund Details
          </a>
        </ScrollReveal>
        <ScrollReveal group className={s.facts}>
          {FACTS.map((f, i) => (
            <div key={f.label} className={s.fact} {...srItem(i)}>
              <b>{f.value}</b>
              <span>{f.label}</span>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
