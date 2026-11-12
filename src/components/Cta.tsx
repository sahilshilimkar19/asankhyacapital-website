import { ScrollReveal } from './ScrollReveal'
import { PHONE_DISPLAY, PHONE_HREF } from '../siteContact'
import s from './Cta.module.css'

export function Cta() {
  return (
    <section id="contact" className={`section ${s.band}`} aria-labelledby="contact-title">
      <ScrollReveal className="container">
        <p className="eyebrow">Ready to Learn More</p>
        <h2 id="contact-title" className={s.title}>
          Start With a Conversation, Not a Sales Pitch
        </h2>
        <p className={s.body}>
          Share a little about your objectives and our investment team will follow up
          directly — no obligation, and no fund-specific terms shared until a suitability
          check is complete.
        </p>
        {/* The number is in the label so desktops without a dialer can still read it */}
        <a href={PHONE_HREF} className={`btn btnNavy ${s.call}`}>
          Call {PHONE_DISPLAY}
        </a>
      </ScrollReveal>
    </section>
  )
}
