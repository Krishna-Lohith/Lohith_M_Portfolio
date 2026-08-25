import { useEffect, useRef } from 'react'
import SectionHeading from '../components/SectionHeading'
import { EDUCATION } from '../data/content'
import { gsap, reveal, SplitText, prefersReducedMotion } from '../lib/motion'

const KEYWORDS = ['Agentic AI', 'RAG Pipelines', 'LLM Fine-Tuning', 'MCP & A2A', 'Fraud & Risk ML', 'MLOps', 'Product Builder']

export default function About() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const split = new SplitText('.about-copy', { type: 'words' })
      gsap.from(split.words, {
        opacity: 0.08,
        stagger: 0.012,
        duration: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-copy',
          start: 'top 78%',
          end: 'bottom 55%',
          scrub: 0.8,
        },
      })

      reveal('.about-portrait', '.about-portrait', { y: 70, duration: 1.1 })
      gsap.to('.about-portrait img', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-portrait',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
      reveal('.about-kw', '.about-kws', { y: 20, stagger: 0.07, duration: 0.6, start: 'top 88%' })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={rootRef} className="section-pad relative py-24 md:py-36">
      <SectionHeading index="03" eyebrow="About" title="The person behind the models" />

      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="about-portrait relative mx-auto w-full max-w-md">
          {/* Glow rim */}
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2rem] opacity-60 blur-3xl"
            style={{
              background:
                'radial-gradient(60% 60% at 30% 20%, rgba(56,225,255,0.16), transparent), radial-gradient(50% 50% at 80% 80%, rgba(255,180,84,0.12), transparent)',
            }}
          />
          <div className="relative aspect-[9/10] overflow-hidden rounded-[2rem] border border-white/10">
            <img
              src="/lohith.png"
              alt="Portrait of Lohith Mothukuri in a black suit"
              className="absolute inset-0 h-full w-full scale-[1.08] object-cover object-top"
              loading="lazy"
            />
            {/* Blend the dark portrait into the page */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,10,15,0.25) 0%, transparent 30%, transparent 70%, rgba(10,10,15,0.75) 100%)',
              }}
            />
            <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-4 py-1.5 font-mono text-[10px] tracking-[0.25em] text-accent backdrop-blur-md">
              ATLANTA, GA - USA
            </div>
          </div>
        </div>

        <div>
          <p className="about-copy text-lg leading-relaxed text-muted md:text-xl md:leading-relaxed">
            Four years ago I was cleaning real-estate spreadsheets. Today I build the agents behind{' '}
            <span className="text-ink">Visa's</span> first GenAI-powered BI chatbot and its
            internal developer-productivity platform - RAG pipelines, multi-agent workflows, and
            fine-tuned LLMs running on Bedrock and Kubernetes. In between: fraud and compliance
            analytics for BFSI clients, flight-cancellation prediction at{' '}
            <span className="text-ink">American Airlines</span>, an MS in Computer Science from
            Auburn University at Montgomery, and a habit of shipping side products people actually
            use. I care about the unglamorous parts - guardrails, graders, tracing, audit logs -
            because that is where AI systems earn their keep in production.
          </p>

          <div className="about-kws mt-9 flex flex-wrap gap-2.5">
            {KEYWORDS.map((k) => (
              <span
                key={k}
                className="about-kw glass rounded-full px-4 py-2 text-xs font-medium text-ink/90 transition-colors duration-200 hover:border-accent/50 hover:text-accent"
              >
                {k}
              </span>
            ))}
          </div>

          <dl className="about-edu mt-10 space-y-4 border-t border-white/5 pt-8">
            <dt className="font-mono text-[10px] tracking-[0.3em] text-accent">EDUCATION</dt>
            {EDUCATION.map((e) => (
              <dd key={e.degree} className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-sm font-semibold text-ink">{e.degree}</span>
                <span className="text-sm text-muted">{e.school}</span>
                <span className="font-mono text-xs text-muted/70">{e.period}</span>
              </dd>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
