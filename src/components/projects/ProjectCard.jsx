import Chips from "../Chips"

export default function ProjectCard({ project, delay, onClick }) {
  const desc =
    project.desc.length > 150
      ? project.desc.slice(0, 120).trimEnd() + "…"
      : project.desc

  return (
    <div
      className={`reveal ${delay} group flex flex-col bg-white rounded-[14px] border border-rule overflow-hidden
      cursor-pointer transition-all duration-300
      hover:-translate-y-1.5 hover:shadow-[0_18px_48px_rgba(0,0,0,0.08)] hover:border-tq/40`}
      onClick={() => onClick(project)}
    >
      <div className="relative h-[180px] overflow-hidden bg-black">
        <img
          src={project.img}
          alt={project.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-1 px-[1.375rem] py-5">
        <Chips chips={project.chips} />
        <div className="font-display font-bold text-ink text-xl mb-1.5">
          {project.name}
        </div>
        <p className="section-text-sm flex-1">{desc}</p>
      </div>
    </div>
  )
}