import { useState, useEffect } from "react"

const NAV_ITEMS = [
  { label: "Details",  href: "#details"  },
  { label: "Schedule", href: "#schedule" },
  { label: "Gallery",  href: "#gallery"  },
]

function scrollToSection(e, href, onDone) {
  e.preventDefault()
  onDone?.()
  const el = document.getElementById(href.replace("#", ""))
  if (el) el.scrollIntoView({ behavior: "smooth" })
}

export default function WeddingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60)
      const ids = ["story", "details", "schedule", "gallery", "rsvp"]
      let current = ""
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) current = id
      }
      setActive(current)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-8 ${
          scrolled
            ? "py-4 bg-[#faf7f2]/95 backdrop-blur-sm shadow-[0_1px_0_#e8d8b4]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Monogram */}
          <a
            href="#hero"
            className="font-light text-[#3d2c2c] tracking-wide no-underline text-[1.4rem] leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            onClick={e => scrollToSection(e, "#hero")}
          >
            N <span className="italic text-[#c9a96e]">&amp;</span> J
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-9 list-none">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={e => scrollToSection(e, href)}
                  className={`text-[0.65rem] tracking-[0.3em] uppercase no-underline transition-colors duration-200 pb-0.5 border-b ${
                    active === href.replace("#", "")
                      ? "text-[#3d2c2c] border-[#c9a96e]"
                      : "text-[#8a6e6e] border-transparent hover:text-[#3d2c2c] hover:border-[#c9a96e]"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#rsvp"
                onClick={e => scrollToSection(e, "#rsvp")}
                className="text-[0.65rem] tracking-[0.25em] uppercase no-underline border border-[#c9a96e] text-[#c9a96e] px-4 py-1.5 transition-all duration-200 hover:bg-[#c9a96e] hover:text-[#faf7f2]"
              >
                RSVP
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-7 h-7 bg-transparent border-none cursor-pointer p-0"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block h-px bg-[#3d2c2c] transition-transform duration-200 origin-center ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block h-px bg-[#3d2c2c] transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-[#3d2c2c] transition-transform duration-200 origin-center ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 bg-[#faf7f2] z-40 flex flex-col items-center justify-center gap-10 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {NAV_ITEMS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={e => scrollToSection(e, href, closeMenu)}
            className="font-light text-[#3d2c2c] no-underline tracking-wide text-3xl transition-colors duration-200 hover:text-[#c9a96e]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {label}
          </a>
        ))}
        <div className="w-10 h-px bg-[#e8d8b4]" />
        <a
          href="#rsvp"
          onClick={e => scrollToSection(e, "#rsvp", closeMenu)}
          className="font-light text-3xl no-underline text-[#c9a96e] hover:text-[#3d2c2c] transition-colors duration-200"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          RSVP
        </a>
      </div>
    </>
  )
}