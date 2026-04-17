import { useState } from "react"
import { SectionHeader } from "../components/WeddingPrimitives"

export default function RSVPSection() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="rsvp" className="bg-[#f0e6de] text-[#faf7f2]">
      <div className="max-w-3xl mx-auto px-8 py-20">

        {/* Section header — overridden for dark bg */}
        <p className="font-weddingBody text-[0.65rem] tracking-[0.4em] uppercase text-[#c9a96e] text-center mb-4">
          Kindly reply
        </p>
        <h2
          className="font-weddingDisplay font-normal text-[#3d2c2c] text-center leading-tight mb-8 text-[clamp(2rem,5vw,3rem)]"
        >
          RSVP
        </h2>
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex-1 h-px bg-[#c9a96e]/30" style={{ maxWidth: 60 }} />
          <span
            className="text-2xl text-[#c9a96e] leading-none"
          >
            ✦
          </span>
          <div className="flex-1 h-px bg-[#c9a96e]/30" style={{ maxWidth: 60 }} />
        </div>

          <p
            className="font-weddingBody text-center italic text-[#8a6e6e]/70 leading-relaxed mb-10 text-[clamp(1rem,2vw,1.1rem)]"
          >
            Please respond to our invitation via your personalized RSVP link by
          </p>
          <p
            className="font-weddingBody text-center text-[#3d2c2c]/70 leading-relaxed mb-10 text-[clamp(2.25rem,2vw,1.1rem)]"
          >
            August 9, 2026
          </p>
      </div>
    </section>
  )
}