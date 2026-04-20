import { info } from '../data/info'
import { skills } from '../data/skills'
import { useOutletContext } from 'react-router-dom'
import WeatherGreeting from './WeatherGreetings'

const delay = (d) => ({ style: { animationDelay: d } })

export default function Hero() {
  const { weather } = useOutletContext()

  return (
    <section
      id="hero"
      className="relative min-h-dvh pt-[calc(60px+10rem)] pb-32 px-[6vw]
        grid grid-cols-1 md:grid-cols-2 items-center gap-16"
    >
      {/* Left copy */}
      <div className="relative z-1">

        <div className="hero-animate flex items-center gap-3 mb-7" {...delay('0.1s')}>
          <img
            src={info.pic}
            alt={info.name}
            className="md:hidden w-20 h-20 rounded-full object-cover ring-2 ring-tq-pale shadow-[0_2px_12px_rgba(0,0,0,0.10)]"
          />
          {info.available && (
            <div className="inline-flex items-center gap-2 bg-tq-pale text-tq-dim font-display text-xs font-semibold tracking-[0.1em] uppercase px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-tq animate-blink" />
              Available for work
            </div>
          )}
        </div>

        <h1 className="font-display font-bold leading-[1.05] tracking-[-0.03em] text-5xl mb-5">
          <span className="hero-animate block" {...delay('0.2s')}>
            <span className="text-ink">Front-end developer.</span>
          </span>
          <span className="hero-animate block" {...delay('0.35s')}>
            <span className="block bg-clip-text text-transparent gradient-brand">Detail-first.</span>
          </span>
        </h1>

        <p className="hero-animate section-text" {...delay('0.5s')}>
          Modern, high-performing websites with intentional micro-interactions and soft, curated gradients.
        </p>

        <div className="hero-animate flex flex-wrap gap-4 items-center" {...delay('0.65s')}>
          <a href="#projects" className="btn-solid">See my work</a>
          <a href="#contact" className="btn-outline">Let's talk</a>
        </div>

        <div className="hero-animate mt-5 section-text" {...delay('0.8s')}>
          <WeatherGreeting weather={weather} />
        </div>
      </div>

      {/* Right card — desktop only */}
      <div className="hidden md:flex justify-end items-center relative z-1">
        <div className="hero-animate" {...delay('0.4s')}>
          <div className="hero-card-float bg-white rounded-2xl border border-rule overflow-hidden max-w-[400px] shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            <div className="relative aspect-square bg-tq-pale overflow-hidden">
              <img src={info.pic} alt={info.name} className="object-cover w-full h-full" />
            </div>
            <div className="px-6 py-5">
              <div className="font-display font-bold text-ink text-lg mb-0.5">{info.name}</div>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => <span key={s} className="chip">{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}