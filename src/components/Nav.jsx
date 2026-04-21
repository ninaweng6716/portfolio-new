import { useEffect, useState } from 'react'
import { info } from '../data/info'
import DragonLogo from '../assets/dragon-head.svg?react'

const NAV_LINKS = [
  ['#about',    'About'],
  ['#projects', 'Projects'],
  ['#contact',  'Contact'],
]

function Logo() {
  return (
    <a href="#hero" className="flex items-center gap-2 font-display font-bold text-[1.1rem] tracking-tight text-ink no-underline group">
      <DragonLogo className="w-7 h-7 transition-transform duration-300 ease-in-out group-hover:rotate-12" />
      {info.name}
    </a>
  )
}

function NavLinks({ onClick, className = '' }) {
  return (
    <ul className={`list-none ${className}`}>
      {NAV_LINKS.map(([href, label]) => (
        <li key={href}>
          <a href={href} onClick={onClick} className="nav-link">{label}</a>
        </li>
      ))}
    </ul>
  )
}

function useMobile(breakpoint = 767) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [breakpoint])
  return isMobile
}

export default function Nav() {
  const [stuck, setStuck]       = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile                = useMobile()

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const stickyBg = 'bg-bg/50 backdrop-blur-md shadow-sm border-b border-white/[0.07]'

  if (isMobile) {
    return (
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
        ${menuOpen ? `inset-0 h-dvh bg-bg/95 backdrop-blur-md` : `h-[60px] ${stuck ? stickyBg : 'bg-transparent'}`}`}
      >
        <nav aria-label="Main navigation" className="h-full flex flex-col">

          <div className={`flex items-center justify-between px-[6vw] flex-shrink-0 overflow-hidden transition-all duration-300
            ${menuOpen ? 'h-0 opacity-0 pointer-events-none' : 'h-[60px] opacity-100'}`}
          >
            <Logo />
            <button aria-label="Open menu" onClick={() => setMenuOpen(true)} className="relative w-6 h-6">
              <span className="mobile-nav-span -translate-y-2" />
              <span className="mobile-nav-span" />
              <span className="mobile-nav-span translate-y-2" />
            </button>
          </div>

          <div className={`flex-1 flex flex-col items-center justify-center gap-10 transition-all duration-500 ease-in-out
            ${menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
          >
            <button aria-label="Close menu" onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-[6vw] w-8 h-8 flex items-center justify-center text-ink text-xl font-bold"
            >✕</button>
            <NavLinks onClick={() => setMenuOpen(false)} className="flex flex-col items-center gap-10" />
          </div>

        </nav>
      </header>
    )
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-[60px] transition-all duration-300 ease-in-out
      ${stuck ? stickyBg : 'bg-transparent'}`}
    >
      <nav aria-label="Desktop navigation" className="h-full flex items-center justify-between px-[6vw]">
        <Logo />
        <NavLinks className="flex gap-8" />
      </nav>
    </header>
  )
}