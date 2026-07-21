import { useEffect, useRef } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { IMPACT_METRICS } from '../data/content'
import { gsap, reveal, prefersReducedMotion } from '../lib/motion'

const MAX = Math.max(...IMPACT_METRICS.map((m) => m.value))

/**
 * Single-series horizontal bar chart of production impact. One hue (cyan),
 * direct labels in ink, no axis chrome - the labels are the axis.
 */
export default function ImpactChart() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current!
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray<HTMLElement>('.impact-bar').forEach((bar, i) => {
        gsap.fromTo(
          bar,
          { scaleX: 0, transformOrigin: 'left' },
          {
            scaleX: 1,
            duration: 1.1,
            delay: i * 0.08,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: root, start: 'top 78%', once: true },
          },
        )
      })
      gsap.utils.toArray<HTMLElement>('.impact-num').forEach((el, i) => {
        const target = Number(el.dataset.value)
        const counter = { v: 0 }
        gsap.to(counter, {
          v: target,
          duration: 1.1,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 78%' },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.v))
          },
        })
      })
      reveal('.impact-row', root, { y: 24, stagger: 0.08, duration: 0.7, start: 'top 80%' })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="section-pad pb-24 md:pb-36">
      <div className="glass rounded-3xl p-7 md:p-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-accent">IMPACT / MEASURED</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              What the models changed
            </h3>
          </div>
          <p className="hidden text-right font-mono text-xs text-muted md:block">
            % change delivered in production
          </p>
        </div>

        <div className="space-y-5">
          {IMPACT_METRICS.map((m) => (
            <div key={m.label} className="impact-row group">
              <div className="mb-1.5 flex items-baseline justify-between gap-4">
                <p className="text-sm text-muted transition-colors duration-200 group-hover:text-ink">
                  {m.label}
                </p>
                <p className="flex items-center gap-1.5 font-mono text-sm font-medium text-ink">
                  {m.dir === 'up' ? (
                    <TrendingUp size={13} className="text-accent" aria-label="increase" />
                  ) : (
                    <TrendingDown size={13} className="text-accent" aria-label="reduction" />
                  )}
                  <span className="impact-num" data-value={m.value}>{m.value}</span>
                  {m.unit}
                </p>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="impact-bar h-full rounded-full bg-gradient-to-r from-accent/70 to-accent transition-opacity duration-200 group-hover:opacity-100"
                  style={{ width: `${(m.value / MAX) * 100}%`, opacity: 0.85 }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-7 text-xs leading-relaxed text-muted/70">
          Reductions are improvements too: fewer false positives, faster lookups, less manual work.
        </p>
      </div>
    </div>
  )
}
