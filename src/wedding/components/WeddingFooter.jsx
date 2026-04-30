const FOOTER_LINKS = [
  { label: "Details", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ",     href: "#faq"     },
  { label: "RSVP",   href: "#rsvp"    },
]

function scrollTo(e, href) {
  e.preventDefault()
  const el = document.getElementById(href.replace("#", ""))
  if (el) el.scrollIntoView({ behavior: "smooth" })
}

export default function WeddingFooter() {
  return (
    <footer className="bg-weddingTq-soft px-8 pt-16 pb-8">
      <div className="max-w-3xl mx-auto">

        {/* Monogram */}
        <div className="wedding-nav-monogram text-center text-4xl mb-4">
          N <span className="wedding-ampersand">&amp;</span> J
        </div>

        {/* Back to top */}
        <button
          className="wedding-footer-back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="wedding-footer-back-to-top-line" />
          Back to top
        </button>

        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-col justify-items-center list-none mb-10 gap-4 text-center md:flex-row md:flex-wrap md:justify-center">
            {FOOTER_LINKS.map(({ label, href }) => (
              <li key={href} className="p-2">
                <a
                  href={href}
                  onClick={e => scrollTo(e, href)}
                  className="wedding-footer-link"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="wedding-footer-divider" />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="wedding-footer-date">
            Sunday, September 6th, 2026 &nbsp;·&nbsp; Vancouver
          </p>
          <p className="wedding-footer-byline">
            Made with love
          </p>
        </div>

      </div>
    </footer>
  )
}