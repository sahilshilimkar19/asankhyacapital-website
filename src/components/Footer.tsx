import { Reveal } from './Reveal'
import s from './Footer.module.css'

export function Footer() {
  return (
    <Reveal i={8} as="footer" className={s.footer}>
      <span>&copy; 2026 Asankhya Capital</span>
      <span className={s.sep} aria-hidden="true">
        &middot;
      </span>
      <a className={s.link} href="mailto:contact@asankhyacapital.com">
        contact@asankhyacapital.com
      </a>
    </Reveal>
  )
}
