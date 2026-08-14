import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import s from './Nav.module.css'

// Absolute hrefs so links work from every page; on the homepage the
// same-path fragment links still scroll without a reload.
const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Philosophy', href: '/philosophy' },
  { label: 'SCALE Framework', href: '/#pillars' },
  { label: 'Bharat Fund', href: '/bharat-fund' },
  { label: 'Insights', href: '/research' },
  { label: 'Team', href: '/team' },
] as const

interface NavProps {
  /** Label of the current page's nav item — gold underline + aria-current. */
  active?: string
}

export function Nav({ active }: NavProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={s.header}>
      <div className={`container ${s.bar}`}>
        <a href="/#top" className={s.home} aria-label="Asankhya Capital — home">
          <Logo withWordmark />
        </a>

        <nav className={s.links} aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={l.label === active ? `${s.link} ${s.linkActive}` : s.link}
              aria-current={l.label === active ? 'page' : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={s.menuBtn}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visuallyHidden">{open ? 'Close menu' : 'Open menu'}</span>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className={s.burger}>
            <line x1="3" y1="8" x2="21" y2="8" stroke="currentColor" strokeWidth="2" />
            <line x1="3" y1="16" x2="21" y2="16" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <div id="site-menu" className={s.menu} hidden={!open}>
        <nav aria-label="Primary, mobile">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={l.label === active ? `${s.menuLink} ${s.menuLinkActive}` : s.menuLink}
              aria-current={l.label === active ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
