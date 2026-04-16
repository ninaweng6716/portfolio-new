import { useEffect, useRef } from 'react'
import { info } from '../data/info'
import { skills } from '../data/skills'

export default function Hero({ scrollY }) {
  const sectionRef = useRef(null)

  const parallaxOffset = sectionRef.current ? (scrollY - sectionRef.current.offsetTop) * 0.5 : 0

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen pt-[calc(60px+10rem)] pb-32 px-[6vw]
        grid grid-cols-1 md:grid-cols-2 items-center gap-16 overflow-hidden"
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      {/* Background glow */}
      <div className="absolute -top-1/5 -right-[10%] w-[640px] h-[640px] rounded-full pointer-events-none
        bg-[radial-gradient(circle,rgba(32,178,160,0.09)_0%,transparent_65%)] animate-drift" />

      {/* ── Left copy ── */}
      <div className="hero-left">
        {/* Available chip */}
        {info.available && (
          <div className="inline-flex items-center gap-2 bg-tq-pale text-tq-dim
            font-display text-xs font-semibold tracking-[0.1em] uppercase
            px-3.5 py-1.5 rounded-full mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-tq animate-blink" />
            Available for work
          </div>
        )}

        <h1 className="font-display font-bold text-ink leading-[1.05] tracking-[-0.03em]
          text-7xl mb-5">
          Front-end developer.<br />
          <span className="text-tq">Detail-first.</span>
        </h1>

        <p className="text-xl font-light text-ink-2 leading-[1.75] max-w-[38ch] mb-9">
          I craft fast, accessible, and beautiful interfaces — translating ideas into
          polished web experiences that users actually enjoy.
        </p>

        <div className="flex flex-wrap gap-3.5 items-center">
          <a href="#projects" className="btn-solid">See my work</a>
          <a href="#contact" className="btn-outline">Let's talk</a>
        </div>
      </div>

      {/* ── Right card ── */}
      <div className="hidden md:flex justify-end items-center">
        <div className="w-full max-w-[360px] bg-white rounded-2xl border border-rule overflow-hidden
          shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-400
          hover:-translate-y-1.5 hover:rotate-[0.4deg] hover:shadow-[0_32px_80px_rgba(0,0,0,0.1)]">

          {/* Card header */}
          <div className="relative h-40 bg-tq-pale flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0"
              style={{ background: 'repeating-linear-gradient(45deg,transparent,transparent 12px,rgba(32,178,160,0.06) 12px,rgba(32,178,160,0.06) 13px)' }} />
            <div className="relative z-10 w-20 h-20 rounded-full bg-tq flex items-center justify-center
              font-display text-2xl font-bold text-white shadow-[0_0_0_6px_rgba(32,178,160,0.18)]">
              {info.initials}
            </div>
          </div>

          {/* Card body */}
          <div className="px-6 py-5">
            <div className="font-display font-bold text-ink text-lg mb-0.5">{info.name}</div>
            <div className="text-sm text-tq-dim tracking-[0.03em] mb-4">{info.role}</div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded bg-tq-pale text-tq-dim">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
