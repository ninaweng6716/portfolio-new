export default function WeatherGreeting({ weather }) {
  if (!weather) return null

  const { city, temp, description } = weather

  return (
    <p className="section-text-sm">
      📍 Looks like you're in{" "}
      <span className="text-ink font-semibold">{city}</span>
      {" "}— {temp}°C and {description}.
    </p>
  )
}