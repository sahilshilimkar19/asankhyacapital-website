import { ScrollReveal } from './ScrollReveal'
import { srItem } from '../hooks/useInView'
import s from './AsankhyaMeaning.module.css'

/* The card's dot field — "beyond counting" drawn as a scatter of points, as in
   the investor deck. Generated once from a fixed seed (mulberry32) so it is the
   same on every render and every visit, and kept clear of the zones where the
   word and the closing line sit so they stay legible. Coordinates are in the
   SVG's 480 × 400 viewBox; it is sliced to the card, which crops the sides on
   narrow cards, so the closing line's zone spans the full width. */
interface Dot {
  x: number
  y: number
  r: number
  gold: boolean
}

function starfield(count: number, seed: number): Dot[] {
  let t = seed
  const rand = () => {
    t = (t + 0x6d2b79f5) | 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
  const dots: Dot[] = []
  while (dots.length < count) {
    const x = rand() * 480
    const y = rand() * 400
    const r = 1.2 + rand() * 2.8
    const gold = rand() < 0.6
    const inWord = ((x - 240) / 150) ** 2 + ((y - 170) / 88) ** 2 < 1
    const inLine = y > 312 && y < 382
    if (!inWord && !inLine) dots.push({ x, y, r, gold })
  }
  return dots
}

const DOTS = starfield(56, 108)

export function AsankhyaMeaning() {
  return (
    <section className={s.meaning} aria-label="The meaning of Asankhya">
      <ScrollReveal group className={`container ${s.cols}`}>
        <div {...srItem(0)}>
          <div className={s.block}>
            <h2 className="eyebrow">The Meaning</h2>
            <p className={s.body}>
              Asankhya (
              <span lang="sa" className={s.deva}>
                असंख्य
              </span>
              ) is a Sanskrit word that means <strong>beyond counting</strong> &mdash; a magnitude
              so vast that it cannot be measured by numbers. For us, it represents{' '}
              <strong>the limitless potential of what can be built, compounded and achieved</strong>.
            </p>
          </div>
          <div className={s.block}>
            <h2 className="eyebrow">Our Belief</h2>
            <p className={s.body}>
              We believe extraordinary businesses can create value beyond conventional limits. We
              identify that{' '}
              <strong>
                potential early, back it with conviction, and compound it into enduring wealth.
              </strong>
            </p>
          </div>
          <div className={s.block}>
            <h2 className="eyebrow">Our Values</h2>
            <p className={s.body}>
              For us, investing is not simply about generating returns. It is about{' '}
              <strong>
                deploying capital with conviction and discipline, backing enduring businesses, and
                creating lasting prosperity
              </strong>{' '}
              for the families and partners who trust us. Because when potential is truly
              extraordinary, it is beyond counting.
            </p>
          </div>
        </div>

        <div className={`onDark ${s.card}`} {...srItem(1)}>
          <svg
            className={s.field}
            viewBox="0 0 480 400"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            focusable="false"
          >
            {DOTS.map((d, i) => (
              <circle
                key={i}
                cx={d.x.toFixed(1)}
                cy={d.y.toFixed(1)}
                r={d.r.toFixed(1)}
                className={d.gold ? s.gold : s.steel}
              />
            ))}
          </svg>
          <div className={s.mark}>
            <p lang="sa" className={`${s.word} ${s.deva}`}>
              असंख्य
            </p>
            <p lang="sa-Latn" className={s.translit}>
              Asaṅkhya
            </p>
            <p className={s.gloss}>&ldquo;Beyond Counting&rdquo;</p>
          </div>
          <p className={s.line}>
            Countless as the ages. Limitless as the horizon. So, too, the wealth we build.
          </p>
        </div>
      </ScrollReveal>
    </section>
  )
}
