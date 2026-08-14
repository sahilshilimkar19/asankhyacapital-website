import s from './Logo.module.css'

interface LogoProps {
  onDark?: boolean
  withWordmark?: boolean
  /** Mark size in px — 30 in the nav, 26 in the footer (wireframe) */
  size?: number
  /** 8 in the nav, 10 in the footer (wireframe) */
  strokeWidth?: number
  className?: string
}

/**
 * The A+C lockup: an "A" peak with a gold "C" arc interlocking at its
 * right leg (the near-touch at x≈95 is the lockup — intentional).
 * aria-hidden — the accessible name lives on the wrapping link/text.
 */
export function Logo({
  onDark = false,
  withWordmark = false,
  size = 30,
  strokeWidth = 8,
  className,
}: LogoProps) {
  return (
    <span className={`${s.lockup} ${onDark ? s.onDark : ''} ${className ?? ''}`}>
      <svg viewBox="0 0 200 200" width={size} height={size} aria-hidden="true">
        <path
          d="M25,155 L70,50 L115,155"
          fill="none"
          stroke={onDark ? '#FFFFFF' : 'var(--navy)'}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M177.1,61.7 A50,50 0 1 0 177.1,138.3"
          fill="none"
          stroke={onDark ? 'var(--gold-light)' : 'var(--gold)'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
      {withWordmark && (
        <span className={s.word}>
          Asankhya <b>Capital</b>
        </span>
      )}
    </span>
  )
}
