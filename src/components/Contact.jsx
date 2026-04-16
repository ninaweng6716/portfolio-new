import { useEffect, useRef } from 'react'
import { info } from '../data/info'
import { contactData } from '../data/contact'

const COLORS = [
  'rgba(32,178,160,0.11)',
  'rgba(32,178,160,0.07)',
  'rgba(99,210,220,0.09)',
  'rgba(246,173,85,0.07)',
]

function makeBall(w, h) {
  const r = 40 + Math.random() * 90
  return {
    x: r + Math.random() * (w - r * 2),
    y: r + Math.random() * (h - r * 2),
    r,
    vx: (Math.random() - 0.5) * 0.7,
    vy: (Math.random() - 0.5) * 0.7,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    blur: 40 + Math.random() * 40,
  }
}

export default function Contact({ scrollY }) {
  const sectionRef = useRef(null)
  const canvasRef  = useRef(null)
  const ballsRef   = useRef([])
  const rafRef     = useRef(null)

  const parallaxOffset = sectionRef.current
    ? (scrollY - sectionRef.current.offsetTop) * 0.05
    : 0

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      ballsRef.current = Array.from({ length: 8 }, () =>
        makeBall(canvas.width, canvas.height)
      )
    }

    function loop() {
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)
      for (const b of ballsRef.current) {
        b.x += b.vx
        b.y += b.vy
        if (b.x - b.r < 0) { b.x = b.r;     b.vx *= -1 }
        if (b.x + b.r > w) { b.x = w - b.r; b.vx *= -1 }
        if (b.y - b.r < 0) { b.y = b.r;     b.vy *= -1 }
        if (b.y + b.r > h) { b.y = h - b.r; b.vy *= -1 }
        ctx.save()
        ctx.filter = `blur(${b.blur}px)`
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fillStyle = b.color
        ctx.fill()
        ctx.restore()
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-[12rem] px-[6vw] grid grid-cols-1 md:grid-cols-2 gap-20 items-center min-h-screen overflow-hidden"
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      {/* Animated background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Left copy */}
      <div className="relative" style={{ zIndex: 1 }}>
        <p className="section-eyebrow-wrapper reveal">Get in touch</p>
        <h2 className="reveal font-display font-bold text-ink tracking-[-0.025em] leading-[1.15]
          text-5xl mb-3.5">
          Let's build<br />something great.
        </h2>
        <p className="reveal delay-1 text-xl font-light text-ink-2 max-w-[36ch] leading-[1.7]">
          Open to freelance projects, full-time roles, and interesting conversations about the web.
        </p>
      </div>

      {/* Right links */}
      <div className="flex flex-col gap-5 relative" style={{ zIndex: 1 }}>
        {Object.entries(contactData).map(([key, value]) => (
          <a key={key}
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className={`reveal delay-${Object.keys(contactData).indexOf(key) + 1} group flex items-center gap-4 px-[1.375rem] py-[1.1rem]
              rounded-xl bg-tq text-white border border-tq no-underline
              transition-all duration-200 hover:bg-tq-dim hover:border-tq-dim hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(32,178,160,0.18)]`}>
            <div className="w-10 h-10 rounded-lg bg-tq/15 flex items-center justify-center text-base flex-shrink-0">
              {key === 'github' && '🐱'}
              {key === 'linkedin' && '💼'}
              {key === 'email' && '✉️'}
            </div>
            <div>
              <div className="font-display text-base font-semibold tracking-[0.08em] uppercase text-white/80 mb-0.5">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </div>
              <div className="text-sm font-light text-white/80">{value}</div>
            </div>
            <span className="ml-auto text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        ))}
      </div>
    </section>
  )
}