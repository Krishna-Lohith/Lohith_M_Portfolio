import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reveal, prefersReducedMotion } from '../lib/motion'

interface Props {
  index: string
  eyebrow: string
  title: string
  className?: string
}

export default function SectionHeading({ index, eyebrow, title, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current!
    const ctx = gsap.context(() => {
      reveal(el.children, el, { y: 42, stagger: 0.12, duration: 0.9, start: 'top 82%' })
    }, el)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div ref={ref} className={`mb-12 md:mb-16 ${className}`}>
      <p className="mb-3 font-mono text-xs tracking-[0.3em] text-accent">
        {index} <span className="text-muted">/ {eyebrow.toUpperCase()}</span>
      </p>
      <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
        {title}
      </h2>
    </div>
  )
}
