const FLORAL_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Ccircle cx='10' cy='10' r='2' fill='%23c9a96e' opacity='0.15'/%3E%3Ccircle cx='60' cy='5' r='1.5' fill='%23c9a96e' opacity='0.1'/%3E%3Ccircle cx='110' cy='20' r='2' fill='%23c9a96e' opacity='0.15'/%3E%3Ccircle cx='5' cy='70' r='1.5' fill='%23c9a96e' opacity='0.1'/%3E%3Ccircle cx='115' cy='80' r='2' fill='%23c9a96e' opacity='0.12'/%3E%3Ccircle cx='30' cy='110' r='1.5' fill='%23c9a96e' opacity='0.1'/%3E%3Ccircle cx='90' cy='115' r='2' fill='%23c9a96e' opacity='0.15'/%3E%3C/svg%3E")`

const cornerBase = "absolute w-24 h-24 opacity-25"
const corners = [
  { cls: "top-8 left-8 border-t border-l",    key: "tl" },
  { cls: "top-8 right-8 border-t border-r",   key: "tr" },
  { cls: "bottom-8 left-8 border-b border-l", key: "bl" },
  { cls: "bottom-8 right-8 border-b border-r",key: "br" },
]

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center relative bg-[#faf7f2] px-8 py-24 overflow-hidden"
    >
      {/* Floral dot pattern */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{ backgroundImage: FLORAL_SVG }}
      />

      {/* Corner frames */}
      {corners.map(({ cls, key }) => (
        <div key={key} className={`${cornerBase} ${cls} border-[#c9a96e]`} />
      ))}

      <p
        className="tracking-[0.35em] uppercase text-[#8a6e6e] relative mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem, 3vw, 1.4rem)", fontWeight: 300 }}
      >
        Nina &nbsp;&nbsp; Jeff
      </p>

      <div
        className="font-light text-[#3d2c2c] leading-none tracking-[-0.02em] relative"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(4rem, 12vw, 9rem)" }}
      >
        N <span className="italic text-[#c9a96e] text-[0.9em]">&amp;</span> J
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8 relative">
        <div className="w-20 h-px bg-[#c9a96e] opacity-60" />
        <div className="w-1.5 h-1.5 bg-[#c9a96e] rotate-45" />
        <div className="w-20 h-px bg-[#c9a96e] opacity-60" />
      </div>

      <p
        className="font-normal text-[#3d2c2c] tracking-[0.1em] relative"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
      >
        Sunday, the Sixth of September, 2026
      </p>
      <p className="text-sm tracking-[0.25em] uppercase text-[#8a6e6e] mt-2 relative">
        Dr. Sun Yat-Sen Classical Chinese Garden &nbsp;·&nbsp; Sun Sui Wah (Main St.)
      </p>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 text-[0.7rem] tracking-[0.3em] uppercase text-[#8a6e6e]">
        <div className="w-px h-10 bg-gradient-to-b from-[#c9a96e] to-transparent" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
