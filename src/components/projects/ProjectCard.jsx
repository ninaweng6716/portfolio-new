import Chips from "../Chips"

export default function ProjectCard({ project, delay, onClick }) {
  const desc =
    project.desc.length > 150
      ? project.desc.slice(0, 120).trimEnd() + "…"
      : project.desc

  return (
    <article>
      <button
        className={`reveal ${delay} group flex flex-col w-full text-left bg-white rounded-[14px] border border-rule overflow-hidden
        cursor-pointer transition-all duration-300
        hover:-translate-y-1.5 hover:shadow-[0_18px_48px_rgba(0,0,0,0.08)] hover:border-tq/40
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tq focus-visible:ring-offset-2 focus-visible:-translate-y-1.5`}
        onClick={() => onClick(project)}
        aria-label={`View ${project.name} project — ${project.chips?.join(", ")}`}
      >
        <div className="relative h-[180px] overflow-hidden bg-black" aria-hidden="true">
          <img
            src={project.img}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col flex-1 px-[1.375rem] py-5">
          <Chips chips={project.chips} aria-hidden="true" />
          <p className="font-display font-bold text-ink text-xl mb-1.5" aria-hidden="true">
            {project.name}
          </p>
          <p className="section-text-sm flex-1" aria-hidden="true">{desc}</p>
        </div>
      </button>
    </article>
  )
}