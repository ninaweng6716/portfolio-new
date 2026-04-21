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
    setMounted(true)      // mount modal first
    setIsModalOpen(true)  // then animate open
  }

  const closeModal = () => {
    setIsModalOpen(false) // triggers close animation
  }

  const handleExited = () => {
    setMounted(false)     // unmount AFTER animation
  }

  return (
    <>
      <section id="projects" className="py-[6.5rem] px-[6vw] relative">
        <p className="section-eyebrow-wrapper reveal">Projects</p>
        <h2 className="section-heading reveal">Select works</h2>

        <Suspense fallback={null}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => (
              <ProjectCard
                key={p.name}
                project={p}
                delay={DELAYS[i]}
                onClick={openModal}
              />
            ))}
          </div>
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