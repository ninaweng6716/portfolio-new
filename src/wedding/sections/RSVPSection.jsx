import { useState } from "react"
import { SectionHeader } from "../components/WeddingPrimitives"

export default function RSVPSection() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="rsvp" className="bg-[#3d2c2c] text-[#faf7f2]">
      <div className="max-w-3xl mx-auto px-8 py-20">
        {/* Override heading/label colours for dark bg */}
        <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#c9a96e] text-center mb-4">
          Kindly reply
        </p>
        <h2
          className="font-normal text-[#faf7f2] text-center leading-tight mb-8"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)" }}
        >
          RSVP
        </h2>
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex-1 h-px bg-[#c9a96e]/30" style={{ maxWidth: 60 }} />
          <span className="text-2xl text-[#c9a96e] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>✦</span>
          <div className="flex-1 h-px bg-[#c9a96e]/30" style={{ maxWidth: 60 }} />
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <p
              className="italic text-[#c9a96e] text-[1.8rem] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              We'll see you there.
            </p>
            <p className="text-[0.8rem] tracking-[0.2em] uppercase text-[#faf7f2]/50">
              Thank you for your reply
            </p>
          </div>
        ) : (
          <>
            <p
              className="text-center text-[#faf7f2]/70 leading-relaxed mb-10"
              style={{ fontFamily: "'EB Garamond', serif", fontSize: "1rem" }}
            >
              Please respond to our invitation via your personalized RSVP link.
            </p>
            <p className="text-center text-[0.75rem] text-[#faf7f2]/40 tracking-wide mt-6">
              Kindly reply by August 9, 2026
            </p>
          </>
        )}
      </div>
    </section>
  )
}
