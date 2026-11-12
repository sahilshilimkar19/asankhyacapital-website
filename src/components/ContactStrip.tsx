import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import { PHONE_DISPLAY, PHONE_HREF } from '../siteContact'
import s from './ContactStrip.module.css'

const ITEMS: readonly { label: string; value: string; href?: string }[] = [
  { label: 'Head Office', value: 'Gujarat, India' },
  {
    label: 'General Enquiries',
    value: 'info@asankhyacapital.com',
    href: 'mailto:info@asankhyacapital.com',
  },
  {
    label: 'Compliance',
    value: 'compliance@asankhyacapital.com',
    href: 'mailto:compliance@asankhyacapital.com',
  },
  { label: 'Phone', value: PHONE_DISPLAY, href: PHONE_HREF },
]

/** An email can't wrap on its own; <wbr> lets it break after the @ in a narrow column. */
function breakable(value: string) {
  const at = value.indexOf('@')
  if (at === -1) return value
  return (
    <>
      {value.slice(0, at + 1)}
      <wbr />
      {value.slice(at + 1)}
    </>
  )
}

export function ContactStrip() {
  return (
    <section className={s.strip} aria-label="Contact details">
      <ScrollReveal group className={`container ${s.grid}`}>
        {ITEMS.map((it, i) => (
          <div key={it.label} className={s.item} {...srItem(i)}>
            <span className={s.label}>{it.label}</span>
            <b>{it.href ? <a href={it.href}>{breakable(it.value)}</a> : it.value}</b>
          </div>
        ))}
      </ScrollReveal>
    </section>
  )
}
