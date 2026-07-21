import { useRef, type ReactNode, type MouseEvent } from 'react'
import { gsap, prefersReducedMotion, isTouchDevice } from '../lib/motion'

interface Props {
  children: ReactNode
  className?: string
  max?: number
}

/** 3D perspective tilt following the cursor, with a moving sheen. */
export default function TiltCard({ children, className = '', max = 7 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const sheenRef = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent) => {
    if (isTouchDevice() || prefersReducedMotion()) return
    const el = ref.current!
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    gsap.to(el, {
      rotateY: (px - 0.5) * 2 * max,
      rotateX: -(py - 0.5) * 2 * max,
      transformPerspective: 900,
      duration: 0.5,
      ease: 'power2.out',
    })
    if (sheenRef.current) {
      gsap.to(sheenRef.current, {
        opacity: 1,
        x: `${(px - 0.5) * 120}%`,
        y: `${(py - 0.5) * 120}%`,
        duration: 0.5,
      })
    }
  }

  const onLeave = () => {
    if (!ref.current) return
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)' })
    if (sheenRef.current) gsap.to(sheenRef.current, { opacity: 0, duration: 0.5 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative will-change-transform [transform-style:preserve-3d] ${className}`}
    >
      <div
        ref={sheenRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0"
        style={{
          background:
            'radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.07), transparent 45%)',
        }}
      />
      {children}
    </div>
  )
}
