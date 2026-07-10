import { SectionHeader } from "../components/WeddingPrimitives"
import WeddingCard from "../components/WeddingCard"

export default function RSVPSection() {
  const rsvpDate = new Date("2026-08-09T22:00:00-07:00") // August 9, 2026, 10:00 PM PDT
  const monthDay = rsvpDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
  const fullDate = rsvpDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

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
          <p className="mt-2 font-weddingDisplay text-[2.1rem] leading-none text-weddingPrint sm:text-[2.5rem]">
            {monthDay}
          </p>

          <p className="font-weddingBody text-[0.95rem] whitespace-pre-line text-weddingPrint my-4 leading-relaxed">
            Please use your personalized RSVP link and respond only once per household.
          </p>
        </WeddingCard>

      </div>
    </section>
  )
}