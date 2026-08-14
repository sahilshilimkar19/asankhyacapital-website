import { ScrollReveal } from './ScrollReveal'
import s from './Philosophy.module.css'

export function Philosophy() {
  return (
    <section id="philosophy" className={`section ${s.band}`} aria-labelledby="philosophy-title">
      <h2 id="philosophy-title" className="visuallyHidden">
        Our Philosophy
      </h2>
      <ScrollReveal as="figure" className={`container ${s.figure}`}>
        <blockquote className={s.quote}>
          &ldquo;We invest in businesses with enduring competitive advantages operating at the{' '}
          <em className={s.accent}>intersection</em> of India&rsquo;s structural growth and
          exceptional execution.&rdquo;
        </blockquote>
        <figcaption className={s.attribution}>The Asankhya Investment Philosophy</figcaption>
      </ScrollReveal>
    </section>
  )
}
