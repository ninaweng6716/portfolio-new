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

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.setAttribute("data-mobile-menu-open", "true")
      document.body.style.overflow = "hidden"
    } else {
      document.documentElement.removeAttribute("data-mobile-menu-open")
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-8 ${
          menuOpen ? "hidden md:block" : ""
        } ${
          scrolled
            ? "py-6 bg-white/50 backdrop-blur-sm shadow-md"
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
                <a href={href} onClick={e => scrollToSection(e, href)} className="wedding-nav-link text-weddingPrint">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden relative flex flex-col justify-center items-center w-9 h-9 bg-transparent border-none cursor-pointer p-0"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className={`absolute w-full h-px transition-all duration-300 bg-weddingPrint ${menuOpen ? "rotate-45" : "-translate-y-[6px]"}`} />
            <span className={`absolute w-full h-px transition-all duration-300 bg-weddingPrint ${menuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"}`} />
            <span className={`absolute w-full h-px transition-all duration-300 bg-weddingPrint ${menuOpen ? "-rotate-45" : "translate-y-[6px]"}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 flex flex-col transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className="absolute top-6 right-8 w-9 h-9 flex items-center justify-center text-weddingPrint/75 text-lg rounded-full hover:bg-weddingTq-soft transition-colors duration-200"
        >
          ✕
        </button>

        <div className="flex-1 flex flex-col items-center justify-center gap-10 px-8">
          {NAV_ITEMS.map(({ label, href }) => (
            <a key={href} href={href} onClick={e => scrollToSection(e, href, closeMenu)} className="wedding-nav-mobile-link">
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}