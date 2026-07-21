import { useEffect, useRef } from 'react'
import { Mail, FileDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon, MediumIcon } from '../components/BrandIcons'
import MagneticButton from '../components/MagneticButton'
import { LINKS } from '../data/content'
import { gsap, reveal, SplitText, prefersReducedMotion } from '../lib/motion'

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const split = new SplitText('.contact-headline', { type: 'words' })
      gsap.fromTo(
        split.words,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-headline', start: 'top 85%', once: true },
        },
      )
      reveal('.contact-item', '.contact-items', { y: 30, stagger: 0.1, duration: 0.8, start: 'top 88%' })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={rootRef} className="relative overflow-hidden pb-10 pt-28 md:pt-40">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%]"
        style={{
          background:
            'radial-gradient(60% 80% at 50% 100%, rgba(56,225,255,0.08), transparent 70%), radial-gradient(40% 60% at 80% 100%, rgba(255,180,84,0.05), transparent 70%)',
        }}
      />

      <div className="section-pad relative text-center">
        <p className="mb-5 font-mono text-[11px] tracking-[0.35em] text-accent">
          06 / <span className="text-muted">CONTACT</span>
        </p>
        <h2 className="contact-headline mx-auto max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tighter text-ink md:text-7xl lg:text-8xl">
          Let's build something intelligent.
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Open to AI/ML and GenAI Engineer roles. US work authorized, ready to relocate anywhere.
        </p>

        <div className="contact-items mt-11">
          <div className="contact-item">
            <MagneticButton href={`mailto:${LINKS.email}`} ariaLabel="Email Lohith" strength={0.45}>
              <span className="pill-btn bg-ink !px-9 !py-4 font-display text-base font-semibold !text-[#0a0a0f] shadow-[0_0_60px_rgba(56,225,255,0.25)] hover:bg-accent md:text-lg">
                <Mail size={19} strokeWidth={2} />
                {LINKS.email}
              </span>
            </MagneticButton>
          </div>

          <div className="contact-item mt-9 flex items-center justify-center gap-3">
            {[
              { href: LINKS.linkedin, icon: LinkedinIcon, label: 'LinkedIn profile' },
              { href: LINKS.github, icon: GithubIcon, label: 'GitHub profile' },
              { href: LINKS.medium, icon: MediumIcon, label: 'Medium articles' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="glass cursor-pointer rounded-full p-4 text-muted transition-all duration-200 hover:border-accent/50 hover:text-accent"
              >
                <Icon size={19} />
              </a>
            ))}
            <a
              href={LINKS.resume}
              download
              className="pill-btn glass !py-3.5 text-sm text-ink hover:border-accent/50 hover:text-accent"
            >
              <FileDown size={16} strokeWidth={1.7} />
              Resume
            </a>
          </div>
        </div>

        <footer className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-white/5 pb-4 pt-8 text-xs text-muted/60 md:flex-row">
          <p>© 2026 Lohith Mothukuri. Designed and built with intent.</p>
          <p className="font-mono tracking-widest">ATLANTA, GA / EARTH</p>
        </footer>
      </div>
    </section>
  )
}
