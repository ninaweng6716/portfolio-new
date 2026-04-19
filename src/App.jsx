import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PortfolioLayout from './layouts/PortfolioLayout'
import WeddingLayout from './wedding/layouts/WeddingLayout'
import Home from './pages/Home'
import Wedding from './wedding/pages/Wedding'
import LoadingScreen from './components/LoadingScreen'
import { fetchWeather } from './hooks/useWeather'

export default function App() {
  const [weather, setWeather]   = useState(null)
  const [ready, setReady]       = useState(false)

  useEffect(() => {
    if (!navigator.geolocation) { setReady(true); return }

    const timeout = setTimeout(() => setReady(true), 20000)

    fetchWeather()
      .then(data  => setWeather(data))
      .catch(()   => {}) // fallback handled in WeatherGreeting
      .finally(() => { clearTimeout(timeout); setReady(true) })

    return () => clearTimeout(timeout)
  }, [])

  return (
    <BrowserRouter>
      <LoadingScreen ready={ready} />
      <Routes>
        <Route element={<PortfolioLayout weather={weather} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<WeddingLayout />}>
          <Route path="/wedding" element={<Wedding />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}