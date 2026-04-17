import { useState, useEffect } from "react"

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

  :root {
    --cream: #faf7f2;
    --blush: #f0e6de;
    --gold: #c9a96e;
    --gold-light: #e8d8b4;
    --deep: #3d2c2c;
    --text: #5a3e3e;
    --text-light: #8a6e6e;
  }

  .wnav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    transition: background 0.35s, padding 0.35s, box-shadow 0.35s;
    padding: 1.5rem 2rem;
    background: transparent;
  }

  .wnav.scrolled {
    background: rgba(250, 247, 242, 0.96);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 0.9rem 2rem;
    box-shadow: 0 1px 0 var(--gold-light);
  }

  .wnav-inner {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .wnav-monogram {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 300;
    color: var(--deep);
    letter-spacing: 0.05em;
    line-height: 1;
    text-decoration: none;
    transition: color 0.2s;
  }

  .wnav-monogram span {
    color: var(--gold);
    font-style: italic;
  }

  .wnav-links {
    display: flex;
    align-items: center;
    gap: 2.25rem;
    list-style: none;
  }

  .wnav-links a {
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem;
    font-weight: 400;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--text-light);
    text-decoration: none;
    position: relative;
    padding-bottom: 2px;
    transition: color 0.2s;
  }

  .wnav-links a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--gold);
    transform: scaleX(0);
    transition: transform 0.25s ease;
    transform-origin: left;
  }

  .wnav-links a:hover,
  .wnav-links a.active {
    color: var(--deep);
  }

  .wnav-links a.active::after,
  .wnav-links a:hover::after {
    transform: scaleX(1);
  }

  /* RSVP pill */
  .wnav-links a.wnav-rsvp {
    border: 1px solid var(--gold);
    color: var(--gold);
    padding: 0.45rem 1.1rem 0.4rem;
    letter-spacing: 0.25em;
    transition: background 0.25s, color 0.25s;
  }

  .wnav-links a.wnav-rsvp::after { display: none; }

  .wnav-links a.wnav-rsvp:hover {
    background: var(--gold);
    color: var(--cream);
  }

  /* Hamburger */
  .wnav-hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 28px;
    height: 28px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .wnav-hamburger span {
    display: block;
    height: 1px;
    background: var(--deep);
    transition: transform 0.25s, opacity 0.25s;
    transform-origin: center;
  }

  .wnav-hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
  .wnav-hamburger.open span:nth-child(2) { opacity: 0; }
  .wnav-hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

  /* Mobile drawer */
  .wnav-drawer {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--cream);
    z-index: 99;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  }

  .wnav-drawer.open {
    opacity: 1;
    pointer-events: all;
  }

  .wnav-drawer a {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 300;
    color: var(--deep);
    text-decoration: none;
    letter-spacing: 0.08em;
    transition: color 0.2s;
  }

  .wnav-drawer a:hover { color: var(--gold); }

  .wnav-drawer-divider {
    width: 40px;
    height: 1px;
    background: var(--gold-light);
  }

  @media (max-width: 640px) {
    .wnav-links { display: none; }
    .wnav-hamburger { display: flex; }
    .wnav-drawer { display: flex; }
  }
`

const navItems = [
  { label: "Details",   href: "#details"   },
  { label: "Schedule",  href: "#schedule"  },
  { label: "Gallery",   href: "#gallery"   },
]

export default function WeddingNav() {
  const [scrolled, setScrolled]   = useState(false)
  const [active,   setActive]     = useState("")
  const [menuOpen, setMenuOpen]   = useState(false)

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
    const id  = href.replace("#", "")
    const el  = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <style>{navStyles}</style>

      <nav className={`wnav${scrolled ? " scrolled" : ""}`}>
        <div className="wnav-inner">

          <a href="#hero" className="wnav-monogram" onClick={e => scrollTo(e, "#hero")}>
            E <span>&amp;</span> J
          </a>

          <ul className="wnav-links">
            {navItems.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={active === href.replace("#", "") ? "active" : ""}
                  onClick={e => scrollTo(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a href="#rsvp" className="wnav-rsvp" onClick={e => scrollTo(e, "#rsvp")}>
                RSVP
              </a>
            </li>
          </ul>

          <button
            className={`wnav-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen drawer */}
      <div className={`wnav-drawer${menuOpen ? " open" : ""}`}>
        {navItems.map(({ label, href }) => (
          <a key={href} href={href} onClick={e => scrollTo(e, href)}>{label}</a>
        ))}
        <div className="wnav-drawer-divider" />
        <a href="#rsvp" onClick={e => scrollTo(e, "#rsvp")} style={{ color: "var(--gold)" }}>
          RSVP
        </a>
      </div>
    </>
  )
}