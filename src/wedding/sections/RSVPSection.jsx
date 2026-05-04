import { SectionHeader } from "../components/WeddingPrimitives"

function AddToCalendarButton() {
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("RSVP Deadline – Jeff & Nina's Wedding")}&dates=20260809/20260810&details=${encodeURIComponent("Please submit your RSVP by this date.")}`

  return (
    <div className="flex flex-col items-center gap-6">
      <span className="font-weddingDisplay font-light leading-[1.05]
                       text-[clamp(2rem,4.5vw,2.8rem)] tracking-[-0.02em] text-weddingPrint">
        August 9, 2026
      </span>
      <div className="flex items-center gap-3">
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Add RSVP deadline to Google Calendar"
          className="inline-flex items-center gap-1.5
                     font-weddingBody text-[0.6rem] tracking-[0.25em] uppercase
                     text-weddingTq border-b border-weddingTq pb-px
                     transition-colors duration-200 hover:text-weddingTq-dim hover:border-weddingTq-dim"
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
            <rect x="0.5" y="1.5" width="8" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M0.5 3.5h8M3 0.5v2M6 0.5v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Google Calendar
        </a>
        <span className="text-weddingPrint/20 text-xs select-none">·</span>
        <a
          href="/rsvp-deadline.ics"
          aria-label="Add RSVP deadline to Apple or other calendar"
          className="inline-flex items-center gap-1.5
                     font-weddingBody text-[0.6rem] tracking-[0.25em] uppercase
                     text-weddingTq border-b border-weddingTq pb-px
                     transition-colors duration-200 hover:text-weddingTq-dim hover:border-weddingTq-dim"
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
            <rect x="0.5" y="1.5" width="8" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M0.5 3.5h8M3 0.5v2M6 0.5v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Apple / Other
        </a>
      </div>
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
          label="RSVP"
          heading={<>Let us know if you will be able to <em className="italic text-weddingPrint">join us</em></>}
        />

        <div className="group relative flex flex-col overflow-hidden
                        bg-white border border-weddingTq-light
                        transition-all duration-500
                        hover:shadow-[0_12px_40px_rgba(13,78,93,0.16)]">

          <div className="h-1 w-full flex-shrink-0 bg-weddingTq" />

          <div className="flex flex-col items-center p-10 gap-4 text-center">

            <h3 className="font-weddingBody text-[0.7rem] tracking-[0.4em] uppercase font-semibold text-weddingPrint">
              Kindly Respond By
            </h3>

            <AddToCalendarButton />

            <p className="font-weddingBody text-[0.95rem] leading-relaxed text-weddingPrint mt-2">
              Please respond via your personalized RSVP link sent to your email or phone.
            </p>

          </div>
        </div>

      </div>
    </section>
  )
}