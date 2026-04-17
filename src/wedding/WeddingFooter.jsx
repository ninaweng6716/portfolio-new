import { useEffect, useState } from "react"

const footerStyles = `
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

  .wfooter {
    background: var(--deep);
    color: var(--cream);
    padding: 4rem 2rem 2rem;
    font-family: 'Jost', sans-serif;
  }

  .wfooter-inner {
    max-width: 760px;
    margin: 0 auto;
  }

  /* Top ornament */
  .wfooter-ornament {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .wfooter-ornament-line {
    flex: 1;
    height: 1px;
    background: rgba(201, 169, 110, 0.25);
  }

  .wfooter-ornament-glyph {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    color: var(--gold);
    opacity: 0.7;
  }

  /* Monogram */
  .wfooter-monogram {
    text-align: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 300;
    color: var(--cream);
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .wfooter-monogram span {
    color: var(--gold);
    font-style: italic;
  }

  .wfooter-names {
    text-align: center;
    font-size: 0.65rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: rgba(250, 247, 242, 0.45);
    margin-bottom: 2.5rem;
  }

  /* Countdown */
  .wfooter-countdown {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .countdown-unit {
    text-align: center;
  }

  .countdown-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 300;
    color: var(--gold);
    line-height: 1;
    display: block;
  }

  .countdown-label {
    font-size: 0.55rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(250, 247, 242, 0.4);
    margin-top: 0.35rem;
    display: block;
  }

  .countdown-sep {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    color: rgba(201, 169, 110, 0.3);
    line-height: 1;
    align-self: flex-start;
    padding-top: 0.1rem;
  }

  /* Nav links */
  .wfooter-links {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem 2rem;
    list-style: none;
    margin-bottom: 2.5rem;
  }

  .wfooter-links a {
    font-size: 0.62rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(250, 247, 242, 0.45);
    text-decoration: none;
    transition: color 0.2s;
  }

  .wfooter-links a:hover { color: var(--gold); }

  /* Divider */
  .wfooter-rule {
    height: 1px;
    background: rgba(201, 169, 110, 0.15);
    margin-bottom: 1.75rem;
  }

  /* Bottom bar */
  .wfooter-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .wfooter-date {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.9rem;
    font-style: italic;
    color: rgba(250, 247, 242, 0.35);
  }

  .wfooter-love {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(250, 247, 242, 0.25);
    text-align: right;
  }

  /* Back to top */
  .wfooter-top-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(250, 247, 242, 0.35);
    font-family: 'Jost', sans-serif;
    font-size: 0.6rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    transition: color 0.2s;
    margin: 0 auto 2rem;
  }

  .wfooter-top-btn:hover { color: var(--gold); }

  .wfooter-top-btn-arrow {
    width: 1px;
    height: 32px;
    background: linear-gradient(to top, rgba(201,169,110,0.5), transparent);
  }
`

const WEDDING_DATE = new Date("2025-06-14T15:00:00")

function useCountdown(target) {
  const [diff, setDiff] = useState(target - Date.now())

  useEffect(() => {
    const id = setInterval(() => setDiff(target - Date.now()), 1000)
    return () => clearInterval(id)
  }, [target])

  const total = Math.max(0, diff)
  const days    = Math.floor(total / 86400000)
  const hours   = Math.floor((total % 86400000) / 3600000)
  const minutes = Math.floor((total % 3600000)  / 60000)
  const seconds = Math.floor((total % 60000)    / 1000)

  return { days, hours, minutes, seconds, past: diff <= 0 }
}

const footerLinks = [
  { label: "Details",   href: "#details"  },
  { label: "Schedule",  href: "#schedule" },
  { label: "Gallery",   href: "#gallery"  },
  { label: "RSVP",      href: "#rsvp"     },
]

export default function WeddingFooter() {
  const { days, hours, minutes, seconds, past } = useCountdown(WEDDING_DATE.getTime())

  function scrollTo(e, href) {
    e.preventDefault()
    const el = document.getElementById(href.replace("#", ""))
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  function scrollTop(e) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="wfooter">
      <style>{footerStyles}</style>

      <div className="wfooter-inner">

        <div className="wfooter-ornament">
          <div className="wfooter-ornament-line" />
          <span className="wfooter-ornament-glyph">✦</span>
          <div className="wfooter-ornament-line" />
        </div>

        <div className="wfooter-monogram">
          N <span>&amp;</span> J
        </div>


        {/* Back to top */}
        <button className="wfooter-top-btn" onClick={scrollTop}>
          <div className="wfooter-top-btn-arrow" />
          Back to top
        </button>

        {/* Footer nav */}
        <ul className="wfooter-links">
          {footerLinks.map(({ label, href }) => (
            <li key={href}>
              <a href={href} onClick={e => scrollTo(e, href)}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="wfooter-rule" />

        <div className="wfooter-bottom">
          <p className="wfooter-date">Saturday, June 14th, 2025 &nbsp;·&nbsp; Napa Valley</p>
          <p className="wfooter-love">Made with love</p>
        </div>

      </div>
    </footer>
  )
}