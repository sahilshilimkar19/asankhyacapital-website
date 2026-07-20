import { Reveal } from './Reveal'
import s from './Cta.module.css'

export function Cta() {
  return (
    <Reveal i={7} className={s.cta}>
      <a className={s.link} href="mailto:contact@asankhyacapital.com">
        Get in touch
        <span className={s.arrow} aria-hidden="true">
          &rarr;
        </span>
      </a>
    </Reveal>
  )
}
