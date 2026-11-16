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

// Deck order: the leadership, then the economist and the research analysts.
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
    name: 'Madan Kumar Singh, XIMB, MIT',
    title: 'Non-Executive Director',
    initials: 'MKS',
    photo: '/team/madan-kumar-singh.jpg',
    blurb:
      "Built and executed multi-million dollar business for MNCs. Has been investing in India and US market for 20+ years. He developed a framework for identifying quality businesses supporting India's structural growth. In his international role, he has also analyzed emerging technologies.",
  },
  {
    name: 'Dr. Deepa Dwivedi, PhD, M.A. Economics',
    title: 'Economist',
    initials: 'DD',
    photo: '/team/deepa-dwivedi.jpg',
    blurb:
      'An Educator, Economist and an Investor in the stock market advising family offices. Dr. Deepa Dwivedi holds a PhD and MA in Economics, UGC-NET qualified, with over a decade of teaching experience at Vikram University. Based in Ahmedabad, she actively invests in financial markets and provides expert advisory services to institutions, leveraging her deep expertise to deliver strategic insights.',
  },
  {
    name: 'Madhav Rathi, CFA',
    title: 'Senior Research Analyst',
    initials: 'MR',
    photo: '/team/madhav-rathi.jpg',
    blurb:
      "CFA Level II cleared with a focus on fundamental research and sector analysis. Uses a top-down approach and AI-driven tools to identify high-conviction investment opportunities in businesses aligned with India's long-term growth.",
  },
  {
    name: 'Piyush Garodia, CFA',
    title: 'Senior Research Analyst',
    initials: 'PG',
    photo: '/team/piyush-garodia.jpg',
    blurb:
      'CFA Level II cleared with expertise in fundamental equity research, financial modelling, and valuation and comparable company analysis. He has undertaken in-depth research and valuation of listed companies across the retail and FMCG sectors, supported by hands-on market research experience, and a strong foundation in investment research and business evaluation.',
  },
]

export function TeamGrid() {
  return (
    <section className={s.teamSection} aria-label="Leadership roles">
      <ScrollReveal group className={`container ${s.grid}`}>
        {MEMBERS.map((m, i) => (
          // Keyed by name: several seats share a title (two Senior Research Analysts)
          <article key={m.name ?? m.title} className={s.card} {...srItem(i)}>
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
