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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-ink focus:rounded-lg focus:shadow-lg">
        Skip to main content
      </a>
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