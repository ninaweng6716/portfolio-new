import { about, info } from '../data/portfolio'

export default function About() {
  return (
    <section id="about" className="py-[6.5rem] px-[6vw] bg-white">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-20 items-center">

        {/* Visual placeholder (swap for <img> when you have a photo) */}
        <div className="reveal relative aspect-square rounded-2xl bg-tq-pale flex flex-col items-center justify-center gap-4
          overflow-hidden transition-transform duration-400 hover:scale-[1.02]">
          <div className="absolute inset-0"
            style={{ background: 'repeating-linear-gradient(135deg,transparent,transparent 20px,rgba(32,178,160,0.05) 20px,rgba(32,178,160,0.05) 21px)' }} />
          <div className="relative z-10 w-20 h-20 rounded-full bg-tq/15 flex items-center justify-center text-[2.25rem]">
            🧑‍💻
          </div>
          <p className="relative z-10 text-[0.85rem] text-tq-dim">Your photo here</p>
          <div className="absolute bottom-5 right-5 z-20 bg-white rounded-[10px] px-3.5 py-2
            shadow-[0_8px_24px_rgba(0,0,0,0.1)] font-display text-[0.75rem] font-semibold text-ink
            flex items-center gap-1.5 animate-float">
            📍 {info.location}
          </div>
        </div>

        {/* Copy */}
        <div>
          <p className="reveal section-eyebrow">About me</p>
          <h2 className="reveal font-display font-bold text-ink tracking-[-0.025em] leading-[1.15]
            text-[clamp(1.8rem,3.5vw,2.6rem)] mb-14">
            {about.headline[0]}<br />{about.headline[1]}
          </h2>

          <div className="space-y-4 mb-8">
            {about.paragraphs.map((p, i) => (
              <p key={i} className={`reveal delay-${i + 1} text-[1rem] font-light text-ink-2 leading-[1.8]`}>
                {p}
              </p>
            ))}
          </div>

          <div className="reveal delay-3 flex flex-col gap-0">
            {about.values.map(({ icon, text }, i) => (
              <div key={i}
                className="flex items-center gap-3 text-[0.9rem] text-ink-2 py-2.5
                  border-b border-rule last:border-none
                  transition-all duration-200 cursor-default hover:text-ink hover:pl-1.5">
                <span className="w-5 text-center text-[0.9rem]">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
