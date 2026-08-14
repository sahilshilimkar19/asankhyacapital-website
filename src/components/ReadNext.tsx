import { ScrollReveal } from './ScrollReveal'
import s from './ReadNext.module.css'

export function ReadNext() {
  return (
    <section className={s.cta} aria-labelledby="readnext-title">
      <ScrollReveal className="container">
        <p className="eyebrow">Read Next</p>
        <h2 className={s.title} id="readnext-title">
          See how this becomes a public, testable framework
        </h2>
        <a href="/#pillars" className="btn btnNavy">
          Explore the SCALE Framework
        </a>
      </ScrollReveal>
    </section>
  )
}
