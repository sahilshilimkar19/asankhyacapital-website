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

// Deck order: the three executive founders, then the board seats.
const MEMBERS: readonly Member[] = [
  {
    name: 'Akhilesh Pathak, NIT Durgapur, IIMA',
    title: 'Managing Director and CEO',
    initials: 'AP',
    photo: '/team/akhilesh-pathak.jpg',
    blurb:
      '22+ yrs investing exp. Co-founder & Managing Partner, Smart Sync Services (SEBI RIA). Ex-leadership roles at ORACLE, TCS, Teradata, GSPC Group, TEGA in Sales, digital transformation, growth & partnerships.',
  },
  {
    name: 'Himanshu Shah, CFA, CA',
    title: 'Director & Chief Investment Officer',
    initials: 'HS',
    photo: '/team/himanshu-shah.jpg',
    blurb:
      '10+ years in research, investment strategy and portfolio management; has managed personal, family and family-office portfolios across equity research, asset allocation and risk management.',
  },
  {
    name: 'Kalpesh Agarrwal, IIM A',
    title: 'Co-founder & Chief Growth Officer',
    initials: 'KA',
    photo: '/team/kalpesh-agarrwal.jpg',
    blurb:
      'IIM Ahmedabad alumnus with deep experience in investments, business strategy, and growth. Has evaluated IPOs, listed equities, and AIF opportunities, with experience across 100+ investment opportunities.',
  },
  {
    name: 'Madan KS, XIMB, MIT',
    title: 'Non-Executive Director',
    initials: 'MKS',
    photo: '/team/madan-ks.jpg',
    blurb:
      "Built and executed multi-million dollar business for MNCs. Has been investing in India and US market for 20+ years. He developed a framework for identifying quality businesses supporting India's structural growth. In his international role, he has also analyzed emerging technologies.",
  },
  {
    name: 'Siddhant Agarwala, BITS Pilani',
    title: 'Director & Chief Compliance Officer',
    initials: 'SA',
    photo: '/team/siddhant-agarwala.jpg',
    blurb:
      "Over a decade in equity research and portfolio strategy. Focuses on identifying quality businesses using the fund's core framework. Previously held roles across consulting and public markets.",
  },
]

export function TeamGrid() {
  return (
    <section className={s.teamSection} aria-label="Leadership roles">
      <ScrollReveal group className={`container ${s.grid}`}>
        {MEMBERS.map((m, i) => (
          <article key={m.title} className={s.card} {...srItem(i)}>
            <div className={s.avatar}>
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
