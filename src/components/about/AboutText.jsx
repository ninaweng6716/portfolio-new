import { about } from "../../data/about"

export default function AboutText() {
  return (
    <div>
      <p className="section-eyebrow-wrapper reveal">About me</p>

      <h2 className="section-heading reveal">
        {about.headline[0]}
        <br />
        {about.headline[1]}
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
    </div>
  )
}