export function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      <div className="flex-1 h-px bg-[#e8d8b4]" style={{ maxWidth: 60 }} />
      <span className="font-serif text-2xl text-[#c9a96e] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>✦</span>
      <div className="flex-1 h-px bg-[#e8d8b4]" style={{ maxWidth: 60 }} />
    </div>
  )
}

export function SectionHeader({ label, heading }) {
  return (
    <>
      <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#c9a96e] text-center mb-4">
        {label}
      </p>
      <h2
        className="font-normal text-[#3d2c2c] text-center leading-tight mb-8"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)" }}
      >
        {heading}
      </h2>
      <Ornament />
    </>
  )
}

export function TimelineEntry({ time, event, desc }) {
  return (
    <>
      <p className="text-[0.65rem] tracking-[0.25em] uppercase text-[#c9a96e] mb-1">{time}</p>
      <p className="text-xl text-[#3d2c2c] mb-0.5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{event}</p>
      <p className="text-sm text-[#8a6e6e] leading-relaxed">{desc}</p>
    </>
  )
}

export function TimelineItem({ left, right }) {
  return (
    <div className="grid items-center gap-6 mb-10 last:mb-0" style={{ gridTemplateColumns: "1fr 40px 1fr" }}>
      <div className="text-right">{left}</div>
      <div className="w-2.5 h-2.5 bg-white border border-[#c9a96e] rotate-45 mx-auto relative z-10" />
      <div className="text-left">{right}</div>
    </div>
  )
}