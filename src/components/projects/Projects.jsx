import { useState, lazy, Suspense } from "react"
import { projects } from "../../data/projects"

const ProjectCard = lazy(() => import("./ProjectCard"))
const ProjectModal = lazy(() => import("./ProjectModal"))

const DELAYS = ["", "delay-1", "delay-2"]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const openModal = (project) => {
    setSelectedProject(project)
    setMounted(true)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleExited = () => {
    setMounted(false)
  }

  return (
    <>
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="py-[6.5rem] px-[6vw] relative"
      >
        <p className="section-eyebrow-wrapper reveal" aria-hidden="true">Projects</p>
        <h2 id="projects-heading" className="section-heading reveal">Select works</h2>

        <Suspense
          fallback={
            <p role="status" aria-live="polite" className="section-text-sm">
              Loading projects…
            </p>
          }
        >
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none">
            {projects.map((p, i) => (
              <li key={p.name}>
                <ProjectCard
                  project={p}
                  delay={DELAYS[i]}
                  onClick={openModal}
                />
              </li>
            ))}
          </ul>
        </Suspense>
      </section>

      <Suspense fallback={null}>
        {mounted && (
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={closeModal}
            onExited={handleExited}
          />
        )}
      </Suspense>
    </>
  )
}