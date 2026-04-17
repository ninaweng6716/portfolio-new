import { SectionHeader } from "../components/WeddingPrimitives"

const PHOTOS = [
  "Engagement Photo",
  "The Proposal",
  "Our Adventure",
  "Together",
  "In Love",
]

function GalleryPlaceholder({ label, featured = false }) {
  return (
    <div
      className={`bg-[#f0e6de] border border-[#e8d8b4] overflow-hidden relative ${
        featured ? "col-span-2 row-span-2" : ""
      }`}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ paddingTop: featured ? "60%" : "75%" }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <span
            className="italic text-[#c9a0a0] opacity-50 text-[1.6rem]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            ✿
          </span>
          <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[#8a6e6e] opacity-60">
            {label}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function GallerySection() {
  return (
    <section id="gallery" className="bg-[#faf7f2]">
      <div className="max-w-3xl mx-auto px-8 py-20">
        <SectionHeader label="Memories" heading={<>Our <em className="italic text-[#9e7b7b]">Gallery</em></>} />
        <div className="grid grid-cols-3 gap-3 mt-4 max-[480px]:grid-cols-2">
          {PHOTOS.map((label, i) => (
            <GalleryPlaceholder key={label} label={label} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
