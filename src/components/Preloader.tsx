import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

const PHASES = ['initializing tensors', 'loading weights', 'optimizing latency', 'deploying']

interface Props {
  onDone: () => void
}

export default function Preloader({ onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState(0)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    if (prefersReducedMotion()) {
      doneRef.current()
      return
    }
    document.body.style.overflow = 'hidden'
    const counter = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        doneRef.current()
      },
    })
    tl.to(counter, {
      v: 100,
      duration: 1.9,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(counter.v)
        setCount(v)
        setPhase(Math.min(PHASES.length - 1, Math.floor((v / 100) * PHASES.length)))
      },
    })
      .to('.pre-fade', { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, '+=0.15')
      .to(rootRef.current, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, '-=0.1')
      .set(rootRef.current, { display: 'none' })
    return () => {
      document.body.style.overflow = ''
      tl.kill()
    }
  }, [])

  if (prefersReducedMotion()) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-night"
      aria-hidden
    >
      <div className="pre-fade flex flex-col items-center">
        <p className="font-display text-7xl font-semibold tracking-tighter text-ink md:text-8xl">
          {count}
          <span className="text-accent">%</span>
        </p>
        <p className="mt-4 font-mono text-xs tracking-[0.25em] text-muted">
          {PHASES[phase].toUpperCase()}
          <span className="animate-pulse-soft text-accent"> _</span>
        </p>
      </div>
      <div className="pre-fade absolute bottom-10 h-px w-48 overflow-hidden bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-accent to-amber transition-[width] duration-100"
          style={{ width: `${count}%` }}
        />
      </div>
    </div>
  )
}
