import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './ContactStrip.module.css'

const ITEMS = [
  { label: 'Head Office', value: 'Gujarat, India' },
  { label: 'General Enquiries', value: 'info@asankhyacapital.com', email: true },
  { label: 'Investor Relations', value: 'ir@asankhyacapital.com', email: true },
  { label: 'Media', value: 'media@asankhyacapital.com', email: true },
] as const

export function ContactStrip() {
  return (
    <section className={s.strip} aria-label="Contact details">
      <ScrollReveal group className={`container ${s.grid}`}>
        {ITEMS.map((it, i) => (
          <div key={it.label} className={s.item} {...srItem(i)}>
            <span className={s.label}>{it.label}</span>
            <b>{'email' in it && it.email ? <a href={`mailto:${it.value}`}>{it.value}</a> : it.value}</b>
          </div>
        ))}
      </ScrollReveal>
    </section>
  )
}
