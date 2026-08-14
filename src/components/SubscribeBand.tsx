import type { FormEvent } from 'react'
import { ScrollReveal } from './ScrollReveal'
import s from './SubscribeBand.module.css'

function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const email = String(new FormData(e.currentTarget).get('email') ?? '').trim()
  const subject = encodeURIComponent('Research note subscription — Asankhya Capital')
  const body = encodeURIComponent(
    `Please subscribe this address to the quarterly research note: ${email}`,
  )
  window.location.href = `mailto:info@asankhyacapital.com?subject=${subject}&body=${body}`
}

export function SubscribeBand() {
  return (
    <section className={s.band} aria-labelledby="subscribe-title">
      <ScrollReveal className="container">
        <p className="eyebrow">Stay Informed</p>
        <h2 className={s.title} id="subscribe-title">
          Subscribe to our quarterly research note
        </h2>
        <form className={s.row} onSubmit={handleSubmit}>
          <label htmlFor="sub-email" className="visuallyHidden">
            Email address
          </label>
          <input id="sub-email" name="email" type="email" placeholder="Your email address" />
          <button type="submit" className={`btn btnNavy ${s.submit}`}>
            Subscribe
          </button>
        </form>
      </ScrollReveal>
    </section>
  )
}
