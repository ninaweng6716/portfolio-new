import { SectionHeader } from "../components/WeddingPrimitives"

export default function RSVPSection() {
  return (
    <section id="rsvp" className="relative bg-weddingTq-soft overflow-hidden">

      {/* Ghost watermark */}
      <div aria-hidden="true"
           className="absolute -top-10 -right-8 pointer-events-none select-none
                      font-weddingDisplay font-light text-weddingTq/[0.05]
                      text-[22rem] leading-none">
        R
      </div>

      {/* Dot grid */}
      <div aria-hidden="true"
           className="absolute inset-0 pointer-events-none
                      [background-image:radial-gradient(circle,theme(colors.weddingTq.DEFAULT)_1px,transparent_1px)]
                      [background-size:28px_28px] opacity-[0.04]" />

      <div className="relative max-w-2xl mx-auto px-8 py-24">
        <SectionHeader
          label="RSVP"
          heading={<>Let us know if you will be able to <em className="italic text-weddingPrint">join us</em></>}
        />

        {/* Card — same structure as DetailCard */}
        <div className="group relative flex flex-col overflow-hidden
                        bg-white border border-weddingTq-light
                        transition-all duration-500
                        hover:shadow-[0_12px_40px_rgba(13,78,93,0.16)]">

          {/* Top accent stripe */}
          <div className="h-1 w-full flex-shrink-0 bg-weddingTq" />

          <div className="flex flex-col items-center p-10 gap-4 text-center">

            <h3 className="font-weddingBody text-[0.7rem] tracking-[0.4em] uppercase font-semibold text-weddingPrint">
              Kindly Respond By
            </h3>

            <p className="font-weddingDisplay font-light leading-[1.05]
                          text-[clamp(2rem,4.5vw,2.8rem)] tracking-[-0.02em] text-weddingPrint">
              August 9, 2026
            </p>

            <p className="font-weddingBody text-[0.95rem] leading-relaxed text-weddingPrint mt-2">
              Please respond via your personalized RSVP link sent to your email or phone.
            </p>

          </div>
        </div>

      </div>
    </section>
  )
}