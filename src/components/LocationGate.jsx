import { useState } from 'react'
import { fetchWeather } from '../hooks/useWeather'
import ClimbingGyms from '../climbingGyms'

export default function LocationGate() {
  const [coords, setCoords] = useState(null)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError(true)
      return
    }

    setLoading(true)
    setError(false)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords
        setCoords({ lat, lng })

        fetchWeather(lat, lng)
          .then(setWeather)
          .finally(() => setLoading(false))
      },
      () => {
        setLoading(false)
        setError(true)
      }
    )
  }

  return (
    <div className="transition-all duration-500">
      {/* Button — fades out when loading or resolved */}
      <div
        aria-hidden={loading || !!coords}
        className={`transition-all duration-300 ${
          loading || coords ? 'opacity-0 pointer-events-none h-0 overflow-hidden' : 'opacity-100'
        }`}
      >
        <button
          onClick={requestLocation}
          disabled={loading}
          className="btn-gradient"
        >
          Enable local features ✨
        </button>
      </div>

      {/* Loading state */}
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`transition-all duration-300 section-text-sm ${
          loading ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden pointer-events-none'
        }`}
      >
        {loading ? 'Getting your location…' : ''}
      </p>

      {/* Error state */}
      {error && (
        <p role="alert" aria-live="assertive" className="section-text-sm">
          Unable to get your location. Please check your browser settings.
        </p>
      )}

      {/* Content — fades in when resolved */}
      <div
        className={`transition-all duration-500 ${
          coords ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {coords && (
          <ClimbingGyms lat={coords.lat} lng={coords.lng} />
        )}
      </div>
    </div>
  )
}