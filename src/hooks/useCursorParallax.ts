import { useEffect, type RefObject } from 'react'

/**
 * Tracks the pointer and writes smoothed, normalized coordinates (0..1) to
 * the `--cx` / `--cy` custom properties on the given element. CSS consumes
 * them for the spotlight and parallax planes — zero React re-renders.
 *
 * Runs a rAF loop only while the values are still converging (lerp), then
 * idles until the next pointer move.
 */
export function useCursorParallax(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
): void {
  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return

    let raf = 0
    // target (t) and current (c) normalized coordinates
    let tx = 0.5
    let ty = 0.5
    let cx = 0.5
    let cy = 0.5

    const tick = () => {
      cx += (tx - cx) * 0.07 // exponential smoothing — buttery trailing feel
      cy += (ty - cy) * 0.07
      el.style.setProperty('--cx', cx.toFixed(4))
      el.style.setProperty('--cy', cy.toFixed(4))
      const settled = Math.abs(tx - cx) + Math.abs(ty - cy) < 0.002
      raf = settled ? 0 : requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth
      ty = e.clientY / window.innerHeight
      if (!raf) raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [ref, enabled])
}
