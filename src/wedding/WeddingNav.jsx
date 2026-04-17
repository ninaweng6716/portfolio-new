import { useState, useEffect } from "react"

const navItems = [
  { label: "Details", href: "#details" },
  { label: "Schedule", href: "#schedule" },
  { label: "Gallery", href: "#gallery" },
]

export default function WeddingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60)

      const sections = ["story", "details", "schedule", "gallery", "rsvp"]
      let current = ""

      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) current = id
      }

      setActive(current)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function scrollTo(e, href) {
    e.preventDefault()
    setMenuOpen(false)

    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-[100]
          transition-all duration-300
          ${scrolled
            ? "bg-[#faf7f2]/95 backdrop-blur-md shadow-[0_1px_0_#e8d8b4] py-3"
            : "bg-transparent py-6"}
          px-8
        `}
      >
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">

          {/* MONOGRAM */}
          <a
            href="#hero"
            onClick={e => scrollTo(e, "#hero")}
            className="
              font-serif text-[1.4rem] font-light tracking-[0.05em]
              text-[#3d2c2c]
            "
          >
            E <span className="text-[#c9a96e] italic">&amp;</span> J
          </a>

          {/* DESKTOP LINKS */}
          <ul className="hidden sm:flex items-center gap-9">
            {navItems.map(({ label, href }) => {
              const isActive = active === href.replace("#", "")
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={e => scrollTo(e, href)}
                    className={`
                      relative text-[0.65rem]
                      tracking-[0.3em] uppercase
                      transition-colors duration-200
                      pb-[2px]
                      ${
                        isActive
                          ? "text-[#3d2c2c]"
                          : "text-[#8a6e6e]"
                      }
                      hover:text-[#3d2c2c]
                      after:absolute after:left-0 after:right-0 after:bottom-0
                      after:h-[1px] after:bg-[#c9a96e]
                      after:origin-left after:transition-transform
                      ${isActive
                        ? "after:scale-x-100"
                        : "after:scale-x-0 hover:after:scale-x-100"}
                    `}
                  >
                    {label}
                  </a>
                </li>
              )
            })}

            {/* RSVP BUTTON */}
            <li>
              <a
                href="#rsvp"
                onClick={e => scrollTo(e, "#rsvp")}
                className="
                  border border-[#c9a96e]
                  text-[#c9a96e]
                  px-4 py-[6px]
                  text-[0.65rem]
                  tracking-[0.25em]
                  uppercase
                  transition-all duration-200
                  hover:bg-[#c9a96e]
                  hover:text-[#faf7f2]
                "
              >
                RSVP
              </a>
            </li>
          </ul>

          {/* HAMBURGER */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(v => !v)}
            className="flex sm:hidden flex-col justify-center gap-[5px] w-7 h-7"
          >
            <span
              className={`
                h-[1px] bg-[#3d2c2c] transition-all
                ${menuOpen ? "translate-y-[6px] rotate-45" : ""}
              `}
            />
            <span
              className={`
                h-[1px] bg-[#3d2c2c] transition-all
                ${menuOpen ? "opacity-0" : ""}
              `}
            />
            <span
              className={`
                h-[1px] bg-[#3d2c2c] transition-all
                ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}
              `}
            />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        className={`
          fixed inset-0 z-[99]
          flex flex-col items-center justify-center gap-10
          bg-[#faf7f2]
          transition-opacity duration-300
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          sm:hidden
        `}
      >
        {navItems.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={e => scrollTo(e, href)}
            className="
              font-serif text-3xl font-light
              tracking-[0.08em]
              text-[#3d2c2c]
              hover:text-[#c9a96e]
              transition-colors
            "
          >
            {label}
          </a>
        ))}

        <div className="w-10 h-px bg-[#e8d8b4]" />

        <a
          href="#rsvp"
          onClick={e => scrollTo(e, "#rsvp")}
          className="
            font-serif text-3xl font-light
            tracking-[0.08em]
            text-[#c9a96e]
          "
        >
          RSVP
        </a>
      </div>
    </>
  )
}