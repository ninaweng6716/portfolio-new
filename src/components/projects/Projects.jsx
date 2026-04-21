import { useState, lazy, Suspense } from "react"
import { projects } from "../../data/projects"

const ProjectCard = lazy(() => import("./ProjectCard"))
const ProjectModal = lazy(() => import("./ProjectModal"))

const DELAYS = ["", "delay-1", "delay-2"]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(projects[0])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <section id="projects" className="py-[6.5rem] px-[6vw] relative">
        <p className="section-eyebrow-wrapper reveal">Selected work</p>
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
        {isModalOpen && (
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </Suspense>
    </>
  )
}