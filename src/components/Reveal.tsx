import type { CSSProperties, ElementType, ReactNode } from 'react'

interface RevealProps {
  /** Stagger index — element animates in at base + i × step. */
  i: number
  /** Reveal variant: default rise, "rule" (scaleX draw), or "scale" (settle). */
  variant?: 'rise' | 'rule' | 'scale'
  as?: ElementType
  className?: string
  children?: ReactNode
  [key: string]: unknown
}

/**
 * Entrance-choreography wrapper. Renders `as` (default div) with the
 * data-reveal attribute + --reveal-i index consumed by global.css.
 */
export function Reveal({ i, variant = 'rise', as: Tag = 'div', className, children, ...rest }: RevealProps) {
  return (
    <Tag
      data-reveal={variant === 'rise' ? '' : variant}
      className={className}
      style={{ '--reveal-i': i } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  )
}
