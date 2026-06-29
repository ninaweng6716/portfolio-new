import { SectionHeader } from "../components/WeddingPrimitives"

function AddToCalendarButton() {
  return (
    <div className="flex flex-col items-center gap-6">
      <span className="font-weddingDisplay font-light leading-[1.05]
                       text-[clamp(2rem,4.5vw,2.8rem)] tracking-[-0.02em] text-weddingPrint">
        August 9, 2026
      </span>
      <a
        href="/rsvp-deadline.ics"
        aria-label="Add RSVP deadline to your calendar"
        className="wedding-cal-btn"
      >
        <svg width="11" height="11" viewBox="0 0 9 9" fill="none" aria-hidden="true">
          <rect x="0.5" y="1.5" width="8" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M0.5 3.5h8M3 0.5v2M6 0.5v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        Add to Calendar
      </a>
    </div>
  )
}

export default function RSVPSection() {
  return (
    <section id="rsvp" className="relative bg-weddingTq-soft overflow-hidden">

      <div aria-hidden="true"
           className="absolute -top-10 -right-8 pointer-events-none select-none
                      font-weddingDisplay font-light text-weddingTq/[0.05]
                      text-[22rem] leading-none">
        R
      </div>

      <div aria-hidden="true"
           className="absolute inset-0 pointer-events-none
                      [background-image:radial-gradient(circle,theme(colors.weddingTq.DEFAULT)_1px,transparent_1px)]
                      [background-size:28px_28px] opacity-[0.04]" />

      <div className="relative max-w-2xl mx-auto px-8 py-24">
        <SectionHeader
          heading={<>Please <em className="italic text-weddingPrint">RSVP</em></>}
        />

        <div className="group relative flex flex-col overflow-hidden
                        bg-white border border-weddingTq-light
                        transition-all duration-500
                        hover:shadow-[0_12px_40px_rgba(13,78,93,0.16)]">

          <div className="h-1 w-full flex-shrink-0 bg-weddingTq" />

          <div className="flex flex-col items-center p-10 gap-4 text-center">

            <h3 className="font-weddingBody text-[0.75rem] tracking-[0.25rem] uppercase font-semibold text-weddingPrint/75">
              Kindly Respond By
            </h3>

            
            <AddToCalendarButton />
            <p className="font-weddingBody text-[0.95rem] leading-relaxed text-weddingPrint/75 mt-2">
              Respond with your personalized RSVP link.
            </p>


          </div>
        </div>

      </div>
    </section>
  )
}