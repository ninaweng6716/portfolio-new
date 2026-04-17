import { useState } from "react"

const florals =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Ccircle cx='10' cy='10' r='2' fill='%23c9a96e' opacity='0.15'/%3E%3Ccircle cx='60' cy='5' r='1.5' fill='%23c9a96e' opacity='0.1'/%3E%3C/svg%3E\")"

const photoLabels = [
  "Engagement Photo",
  "The Proposal",
  "Our Adventure",
  "Together",
  "In Love",
]

export default function Wedding() {
  return (
    <div className="bg-[#faf7f2] text-[#5a3e3e] font-sans overflow-x-hidden">

      {/* ───── HERO ───── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 py-24"
      >
        {/* floral overlay */}
        <div
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{ backgroundImage: florals }}
        />

        {/* corner ornaments */}
        {["tl","tr","bl","br"].map(pos => (
          <div
            key={pos}
            className={`
              absolute w-[100px] h-[100px] opacity-25 border-[#c9a96e]
              ${pos==="tl" && "top-8 left-8 border-t border-l"}
              ${pos==="tr" && "top-8 right-8 border-t border-r"}
              ${pos==="bl" && "bottom-8 left-8 border-b border-l"}
              ${pos==="br" && "bottom-8 right-8 border-b border-r"}
            `}
          />
        ))}

        <p className="font-serif tracking-[0.35em] uppercase text-[#8a6e6e] text-sm">
          Nina &nbsp;&nbsp; Jeff
        </p>

        <h1 className="font-serif text-[clamp(4rem,12vw,9rem)] font-light leading-none text-[#3d2c2c]">
          N <span className="italic text-[#c9a96e]">&amp;</span> J
        </h1>

        {/* divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="w-20 h-px bg-[#c9a96e]/60" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#c9a96e]" />
          <div className="w-20 h-px bg-[#c9a96e]/60" />
        </div>

        <p className="font-serif text-lg tracking-widest text-[#3d2c2c]">
          Sunday, the Sixth of September, 2026
        </p>

        <p className="uppercase tracking-[0.25em] text-xs text-[#8a6e6e] mt-2">
          Dr. Sun Yat-Sen Classical Chinese Garden · Sun Sui Wah
        </p>

        {/* scroll indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#8a6e6e]">
          <div className="w-px h-10 bg-gradient-to-b from-[#c9a96e] to-transparent"/>
          Scroll
        </div>
      </section>

      {/* ───── DETAILS ───── */}
      <section id="details" className="bg-[#f0e6de]">
        <div className="max-w-[760px] mx-auto px-8 py-20 text-center">

          <p className="uppercase tracking-[0.4em] text-xs text-[#c9a96e] mb-4">
            Everything you need
          </p>

          <h2 className="font-serif text-[clamp(2rem,5vw,3rem)] text-[#3d2c2c] mb-8">
            Wedding <em className="italic text-[#9e7b7b]">Details</em>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-6">

            {[
              {
                icon:"♡",
                title:"Ceremony",
                main:"Rosewood Chapel",
                sub:"3:00 PM · Please be seated by 2:45"
              },
              {
                icon:"✦",
                title:"Reception",
                main:"The Grand Terrace",
                sub:"5:00 PM — Midnight"
              },
              {
                icon:"✿",
                title:"Dress Code",
                main:"Black Tie Optional",
                sub:"Formal attire encouraged"
              },
            ].map((card,i)=>(
              <div
                key={i}
                className="bg-white border border-[#e8d8b4] p-8"
              >
                <div className="text-2xl italic text-[#c9a96e] mb-4 font-serif">
                  {card.icon}
                </div>

                <p className="uppercase tracking-[0.35em] text-xs text-[#8a6e6e] mb-3">
                  {card.title}
                </p>

                <p className="font-serif text-xl text-[#3d2c2c] mb-2">
                  {card.main}
                </p>

                <p className="text-sm text-[#8a6e6e]">
                  {card.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── RSVP ───── */}
      <section id="rsvp" className="bg-[#3d2c2c] text-[#faf7f2]">
        <div className="max-w-[760px] mx-auto px-8 py-20 text-center">

          <p className="uppercase tracking-[0.4em] text-xs text-[#c9a96e] mb-4">
            Kindly reply
          </p>

          <h2 className="font-serif text-4xl mb-6">RSVP</h2>

          <p className="font-serif text-lg text-white/70 mb-8">
            Please respond using your personalized RSVP link.
          </p>

          <p className="text-sm text-white/40 tracking-wider">
            Kindly reply by August 9, 2026
          </p>

        </div>
      </section>

      {/* ───── GALLERY ───── */}
      <section id="gallery" className="bg-[#faf7f2]">
        <div className="max-w-[760px] mx-auto px-8 py-20 text-center">

          <p className="uppercase tracking-[0.4em] text-xs text-[#c9a96e] mb-4">
            Memories
          </p>

          <h2 className="font-serif text-[clamp(2rem,5vw,3rem)] text-[#3d2c2c] mb-10">
            Our <em className="italic text-[#9e7b7b]">Gallery</em>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

            {photoLabels.map((label,i)=>(
              <div
                key={i}
                className={`border border-[#e8d8b4] bg-[#f0e6de] relative overflow-hidden ${
                  i===0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <div className="pt-[75%] flex flex-col items-center justify-center absolute inset-0">
                  <span className="text-2xl italic text-[#c9a0a0]/60 font-serif">
                    ✿
                  </span>

                  <span className="uppercase tracking-[0.25em] text-xs text-[#8a6e6e]/70">
                    {label}
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

    </div>
  )
}