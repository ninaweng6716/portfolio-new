import { useEffect, useState } from 'react'
import { info } from '../data/info'

export default function Nav() {
  const [stuck, setStuck] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
  if (menuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [menuOpen]);

  return (
      <>
        <nav
          className={`fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between px-[6vw]
            transition-all duration-300 ease-in-out 
            ${stuck
              ? 'bg-bg/90 backdrop-blur-md shadow-sm border-b border-white/[0.07]'
              : 'bg-transparent border-transparent'
            }`}
        >
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-1.5 font-display font-bold text-[1.1rem] tracking-tight text-ink no-underline group">
            <span className="w-[7px] h-[7px] rounded-full bg-tq inline-block transition-transform duration-300 ease-in-out group-hover:scale-[1.6]" />
            {info.name}
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-8 list-none">
            {[['#about', 'About'], ['#projects', 'Work'], ['#contact', 'Contact']].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="relative font-display text-[0.8rem] font-medium tracking-widest uppercase text-ink-2
                    no-underline transition-colors duration-200 hover:text-ink pb-[3px]
                    after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-tq
                    after:transition-all after:duration-250 hover:after:w-full"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden relative w-6 h-6"
          >
            {/* Top */}
            <span
              className={`absolute left-0 top-1/2 w-full h-[2px] bg-ink transition-all duration-300 ease-in-out
                ${menuOpen ? "rotate-45" : "-translate-y-2"}
              `}
            />

            {/* Middle */}
            <span
              className={`absolute left-0 top-1/2 w-full h-[2px] bg-ink transition-all duration-200
                ${menuOpen ? "opacity-0" : ""}
              `}
            />

            {/* Bottom */}
            <span
              className={`absolute left-0 top-1/2 w-full h-[2px] bg-ink transition-all duration-300 ease-in-out
                ${menuOpen ? "-rotate-45" : "translate-y-2"}
              `}
            />
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-md flex flex-col items-center justify-center gap-10 md:hidden overflow-y-auto">
            {[
              ['#about', 'About'],
              ['#projects', 'Work'],
              ['#contact', 'Contact'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-display text-ink no-underline"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </>
    )
}
