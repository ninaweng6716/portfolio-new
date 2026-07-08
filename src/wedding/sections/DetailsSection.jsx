import { useState } from "react"
import { SectionHeader } from "../components/WeddingPrimitives"
import WeddingCard from "../components/WeddingCard"
import { DETAILS } from "../data/weddingDetails"
import { ColoursBadgeIcon, ExternalLinkIcon, LocationMarkerIcon, TimeBadgeIcon } from "../components/WeddingIcons"

function DetailCard({ title, main, body, link, colors, wide, meta, metals, bullets }) {
  const [open, setOpen] = useState(false)
  const bulletsId = `bullets-${String(title).replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`

  function renderTextWithLinks(text, links = []) {
    if (!Array.isArray(links) || links.length === 0) return text

    // Build a regex that matches any of the link texts (escaped)
    const escaped = links.map(l => l.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    const regex = new RegExp(escaped.join("|"), "gi")

    const parts = []
    let lastIndex = 0
    let match
    while ((match = regex.exec(text)) !== null) {
      const idx = match.index
      if (idx > lastIndex) parts.push(text.slice(lastIndex, idx))
      const matchedText = match[0]
      // find the link object (case-insensitive match)
      const linkObj = links.find(l => l.text.toLowerCase() === matchedText.toLowerCase())
      if (linkObj) {
        parts.push(
          <a key={`${idx}-${matchedText}`} href={linkObj.href} target="_blank" rel="noopener noreferrer" className="text-weddingTeal underline decoration-weddingTeal/30 hover:decoration-weddingTeal inline-flex items-center gap-1">
            <span>{matchedText}</span>
            <ExternalLinkIcon className="w-3 h-3 opacity-90" />
          </a>
        )
      } else {
        parts.push(matchedText)
      }
      lastIndex = idx + matchedText.length
    }

    if (lastIndex < text.length) parts.push(text.slice(lastIndex))
    return parts
  }

  return (
    <WeddingCard title={title} wide={wide}>
      {/* Main display type */}
        <p className="font-weddingDisplay font-light text-4xl text-weddingPrint my-2">
          {main}
        </p>
        {link && (
          <a 
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="w-fit pt-2 flex items-center gap-2 font-weddingDisplay text-weddingPrint-light font-semibold transition-transform duration-200 hover:-translate-y-1"
          >
            <LocationMarkerIcon className="h-4 w-4 flex-shrink-0 text-weddingTeal" />

            <p className="font-weddingDisplay text-lg font-semibold text-weddingTeal">
              Get Directions
            </p>
          </a>
        )}


        {/* Short supporting detail */}
        {meta && (
          <>
            <div className="inline-flex w-fit items-center gap-2">
              {meta === "Our Colours" ? (
                <ColoursBadgeIcon className="h-4 w-4 flex-shrink-0 text-weddingTeal" />
              ) : (
                <TimeBadgeIcon className="h-4 w-4 flex-shrink-0 text-weddingTeal" />
              )}
              <p className="font-weddingDisplay text-lg font-semibold text-weddingTeal">
                {meta}
              </p>
            </div>
          </>
        )}

        {/* Colour swatches — rendered beneath the colour heading */}
        {colors && (
          <div className="flex flex-wrap gap-4 items-end">
            {colors.map(({ tw, name }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full ring-1 ring-black/10 ${tw}`} />
              </div>
            ))}
          </div>
        )}

        {/* Body text */}
        {body && (
          <p className="font-weddingBody text-base whitespace-pre-line text-weddingPrint my-2">
            {body}
          </p>
        )}

        {/* Bulleted notes (parking, quick items) - collapsed by default */}
        {Array.isArray(bullets) && bullets.length > 0 && (
          <div className="mt-4">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={bulletsId}
              onClick={() => setOpen(v => !v)}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2rem] font-weddingDisplay font-semibold bg-weddingTq-soft text-weddingPrint px-3 py-2 rounded-t-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-weddingTeal focus-visible:ring-offset-2"
            >
              {open ? "Close Details" : "Open Details"}
              <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
            </button>

            <div
              id={bulletsId}
              role="region"
              aria-hidden={!open}
              className="overflow-hidden"
              style={{
                maxHeight: open ? '1000px' : '0px',
                transition: 'max-height 260ms cubic-bezier(.2,.9,.2,1)',
                willChange: 'max-height',
              }}
            >
              <div className="origin-top-left bg-weddingTq-soft text-weddingPrint rounded-b-md px-4 py-3" style={{
                opacity: open ? 1 : 0,
                transition: 'opacity 200ms ease',
                pointerEvents: open ? 'auto' : 'none',
              }}>
                <ul className="space-y-2">
                {bullets.map((b, i) => {
                const normalizedLinks = Array.isArray(b.links) && b.links.length > 0
                  ? b.links
                  : (b.linkText && b.href) ? [{ text: b.linkText, href: b.href }]
                  : (b.link ? (Array.isArray(b.link) ? b.link : [b.link]).map(l => ({ text: l.text || l.linkText, href: l.href })) : [])

                let content
                if (normalizedLinks.length > 0) {
                  content = renderTextWithLinks(b.text, normalizedLinks)
                } else if (b.href) {
                  content = (
                    <a href={b.href} target="_blank" rel="noopener noreferrer" className="text-weddingTeal underline decoration-weddingTeal/30 hover:decoration-weddingTeal inline-flex items-center gap-1">
                      <span>{b.text}</span>
                      <ExternalLinkIcon className="w-3 h-3 opacity-90" />
                    </a>
                  )
                } else {
                  content = b.text
                }

                return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 text-weddingPrint">•</span>
                      <span className="text-base font-weddingBody">{content}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          </div>
        )}

    </WeddingCard>
  )
}

export default function DetailsSection() {
  return (
    <section id="details" className="relative bg-weddingTq-soft overflow-hidden">

      <div className="relative max-w-3xl mx-auto px-8 py-24">
        <SectionHeader
          heading={<>Wedding <em className="italic text-weddingPrint">Details</em></>}
        />

        <div className="grid grid-cols-2 gap-4 mt-6 max-sm:grid-cols-1 items-stretch">
          {DETAILS.map(d => <DetailCard key={d.title} {...d} />)}
        </div>
      </div>

    </section>
  )
}