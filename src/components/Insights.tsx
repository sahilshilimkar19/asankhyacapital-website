import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './Insights.module.css'

const INSIGHTS = [
  {
    tag: 'Quarterly Outlook',
    title: "India's Financialisation of Savings: A Multi-Decade Runway",
    blurb: 'Why the shift from physical to financial assets remains in its early innings.',
    readTime: '6 min read',
  },
  {
    tag: 'Framework Note',
    title: 'What Makes a Moat Durable? Five Tests We Apply',
    blurb: 'A practical walkthrough of our competitive-advantage diagnostic.',
    readTime: '8 min read',
  },
  {
    tag: 'Case Study',
    title: 'Reading a Moat Under Stress: A Live Example',
    blurb: 'How we monitor a thesis when a competitive challenge is genuinely real.',
    readTime: '10 min read',
  },
] as const

export function Insights() {
  return (
    <section id="insights" className="section" aria-labelledby="insights-title">
      <div className="container">
        <ScrollReveal className={s.headRow}>
          <div>
            <p className="eyebrow">Research &amp; Insights</p>
            <h2 id="insights-title" className={s.title}>
              Thought Leadership
            </h2>
          </div>
          <a href="/research" className={s.viewAll}>
            View All Insights →
          </a>
        </ScrollReveal>
        <ScrollReveal group className={s.grid}>
          {INSIGHTS.map((a, i) => (
            <article key={a.title} className={s.card} {...srItem(i)}>
              <p className={s.tag}>{a.tag}</p>
              <div className={s.body}>
                <h3 className={s.cardTitle}>{a.title}</h3>
                <p className={s.blurb}>{a.blurb}</p>
                <p className={s.meta}>{a.readTime}</p>
              </div>
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
