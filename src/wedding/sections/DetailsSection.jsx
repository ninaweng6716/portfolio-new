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
]

function DetailCard({ icon, title, main, sub, link }) {
  return (
    <div className="bg-white border border-[#e8d8b4] p-8 text-center">
      <div
        className="text-[1.8rem] text-[#c9a96e] mb-4 italic"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {icon}
      </div>
      <p className="text-[0.65rem] tracking-[0.35em] uppercase text-[#8a6e6e] mb-3">{title}</p>
      <p
        className="font-normal text-[#3d2c2c] text-[1.4rem] leading-snug mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {main}
      </p>
      <p className="text-sm text-[#8a6e6e] tracking-wide leading-relaxed whitespace-pre-line">{sub}</p>
      {link && (
        <a
          href={link.href}
          className="inline-block mt-4 text-[0.7rem] tracking-[0.2em] uppercase text-[#c9a96e] no-underline border-b border-[#e8d8b4] pb-0.5"
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
        <SectionHeader label="Everything you need" heading={<>Wedding <em className="italic text-[#9e7b7b]">Details</em></>} />
        <div className="grid grid-cols-2 gap-8 mt-4 max-sm:grid-cols-1">
          {DETAILS.map(d => <DetailCard key={d.title} {...d} />)}
        </div>
      </div>
    </section>
  )
}
