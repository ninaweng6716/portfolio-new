import { info } from "../../data/info"

export default function AboutImage() {
  return (
    <div
      className="reveal relative aspect-square rounded-2xl bg-tq-pale flex flex-col
      items-center justify-center gap-4 overflow-hidden transition-transform
      duration-400 hover:scale-[1.02]"
    >
      <img
        src={info.coolPic}
        alt={info.name}
        loading="lazy"
        className="w-full h-full object-cover"
      />

      <div
        className="absolute bottom-5 right-5 z-20 bg-white rounded-[10px]
        px-3.5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.1)]
        font-display text-xs font-semibold text-ink
        flex items-center gap-1.5 animate-float"
      >
        📍 {info.location}
      </div>
    </div>
  )
}