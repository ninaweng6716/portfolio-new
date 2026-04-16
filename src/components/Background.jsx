import { useEffect, useRef } from "react"

const COLORS = [
  // --- Original Aqua / Teal Core ---
  ["#CFFAFE", "#99F6E4"],
  ["#99F6E4", "#5EEAD4"],
  ["#5EEAD4", "#2DD4BF"],
  ["#2DD4BF", "#14B8A6"],
  ["#14B8A6", "#0D9488"],
  ["#CCFBF1", "#5EEAD4"],

  // --- Deep Ocean Variants ---
  ["#67E8F9", "#0891B2"],
  ["#22D3EE", "#0E7490"],
  ["#7DD3FC", "#2563EB"],

  // --- Purple / Magenta Contrast ---
  ["#DDD6FE", "#8B5CF6"],
  ["#C4B5FD", "#7C3AED"],
  ["#F5D0FE", "#D946EF"],

  // --- Neon Energy Colors ---
  ["#A7F3D0", "#10B981"],
  ["#BBF7D0", "#22C55E"],
  ["#D9F99D", "#84CC16"]
];
const BALL_COUNT = 12

function makeBall(w, h) {
  const r = 40 + Math.random() * 70

  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r,
    vx: (Math.random() - 0.5) * 3,
    vy: (Math.random() - 0.5) * 3,
    depth: 0.4 + Math.random() * 0.4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }
}

export default function Background() {
  const canvasRef = useRef(null)
  const ballsRef = useRef([])
  const rafRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      ballsRef.current = Array.from(
        { length: BALL_COUNT },
        () => makeBall(canvas.width, canvas.height)
      )
    }

    function drawBall(ctx, b) {
    // ultra soft inner light
    const inner = ctx.createRadialGradient(
        b.x,
        b.y,
        0,
        b.x,
        b.y,
        b.r
    )

    inner.addColorStop(0, b.color[0] + "CC")
    inner.addColorStop(0.4, b.color[0] + "88")
    inner.addColorStop(1, b.color[1] + "00")

    ctx.globalAlpha = 0.9
    ctx.beginPath()
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
    ctx.fillStyle = inner
    ctx.fill()

    // atmospheric glow layer
    const glow = ctx.createRadialGradient(
        b.x,
        b.y,
        b.r * 0.4,
        b.x,
        b.y,
        b.r * 2.4
    )

    glow.addColorStop(0, b.color[0] + "44")
    glow.addColorStop(1, b.color[1] + "00")

    ctx.globalAlpha = 0.6
    ctx.beginPath()
    ctx.arc(b.x, b.y, b.r * 2.4, 0, Math.PI * 2)
    ctx.fillStyle = glow
    ctx.fill()

    ctx.globalAlpha = 1
    }

    function physics(w, h) {
      const balls = ballsRef.current

      // movement + wall bounce
      for (const b of balls) {
        b.x += b.vx
        b.y += b.vy

        // damping = smooth motion
        b.vx *= 0.999
        b.vy *= 0.999

        if (b.x < b.r || b.x > w - b.r) b.vx *= -1
        if (b.y < b.r || b.y > h - b.r) b.vy *= -1
      }

      // soft ball interaction
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const a = balls[i]
          const b = balls[j]

          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const minDist = (a.r + b.r) * 0.6

          if (dist < minDist) {
            const angle = Math.atan2(dy, dx)
            const force = (minDist - dist) * 0.004

            const fx = Math.cos(angle) * force
            const fy = Math.sin(angle) * force

            a.vx -= fx
            a.vy -= fy
            b.vx += fx
            b.vy += fy
          }
        }
      }
    }

    function loop() {
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      physics(w, h)

      ctx.filter = "blur(20px)"

      ctx.globalCompositeOperation = "screen"

      ctx.fillStyle = "rgba(240, 255, 255, 0.04)"
        ctx.fillRect(0, 0, w, h)

      for (const b of ballsRef.current) {
        drawBall(ctx, b)
      }

      ctx.globalCompositeOperation = "source-over"

      ctx.filter = "none"

      rafRef.current = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener("resize", resize)
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  )
}