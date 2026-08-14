import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import { FactTable } from './FactTable'
import s from './AboutStory.module.css'

const FACTS = [
  { label: 'Entity', value: 'Asankhya Capital Management Pvt Ltd' },
  { label: 'Proposed fund', value: 'Category III AIF (Bharat Fund)' },
  { label: 'SEBI Registration', value: '[In Process]' },
  { label: 'Headquarters', value: 'Gujarat, India' },
  { label: 'Founded', value: '2026' },
] as const

export function AboutStory() {
  return (
    <section className={s.story} aria-labelledby="story-title">
      <ScrollReveal group className={`container ${s.cols}`}>
        <div {...srItem(0)}>
          <p className="eyebrow">Our Story</p>
          <h2 className={s.title} id="story-title">
            A platform built on prior institutional experience
          </h2>
          <p className={s.body}>
            We are building Asankhya Capital — Bharat Fund as a proposed SEBI-registered
            Category III Alternative Investment Fund, with a founding team that has spent
            careers in institutional research, portfolio management and corporate finance
            before bringing that experience to a single platform. Our thesis — that the best
            long-term returns sit at the intersection of genuine structural growth and
            management teams who actually execute on it — is the same idea that shapes every
            page on this site.
          </p>
        </div>
        <div className={s.factCard} {...srItem(1)}>
          <FactTable rows={FACTS} />
        </div>
      </ScrollReveal>
    </section>
  )
}
