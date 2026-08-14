import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import s from './PageHero.module.css'

interface PageHeroProps {
  /** Current page name, shown after "Home /" in the breadcrumb. */
  crumb: string
  eyebrow: string
  title: string
  lede: string
  /** Centered variant: no bottom border, everything centered. */
  centered?: boolean
  /** Optional CTA content rendered in a button row below the lede. */
  children?: ReactNode
}

/** Interior-page hero: breadcrumb → eyebrow → title → lede (→ CTA row). */
export function PageHero({ crumb, eyebrow, title, lede, centered, children }: PageHeroProps) {
  return (
    <section
      className={centered ? `${s.pagehero} ${s.centered}` : s.pagehero}
      aria-labelledby="page-title"
    >
      <div className="container">
        <Reveal i={0} as="p" className={s.breadcrumb}>
          Home <span>/</span> {crumb}
        </Reveal>
        <Reveal i={1} as="p" className="eyebrow">
          {eyebrow}
        </Reveal>
        <Reveal i={2} as="h1" className={s.title} id="page-title">
          {title}
        </Reveal>
        <Reveal i={3} as="p" className={s.lede}>
          {lede}
        </Reveal>
        {children && (
          <Reveal i={4} className={s.btnRow}>
            {children}
          </Reveal>
        )}
      </div>
    </section>
  )
}
