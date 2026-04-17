import { SectionHeader } from "../components/WeddingPrimitives"

const DETAILS = [
  {
    icon: "♡",
    title: "Ceremony",
    main: "Dr. Sun Yat-Sen Garden",
    sub: "3:00 PM\nPlease be seated by 2:45",
    link: { label: "Get Directions", href: "#" },
  },
  {
    icon: "✦",
    title: "Reception",
    main: "Sun Sui Wah",
    sub: "5:00 PM — Midnight\nMain St., Vancouver",
    link: { label: "View Venue", href: "#" },
  },
  {
    icon: "✿",
    title: "Dress Code",
    main: "Cocktail Attire",
    sub: "Semi-formal encouraged.\nGarden-friendly footwear advised.",
  },
  {
    icon: "❀",
    title: "Wedding Colours",
    colors: ["#C2A2B3", "#867CA6", "#7C9EBA", "#9DBEC0", "#0D4E5D"],
    sub: "Feel free to incorporate these colors if you'd like to match",
  }
]

function DetailCard({ icon, title, main, sub, link, colors }) {
  return (
    <div className="bg-white border border-[#e8d8b4] p-8 text-center ">
      {/* Icon */}
      <div
        className="font-weddingBody text-[#c9a96e] mb-4 text-[clamp(1.4rem,3vw,1.8rem)]"
      >
        {icon}
      </div>

      {/* Label */}
      <h3 className="font-weddingDisplay text-[0.75rem] font-bold tracking-[0.35em] uppercase text-[#8a6e6e] mb-3">
        {title}
      </h3>

      {/* Venue / name */}
      {colors ? (
        <div className="flex justify-center gap-4 mb-3">
          {colors.map((color) => (
            <div
              key={color}
              className="w-10 h-10 rounded-full border border-[#e8d8b4] shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      ) : (
        <p className="font-weddingBody text-[#3d2c2c] leading-snug mb-2 text-[clamp(1.5rem,2.5vw,1.4rem)]">
          {main}
        </p>
      )}

      {/* Details */}
      <p className="text-base font-weddingBody text-[#8a6e6e] tracking-wide leading-relaxed whitespace-pre-line">
        {sub}
      </p>

      {/* Optional link */}
      {link && (
        <a
          href={link.href}
          className="font-weddingBody inline-block mt-4 text-[0.7rem] tracking-[0.2em] uppercase text-[#c9a96e] no-underline border-b border-[#e8d8b4] pb-0.5 transition-colors duration-200 hover:border-[#c9a96e]"
        >
          {link.label}
        </a>
      )}
    </div>
  )
}

export default function DetailsSection() {
  return (
    <section id="details" className="bg-[#f0e6de]">
      <div className="max-w-3xl mx-auto px-8 py-20">
        <SectionHeader
          label="Everything you need"
          heading={<>Wedding <em className="italic text-[#9e7b7b]">Details</em></>}
        />
        <div className="grid grid-cols-2 gap-8 mt-4 max-sm:grid-cols-1 items-stretch auto-rows-fr">
          {DETAILS.map(d => <DetailCard key={d.title} {...d} />)}
        </div>
      </div>
    </section>
  )
}