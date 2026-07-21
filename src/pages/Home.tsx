import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type Lenis from 'lenis'
import Preloader from '../components/Preloader'
import Hero from '../sections/Hero'
import Stats from '../sections/Stats'
import Projects from '../sections/Projects'
import Experience from '../sections/Experience'
import ImpactChart from '../sections/ImpactChart'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Writing from '../sections/Writing'
import Contact from '../sections/Contact'
import { ScrollTrigger } from '../lib/motion'

export default function Home() {
  const [loaded, setLoaded] = useState(() => sessionStorage.getItem('lm-preloaded') === '1')
  const location = useLocation()

  const finishLoad = () => {
    sessionStorage.setItem('lm-preloaded', '1')
    setLoaded(true)
    setTimeout(() => ScrollTrigger.refresh(), 120)
  }

  // Support /#section deep links (e.g. arriving from a project page)
  useEffect(() => {
    if (!location.hash || !loaded) return
    const t = setTimeout(() => {
      const el = document.querySelector(location.hash)
      if (!el) return
      const lenis = (window as unknown as { lenis?: Lenis }).lenis
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 })
      else el.scrollIntoView()
    }, 250)
    return () => clearTimeout(t)
  }, [location.hash, loaded])

  useEffect(() => {
    document.title = 'Lohith Mothukuri - AI/ML Engineer'
  }, [])

  return (
    <main>
      {!loaded && <Preloader onDone={finishLoad} />}
      <Hero start={loaded} />
      <Stats />
      <Projects />
      <Experience />
      <ImpactChart />
      <About />
      <Skills />
      <Writing />
      <Contact />
    </main>
  )
}
