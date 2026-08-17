import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './TeamGrid.module.css'

interface Member {
  /** Designation — the one field that is settled for every seat. */
  title: string
  /** Placeholder shown in the portrait frame until `photo` is supplied. */
  initials: string
  blurb: string
  /**
   * From the team deck. Add `name` and `photo` together per seat: with a name
   * the card leads on it and demotes the designation to the gold caption;
   * without one it keeps today's "[Name to be added]" placeholder.
   */
  name?: string
  /** Portrait in /public/team, e.g. '/team/asha-rao.jpg'. See README → "Team photographs". */
  photo?: string
}

const MEMBERS: readonly Member[] = [
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
]

export function TeamGrid() {
  return (
    <section className={s.teamSection} aria-label="Leadership roles">
      <ScrollReveal group className={`container ${s.grid}`}>
        {MEMBERS.map((m, i) => (
          <article key={m.title} className={s.card} {...srItem(i)}>
            <div className={`${s.avatar} ${m.photo ? s.avatarPhoto : ''}`}>
              {m.photo ? (
                <img
                  className={s.photo}
                  src={m.photo}
                  alt={m.name ? `${m.name}, ${m.title}` : m.title}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span aria-hidden="true">{m.initials}</span>
              )}
            </div>
            <div className={s.info}>
              <h3 className={s.roleTitle}>{m.name ?? m.title}</h3>
              <p className={s.role}>{m.name ? m.title : '[Name to be added]'}</p>
              <p className={s.blurb}>{m.blurb}</p>
            </div>
          </article>
        ))}
      </ScrollReveal>
    </section>
  )
}
