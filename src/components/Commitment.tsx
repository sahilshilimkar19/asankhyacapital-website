import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './Commitment.module.css'

const CARDS = [
  {
    title: 'Documented process',
    body: 'Every position is scored against the same 6 Pillars framework before it enters the portfolio — see the full methodology.',
  },
  {
    title: 'Named accountability',
    body: 'A named investment committee and fund manager, not a single-person story — see our team.',
  },
  {
    title: 'Regulated structure',
    body: "Governed by a trustee, custodian and RTA independent of the investment manager, per SEBI's AIF framework.",
  },
] as const

export function Commitment() {
  return (
    <section className={s.commitment} aria-labelledby="commitment-title">
      <div className="container">
        <ScrollReveal className={s.head}>
          <p className="eyebrow">Our Commitment</p>
          <h2 className={s.title} id="commitment-title">
            Transparency is not a marketing position
          </h2>
          <p className={s.sub}>
            We publish our reasoning as openly as our results — monthly NAVs, quarterly
            letters, and a research process any member of our investment committee could
            explain from memory. That is how we hold ourselves accountable to the philosophy
            on this website.
          </p>
        </ScrollReveal>
        <ScrollReveal group className={s.grid}>
          {CARDS.map((c, i) => (
            <div key={c.title} className={s.card} {...srItem(i)}>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
