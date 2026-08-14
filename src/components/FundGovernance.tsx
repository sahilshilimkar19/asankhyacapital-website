import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './FundGovernance.module.css'

const PARTIES = [
  { label: 'Sponsor', value: 'Asankhya Capital Mgmt.' },
  { label: 'Trustee', value: '[To be appointed]' },
  { label: 'Custodian', value: '[To be appointed]' },
  { label: 'RTA', value: '[To be appointed]' },
] as const

export function FundGovernance() {
  return (
    <section className={s.governance} aria-labelledby="governance-title">
      <div className="container">
        <ScrollReveal className={s.head}>
          <p className="eyebrow">Governance</p>
          <h2 className={s.title} id="governance-title">
            Independent oversight at every layer
          </h2>
        </ScrollReveal>
        <ScrollReveal group className={s.grid}>
          {PARTIES.map((p, i) => (
            <div key={p.label} className={s.item} {...srItem(i)}>
              <span className={s.label}>{p.label}</span>
              <b>{p.value}</b>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
