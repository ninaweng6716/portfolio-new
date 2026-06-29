import { SectionHeader } from "../components/WeddingPrimitives"
import WeddingCard from "../components/WeddingCard"

const calendarButtonData = {
  dateText: "August 9, 2026",
  href: "/rsvp-deadline.ics",
  label: "Add to Calendar",
  ariaLabel: "Add RSVP deadline for August 9, 2026 to your calendar",
}

function BtnAddCalendar() {
  return (
    <div className="flex flex-col items-center gap-6">
      <span className="font-weddingDisplay font-light leading-[1.05]
                       text-[clamp(2rem,4.5vw,2.8rem)] tracking-[-0.02em] text-weddingPrint">
        {calendarButtonData.dateText}
      </span>
      <a
        href={calendarButtonData.href}
        aria-label={calendarButtonData.ariaLabel}
        className="wedding-cal-btn"
      >
        {calendarButtonData.label}
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
          heading={<>Your <em className="italic text-weddingPrint">RSVP</em></>}
        />

        <WeddingCard
          title="Kindly Respond By"
          titleClassName="text-center"
          className="items-center text-center"
        >
          <BtnAddCalendar />
          <p className="font-weddingBody text-[0.95rem] whitespace-pre-line text-weddingPrint my-4">
            Please use your personalized RSVP link and respond only once per household.
          </p>
        </WeddingCard>

      </div>
    </section>
  )
}