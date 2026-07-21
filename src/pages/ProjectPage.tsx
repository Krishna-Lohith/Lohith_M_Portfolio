import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import LiveWindow from '../components/LiveWindow'
import MagneticButton from '../components/MagneticButton'
import { PROJECTS } from '../data/content'
import { gsap, reveal, prefersReducedMotion } from '../lib/motion'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = PROJECTS.find((p) => p.slug === slug)
  const next = PROJECTS.find((p) => p.slug !== slug)

  useEffect(() => {
    if (!project) return
    document.title = `${project.name} - Lohith Mothukuri`
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.pp-reveal', {
        y: 44,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.1,
      })
      reveal('.pp-feature', '.pp-features', { y: 30, stagger: 0.07, duration: 0.7 })
    })
    return () => ctx.revert()
  }, [project])

  if (!project) return <Navigate to="/" replace />

  const isCyan = project.accent === 'cyan'
  const accentText = isCyan ? 'text-accent' : 'text-amber'
  const glow = isCyan ? 'rgba(56,225,255,0.13)' : 'rgba(255,180,84,0.13)'

  return (
    <main className="relative overflow-hidden pb-24 pt-32 md:pt-40">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{ background: `radial-gradient(55% 55% at 50% 0%, ${glow}, transparent 75%)` }}
      />

      <div className="section-pad relative">
        <Link
          to="/#work"
          className="pp-reveal inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-ink"
        >
          <ArrowLeft size={16} />
          Back to work
        </Link>

        <div className="pp-reveal mt-8 flex flex-wrap items-center gap-4">
          <h1 className="font-display text-5xl font-semibold tracking-tighter text-ink md:text-7xl">
            {project.name}
          </h1>
          <span
            className={`rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[11px] tracking-wider ${accentText}`}
          >
            {project.badge}
          </span>
        </div>
        <p className={`pp-reveal mt-3 font-display text-xl font-medium md:text-2xl ${accentText}`}>
          {project.tagline}
        </p>
        <p className="pp-reveal mt-6 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="pp-reveal mt-8 flex flex-wrap gap-4">
          {project.highlights.map((h) => (
            <div key={h.label} className="glass rounded-2xl px-6 py-4">
              <p className={`font-display text-xl font-semibold ${accentText}`}>{h.value}</p>
              <p className="mt-0.5 text-xs text-muted">{h.label}</p>
            </div>
          ))}
        </div>

        {/* Live window */}
        <div className="pp-reveal mt-14">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[11px] tracking-[0.3em] text-muted">
              LIVE - INTERACT WITH THE REAL PRODUCT BELOW
            </p>
            <MagneticButton href={project.url} ariaLabel={`Visit ${project.name}`}>
              <span className="pill-btn bg-ink font-semibold !text-[#0a0a0f] hover:bg-accent">
                Visit {project.name}
                <ArrowUpRight size={16} />
              </span>
            </MagneticButton>
          </div>
          <LiveWindow url={project.url} name={project.name} accent={project.accent} />
        </div>

        {/* Features + stack */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="pp-features">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              What it does
            </h2>
            <ul className="mt-6 space-y-4">
              {project.features.map((f) => (
                <li key={f} className="pp-feature flex items-start gap-3 text-sm leading-relaxed text-muted md:text-base">
                  <Check size={17} strokeWidth={2.2} className={`mt-0.5 shrink-0 ${accentText}`} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Built with
            </h2>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="glass rounded-full px-4 py-2 text-xs font-medium text-ink/90"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Next project */}
        {next && (
          <div className="mt-24 border-t border-white/5 pt-10">
            <Link
              to={`/projects/${next.slug}`}
              className="group flex items-center justify-between rounded-3xl p-2 transition-colors"
            >
              <div>
                <p className="font-mono text-[11px] tracking-[0.3em] text-muted">NEXT PROJECT</p>
                <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent md:text-5xl">
                  {next.name}
                </p>
              </div>
              <ArrowRight
                size={32}
                className="text-muted transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent"
              />
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
