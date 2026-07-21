import { lazy, Suspense, useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import type Lenis from 'lenis'

const NeuralField = lazy(() => import('../components/NeuralField'))
import MagneticButton from '../components/MagneticButton'
import { gsap, SplitText, prefersReducedMotion } from '../lib/motion'

interface Props {
  start: boolean
}

export default function Hero({ start }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!start || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const line1 = new SplitText('.hero-line-1', { type: 'chars' })
      const line2 = new SplitText('.hero-line-2', { type: 'chars' })
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('.hero-label', { y: 24, opacity: 0, duration: 0.8 })
        .from(line1.chars, { yPercent: 110, opacity: 0, stagger: 0.028, duration: 0.9 }, '-=0.5')
        .from(line2.chars, { yPercent: 110, opacity: 0, stagger: 0.028, duration: 0.9 }, '-=0.75')
        .from('.hero-sub', { y: 26, opacity: 0, duration: 0.8 }, '-=0.55')
        .from('.hero-ctas', { y: 22, opacity: 0, duration: 0.7 }, '-=0.55')
        .from('.hero-scroll', { opacity: 0, duration: 0.9 }, '-=0.3')

      // Parallax the copy out on scroll
      gsap.to('.hero-copy', {
        yPercent: -18,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom 30%',
          scrub: true,
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [start])

  const scrollToWork = () => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis
    const el = document.querySelector('#work')
    if (!el) return
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -60, duration: 1.5 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis
    const el = document.querySelector('#contact')
    if (!el) return
    if (lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.8 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={rootRef} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <Suspense fallback={null}>
        <NeuralField />
      </Suspense>
      {/* Vignette so text stays readable over the field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(10,10,15,0.25) 0%, rgba(10,10,15,0.78) 78%, #0a0a0f 100%)',
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="hero-copy flex flex-col items-center">
          <p className="hero-label mb-5 font-mono text-[11px] font-medium tracking-[0.35em] text-muted md:text-xs">
            AI/ML ENGINEER <span className="text-accent">//</span> GENAI @ VISA
          </p>

          <h1 className="font-display leading-none tracking-tighter">
            <span className="hero-line-1 block overflow-hidden text-6xl font-medium text-muted/80 md:text-8xl lg:text-9xl">
              Intelligent.
            </span>
            <span className="hero-line-2 -mt-2 block overflow-hidden text-6xl font-semibold text-ink text-glow-cyan md:-mt-4 md:text-8xl lg:-mt-5 lg:text-9xl">
              Deployed.
            </span>
          </h1>

          <p className="hero-sub mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            I'm Lohith Mothukuri. I build ML and GenAI systems that score{' '}
            <span className="text-ink">1M+ transactions a day</span> in production, and I ship
            products of my own on the side.
          </p>

          <div className="hero-ctas mt-9 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton onClick={scrollToWork} ariaLabel="Explore my work">
              <span className="pill-btn glass text-ink hover:border-accent/60 hover:text-accent">
                Explore Work
              </span>
            </MagneticButton>
            <MagneticButton onClick={scrollToContact} ariaLabel="Go to contact section">
              <span className="pill-btn bg-ink text-base font-semibold !text-[#0a0a0f] hover:bg-accent">
                Contact
              </span>
            </MagneticButton>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToWork}
        aria-label="Scroll down"
        className="hero-scroll absolute bottom-8 left-1/2 z-10 -translate-x-1/2 cursor-pointer rounded-full p-3 text-muted transition-colors hover:text-accent"
      >
        <ArrowDown size={20} className="animate-bounce" strokeWidth={1.5} />
      </button>
    </section>
  )
}
