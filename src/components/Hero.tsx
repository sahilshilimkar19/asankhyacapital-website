import { Reveal } from './Reveal'
import s from './Hero.module.css'

export function Hero() {
  return (
    <header className={s.hero}>
      <Reveal i={0} as="p" className={s.status}>
        <span className={s.statusDot} aria-hidden="true" />
        Launching Soon
      </Reveal>

      <h1 className={s.wordmark}>
        <Reveal i={1} as="span" className={s.wordmarkMain}>
          Asankhya
        </Reveal>
        <Reveal i={2} as="span" className={s.wordmarkSub}>
          Capital
        </Reveal>
      </h1>
    </header>
  )
}
