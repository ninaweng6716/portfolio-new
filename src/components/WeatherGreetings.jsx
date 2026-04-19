export default function WeatherGreeting({ weather }) {
  if (weather) {
    const { city, temp, description } = weather
    return (
      <p className="text-xs text-ink-2 tracking-wide">
        📍 Looks like you're in <span className="text-ink font-semibold">{city}</span>
        {' '}— {temp}°C and {description}.
      </p>
    )
  }

  return (
    <p className="text-xs text-ink-2 tracking-wide">
      🌤 Enable location in your browser and I can show you the weather where you are.
    </p>
  )
}