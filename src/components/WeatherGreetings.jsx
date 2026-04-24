export default function WeatherGreeting({ weather }) {
  if (!weather) return null

  const { city, temp, description } = weather

  return (
    <p className="section-text-sm" aria-live="polite" aria-atomic="true">
      <span aria-hidden="true">📍</span>
      {" "}Looks like you're in{" "}
      <span className="text-ink font-semibold">{city}</span>
      {" "}— {temp}°C and {description}.
    </p>
  )
}