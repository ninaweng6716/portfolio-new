import { useState, useEffect } from 'react'
import { projects } from '../data/projects'

const DELAYS = ['', 'delay-1', 'delay-2']

function Chips({ chips, className = 'chip' }) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {chips.map((c) => (
        <span key={c} className={className}>{c}</span>
      ))}
    </div>
  )
}

function ProjectCard({ project, delay, onClick }) {
  const truncatedDesc = project.desc.length > 150
    ? project.desc.slice(0, 120).trimEnd() + '…'
    : project.desc

  return (
    <div
      className={`reveal ${delay} group flex flex-col bg-white rounded-[14px] border border-rule overflow-hidden
        cursor-pointer transition-all duration-300
        hover:-translate-y-1.5 hover:shadow-[0_18px_48px_rgba(0,0,0,0.08)] hover:border-tq/40`}
      onClick={() => onClick(project)}
    >
      <div className="relative h-[180px] flex items-center justify-center text-3xl overflow-hidden flex-shrink-0"
        style={{ background: project.bg }}>
        {project.emoji}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center
          bg-tq/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100
          font-display text-sm font-semibold tracking-[0.05em] text-white">
          View
        </div>
      </div>

      <div className="flex flex-col flex-1 px-[1.375rem] py-5">
        <Chips chips={project.chips} />
        <div className="font-display font-bold text-ink text-xl tracking-[-0.01em] mb-1.5">{project.name}</div>
        <p className="text-base text-ink-2 leading-[1.6] font-light flex-1">{truncatedDesc}</p>
      </div>
    </div>
  )
}

function ProjectModal({ project, isOpen, onClose }) {
  const [visible, setVisible] = useState(false)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setRendered(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    } else {
      setVisible(false)
      const t = setTimeout(() => setRendered(false), 300)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  if (!rendered || !project) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300
      ${visible ? 'opacity-100' : 'opacity-0'}`}>

      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className={`relative bg-white rounded-[20px] max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl
        transition-all duration-300
        ${visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>

        <div className="relative h-[200px] flex items-center justify-center text-6xl overflow-hidden flex-shrink-0"
          style={{ background: project.bg }}>
          {project.emoji}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-6 h-6 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white text-sm font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-8">
          <Chips chips={project.chips} className="text-sm px-3 py-1 rounded-full bg-tq-pale text-tq-dim font-medium" />
          <h3 className="font-display font-bold text-ink text-2xl tracking-[-0.02em] mb-2">{project.name}</h3>
          <p className="text-ink-2 leading-relaxed mb-6 text-lg">{project.desc}</p>
          <a href={project.href} className="btn-solid">See Demo <span>→</span></a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal  = (project) => { setSelectedProject(project); setIsModalOpen(true) }
  const closeModal = () => { setIsModalOpen(false); setTimeout(() => setSelectedProject(null), 300) }

  return (
    <>
      <section id="projects" className="py-[6.5rem] px-[6vw] relative">
        <p className="section-eyebrow-wrapper reveal">Selected work</p>
        <h2 className="section-heading reveal">Things I've built.</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} delay={DELAYS[i]} onClick={openModal} />
          ))}
        </div>
      </section>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}