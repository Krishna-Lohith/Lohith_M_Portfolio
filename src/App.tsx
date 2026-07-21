import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './lib/motion'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()

  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 })
    lenisRef.current = lenis
    ;(window as unknown as { lenis?: Lenis }).lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // On route change: jump to top and rebuild scroll triggers
  useEffect(() => {
    if (!location.hash) {
      lenisRef.current?.scrollTo(0, { immediate: true })
      window.scrollTo(0, 0)
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => clearTimeout(t)
  }, [location.pathname, location.hash])

  return (
    <div className="grain min-h-screen bg-night text-ink">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}
