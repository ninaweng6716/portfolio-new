import { projects } from '../data/portfolio'

function ProjectCard({ project, delay }) {
  return (
    <div className={`reveal ${delay} group flex flex-col bg-white rounded-[14px] border border-rule overflow-hidden
      cursor-pointer transition-all duration-250
      hover:-translate-y-1.5 hover:shadow-[0_18px_48px_rgba(0,0,0,0.08)] hover:border-tq/40`}>

      {/* Thumbnail */}
      <div className="relative h-[180px] flex items-center justify-center text-[2.5rem] overflow-hidden flex-shrink-0"
        style={{ background: project.bg }}>
        {project.emoji}
        {/* Shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {/* Hover reveal */}
        <div className="absolute inset-0 flex items-center justify-center
          bg-tq/80 opacity-0 transition-opacity duration-250 group-hover:opacity-100
          font-display text-[0.85rem] font-semibold tracking-[0.05em] text-white">
          View project →
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-[1.375rem] py-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.chips.map((c) => (
            <span key={c} className="text-[0.68rem] px-2 py-[0.2rem] rounded bg-tq-pale text-tq-dim">{c}</span>
          ))}
        </div>
        <div className="font-display font-bold text-ink text-[1.15rem] tracking-[-0.01em] mb-1.5">{project.name}</div>
        <p className="text-[0.875rem] text-ink-2 leading-[1.6] font-light flex-1">{project.desc}</p>
      </div>

      {/* Footer */}
      <div className="px-[1.375rem] py-3.5 border-t border-rule flex items-center justify-between">
        <a href={project.href}
          className="font-display text-[0.78rem] font-semibold text-tq-dim no-underline
            inline-flex items-center gap-1.5 transition-all duration-200 hover:gap-2.5 hover:text-tq">
          Case study <span>→</span>
        </a>
        <span className="text-[0.75rem] text-ink-3">{project.year}</span>
      </div>
    </div>
  )
}

export default function Projects() {
  const delays = ['', 'delay-1', 'delay-2']

  return (
    <section id="projects" className="py-[6.5rem] px-[6vw] bg-bg">
      <p className="reveal section-eyebrow">Selected work</p>
      <h2 className="reveal font-display font-bold text-ink tracking-[-0.025em] leading-[1.15]
        text-[clamp(1.8rem,3.5vw,2.6rem)] mb-14">
        Things I've built.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} delay={delays[i]} />
        ))}
      </div>
    </section>
  )
}
