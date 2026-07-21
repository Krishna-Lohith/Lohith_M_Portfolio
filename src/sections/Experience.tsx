import { useEffect, useRef } from 'react'
import { MapPin } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { EXPERIENCE } from '../data/content'
import { gsap, reveal, prefersReducedMotion } from '../lib/motion'

export default function Experience() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // Progress line grows with scroll
      gsap.from('.exp-line', {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: {
          trigger: '.exp-list',
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.6,
        },
      })
      gsap.utils.toArray<HTMLElement>('.exp-card').forEach((card) => {
        reveal(card, card, { y: 60, duration: 0.9, start: 'top 82%' })
      })
      gsap.utils.toArray<HTMLElement>('.exp-dot').forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2.5)',
            clearProps: 'transform',
            scrollTrigger: { trigger: dot, start: 'top 82%', once: true },
          },
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={rootRef} className="section-pad relative py-24 md:py-36">
      <SectionHeading index="02" eyebrow="Experience" title="Four years, four industries" />

      <div className="exp-list relative">
        {/* Timeline rail */}
        <div aria-hidden className="absolute left-[7px] top-2 h-full w-px bg-white/10 md:left-1/2" />
        <div
          aria-hidden
          className="exp-line absolute left-[7px] top-2 h-full w-px bg-gradient-to-b from-accent via-accent/70 to-amber md:left-1/2"
        />

        <div className="space-y-14 md:space-y-24">
          {EXPERIENCE.map((job, i) => {
            const accentText = job.accent === 'cyan' ? 'text-accent' : 'text-amber'
            const left = i % 2 === 0
            return (
              <div
                key={job.company}
                className={`relative pl-10 md:w-[calc(50%-2.5rem)] md:pl-0 ${
                  left ? 'md:mr-auto' : 'md:ml-auto'
                }`}
              >
                {/* Node dot */}
                <span
                  aria-hidden
                  className={`exp-dot absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-night md:top-3 ${
                    job.accent === 'cyan' ? 'bg-accent' : 'bg-amber'
                  } ${left ? 'md:left-auto md:-right-[47.5px]' : 'md:-left-[47.5px]'}`}
                  style={{ boxShadow: `0 0 18px ${job.accent === 'cyan' ? 'rgba(56,225,255,0.7)' : 'rgba(255,180,84,0.7)'}` }}
                />

                <article className="exp-card glass group rounded-3xl p-6 transition-colors duration-300 hover:border-white/25 md:p-8">
                  <p className={`font-mono text-[11px] tracking-[0.2em] ${accentText}`}>
                    {job.period.toUpperCase()}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    {job.company}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-muted">
                    {job.role}
                    <span className="ml-2 inline-flex items-center gap-1 text-xs text-muted/70">
                      <MapPin size={11} /> {job.location}
                    </span>
                  </p>
                  <ul className="mt-5 space-y-3">
                    {job.bullets.map((b) => (
                      <li key={b.text} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                        <span aria-hidden className={`mt-[7px] h-1 w-1 shrink-0 rounded-full ${job.accent === 'cyan' ? 'bg-accent' : 'bg-amber'}`} />
                        <span>
                          {b.text}
                          {b.metric && (
                            <span className={`ml-2 whitespace-nowrap rounded-full bg-white/5 px-2 py-0.5 font-mono text-[11px] ${accentText}`}>
                              {b.metric}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
