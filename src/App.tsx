import { useMemo, useRef } from 'react'
import { Backdrop } from './components/Backdrop'
import { CircleMotif } from './components/CircleMotif'
import { Hero } from './components/Hero'
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
      <Backdrop />
      <CircleMotif />
      <main className={s.content}>
        <Hero />
      </main>
    </div>
  )
}
