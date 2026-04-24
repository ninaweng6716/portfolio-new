import { about } from "../../data/about"

export default function AboutText() {
  return (
    <section aria-labelledby="about-heading">
      <p className="section-eyebrow-wrapper reveal" aria-hidden="true">About me</p>

      <h2 id="about-heading" className="section-heading reveal">
        {about.headline[0]} {about.headline[1]}
      </h2>

      <div className="space-y-4 mb-8">
        {about.paragraphs.map((paragraph, i) => (
          <p
            key={paragraph.id}
            className={`reveal delay-${i + 1} section-text`}
          >
            {paragraph.text}
          </p>
        ))}
      </div>
    </section>
  )
}