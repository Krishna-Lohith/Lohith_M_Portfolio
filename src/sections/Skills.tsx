import { useEffect, useRef } from 'react'
import SectionHeading from '../components/SectionHeading'
import { SKILL_GROUPS, MARQUEE_ITEMS } from '../data/content'
import { gsap, reveal, prefersReducedMotion } from '../lib/motion'

export default function Skills() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      reveal('.skill-card', '.skill-grid', { y: 50, stagger: 0.09 })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative py-24 md:py-32">
      <div className="section-pad">
        <SectionHeading index="04" eyebrow="Stack" title="Tools I think in" />

        <div className="skill-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => (
            <div
              key={group.title}
              className="skill-card glass group rounded-3xl p-6 transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.06] md:p-7"
            >
              <p className="mb-4 flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-muted">
                {group.title.toUpperCase()}
                <span className="text-accent/70">0{i + 1}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-ink/85 transition-colors duration-200 group-hover:bg-white/[0.08]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tool marquee */}
      <div className="mt-20 overflow-hidden border-y border-white/5 py-6" aria-hidden>
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-display text-2xl font-medium tracking-tight text-white/15 transition-colors md:text-3xl"
            >
              {item} <span className="ml-10 text-accent/30">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
