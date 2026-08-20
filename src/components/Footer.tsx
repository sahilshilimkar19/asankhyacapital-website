import { Logo } from './Logo'
import s from './Footer.module.css'

// One centered row: every nav destination plus the footer-only extras
// (the 6 Pillars homepage section and the Contact page).
const LINKS: readonly { label: string; href: string }[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Investment Philosophy', href: '/philosophy' },
  { label: '6 Pillars Framework', href: '/#pillars' },
  { label: 'Bharat Fund', href: '/bharat-fund' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className={`onDark ${s.footer}`}>
      <div className="container">
        <div className={s.top}>
          <Logo onDark withWordmark size={26} strokeWidth={10} />
          <p className={s.blurb}>
            Management Private Limited. A proposed SEBI-registered Category III Alternative
            Investment Fund.
          </p>
          <nav aria-label="Footer">
            <ul className={s.links}>
              {LINKS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={s.link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
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
