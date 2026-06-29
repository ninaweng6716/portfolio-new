import { SectionHeader } from "../components/WeddingPrimitives"
import WeddingCard from "../components/WeddingCard"
import { DETAILS } from "../data/weddingDetails"

function DetailCard({ title, main, body, link, colors, wide, meta, metals }) {
  return (
    <WeddingCard title={title} wide={wide}>
      {/* Main display type */}
        <p className="font-weddingDisplay font-light text-4xl text-weddingPrint">
          {main}
        </p>

        {/* Short supporting detail */}
        {meta && (
          <div className="inline-flex w-fit items-center rounded-full bg-weddingTq-soft px-3 py-1.5 my-2">
            <p className="font-weddingBody text-xs tracking-[0.2rem] uppercase text-weddingPrint">
              {meta}
            </p>
          </div>
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
          <p className="font-weddingBody text-[0.95rem] whitespace-pre-line text-weddingPrint">
            {body}
          </p>
        )}

        {link && (
          <a 
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="mt-auto w-fit pt-2 transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#F4A7A7] via-[#E8C98E] to-[#8FC3A0] text-white shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                <circle cx="12" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
            </span>
          </a>
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