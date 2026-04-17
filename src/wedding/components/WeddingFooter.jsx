// import { FONTS } from "../components/WeddingPrimitives"

const FOOTER_LINKS = [
  { label: "Details",  href: "#details"  },
  // { label: "Schedule", href: "#schedule" },
  { label: "Gallery",  href: "#gallery"  },
  { label: "RSVP",     href: "#rsvp"     },
]

function scrollTo(e, href) {
  e.preventDefault()
  const el = document.getElementById(href.replace("#", ""))
  if (el) el.scrollIntoView({ behavior: "smooth" })
}

export default function WeddingFooter() {
  return (
    <footer className="bg-[#3d2c2c] text-[#faf7f2] px-8 pt-16 pb-8 font-sans">
      <div className="max-w-3xl mx-auto">

        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex-1 h-px bg-[#c9a96e]/25" />
          <span className="text-[#c9a96e]/70 font-serif">✦</span>
          <div className="flex-1 h-px bg-[#c9a96e]/25" />
        </div>

        {/* Monogram */}
        <div
          className="font-weddingDisplay text-center text-4xl font-light text-[#faf7f2] leading-none mb-8"
        >
          N <span className="font-weddingDisplay italic text-[#c9a96e]">&amp;</span> J
        </div>

        {/* Back to top */}
        <button
          className="font-weddingBody flex flex-col items-center gap-1.5 bg-transparent border-none cursor-pointer text-[#faf7f2]/35 text-[0.6rem] tracking-[0.25em] uppercase mx-auto mb-8 transition-colors duration-200 hover:text-[#c9a96e]"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-px h-8 bg-gradient-to-t from-[#c9a96e]/50 to-transparent" />
          Back to top
        </button>

        {/* Nav links */}
        <ul className="flex justify-center flex-wrap gap-x-8 gap-y-2 list-none mb-10">
          {FOOTER_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={e => scrollTo(e, href)}
                className="font-weddingBody text-[0.62rem] tracking-[0.3em] uppercase text-[#faf7f2]/45 no-underline transition-colors duration-200 hover:text-[#c9a96e]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="h-px bg-[#c9a96e]/15 mb-7" />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="font-weddingBody italic text-[#faf7f2]/35 text-sm font-serif">
            Sunday, September 6th, 2026 &nbsp;·&nbsp; Vancouver
          </p>
          <p className="font-weddingBody text-[0.6rem] tracking-[0.2em] uppercase text-[#faf7f2]/25">
            Made with love
          </p>
        </div>

      </div>
    </footer>
  )
}