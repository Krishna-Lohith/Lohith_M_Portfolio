import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, isTouchDevice } from '../lib/motion'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) return
    const dot = dotRef.current!
    const ring = ringRef.current!
    document.documentElement.classList.add('has-cursor')

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' })

    const move = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('a, button, [role="button"], [data-cursor]')
      gsap.to(ring, { scale: t ? 2.1 : 1, opacity: t ? 0.9 : 0.5, duration: 0.3 })
      gsap.to(dot, { scale: t ? 0.4 : 1, duration: 0.3 })
    }

    const down = () => gsap.to(ring, { scale: 0.8, duration: 0.2 })
    const up = () => gsap.to(ring, { scale: 1, duration: 0.3 })

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] hidden h-1.5 w-1.5 rounded-full bg-accent md:block"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-4 -mt-4 hidden h-8 w-8 rounded-full border border-accent/60 opacity-50 md:block"
      />
    </>
  )
}
