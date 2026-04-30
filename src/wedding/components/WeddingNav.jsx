import { useState, useEffect } from "react"

const NAV_ITEMS = [
  { label: "Details", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP",   href: "#rsvp"    },
  { label: "FAQ",     href: "#faq"     },
]

function scrollToSection(e, href, onDone) {
  e.preventDefault()
  onDone?.()
  const el = document.getElementById(href.replace("#", ""))
  if (el) el.scrollIntoView({ behavior: "smooth" })
}

export default function WeddingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 60) }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-8 ${
          scrolled
            ? "py-4 bg-white/50 backdrop-blur-sm shadow-md"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">

          <a href="#hero" className="wedding-nav-monogram" onClick={e => scrollToSection(e, "#hero")}>
            N <span className="wedding-ampersand">&amp;</span> J
          </a>

          <ul className="hidden md:flex items-center gap-9 list-none">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} onClick={e => scrollToSection(e, href)} className="wedding-nav-link">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-7 h-7 bg-transparent border-none cursor-pointer p-0"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block h-px bg-weddingPrint transition-transform duration-200 origin-center ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block h-px bg-weddingPrint transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-weddingPrint transition-transform duration-200 origin-center ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-10 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {NAV_ITEMS.map(({ label, href }) => (
          <a key={href} href={href} onClick={e => scrollToSection(e, href, closeMenu)} className="wedding-nav-mobile-link">
            {label}
          </a>
        ))}
        <div className="w-10 h-px bg-weddingTq" />
      </div>
    </>
  )
}