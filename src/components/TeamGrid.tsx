import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './TeamGrid.module.css'

const ROLES = [
  {
    initials: 'CEO',
    title: 'Chief Executive Officer',
    blurb:
      'Owns firm strategy, fundraising and distribution until dedicated hires exist, and the founder relationships that carry the firm through its earliest phase.',
  },
  {
    initials: 'CIO',
    title: 'Chief Investment Officer',
    blurb:
      "Owns the SCALE framework's application in practice — final accountability for every Investment Committee decision and the integrity of the track record.",
  },
  {
    initials: 'CGO',
    title: 'Chief Growth Officer',
    blurb:
      'Owns distribution, marketing and investor growth strategy — empanelment, brand, and the funnel that turns research readers into qualified investors.',
  },
  {
    initials: 'COO',
    title: 'Chief Operating Officer',
    blurb:
      "Owns operations, technology and day-to-day execution — NAV production, KYC and subscription processing, and the firm's technology stack.",
  },
  {
    initials: 'FM',
    title: 'Fund Manager',
    blurb:
      'Co-owns day-to-day portfolio management and research quality with the CIO; first line of defence on position-sizing discipline.',
  },
  {
    initials: 'CO',
    title: 'Compliance Officer',
    blurb:
      'Sole accountable owner of every public-facing document and every regulatory filing — the one veto-holding seat on the Investment Committee for governance matters.',
  },
] as const

export function TeamGrid() {
  return (
    <section className={s.teamSection} aria-label="Leadership roles">
      <ScrollReveal group className={`container ${s.grid}`}>
        {ROLES.map((r, i) => (
          <article key={r.initials} className={s.card} {...srItem(i)}>
            <div className={s.avatar} aria-hidden="true">
              {r.initials}
            </div>
            <div className={s.info}>
              <h3 className={s.roleTitle}>{r.title}</h3>
              <p className={s.role}>[Name to be added]</p>
              <p className={s.blurb}>{r.blurb}</p>
            </div>
          </article>
        ))}
      </ScrollReveal>
    </section>
  )
}
