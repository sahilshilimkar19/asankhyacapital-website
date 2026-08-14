import type { ElementType, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface ScrollRevealProps {
  as?: ElementType
  /** true → container stays opaque; [data-sr-item] children stagger in */
  group?: boolean
  className?: string
  children?: ReactNode
  [key: string]: unknown
}

/**
 * Scroll-triggered reveal wrapper. Renders `as` (default div) with
 * data-sr / data-sr-group set to "pending" until the element enters
 * the viewport, then "in" — global.css transitions the rest.
 */
export function ScrollReveal({
  as: Tag = 'div',
  group = false,
  className,
  children,
  ...rest
}: ScrollRevealProps) {
  const [ref, inView] = useInView<HTMLElement>()
  const state = inView ? 'in' : 'pending'
  const attr = group ? { 'data-sr-group': state } : { 'data-sr': state }
  return (
    <Tag ref={ref as never} className={className} {...attr} {...rest}>
      {children}
    </Tag>
  )
}
