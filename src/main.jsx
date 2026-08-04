import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './fonts.css'
import { LocationProvider } from "./context/LocationContext"

let appHeightFrame = null

const setAppHeight = () => {
  if (appHeightFrame) {
    cancelAnimationFrame(appHeightFrame)
  }

  appHeightFrame = requestAnimationFrame(() => {
    const height = window.visualViewport?.height ?? window.innerHeight ?? 0
    const offsetTop = window.visualViewport?.offsetTop ?? 0
    const safeHeight = Math.max(height - offsetTop, 0)
    document.documentElement.style.setProperty('--app-height', `${safeHeight}px`)
  })
}

setAppHeight()
window.addEventListener('resize', setAppHeight)
window.addEventListener('orientationchange', setAppHeight)
window.visualViewport?.addEventListener('resize', setAppHeight)
window.visualViewport?.addEventListener('scroll', setAppHeight, { passive: true })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LocationProvider>
      <App />
    </LocationProvider>
  </React.StrictMode>
)
