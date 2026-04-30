import { Ornament } from "../components/WeddingPrimitives"

const CORNERS = [
  { cls: "top-8    left-8  border-t border-l", key: "tl" },
  { cls: "top-8    right-8 border-t border-r", key: "tr" },
  { cls: "bottom-8 left-8  border-b border-l", key: "bl" },
  { cls: "bottom-8 right-8 border-b border-r", key: "br" },
]

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-dvh flex flex-col items-center justify-center text-center relative px-8 py-24 overflow-hidden"
      style={{
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
      }}
    >
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-weddingPink-soft/55" />

      {/* Corner frames */}
      {CORNERS.map(({ cls, key }) => (
        <div key={key} className={`wedding-card-corner-light ${cls}`} />
      ))}

      {/* Frosted text card */}
      <div className="wedding-card-div-light">
        <p className="wedding-card-eyebrow-light">September 6</p>

        <div className="wedding-card-names-light">
          <span className="wedding-card-name-light">Jeff</span>
          <span className="wedding-card-amp-light">&amp;</span>
          <span className="wedding-card-name-light">Nina</span>
        </div>

        <Ornament />

        <p className="wedding-card-venue">
          Dr. Sun Yat-Sen Classical Chinese Garden &nbsp;·&nbsp; Sun Sui Wah (Main St.)
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="wedding-card-scroll">
        <div className="wedding-card-scroll-line" />
        <span className="font-weddingBody">Scroll</span>
      </div>
    </section>
  )
}