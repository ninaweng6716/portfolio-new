import { useState, useEffect, useRef } from "react"
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

function useTilt(ref) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width  / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      setTilt({ x: dy * -4, y: dx * 4 })   // max ±4deg
    }

    const handleLeave = () => setTilt({ x: 0, y: 0 })

    el.addEventListener("mousemove", handleMove)
    el.addEventListener("mouseleave", handleLeave)
    return () => {
      el.removeEventListener("mousemove", handleMove)
      el.removeEventListener("mouseleave", handleLeave)
    }
  }, [ref])

  return tilt
}

export default function HeroSection() {
  const cardRef  = useRef(null)
  const tilt     = useTilt(cardRef)
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
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
      `}</style>

      <section
        id="hero"
        aria-label="Wedding announcement"
        className="min-h-dvh flex flex-col items-center justify-center text-center relative px-8 py-24 overflow-hidden"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-weddingPink-soft/55" aria-hidden="true" />

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
        <div
          ref={cardRef}
          className="wedding-card-div-light transition-transform duration-200 ease-out"
          style={{
            transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          <p className="wedding-card-eyebrow-light">
            <time dateTime="2026-09-06">September 6, 2026</time>
          </p>

          <div className="wedding-card-names-light" aria-label="Jeff and Nina">
            <span className="wedding-card-name-light" aria-hidden="true">Jeff</span>
            <span className="wedding-card-amp-light"  aria-hidden="true">&amp;</span>
            <span className="wedding-card-name-light" aria-hidden="true">Nina</span>
          </div>

          <Ornament />

          <p className="wedding-card-venue">
            Dr. Sun Yat-Sen Classical Chinese Garden &nbsp;·&nbsp; Sun Sui Wah (Main St.)
          </p>
        </div>

        {/* Scroll indicator — bobs up and down */}
        <div
          className="wedding-card-scroll"
          aria-hidden="true"
          style={{ animation: "scrollBob 2s ease-in-out infinite" }}
        >
          <div className="wedding-card-scroll-line" />
          <span className="font-weddingBody">Scroll</span>
        </div>

      </section>
    </>
  )
}