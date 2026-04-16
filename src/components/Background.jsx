import { useEffect, useRef, useState } from 'react'

export default function Background() {
    const weatherRef = useRef('clear')
    const canvasRef = useRef(null)
    const [weather, setWeather] = useState('clear') // default to clear

    useEffect(() => {
    const fetchWeather = async () => {
        try {
        // 1. Get user location (NO API KEY)
        const locRes = await fetch(
            'https://api.bigdatacloud.net/data/reverse-geocode-client'
        )
        const locData = await locRes.json()

        // BigDataCloud gives these directly
        const latitude = locData.latitude || 49.2827
        const longitude = locData.longitude || -123.1207

        // 2. Fetch weather from Open-Meteo
        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        )
        const data = await weatherRes.json()

        const weatherCode = data.current_weather.weathercode
        let condition = 'clear'

        if ([0, 1].includes(weatherCode)) condition = 'clear'
        else if ([2, 3].includes(weatherCode)) condition = 'clouds'
        else if ([45, 48].includes(weatherCode)) condition = 'fog'
        else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) condition = 'rain'
        else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) condition = 'snow'
        else if ([95, 96, 99].includes(weatherCode)) condition = 'thunderstorm'

        setWeather(condition)
        } catch (error) {
        console.error('Failed to fetch weather:', error)
        setWeather('fallback')
        }
    }

    fetchWeather()

    // update every 30 min
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)

    return () => clearInterval(interval)
    }, [])

    useEffect(() => {
    weatherRef.current = weather
    }, [weather])

    useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let animationId
    let particles = []
    let currentParticleType = null

    const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // -------------------------
    // Particle classes (same as yours)
    // -------------------------

    class RainDrop {
        constructor() {
        this.x = Math.random() * canvas.width
        this.y = -10
        this.speed = Math.random() * 5 + 5
        this.length = Math.random() * 20 + 10
        }
        update() {
        this.y += this.speed
        if (this.y > canvas.height) {
            this.y = -10
            this.x = Math.random() * canvas.width
        }
        }
        draw() {
        ctx.strokeStyle = 'rgba(173, 216, 230, 0.6)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x, this.y + this.length)
        ctx.stroke()
        }
    }

    class Snowflake {
        constructor() {
        this.x = Math.random() * canvas.width
        this.y = -10
        this.speed = Math.random() * 2 + 1
        this.size = Math.random() * 3 + 2
        this.wind = Math.random() * 0.5 - 0.25
        }
        update() {
        this.y += this.speed
        this.x += this.wind
        if (this.y > canvas.height) {
            this.y = -10
            this.x = Math.random() * canvas.width
        }
        }
        draw() {
        ctx.fillStyle = 'rgba(255,255,255,0.8)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        }
    }

    class Cloud {
        constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height * 0.4 + 50
        this.speed = Math.random() * 0.5 + 0.2
        this.size = Math.random() * 50 + 30
        this.opacity = Math.random() * 0.3 + 0.4
        }
        update() {
        this.x += this.speed
        if (this.x > canvas.width + 100) {
            this.x = -100
        }
        }
        draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        }
    }

    // -------------------------
    // Particle initializer
    // -------------------------
    const initParticles = (type) => {
        particles = []

        if (type === 'rain') {
        for (let i = 0; i < 100; i++) particles.push(new RainDrop())
        } else if (type === 'snow') {
        for (let i = 0; i < 50; i++) particles.push(new Snowflake())
        } else if (type === 'clouds' || type === 'fog') {
        for (let i = 0; i < 12; i++) particles.push(new Cloud())
        }

        currentParticleType = type
    }

    // -------------------------
    // Animation loop
    // -------------------------
    const animate = () => {
        const weather = weatherRef.current

        // only update particles when needed
        if (weather !== currentParticleType) {
        initParticles(weather)
        }

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)

        if (weather === 'clear') {
        gradient.addColorStop(0, '#87CEEB')
        gradient.addColorStop(1, '#FFF8DC')
        } else if (weather === 'rain') {
        gradient.addColorStop(0, '#708090')
        gradient.addColorStop(1, '#2F4F4F')
        } else if (weather === 'snow') {
        gradient.addColorStop(0, '#F0F8FF')
        gradient.addColorStop(1, '#E6E6FA')
        } else {
        gradient.addColorStop(0, '#D3D3D3')
        gradient.addColorStop(1, '#A9A9A9')
        }

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        particles.forEach(p => {
        p.update()
        p.draw()
        })

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
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1
        }}
        />
    )
}