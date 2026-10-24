import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './SangamConfluence.module.css'

// Investor deck, Section 03 — "Where Three Rivers Meet"
const MOMENTS = [
  {
    title: 'Demographic dividend',
    body: 'Working-age population is still years from its peak.',
  },
  {
    title: 'Financialisation of savings',
    body: 'A multi-decade shift from physical to financial assets',
  },
  {
    title: 'Formalisation',
    body: 'An informal economy shifting under regulatory & tech pressure',
  },
  {
    title: 'Manufacturing share',
    body: 'Global supply chains diversifying capacity into India',
  },
] as const

export function SangamConfluence() {
  return (
    <section className={s.confluence} aria-labelledby="confluence-title">
      <div className="container">
        <ScrollReveal className={s.head}>
          <p className="eyebrow">Sangam</p>
          <h2 className={s.title} id="confluence-title">
            Where Three Rivers Meet
          </h2>
        </ScrollReveal>
        <ScrollReveal group className={s.cols}>
          <div className={`onDark ${s.card}`} {...srItem(0)}>
            <blockquote className={s.quote}>
              &ldquo;At Prayagraj, the Ganga, the Yamuna and the Saraswati meet at a point called
              Sangam &mdash; the confluence. Two rivers are visible; the third, Saraswati, is said
              to flow beneath them, unseen but decisive. Three currents, each substantial alone,
              become something larger where they meet.&rdquo;
            </blockquote>
            <p className={s.thesis}>
              We do not invest in structural growth alone &mdash; that is thematic speculation. We
              do not invest in excellent execution alone &mdash; that is paying a premium for
              competence in a shrinking pond. And we do not invest in a moat alone, with nothing
              left to defend &mdash; that is paying for a fortress with no kingdom inside it. We
              invest where a genuine structural tailwind meets a management team capable of
              capturing it, defended by a competitive advantage durable enough to keep what
              they&rsquo;ve captured.
            </p>
          </div>
          <div {...srItem(1)}>
            <p className="eyebrow">The Sangam Moment for Bharat</p>
            <ul className={s.moments}>
              {MOMENTS.map((m) => (
                <li key={m.title} className={s.moment}>
                  <h3 className={s.momentTitle}>{m.title}</h3>
                  <p className={s.momentBody}>{m.body}</p>
                </li>
              ))}
            </ul>
            <p className={s.note}>
              These are structural, multi-decade currents &mdash; not predictions about next
              year&rsquo;s GDP print.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
