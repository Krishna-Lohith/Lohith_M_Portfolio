import { useEffect, useRef } from 'react'
import { STATS } from '../data/content'
import { gsap, reveal, prefersReducedMotion } from '../lib/motion'

export default function Stats() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current!
    const ctx = gsap.context(() => {
      const nums = gsap.utils.toArray<HTMLElement>('.stat-num')
      nums.forEach((el) => {
        const target = Number(el.dataset.value)
        if (prefersReducedMotion()) {
          el.textContent = String(target)
          return
        }
        const counter = { v: 0 }
        gsap.to(counter, {
          v: target,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.v))
          },
        })
      })
      if (!prefersReducedMotion()) {
        reveal('.stat-cell', root, { y: 36, stagger: 0.1, duration: 0.8 })
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="section-pad relative z-10 -mt-6 pb-8">
      <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="stat-cell bg-white/[0.02] px-6 py-8 text-center md:py-10">
            <p className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              {s.prefix && <span className="text-accent">{s.prefix}</span>}
              <span className="stat-num" data-value={s.value}>0</span>
              <span className="text-accent">{s.suffix}</span>
            </p>
            <p className="mt-2 text-xs leading-snug text-muted md:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
