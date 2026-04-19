import { info } from '../data/info'
import { skills } from '../data/skills'
import WeatherGreeting from './WeatherGreetings'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-dvh pt-[calc(60px+10rem)] pb-32 px-[6vw]
        grid grid-cols-1 md:grid-cols-2 items-center gap-16"
    >

      {/* ── Left copy ── */}
      <div className="hero-left relative z-1">

        {/* Badge row — avatar sits here on mobile */}
        <div className="flex items-center gap-3 mb-7">
          {/* Avatar: visible only on mobile */}
          <img
            src={info.pic}
            alt={info.name}
            className="md:hidden w-20 h-20 rounded-full object-cover ring-2 ring-tq-pale
              shadow-[0_2px_12px_rgba(0,0,0,0.10)]"
          />

          {info.available && (
            <div className="inline-flex items-center gap-2 bg-tq-pale text-tq-dim
              font-display text-xs font-semibold tracking-[0.1em] uppercase
              px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-tq animate-blink" />
              Available for work
            </div>
          )}
        </div>

        <h1 className="font-display font-bold text-ink leading-[1.05] tracking-[-0.03em]
          text-5xl mb-5">
          Front-end developer.<br />
          <span className="text-tq">Detail-first.</span>
        </h1>

        <p className="section-text">
          I craft fast, accessible, and beautiful interfaces — translating ideas into
          polished web experiences that users actually enjoy.
        </p>

        <div className="flex flex-wrap gap-4 items-center">
          <a href="#projects" className="btn-solid">See my work</a>
          <a href="#contact" className="btn-outline">Let's talk</a>
        </div>

        <div className="mt-5 section-text">
          <WeatherGreeting />
        </div>
      </div>

      {/* ── Right card — desktop only ── */}
      <div className="hidden md:flex justify-end items-center relative z-1">
        <div className="bg-white rounded-2xl border border-rule overflow-hidden
          shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-400 max-w-[400px]
          hover:-translate-y-1.5 hover:rotate-[0.4deg] hover:shadow-[0_32px_80px_rgba(0,0,0,0.1)]">

          <div className="relative aspect-square bg-tq-pale overflow-hidden">
            <img
              src={info.pic}
              alt={info.name}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="px-6 py-5">
            <div className="font-display font-bold text-ink text-lg mb-0.5">{info.name}</div>
            <div className="text-sm text-tq-dim tracking-[0.03em] mb-4">{info.role}</div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      

    </section>
  )
}