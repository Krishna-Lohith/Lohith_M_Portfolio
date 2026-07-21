import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, FileDown } from 'lucide-react'
import type Lenis from 'lenis'
import { LINKS } from '../data/content'

const NAV_ITEMS = [
  { label: 'Work', hash: '#work' },
  { label: 'Experience', hash: '#experience' },
  { label: 'About', hash: '#about' },
  { label: 'Writing', hash: '#writing' },
  { label: 'Contact', hash: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (hash: string) => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/' + hash)
      return
    }
    const lenis = (window as unknown as { lenis?: Lenis }).lenis
    const el = document.querySelector(hash)
    if (!el) return
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed inset-x-4 top-4 z-[70] md:inset-x-8">
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 md:px-7 ${
          scrolled ? 'glass-strong shadow-[0_8px_40px_rgba(0,0,0,0.5)]' : 'border border-transparent'
        }`}
      >
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-display text-lg font-semibold tracking-tight text-ink"
          aria-label="Lohith Mothukuri - home"
        >
          Lohith<span className="text-accent">.</span>M
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.hash}
              onClick={() => goTo(item.hash)}
              className="cursor-pointer text-sm font-medium text-muted transition-colors duration-200 hover:text-ink"
            >
              {item.label}
            </button>
          ))}
          <a
            href={LINKS.resume}
            download
            className="pill-btn border border-white/15 bg-white/5 !px-4 !py-2 text-ink hover:border-accent/50 hover:text-accent"
          >
            <FileDown size={15} strokeWidth={1.8} />
            Resume
          </a>
        </div>

        <button
          className="cursor-pointer rounded-full p-2 text-ink transition-colors hover:bg-white/10 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="glass-strong mx-auto mt-2 max-w-6xl rounded-3xl p-4 shadow-2xl md:hidden">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.hash}
              onClick={() => goTo(item.hash)}
              className="block w-full cursor-pointer rounded-xl px-4 py-3 text-left text-base font-medium text-ink transition-colors hover:bg-white/5 hover:text-accent"
            >
              {item.label}
            </button>
          ))}
          <a
            href={LINKS.resume}
            download
            className="mt-1 flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium text-accent"
          >
            <FileDown size={17} strokeWidth={1.8} />
            Download Resume
          </a>
        </div>
      )}
    </header>
  )
}
