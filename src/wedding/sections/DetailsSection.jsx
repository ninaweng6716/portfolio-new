import { SectionHeader } from "../components/WeddingPrimitives"
import { DETAILS } from "../data/weddingDetails"

function DetailCard({ title, main, sub, link, colors, wide }) {
  return (
    <div className={[
      "group relative flex flex-col overflow-hidden",
      "bg-white border border-weddingTq-light",
      "transition-all duration-500",
      "hover:shadow-[0_12px_40px_rgba(13,78,93,0.16)] hover:-translate-y-1",
      wide ? "col-span-2 max-sm:col-span-1" : "",
    ].join(" ")}>

      {/* Top accent stripe */}
      <div className="h-1 w-full flex-shrink-0 bg-weddingTq" />

      <div className="flex flex-col flex-1 p-8 gap-4">

        {/* Card title */}
        <h3 className="font-weddingBody text-[0.7rem] tracking-[0.4em] uppercase font-semibold text-weddingPrint/50">
          {title}
        </h3>

        {/* Main display type */}
        <p className="font-weddingDisplay font-light whitespace-pre-line leading-[1.05]
                      text-[clamp(2rem,4.5vw,2.8rem)] tracking-[-0.02em] text-weddingPrint">
          {main}
        </p>

        {/* Colour swatches — only rendered when colors present, slotted below main */}
        {colors && (
          <div className="flex flex-wrap gap-4 items-end">
            {colors.map(({ tw, name }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full ring-1 ring-black/10 ${tw}`} />
              </div>
            ))}
          </div>
        )}

        {/* Sub text */}
        <p className="font-weddingBody text-[0.95rem] leading-relaxed whitespace-pre-line mt-auto text-weddingPrint">
          {sub}
        </p>

        {/* Link */}
        {link && (
          <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 w-fit mt-2
                     font-weddingBody text-xs tracking-[0.25em] uppercase font-medium
                     no-underline border-b pb-0.5 transition-colors duration-200
                     text-weddingTq border-weddingTq hover:text-weddingTq-dim hover:border-weddingTq-dim">
            {link.label}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

export default function DetailsSection() {
  return (
    <section id="details" className="relative bg-weddingTq-soft overflow-hidden">

      <div className="relative max-w-3xl mx-auto px-8 py-24">
        <SectionHeader
          label="Everything you need to know"
          heading={<>Wedding <em className="italic text-weddingPrint">Details</em></>}
        />

        <div className="grid grid-cols-2 gap-4 mt-6 max-sm:grid-cols-1 auto-rows-fr">
          {DETAILS.map(d => <DetailCard key={d.title} {...d} />)}
        </div>
      </div>

    </section>
  )
}