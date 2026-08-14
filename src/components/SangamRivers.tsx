import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './SangamRivers.module.css'

const RIVERS = [
  {
    num: 'River One',
    title: 'Structural Growth',
    body: 'We test every industry tailwind for persistence, penetration headroom, policy alignment and demographic grounding — not for whether it is currently fashionable. A theme tells us where to look; it never tells us what to buy.',
  },
  {
    num: 'River Two',
    title: 'Exceptional Execution',
    body: 'A tailwind lifts an entire industry; execution decides who actually captures the value inside it. We evaluate management on integrity, capability, capital-allocation track record, and how candidly they communicate when results disappoint.',
  },
  {
    num: 'River Three',
    title: 'Competitive Advantage',
    body: 'A durable moat — brand, distribution, switching costs or scale — that protects the returns the first two rivers create from being competed away.',
  },
] as const

export function SangamRivers() {
  return (
    <section className={`onDark ${s.band}`} aria-label="The three rivers">
      <ScrollReveal group className={`container ${s.cols}`}>
        {RIVERS.map((r, i) => (
          <div key={r.num} {...srItem(i)}>
            <p className="eyebrow">{r.num}</p>
            <h3 className={s.title}>{r.title}</h3>
            <p className={s.body}>{r.body}</p>
          </div>
        ))}
      </ScrollReveal>
    </section>
  )
}
