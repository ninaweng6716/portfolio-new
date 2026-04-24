import { useEffect, useState, useRef } from "react"
import Chips from "../Chips"

export default function ProjectModal({ project, isOpen, onClose, onExited }) {
  const [visible, setVisible] = useState(false)
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)

  // OPEN animation trigger
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement
      requestAnimationFrame(() => {
        setVisible(true)
        closeButtonRef.current?.focus()
      })
    } else {
      setVisible(false)
      previousFocusRef.current?.focus()

      const timeout = setTimeout(() => {
        onExited?.()
      }, 300)

      return () => clearTimeout(timeout)
    }
  }, [isOpen, onExited])

  // lock body scroll while modal is visible
  useEffect(() => {
    if (!visible) return
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = "hidden"
    document.body.style.paddingRight = `${scrollBarWidth}px`
    return () => {
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
    }
  }, [visible])

  // Escape to close + focus trap
  useEffect(() => {
    if (!visible) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose()
        return
      }

      if (e.key === "Tab") {
        const modal = document.getElementById("project-modal")
        const focusable = modal?.querySelectorAll(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable?.length) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [visible, onClose])

  if (!project) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 overscroll-none transition-opacity duration-300
        ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      aria-hidden={!visible}
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* MODAL */}
      <div
        id="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative bg-white rounded-[20px] m-4 max-w-2xl w-full max-h-[90vh]
        flex flex-col shadow-2xl transition-all duration-300
        ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}
      >
        {/* IMAGE */}
        <div className="relative h-[200px] flex-shrink-0 overflow-hidden rounded-t-[20px]">
          <img
            src={project.img}
            alt={project.name}
            className="w-full h-full object-contain p-6 bg-black"
          />

          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 w-6 h-6 bg-black/40 hover:bg-black/60
            rounded-full flex items-center justify-center text-white text-sm
            font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        {/* CONTENT */}
        <div className="overflow-y-auto pt-6 pb-8 px-6">
          <Chips chips={project.chips} />
          <h3 id="modal-title" className="h3-portfolio">{project.name}</h3>

          <p className="text-ink-2 leading-relaxed mb-6 text-lg">
            {project.desc}
          </p>

          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`See demo for ${project.name}, opens in new tab`}
            className="btn-solid"
          >
            See Demo <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}