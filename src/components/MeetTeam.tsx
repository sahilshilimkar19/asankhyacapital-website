import { ScrollReveal } from './ScrollReveal'
import s from './MeetTeam.module.css'

export function MeetTeam() {
  return (
    <section className={s.cta}>
      <ScrollReveal className="container">
        <a href="/team" className="btn btnNavy">
          Meet the Team
        </a>
      </ScrollReveal>
    </section>
  )
}
