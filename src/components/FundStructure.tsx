import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import { FactTable } from './FactTable'
import s from './FundStructure.module.css'

const FACTS = [
  { label: 'Classification', value: 'Category III AIF (proposed)' },
  { label: 'Minimum contribution', value: '₹1 Crore' },
  { label: 'Capital contribution', value: '100% upfront' },
  { label: 'NAV frequency', value: 'Monthly' },
  { label: 'Mandate', value: 'Sector-agnostic, multi-asset' },
  { label: 'Full terms', value: 'Released in the PPM, after qualification' },
] as const

export function FundStructure() {
  return (
    <section className={s.structure} aria-label="Structure at a glance">
      <ScrollReveal group className={`container ${s.cols}`}>
        <div {...srItem(0)}>
          <p className="eyebrow">Structure at a Glance</p>
          <FactTable rows={FACTS} className={s.table} />
        </div>
        <div className={s.card} {...srItem(1)}>
          <h3>Who this is for</h3>
          <p className={s.spaced}>
            Investors who can commit a minimum of ₹1 crore, hold a multi-year horizon, and
            want direct access to the same disciplined, SCALE-tested research process
            described throughout this site.
          </p>
          <h3>What this is not</h3>
          <p>
            A publicly solicited product. Fund-specific terms, NAVs and performance are
            shared only with qualified investors after a suitability check — the
            qualification form on our Contact page is the first step in that process, not a
            subscription form.
          </p>
        </div>
      </ScrollReveal>
    </section>
  )
}
