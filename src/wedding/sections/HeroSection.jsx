import { useEffect, useState } from "react"
import { Ornament } from "../components/WeddingPrimitives"

// Floating petal config
const PETALS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left:     `${8 + (i * 7.3) % 84}%`,
  delay:    `${(i * 1.1) % 6}s`,
  duration: `${7 + (i * 0.7) % 5}s`,
  size:     `${0.5 + (i * 0.15) % 0.7}rem`,
  symbol:   i % 3 === 0 ? "✿" : i % 3 === 1 ? "·" : "✦",
}))

export default function HeroSection() {
  const [ready, setReady] = useState(false)

  // Stagger in after mount so entrance animation feels intentional
  useEffect(() => { setReady(true) }, [])

  return (
    <>
      <style>{`
        @keyframes petalDrift {
          0%   { transform: translateY(-10px) rotate(0deg);   opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes cornerPulse {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.5; }
        }
        @keyframes scrollBob {
          0%, 100% { transform: translateY(0); opacity: 0.95; }
          50%      { transform: translateY(7px); opacity: 0.6; }
        }
      `}</style>

      <div className="relative isolate overflow-hidden">
        <img
          src="/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 z-0 w-full h-full object-cover object-center"
          style={{
            transform: "none",
            willChange: "auto",
          }}
        />
        <section
          id="hero"
          aria-label="Wedding announcement"
          className="relative z-10 min-h-[clamp(40rem,85svh,56rem)] sm:min-h-[100vh] flex flex-col items-center justify-center text-center px-8 py-24"
        >
        <div className="absolute inset-0 z-[1] bg-weddingPink-soft/55" aria-hidden="true" />

        {/* Floating petals */}
        {ready && PETALS.map(({ id, left, delay, duration, size, symbol }) => (
          <span
            key={id}
            aria-hidden="true"
            className="absolute top-0 pointer-events-none text-weddingTq select-none"
            style={{
              left,
              fontSize: size,
              animation: `petalDrift ${duration} ${delay} infinite linear`,
              opacity: 0,
            }}
          >
            {symbol}
          </span>
        ))}

        {/* Frosted text card — mouse tilt */}
        <div className="relative z-[2] wedding-card-div-light">
          <p className="wedding-card-eyebrow-light">
            <time dateTime="2026-09-06">September 6, 2026</time>
          </p>

          <div className="wedding-card-names-light" aria-label="Jeff and Nina">
            <span className="wedding-card-name-light" aria-hidden="true">Jeff</span>
            <span className="wedding-card-amp-light"  aria-hidden="true">&amp;</span>
            <span className="wedding-card-name-light" aria-hidden="true">Nina</span>
          </div>

          <Ornament />

          <div className="wedding-card-venue flex flex-col gap-4 text-sm">
            <p>Celebrate our special day with us.</p>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 z-[2] flex flex-col items-center pb-6 wedding-card-scroll"
          aria-hidden="true"
          style={{ animation: "scrollBob 2s ease-in-out infinite" }}
        >
          <div className="wedding-card-scroll-line" />
          <span className="font-weddingBody text-[0.9rem] font-semibold tracking-[0.36em] uppercase text-weddingPrint/60 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            Scroll
          </span>
          <span className="mt-2 text-[1rem] text-weddingPrint/60 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">⌄</span>
        </div>

        </section>
      </div>
    </>
  )
}