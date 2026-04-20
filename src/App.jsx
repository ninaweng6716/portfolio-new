import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PortfolioLayout from './layouts/PortfolioLayout'
import WeddingLayout from './wedding/layouts/WeddingLayout'
import Home from './pages/Home'
import Wedding from './wedding/pages/Wedding'
import LoadingScreen from './components/LoadingScreen'
import { fetchWeather } from './hooks/useWeather'

export default function App() {
  const [weather, setWeather] = useState(null)
  const [coords, setCoords]   = useState(null)
  const [ready, setReady]     = useState(false)

  useEffect(() => {
    const hardTimeout = setTimeout(() => setReady(true), 5000)

    if (!navigator.geolocation) {
      clearTimeout(hardTimeout)
      setReady(true)
      return
    }

    const timeout = setTimeout(() => setReady(true), 20000)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords
        setCoords({ lat, lng })
        fetchWeather(lat, lng)
          .then(data => setWeather(data))
          .catch(()  => {})
          .finally(() => {
            clearTimeout(timeout)
            clearTimeout(hardTimeout)
            setReady(true)
          })
      },
      () => {
        clearTimeout(timeout)
        clearTimeout(hardTimeout)
        setReady(true)
      },
      { timeout: 6000 }
    )

    return () => { clearTimeout(timeout); clearTimeout(hardTimeout) }
  }, [])

  return (
    <BrowserRouter>
      <LoadingScreen ready={ready} />
      <Routes>
        <Route element={<PortfolioLayout weather={weather} coords={coords} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<WeddingLayout />}>
          <Route path="/wedding" element={<Wedding />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}