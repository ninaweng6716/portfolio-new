import { useState } from 'react'
import { fetchWeather } from '../hooks/useWeather'
import ClimbingGyms from '../climbingGyms'

export default function LocationGate() {
  const [coords, setCoords] = useState(null)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)

  const requestLocation = () => {
    if (!navigator.geolocation) return

    setLoading(true)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords
        setCoords({ lat, lng })

        fetchWeather(lat, lng)
          .then(setWeather)
          .finally(() => setLoading(false))
      },
      () => setLoading(false)
    )
  }

  return (
    <>
      {!coords && (
        <button onClick={requestLocation} className="btn-gradient">
          Enable local features ✨
        </button>
      )}

      {loading && <p>Getting your location…</p>}

      {coords && (
        <ClimbingGyms lat={coords.lat} lng={coords.lng} />
      )}
    </>
  )
}