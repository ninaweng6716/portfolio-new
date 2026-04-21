import { useEffect } from "react"
import Chips from "../Chips"

export default function ProjectModal({ project, isOpen, onClose }) {

  // 🔒 Prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    // cleanup if component unmounts
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative bg-white rounded-[20px] m-4 max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl
          transition-all duration-300
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
      >
        <div className="relative h-[200px] flex-shrink-0 overflow-hidden rounded-t-[20px]">
          <img
            src={project.img}
            alt={project.name}
            loading="lazy"
            className="w-full h-full object-contain p-6 rounded-t-[20px] bg-black"
          />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-6 h-6 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white text-sm font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto pt-6 pb-8 px-6">
          <Chips chips={project.chips} />
          <h3 className="h3-portfolio">{project.name}</h3>
          <p className="text-ink-2 leading-relaxed mb-6 text-lg">
            {project.desc}
          </p>

          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid"
          >
            See Demo <span>→</span>
          </a>
        </div>
      </div>
    </div>
  )
}