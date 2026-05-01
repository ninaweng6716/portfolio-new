import { useState, useEffect } from "react"
import LogoMark from "../components/LogoMark"

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

          <a
            href="#hero"
            onClick={e => scrollToSection(e, "#hero")}
            aria-label="Back to top"
            className="block h-10 w-auto"
          >
            <LogoMark className="h-10" />
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
            className="md:hidden relative flex flex-col justify-center items-center w-7 h-7 bg-transparent border-none cursor-pointer p-0"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className={`absolute w-full h-px bg-weddingPrint transition-all duration-300 ${menuOpen ? "rotate-45" : "-translate-y-[6px]"}`} />
            <span className={`absolute w-full h-px bg-weddingPrint transition-all duration-300 ${menuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"}`} />
            <span className={`absolute w-full h-px bg-weddingPrint transition-all duration-300 ${menuOpen ? "-rotate-45" : "translate-y-[6px]"}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-10 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {menuOpen && <LogoMark className="h-16 mb-4" />}
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