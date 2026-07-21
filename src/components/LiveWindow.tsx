import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Globe, RefreshCw } from 'lucide-react'

interface Props {
  url: string
  name: string
  accent: 'cyan' | 'amber'
}

/**
 * A live, interactive embed of an external site inside a glass browser frame.
 * Lazy-loads when scrolled near, falls back to a visit prompt if the site
 * refuses to be framed.
 */
export default function LiveWindow({ url, name, accent }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    io.observe(wrapRef.current!)
    return () => io.disconnect()
  }, [])

  // If the frame never loads (X-Frame-Options / CSP), offer the fallback
  useEffect(() => {
    if (!visible || loaded) return
    const t = setTimeout(() => setFailed(true), 6000)
    return () => clearTimeout(t)
  }, [visible, loaded, reloadKey])

  const accentText = accent === 'cyan' ? 'text-accent' : 'text-amber'
  const host = new URL(url).host

  return (
    <div
      ref={wrapRef}
      className="glass-strong overflow-hidden rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-black/40 px-4 py-1.5">
          <Globe size={13} className={accentText} />
          <span className="truncate font-mono text-xs text-muted">{host}</span>
        </div>
        <button
          onClick={() => {
            setFailed(false)
            setLoaded(false)
            setReloadKey((k) => k + 1)
          }}
          aria-label={`Reload ${name} preview`}
          className="cursor-pointer rounded-full p-1.5 text-muted transition-colors hover:bg-white/10 hover:text-ink"
        >
          <RefreshCw size={14} />
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name} in a new tab`}
          className="cursor-pointer rounded-full p-1.5 text-muted transition-colors hover:bg-white/10 hover:text-ink"
        >
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Viewport */}
      <div className="relative aspect-[16/10] w-full bg-[#0c0c13] md:aspect-[16/9]">
        {visible && !failed && (
          <iframe
            key={reloadKey}
            src={url}
            title={`Live preview of ${name}`}
            className="absolute inset-0 h-full w-full border-0 bg-white"
            loading="lazy"
            allow="clipboard-write; geolocation"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setLoaded(true)}
            style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}
          />
        )}

        {!loaded && !failed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className={`h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-current ${accentText}`} />
            <p className="font-mono text-xs tracking-widest text-muted">CONNECTING TO {host.toUpperCase()}</p>
          </div>
        )}

        {loaded && !failed && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs font-medium text-ink backdrop-blur-md transition-colors duration-200 hover:border-white/30 hover:text-white"
          >
            Blank window? Open {name} live
            <ExternalLink size={13} />
          </a>
        )}

        {failed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center">
            <Globe size={40} className={accentText} strokeWidth={1.2} />
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {name} declined to be embedded here. It is very much alive though - open it in a new
              tab to explore.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`pill-btn border border-white/15 bg-white/5 text-ink hover:border-white/40 ${accentText}`}
            >
              Visit {name}
              <ExternalLink size={15} />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
