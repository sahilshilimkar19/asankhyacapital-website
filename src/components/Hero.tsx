import { useCallback, useEffect, useRef, useState } from 'react'
import { Reveal } from './Reveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import s from './Hero.module.css'

/**
 * The hero plays an ambient montage: two clips on two stacked <video>
 * elements that dissolve into one another, then back again. Each slot keeps
 * its own clip for the whole session, so nothing ever re-buffers.
 *
 * Add or reorder clips here — one entry per slot. See README → "Media assets".
 */
const CLIPS = ['/media/mumbai-hero.mp4', '/media/NY-hero.mp4'] as const

/**
 * The supplied clips are only ~1–2 s long. At full speed the montage reads as
 * a stutter; at half speed the same footage drifts, and each dissolve cycle
 * lasts long enough to feel deliberate.
 */
const PLAYBACK_RATE = 0.5

/** Dissolve ceiling. The real value is derived from the shortest clip below. */
const MAX_FADE_MS = 900

/** Value first, label under — the gold-rule fact idiom used by FundTeaser. */
const STATS = [
  { value: 'In Process', label: 'SEBI Registration' },
  { value: '50+ Years', label: 'Combined Leadership Experience' },
  { value: '₹1 Cr', label: 'Minimum Contribution' },
] as const

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const slots = useRef<(HTMLVideoElement | null)[]>([null, null])
  /** Which slot is currently at full opacity. */
  const [active, setActive] = useState(0)
  const [fadeMs, setFadeMs] = useState(700)
  const [dead, setDead] = useState<readonly boolean[]>([false, false])
  /** Latches across a dissolve so timeupdate can't retrigger it. */
  const swapping = useRef(false)

  const liveSlots = dead.filter((d) => !d).length
  const canCrossfade = liveSlots === CLIPS.length && !reduced

  /* Derive the dissolve from the shortest clip so a 1.3 s clip is never
     mostly-dissolve. Runs on each slot's metadata; harmless when repeated. */
  const syncFade = useCallback(() => {
    const durations = slots.current
      .map((v) => v?.duration)
      .filter((d): d is number => typeof d === 'number' && Number.isFinite(d) && d > 0)
    if (durations.length < CLIPS.length) return
    const shortestMs = (Math.min(...durations) / PLAYBACK_RATE) * 1000
    setFadeMs(Math.round(Math.min(MAX_FADE_MS, shortestMs * 0.3)))
  }, [])

  /* playbackRate is reset by the element on load, so re-apply it there
     rather than once on mount. */
  const applyRate = (v: HTMLVideoElement) => {
    v.playbackRate = PLAYBACK_RATE
  }

  const handleTimeUpdate = (slot: number) => {
    if (!canCrossfade || slot !== active || swapping.current) return
    const outgoing = slots.current[slot]
    const incoming = slots.current[1 - slot]
    if (!outgoing?.duration || !incoming) return

    const remainingMs = ((outgoing.duration - outgoing.currentTime) / PLAYBACK_RATE) * 1000
    if (remainingMs > fadeMs) return

    swapping.current = true
    incoming.currentTime = 0
    applyRate(incoming)
    void incoming.play().catch(() => undefined)
    setActive(1 - slot)

    // Park the outgoing clip once it is fully hidden — it has reached its own
    // end by now anyway, and a paused element costs nothing to decode.
    window.setTimeout(() => {
      outgoing.pause()
      swapping.current = false
    }, fadeMs)
  }

  // Honour a motion preference the visitor flips mid-visit.
  useEffect(() => {
    if (reduced) slots.current.forEach((v) => v?.pause())
  }, [reduced])

  return (
    <section className={`onDark ${s.hero}`} aria-labelledby="hero-title">
      <div className={s.media} aria-hidden="true">
        {CLIPS.map((src, i) =>
          dead[i] ? null : (
            <video
              key={src}
              ref={(el) => {
                slots.current[i] = el
              }}
              className={i === active ? `${s.video} ${s.videoActive}` : s.video}
              style={{ transitionDuration: `${fadeMs}ms` }}
              src={src}
              // Only the first slot autoplays; the second is cued and waiting.
              autoPlay={i === 0 && !reduced}
              muted
              // Without a partner to dissolve into, a hard loop beats stopping.
              loop={!canCrossfade}
              playsInline
              preload="auto"
              tabIndex={-1}
              onLoadedMetadata={(e) => {
                applyRate(e.currentTarget)
                syncFade()
              }}
              onTimeUpdate={() => handleTimeUpdate(i)}
              onError={() => setDead((prev) => prev.map((d, j) => (j === i ? true : d)))}
            />
          ),
        )}
        <div className={s.scrim} />
      </div>

      <div className={s.body}>
        <div className={`container ${s.copy}`}>
          <Reveal i={0} as="p" className="eyebrow">
            Partners in Long-Term Wealth Creation
          </Reveal>
          <Reveal i={1} as="h1" className={s.title} id="hero-title">
            Enduring businesses, at the intersection of{' '}
            <em className={s.accent}>structural growth</em> and exceptional execution.
          </Reveal>
          <Reveal i={2} as="p" className={s.lede}>
            Asankhya Capital is a proposed SEBI-registered Category III AIF built for
            investors who measure returns in decades, not quarters — sector-agnostic,
            research-led, and disciplined by our Sangam philosophy and six pillars framework.
          </Reveal>
          <Reveal i={3} className={s.btnRow}>
            <a href="/philosophy" className="btn btnGold">
              Read Our Philosophy
            </a>
            <a href="/bharat-fund" className={s.btnGhost}>
              Explore the Fund
            </a>
          </Reveal>
        </div>
      </div>

      {/* A thin strip along the foot: it frames the footage rather than
          covering it, and the three facts span the full measure. */}
      <Reveal i={4} className={s.baseline}>
        <dl className={`container ${s.stats}`}>
          {STATS.map((st) => (
            <div key={st.label} className={s.stat}>
              <dt className={s.statValue}>{st.value}</dt>
              <dd className={s.statLabel}>{st.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
