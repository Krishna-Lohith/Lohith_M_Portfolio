import { useRef, type ReactNode, type MouseEvent } from 'react'
import { gsap, prefersReducedMotion, isTouchDevice } from '../lib/motion'

interface Props {
  children: ReactNode
  className?: string
  href?: string
  download?: boolean
  onClick?: () => void
  strength?: number
  ariaLabel?: string
}

/** Wrapper that magnetically pulls toward the cursor. */
export default function MagneticButton({
  children,
  className = '',
  href,
  download,
  onClick,
  strength = 0.35,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement | null>(null)

  const onMove = (e: MouseEvent) => {
    if (isTouchDevice() || prefersReducedMotion()) return
    const el = ref.current!
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3.out' })
  }

  const onLeave = () => {
    if (!ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  const common = {
    className: `inline-block will-change-transform ${className}`,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    'aria-label': ariaLabel,
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        ref={(n) => { ref.current = n }}
        href={href}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...common}
      >
        {children}
      </a>
    )
  }
  return (
    <button ref={(n) => { ref.current = n }} type="button" {...common}>
      {children}
    </button>
  )
}
