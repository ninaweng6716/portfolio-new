import { useEffect, useState } from "react"

const WEDDING_DATE = new Date("2026-09-06T15:00:00")

const footerLinks = [
  { label: "Details", href: "#details" },
  { label: "Schedule", href: "#schedule" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" },
]

export default function WeddingFooter() {

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
    <footer className="bg-[#3d2c2c] text-[#faf7f2] px-6 py-16 font-light">

      <div className="max-w-[760px] mx-auto">

        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex-1 h-px bg-[#c9a96e]/25" />
          <span className="text-[#c9a96e]/70 text-xl">✦</span>
          <div className="flex-1 h-px bg-[#c9a96e]/25" />
        </div>

        {/* Monogram */}
        <h2 className="text-center text-[clamp(2.5rem,8vw,4.5rem)] font-serif leading-none mb-2">
          N <span className="text-[#c9a96e] italic">&amp;</span> J
        </h2>

        {/* Back to top */}
        <button
          onClick={scrollTop}
          className="flex flex-col items-center gap-2 mx-auto mb-10 text-[10px] tracking-[0.25em] uppercase text-[#faf7f2]/40 hover:text-[#c9a96e] transition"
        >
          <div className="w-px h-8 bg-gradient-to-t from-[#c9a96e]/50 to-transparent" />
          Back to top
        </button>

        {/* Links */}
        <ul className="flex justify-center flex-wrap gap-x-8 gap-y-2 mb-10">
          {footerLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => scrollTo(e, href)}
                className="text-[10px] tracking-[0.3em] uppercase text-[#faf7f2]/45 hover:text-[#c9a96e] transition"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="h-px bg-[#c9a96e]/15 mb-7" />

        {/* Date */}
        <p className="text-center italic text-[#faf7f2]/35 font-serif text-sm">
          Sunday, September 6th, 2026 · Vancouver
        </p>

      </div>
    </footer>
  )
}