import { useState } from 'react'
import { projects } from '../data/projects'

function ProjectCard({ project, delay, onClick }) {
  return (
    <div className={`reveal ${delay} group flex flex-col bg-white rounded-[14px] border border-rule overflow-hidden
      cursor-pointer transition-all duration-250
      hover:-translate-y-1.5 hover:shadow-[0_18px_48px_rgba(0,0,0,0.08)] hover:border-tq/40`}
      onClick={() => onClick(project)}>

      {/* Thumbnail */}
      <div className="relative h-[180px] flex items-center justify-center text-3xl overflow-hidden flex-shrink-0"
        style={{ background: project.bg }}>
        {project.emoji}
        {/* Shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {/* Hover reveal */}
        <div className="absolute inset-0 flex items-center justify-center
          bg-tq/80 opacity-0 transition-opacity duration-250 group-hover:opacity-100
          font-display text-sm font-semibold tracking-[0.05em] text-white">
          View
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-[1.375rem] py-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.chips.map((c) => (
            <span key={c} className="text-xs px-2 py-[0.2rem] rounded bg-tq-pale text-tq-dim">{c}</span>
          ))}
        </div>
        <div className="font-display font-bold text-ink text-xl tracking-[-0.01em] mb-1.5">{project.name}</div>
        <p className="text-base text-ink-2 leading-[1.6] font-light flex-1">{project.desc}</p>
      </div>
    </div>
  )
}

function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-[20px] max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="relative h-[200px] flex items-center justify-center text-6xl overflow-hidden flex-shrink-0"
          style={{ background: project.bg }}>
          {project.emoji}
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-6 h-6 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white text-sm font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.chips.map((c) => (
              <span key={c} className="text-sm px-3 py-1 rounded-full bg-tq-pale text-tq-dim font-medium">{c}</span>
            ))}
          </div>
          
          <h3 className="font-display font-bold text-ink text-2xl tracking-[-0.02em] mb-2">{project.name}</h3>
          <p className="text-ink-2 leading-relaxed mb-6 text-lg">{project.desc}</p>
          
          <div className="flex items-center justify-between">
            <a 
              href={project.href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-tq text-white rounded-lg font-semibold hover:bg-tq/90 transition-colors"
            >
              See Demo <span>→</span>
            </a>
            <span className="text-ink-3 font-medium">{project.year}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const delays = ['', 'delay-1', 'delay-2']

  const openModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <>
      <section id="projects" className="py-[6.5rem] px-[6vw] relative">
        <p className="section-eyebrow-wrapper reveal">Selected work</p>
        <h2 className="reveal font-display font-bold text-ink tracking-[-0.025em] leading-[1.15]
          text-[clamp(1.8rem,3.5vw,2.6rem)] mb-14">
          Things I've built.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} delay={delays[i]} onClick={openModal} />
          ))}
        </div>
      </section>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  )
}
