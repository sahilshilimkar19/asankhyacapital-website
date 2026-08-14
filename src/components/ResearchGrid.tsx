import { useState } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './ResearchGrid.module.css'

const PILLS = [
  { label: 'All', tag: null },
  { label: 'Quarterly Outlook', tag: 'Quarterly Outlook' },
  { label: 'Framework Notes', tag: 'Framework Note' },
  { label: 'Case Studies', tag: 'Case Study' },
  { label: 'Firm News', tag: 'Firm News' },
] as const

const ARTICLES = [
  {
    tag: 'Quarterly Outlook',
    title: "India's Financialisation of Savings: A Multi-Decade Runway",
    blurb: 'Why the shift from physical to financial assets remains in its early innings.',
    meta: '6 MIN READ  ·  JAN 2026',
  },
  {
    tag: 'Framework Note',
    title: 'What Makes a Moat Durable? Five Tests We Apply',
    blurb: 'A practical walkthrough of our competitive-advantage diagnostic.',
    meta: '8 MIN READ  ·  DEC 2025',
  },
  {
    tag: 'Case Study',
    title: 'Reading a Moat Under Stress: A Live Example',
    blurb: 'How we monitor a thesis when a competitive challenge is genuinely real.',
    meta: '10 MIN READ  ·  DEC 2025',
  },
  {
    tag: 'Framework Note',
    title: 'Capital Allocation: The Pillar Most Investors Skip',
    blurb: 'Why reinvestment discipline matters more than headline growth.',
    meta: '7 MIN READ  ·  NOV 2025',
  },
  {
    tag: 'Firm News',
    title: 'Building the SCALE Framework: Our Design Process',
    blurb: 'How our six research pillars are presented as one public framework.',
    meta: '5 MIN READ  ·  NOV 2025',
  },
  {
    tag: 'Quarterly Outlook',
    title: 'Structural Growth vs. Thematic Investing: A Field Guide',
    blurb: 'Five tests to tell a genuine multi-decade tailwind from a two-year trend.',
    meta: '9 MIN READ  ·  OCT 2025',
  },
] as const

export function ResearchGrid() {
  const [active, setActive] = useState<(typeof PILLS)[number]['label']>('All')
  const activeTag = PILLS.find((p) => p.label === active)?.tag ?? null
  const shown = activeTag ? ARTICLES.filter((a) => a.tag === activeTag) : ARTICLES

  return (
    <section className={s.research} aria-label="Published research">
      <div className="container">
        <div className={s.tagBar} role="group" aria-label="Filter by category">
          {PILLS.map((p) => (
            <button
              key={p.label}
              type="button"
              className={p.label === active ? `${s.pill} ${s.pillActive}` : s.pill}
              aria-pressed={p.label === active}
              onClick={() => setActive(p.label)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <ScrollReveal group className={s.grid}>
          {shown.map((a, i) => (
            <article key={a.title} className={s.card} {...srItem(i)}>
              <p className={s.tag}>{a.tag}</p>
              <div className={s.body}>
                <h3 className={s.cardTitle}>{a.title}</h3>
                <p className={s.blurb}>{a.blurb}</p>
                <p className={s.meta}>{a.meta}</p>
              </div>
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
