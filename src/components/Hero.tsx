import { Reveal } from './Reveal'
import s from './Hero.module.css'

export function Hero() {
  return (
    <header className={s.hero}>
      <Reveal i={0} variant="scale" className={s.monogram} aria-hidden="true">
        <span aria-hidden="true">A</span>
      </Reveal>

      <h1 className={s.wordmark}>
        <Reveal i={1} as="span" className={s.wordmarkMain}>
          Asankhya
        </Reveal>
        <Reveal i={2} as="span" className={s.wordmarkSub}>
          Capital
        </Reveal>
      </h1>

      <Reveal i={3} variant="rule" className={s.rule} />

      <Reveal i={4} as="p" className={s.status}>
        <span className={s.statusDot} aria-hidden="true" />
        Launching Soon
      </Reveal>

      <Reveal i={5} as="p" className={s.tagline}>
        Boundless opportunity. Disciplined&nbsp;capital.
      </Reveal>

      <Reveal i={6} as="p" className={s.description}>
        An investment firm founded on clarity, conviction, and long-term value.
        Our full website is on the way.
      </Reveal>
    </header>
  )
}
