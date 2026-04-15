import { useEffect, useState } from 'react'
import { info } from '../data/info'

export default function Nav() {
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between px-[6vw]
        transition-all duration-300 border-b
        ${stuck
          ? 'bg-bg/90 backdrop-blur-md border-rule'
          : 'bg-transparent border-transparent'
        }`}
    >
      {/* Logo */}
      <a href="#hero" className="flex items-center gap-1.5 font-display font-bold text-[1.1rem] tracking-tight text-ink no-underline group">
        <span className="w-[7px] h-[7px] rounded-full bg-tq inline-block transition-transform duration-300 group-hover:scale-[1.6]" />
        {info.name}
      </a>

      {/* Links — hidden on mobile */}
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
    </nav>
  )
}
