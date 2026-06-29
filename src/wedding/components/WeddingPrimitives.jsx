export function Ornament() {
  return (
    <div className="wedding-divider">
      <div className="wedding-divider-line" />
      <div className="wedding-divider-heart" />
      <div className="wedding-divider-line" />
    </div>
  )
}

export function SectionHeader({ label, heading }) {
  return (
    <>
      <h2
        className="wedding-h2"
      >
        {heading}
      </h2>
    </>
  )
}