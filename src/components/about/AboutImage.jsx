import { info } from "../../data/info"

export default function AboutImage() {
  return (
    <figure
      className="reveal group relative aspect-square rounded-2xl bg-tq-pale flex flex-col
      items-center justify-center gap-4 overflow-hidden transition-transform
      duration-400 hover:scale-[1.02]"
    >
      <img
        src={info.coolPic}
        alt={`${info.name} climbing`}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
      />

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <figcaption className="absolute bottom-16 left-4 right-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
        <p className="text-white/75 font-display text-sm font-semibold tracking-wide drop-shadow">
          Always wear a helmet.
        </p>
      </figcaption>

      <div
        aria-label={`Located in ${info.location}`}
        className="absolute bottom-5 right-5 z-20 bg-white rounded-[10px]
        px-3.5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.1)]
        font-display text-xs font-semibold text-ink
        flex items-center gap-1.5 animate-float"
      >
        <span aria-hidden="true">📍</span> {info.location}
      </div>
    </figure>
  )
}