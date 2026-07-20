import { useMemo, useRef } from 'react'
import { AmbientBackground } from './components/AmbientBackground'
import { Hero } from './components/Hero'
import { Cta } from './components/Cta'
import { Footer } from './components/Footer'
import { useCursorParallax } from './hooks/useCursorParallax'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import s from './App.module.css'

export default function App() {
  const pageRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Cursor depth is desktop-only: needs a fine pointer that can hover.
  const parallaxEnabled = useMemo(
    () =>
      !prefersReducedMotion &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    [prefersReducedMotion],
  )

  useCursorParallax(pageRef, parallaxEnabled)

  return (
    <div ref={pageRef} className={s.page}>
      <AmbientBackground />
      <main className={s.content}>
        <Hero />
        <Cta />
        <Footer />
      </main>
    </div>
  )
}
