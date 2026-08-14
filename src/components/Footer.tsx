import { Logo } from './Logo'
import s from './Footer.module.css'

interface FooterItem {
  label: string
  href?: string // absent → rendered as plain text until the page exists
}

const COLUMNS: readonly { title: string; items: readonly FooterItem[] }[] = [
  {
    title: 'Firm',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'Investment Philosophy', href: '/philosophy' },
      { label: 'SCALE Framework', href: '/#pillars' },
      { label: 'Team', href: '/team' },
      { label: 'Careers' },
    ],
  },
  {
    title: 'Products',
    items: [
      { label: 'Bharat Fund', href: '/bharat-fund' },
      { label: 'Portfolio Approach' },
      { label: 'Family Office Solutions' },
      { label: 'Private Market Opportunities' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Research & Insights', href: '/research' },
      { label: 'Thought Leadership' },
      { label: 'Media' },
      { label: 'ESG & Governance' },
    ],
  },
  {
    title: 'Investors',
    items: [
      { label: 'Investor Relations' },
      { label: 'Investor Login' },
      { label: 'Contact', href: '/contact' },
      { label: 'Disclosures' },
    ],
  },
]

export function Footer() {
  return (
    <footer className={`onDark ${s.footer}`}>
      <div className="container">
        <div className={s.grid}>
          <div className={s.brand}>
            <Logo onDark withWordmark size={26} strokeWidth={10} />
            <p className={s.blurb}>
              Management Private Limited. A proposed SEBI-registered Category III Alternative
              Investment Fund.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} className={s.col} aria-label={col.title}>
              <h3 className={s.colTitle}>{col.title}</h3>
              <ul className={s.list}>
                {col.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a href={item.href} className={s.link}>
                        {item.label}
                      </a>
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className={s.legal}>
          <p>
            Asankhya Capital Management Private Limited. Strictly Private &amp; Confidential.
            This website does not constitute an offer to sell or a solicitation of an offer to
            subscribe to units of any fund. The proposed fund is not yet established or
            registered; all terms are indicative pending the Private Placement Memorandum.
          </p>
          <p>
            {'SEBI Registration: [In Process]  ·  CIN: [To be added]  ·  © Asankhya Capital Management Private Limited'}
          </p>
        </div>
      </div>
    </footer>
  )
}
