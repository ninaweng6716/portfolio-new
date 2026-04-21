import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PortfolioLayout from './layouts/PortfolioLayout'
import WeddingLayout from './wedding/layouts/WeddingLayout'

import Home from './pages/Home'
import Wedding from './wedding/pages/Wedding'
import LoadingScreen from './components/LoadingScreen'

import { fetchWeather } from './hooks/useWeather'
import { useLocation } from './context/LocationContext'

export default function App() {
  const { coords, loading } = useLocation()

  const [weather, setWeather] = useState(null)
  const [ready, setReady] = useState(false)

  /* Fetch weather ONLY after user allows location */
  useEffect(() => {
    if (!coords) {
      setReady(true)
      return
    }

    fetchWeather(coords.lat, coords.lng)
      .then(setWeather)
      .catch(() => {})
      .finally(() => setReady(true))
  }, [coords])

  return (
    <BrowserRouter>
      <LoadingScreen ready={ready && !loading} />

      <Routes>
        <Route
          element={<PortfolioLayout weather={weather} coords={coords} />}
        >
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<WeddingLayout />}>
          <Route path="/wedding" element={<Wedding />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}