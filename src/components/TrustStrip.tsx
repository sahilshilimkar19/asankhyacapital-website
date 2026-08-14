import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './TrustStrip.module.css'

const ITEMS = [
  { label: 'Regulation', value: 'SEBI Category III AIF' },
  { label: 'Governance', value: 'Named Investment Committee' },
  { label: 'Reporting', value: 'Monthly NAV, Quarterly Letter' },
  { label: 'Operations', value: 'Independent RTA & Custodian' },
] as const

export function TrustStrip() {
  return (
    <section className={`section ${s.band}`} aria-labelledby="trust-title">
      <h2 id="trust-title" className="visuallyHidden">
        Institutional Safeguards
      </h2>
      <ScrollReveal group className={`container ${s.grid}`}>
        {ITEMS.map((it, i) => (
          <div key={it.label} className={s.item} {...srItem(i)}>
            <span className={s.label}>{it.label}</span>
            <b>{it.value}</b>
          </div>
        ))}
      </ScrollReveal>
    </section>
  )
}
