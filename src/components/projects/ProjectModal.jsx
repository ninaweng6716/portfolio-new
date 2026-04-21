import { useEffect, useState } from "react"
import Chips from "../Chips"

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  onExited
}) {
  const [visible, setVisible] = useState(false)

  // OPEN animation trigger
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setVisible(true)
      })
    } else {
      setVisible(false)

      // wait for closing animation before unmount
      const timeout = setTimeout(() => {
        onExited?.()
      }, 300)

      return () => clearTimeout(timeout)
    }
  }, [isOpen, onExited])

  // lock body scroll while modal is visible
  useEffect(() => {
    if (!visible) return

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = "hidden"
    document.body.style.paddingRight = `${scrollBarWidth}px`

    return () => {
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
    }
  }, [visible])

  if (!project) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 overscroll-none transition-opacity duration-300
        ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className={`relative bg-white rounded-[20px] m-4 max-w-2xl w-full max-h-[90vh]
        flex flex-col shadow-2xl transition-all duration-300
        ${
          visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* IMAGE */}
        <div className="relative h-[200px] flex-shrink-0 overflow-hidden rounded-t-[20px]">
          <img
            src={project.img}
            alt={project.name}
            className="w-full h-full object-contain p-6 bg-black"
          />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-6 h-6 bg-black/40 hover:bg-black/60
            rounded-full flex items-center justify-center text-white text-sm
            font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
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