const cornerBase = "absolute w-24 h-24 opacity-25"
const corners = [
  { cls: "top-8 left-8 border-t border-l",     key: "tl" },
  { cls: "top-8 right-8 border-t border-r",    key: "tr" },
  { cls: "bottom-8 left-8 border-b border-l",  key: "bl" },
  { cls: "bottom-8 right-8 border-b border-r", key: "br" },
]

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-dvh flex flex-col items-center justify-center text-center relative bg-[#faf7f2] px-8 py-24 overflow-hidden"
    >

      {/* Corner frames */}
      {corners.map(({ cls, key }) => (
        <div key={key} className={`${cornerBase} ${cls} border-[#c9a96e]`} />
      ))}

      {/* Monogram */}
      <div
        className="font-weddingDisplay font-light text-[#3d2c2c] leading-none tracking-[-0.02em] relative text-[clamp(4rem,12vw,9rem)]"
      >
        Nina <span className="italic text-[#c9a96e] text-[0.9em]">&amp;</span> Jeff
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8 relative">
        <div className="w-20 h-px bg-[#c9a96e] opacity-60" />
        <div className="w-1.5 h-1.5 bg-[#c9a96e] rotate-45" />
        <div className="w-20 h-px bg-[#c9a96e] opacity-60" />
      </div>

      {/* Date */}
      <p
        className="font-weddingBody font-normal text-[#3d2c2c] tracking-[0.1em] relative text-[clamp(1.1rem,2.5vw,1.5rem)]"
      >
        Sunday, the Sixth of September, 2026
      </p>

      {/* Venue */}
      <p
        className="font-weddingBody text-[0.75rem] tracking-[0.25em] uppercase text-[#8a6e6e] mt-3 relative"
      >
        Dr. Sun Yat-Sen Classical Chinese Garden &nbsp;·&nbsp; Sun Sui Wah (Main St.)
      </p>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 text-[0.7rem] tracking-[0.3em] uppercase text-[#8a6e6e]">
        <div className="w-px h-10 bg-gradient-to-b from-[#c9a96e] to-transparent" />
        <span className="font-weddingBody">Scroll</span>
      </div>
    </section>
  )
}