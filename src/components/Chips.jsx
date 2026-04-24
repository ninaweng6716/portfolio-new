export default function Chips({ chips }) {
  return (
    <ul className="flex flex-wrap gap-1.5 mb-3 list-none" aria-label="Technologies used">
      {chips.map((c) => (
        <li key={c} className="chip">
          {c}
        </li>
      ))}
    </ul>
  )
}