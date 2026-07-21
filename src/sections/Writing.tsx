import { useEffect, useRef } from 'react'
import { ArrowUpRight, PenLine } from 'lucide-react'
import { LinkedinIcon } from '../components/BrandIcons'
import SectionHeading from '../components/SectionHeading'
import { LINKS } from '../data/content'
import { gsap, reveal, prefersReducedMotion } from '../lib/motion'

export default function Writing() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      reveal('.writing-card', rootRef.current!, { y: 50, stagger: 0.15, duration: 0.9, start: 'top 80%' })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="writing" ref={rootRef} className="section-pad relative py-24 md:py-32">
      <SectionHeading index="05" eyebrow="Writing" title="Thinking out loud" />

      <div className="grid gap-8 md:grid-cols-2">
        <a
          href={LINKS.medium}
          target="_blank"
          rel="noopener noreferrer"
          className="writing-card glass group rounded-[2rem] p-8 transition-colors duration-300 hover:border-accent/40 md:p-10"
        >
          <PenLine size={30} strokeWidth={1.3} className="text-accent" />
          <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
            AI/ML on Medium
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Technical articles on applied machine learning, GenAI pipelines, and lessons from
            production systems.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
            Read articles
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </a>

        <a
          href={LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="writing-card glass group rounded-[2rem] p-8 transition-colors duration-300 hover:border-amber/40 md:p-10"
        >
          <LinkedinIcon size={30} className="text-amber" />
          <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
            Insights on LinkedIn
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Applied ML insights and build-in-public updates from DeshMate and Porzolio, shared with
            a growing professional audience.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber">
            Connect with me
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </a>
      </div>
    </section>
  )
}
