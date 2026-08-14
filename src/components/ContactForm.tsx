import type { FormEvent } from 'react'
import { ScrollReveal } from './ScrollReveal'
import s from './ContactForm.module.css'

// FormData keys, in the order they appear in the email body
const FIELD_NAMES = [
  'Full Name',
  'Email Address',
  'Phone Number',
  'Investor Type',
  'Indicative Commitment Range',
  'How did you hear about us',
] as const

function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const data = new FormData(e.currentTarget)
  const lines = FIELD_NAMES.map((key) => {
    const value = String(data.get(key) ?? '').trim()
    return value ? `${key}: ${value}` : null
  }).filter(Boolean) as string[]
  const subject = encodeURIComponent('Investor enquiry — Asankhya Capital')
  const body = encodeURIComponent(lines.join('\n'))
  window.location.href = `mailto:info@asankhyacapital.com?subject=${subject}&body=${body}`
}

export function ContactForm() {
  return (
    <section className={s.formSection} aria-label="Qualification form">
      <ScrollReveal className={`container ${s.formWrap}`}>
        <form onSubmit={handleSubmit}>
          <div className={s.row}>
            <label htmlFor="cf-name">Full Name</label>
            <input id="cf-name" name="Full Name" type="text" placeholder="First Last" />
          </div>
          <div className={s.row}>
            <label htmlFor="cf-email">Email Address</label>
            <input
              id="cf-email"
              name="Email Address"
              type="email"
              placeholder="name@example.com"
            />
          </div>
          <div className={s.row}>
            <label htmlFor="cf-phone">Phone Number</label>
            <input id="cf-phone" name="Phone Number" type="text" placeholder="+91 00000 00000" />
          </div>
          <div className={s.row}>
            <label htmlFor="cf-type">Investor Type</label>
            <select id="cf-type" name="Investor Type">
              <option>Individual / HNI</option>
              <option>Family Office</option>
              <option>Institution</option>
              <option>Distributor / Wealth Platform</option>
            </select>
          </div>
          <div className={s.row}>
            <label htmlFor="cf-range">Indicative Commitment Range</label>
            <select id="cf-range" name="Indicative Commitment Range">
              <option>₹1–5 Crore</option>
              <option>₹5–25 Crore</option>
              <option>₹25 Crore+</option>
              <option>Prefer not to say</option>
            </select>
          </div>
          <div className={s.row}>
            <label htmlFor="cf-source">How did you hear about us</label>
            <input
              id="cf-source"
              name="How did you hear about us"
              type="text"
              placeholder="Referral, research note, event, etc."
            />
          </div>
          <button type="submit" className={`btn btnNavy ${s.submit}`}>
            Submit
          </button>
          <p className={s.note}>
            Your information is used only to assess suitability under SEBI's
            sophisticated-investor criteria and is never shared with a third party for
            marketing purposes.
          </p>
        </form>
      </ScrollReveal>
    </section>
  )
}
