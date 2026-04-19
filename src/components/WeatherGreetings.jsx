import { useState, useEffect } from 'react'
import { fetchWeather } from '../hooks/useWeather'

export default function WeatherGreeting() {
  const [weather, setWeather] = useState(null)
  const [status, setStatus]   = useState('idle') // idle | loading | done | denied | error

  useEffect(() => {
    if (!navigator.geolocation) return
    setStatus('loading')
    fetchWeather()
      .then(data => { setWeather(data); setStatus('done') })
      .catch(err  => setStatus(err.code === 1 ? 'denied' : 'error'))
  }, [])

  if (status === 'loading') return (
    <p className="text-xs text-ink-2 tracking-wide animate-pulse">
      Detecting your location…
    </p>
  )

  if (status === 'done' && weather) {
    const { city, temp, description } = weather
    return (
      <p className="text-xs text-ink-2 tracking-wide">
        📍 Looks like you're in <span className="text-ink font-semibold">{city}</span>
        {' '}— {temp}°C and {description}.
      </p>
    )
  }

  if (status === 'denied' || status === 'error') return (
    <p className="text-xs text-ink-2 tracking-wide">
      🌤 Enable location in your browser and I can show you the weather where you are.
    </p>
  )

  return null
}