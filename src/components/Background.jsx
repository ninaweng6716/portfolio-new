import { useEffect, useRef, useState } from 'react'
import { init as initHelpers } from './weather/helpers'
import { Sun } from './weather/Sun'
import { CartoonyCloud, StormCloud } from './weather/Cloud'
import { CartoonyRain } from './weather/Rain'
import { CartoonySnow } from './weather/Snow'
import { FogWisp, Lightning } from './weather/FogLightning'

// ─── Weather code → condition string ──────────────────────────────────────────

function parseWeatherCode(code) {
  if ([0, 1].includes(code)) return 'clear'
  if ([2, 3].includes(code)) return 'clouds'
  if ([45, 48].includes(code)) return 'fog'
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rain'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow'
  if ([95, 96, 99].includes(code)) return 'thunderstorm'
  return 'clear'
}

// ─── Background gradient per condition ────────────────────────────────────────

function buildGradient(ctx, canvas, type) {
  const g = ctx.createLinearGradient(0, 0, 0, canvas.height)
  if (type === 'clear') {
    g.addColorStop(0, '#5ab0f0')
    g.addColorStop(0.5, '#90d0ff')
    g.addColorStop(1, '#fde9b4')
  } else if (type === 'rain') {
    g.addColorStop(0, '#4a5c6e')
    g.addColorStop(1, '#2a3c48')
  } else if (type === 'snow') {
    g.addColorStop(0, '#c8d8ee')
    g.addColorStop(1, '#e8eef8')
  } else if (type === 'thunderstorm') {
    g.addColorStop(0, '#252c35')
    g.addColorStop(0.6, '#384050')
    g.addColorStop(1, '#1a2028')
  } else if (type === 'fog') {
    g.addColorStop(0, '#aab4c0')
    g.addColorStop(1, '#c8d0da')
  } else {
    g.addColorStop(0, '#c0ccda')
    g.addColorStop(1, '#8898aa')
  }
  return g
}

// ─── Ground strip for clear / snow ────────────────────────────────────────────

function drawGround(ctx, canvas, type) {
  if (type === 'clear') {
    ctx.fillStyle = '#a8d88a'
    ctx.fillRect(0, canvas.height - 28, canvas.width, 28)
    ctx.fillStyle = '#88c870'
    ctx.fillRect(0, canvas.height - 28, canvas.width, 6)
  } else if (type === 'snow') {
    ctx.fillStyle = '#e4edf8'
    ctx.fillRect(0, canvas.height - 28, canvas.width, 28)
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.moveTo(0, canvas.height - 22)
    for (let x = 0; x <= canvas.width; x += 28) {
      ctx.quadraticCurveTo(x + 14, canvas.height - 32, x + 28, canvas.height - 22)
    }
    ctx.lineTo(canvas.width, canvas.height)
    ctx.lineTo(0, canvas.height)
    ctx.fill()
  }
}

// ─── Particle factory ──────────────────────────────────────────────────────────

function buildParticles(type, canvas) {
  const r = () => Math.random()
  if (type === 'clear') return [
    new Sun(canvas),
    ...Array.from({ length: 4 }, () => new CartoonyCloud(canvas, { opacity: 0.7, scale: 0.6 + r() * 0.3 })),
  ]
  if (type === 'clouds') return Array.from({ length: 7 }, () => new CartoonyCloud(canvas))
  if (type === 'fog') return [
    ...Array.from({ length: 18 }, () => new FogWisp(canvas)),
    ...Array.from({ length: 3 }, () => new CartoonyCloud(canvas, { opacity: 0.35, color: 'rgba(210,215,225,0.7)' })),
  ]
  if (type === 'rain') return [
    ...Array.from({ length: 5 }, () => new CartoonyCloud(canvas, { color: '#9aadbe', outline: '#6a8090', opacity: 0.9, y: r() * canvas.height * 0.25 + 20 })),
    ...Array.from({ length: 80 }, () => new CartoonyRain(canvas)),
  ]
  if (type === 'snow') return [
    ...Array.from({ length: 4 }, () => new CartoonyCloud(canvas, { color: '#e8eef5', outline: '#b8c8d8', opacity: 0.85, y: r() * canvas.height * 0.2 + 20 })),
    ...Array.from({ length: 55 }, () => new CartoonySnow(canvas)),
  ]
  if (type === 'thunderstorm') return [
    ...Array.from({ length: 6 }, () => new StormCloud(canvas, { y: r() * canvas.height * 0.3 + 10 })),
    ...Array.from({ length: 70 }, () => new CartoonyRain(canvas)),
    new Lightning(canvas),
  ]
  return []
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Background() {
  const weatherRef = useRef('clear')
  const canvasRef = useRef(null)
  const [weather, setWeather] = useState('clear')

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const locRes = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client')
        const locData = await locRes.json()
        const latitude = locData.latitude || 49.2827
        const longitude = locData.longitude || -123.1207

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        )
        const data = await weatherRes.json()
        setWeather(parseWeatherCode(data.current_weather.weathercode))
      } catch (err) {
        console.error('Failed to fetch weather:', err)
        setWeather('clear')
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => { weatherRef.current = weather }, [weather])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let animationId
    let particles = []
    let currentType = null
    let time = 0

    // Wire shared helpers to this canvas context
    initHelpers(ctx, () => time)

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const GROUND_TYPES = new Set(['clear', 'snow'])
    const isPrecip = (p) => p instanceof CartoonyRain || p instanceof CartoonySnow

    const animate = () => {
      time += 0.016
      const w = weatherRef.current

      if (w !== currentType) {
        particles = buildParticles(w, canvas)
        currentType = w
      }

      ctx.fillStyle = buildGradient(ctx, canvas, w)
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Render order: background elements → ground → precipitation
      for (const p of particles) if (!isPrecip(p)) { p.update(); p.draw() }
      if (GROUND_TYPES.has(w)) drawGround(ctx, canvas, w)
      for (const p of particles) if (isPrecip(p)) { p.update(); p.draw() }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
    />
  )
}