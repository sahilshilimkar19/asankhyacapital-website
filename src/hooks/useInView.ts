import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
}

/**
 * Fire-once viewport detection for scroll reveals. Fails VISIBLE:
 * no IntersectionObserver support → true immediately; reduced
 * motion → true immediately (no observer created).
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = '0px',
}: UseInViewOptions = {}): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const reduced = usePrefersReducedMotion()
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (inView || reduced) return
    const el = ref.current
    if (!el) {
      setInView(true) // no target — fail visible
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView, reduced, threshold, rootMargin])

  return [ref, inView || reduced]
}

/**
 * Stagger props for children of a group ScrollReveal:
 * `<article {...srItem(i)}>`. Lives here (not ScrollReveal.tsx)
 * so component files only export components.
 */
export function srItem(i: number): { 'data-sr-item': ''; style: CSSProperties } {
  return { 'data-sr-item': '', style: { '--sr-i': i } as CSSProperties }
}
