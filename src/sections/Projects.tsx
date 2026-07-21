import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Play, Home, LayoutDashboard } from 'lucide-react'
import { GithubIcon } from '../components/BrandIcons'
import SectionHeading from '../components/SectionHeading'
import TiltCard from '../components/TiltCard'
import { PROJECTS, ML_PROJECTS } from '../data/content'
import { gsap, reveal, prefersReducedMotion } from '../lib/motion'

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      reveal('.proj-feature', '.proj-features', { y: 70, stagger: 0.15, duration: 1, start: 'top 80%' })
      reveal('.proj-ml', '.proj-mls', { y: 40, stagger: 0.12, duration: 0.8 })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={rootRef} className="section-pad relative py-24 md:py-36">
      <SectionHeading index="01" eyebrow="Work" title="Products I shipped solo" />

      <div className="proj-features grid gap-8 lg:grid-cols-2">
        {PROJECTS.map((p) => {
          const isCyan = p.accent === 'cyan'
          const accentText = isCyan ? 'text-accent' : 'text-amber'
          const Icon = p.slug === 'deshmate' ? Home : LayoutDashboard
          return (
            <div key={p.slug} className="proj-feature">
              <TiltCard className="h-full">
                <Link
                  to={`/projects/${p.slug}`}
                  className="glass group flex h-full flex-col overflow-hidden rounded-[2rem] transition-colors duration-300 hover:border-white/25"
                  aria-label={`Open ${p.name} case study with live preview`}
                >
                  {/* Visual header */}
                  <div
                    className="relative flex h-56 items-center justify-center overflow-hidden md:h-64"
                    style={{
                      background: isCyan
                        ? 'radial-gradient(120% 130% at 20% 0%, rgba(56,225,255,0.16), transparent 60%), radial-gradient(100% 120% at 90% 100%, rgba(56,225,255,0.08), transparent), #0c0c14'
                        : 'radial-gradient(120% 130% at 20% 0%, rgba(255,180,84,0.16), transparent 60%), radial-gradient(100% 120% at 90% 100%, rgba(255,180,84,0.08), transparent), #0d0c12',
                    }}
                  >
                    <div className="flex flex-col items-center gap-3 transition-transform duration-500 group-hover:scale-110">
                      <Icon size={44} strokeWidth={1.1} className={accentText} />
                      <p className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                        {p.name}
                      </p>
                    </div>
                    <span
                      className={`absolute right-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] tracking-wider backdrop-blur-md ${accentText}`}
                    >
                      {p.badge}
                    </span>
                    <span className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.25em] text-muted">
                      {new URL(p.url).host.toUpperCase()}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-7 md:p-8">
                    <p className="font-display text-lg font-medium text-ink">{p.tagline}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {p.description.split('.')[0]}. {p.description.split('.')[1]}.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.stack.slice(0, 4).map((s) => (
                        <span key={s} className="rounded-full bg-white/[0.05] px-3 py-1 text-[11px] text-muted">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${accentText}`}>
                      Live preview inside
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </div>
          )
        })}
      </div>

      {/* ML notebooks */}
      <div className="proj-mls mt-8 grid gap-8 md:grid-cols-2">
        {ML_PROJECTS.map((p) => (
          <div
            key={p.name}
            className="proj-ml glass flex flex-col rounded-[2rem] p-7 transition-colors duration-300 hover:border-white/25 md:p-8"
          >
            <p className="font-mono text-[10px] tracking-[0.25em] text-muted">DEEP LEARNING / DEPLOYED DEMO</p>
            <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">{p.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.desc}</p>
            <p className="mt-3 font-mono text-[11px] text-accent/80">{p.stack}</p>
            <div className="mt-5 flex gap-3">
              <a
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn border border-white/15 bg-white/5 !py-2 text-xs text-ink hover:border-accent/60 hover:text-accent"
              >
                <Play size={13} /> Live demo
              </a>
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn border border-white/15 bg-white/5 !py-2 text-xs text-ink hover:border-accent/60 hover:text-accent"
              >
                <GithubIcon size={13} /> Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
