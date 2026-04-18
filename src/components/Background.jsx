import { useEffect, useRef } from "react"

const COLORS = [
  // Aqua / Teal
  ["#CFFAFE", "#99F6E4"],
  ["#99F6E4", "#5EEAD4"],
  ["#5EEAD4", "#2DD4BF"],
  ["#2DD4BF", "#14B8A6"],
  ["#14B8A6", "#0D9488"],
  ["#CCFBF1", "#5EEAD4"],
  // Deep Ocean
  ["#67E8F9", "#0891B2"],
  ["#22D3EE", "#0E7490"],
  ["#7DD3FC", "#2563EB"],
  // Purple / Magenta
  ["#DDD6FE", "#8B5CF6"],
  ["#C4B5FD", "#7C3AED"],
  ["#F5D0FE", "#D946EF"],
  // Neon
  ["#A7F3D0", "#10B981"],
  ["#BBF7D0", "#22C55E"],
  ["#D9F99D", "#84CC16"],
]

const BALL_COUNT = 12
const BLUR_PX    = 20
const DAMPING    = 0.999
const REPULSION  = 0.004
const OVERLAP    = 0.6

function randomBall(w, h) {
  return {
    x:     Math.random() * w,
    y:     Math.random() * h,
    r:     40 + Math.random() * 70,
    vx:    (Math.random() - 0.5) * 3,
    vy:    (Math.random() - 0.5) * 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }
}

function drawBall(ctx, { x, y, r, color }) {
  const inner = ctx.createRadialGradient(x, y, 0, x, y, r)
  inner.addColorStop(0,   color[0] + "CC")
  inner.addColorStop(0.4, color[0] + "88")
  inner.addColorStop(1,   color[1] + "00")
  ctx.globalAlpha = 0.9
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = inner
  ctx.fill()

  const halo = ctx.createRadialGradient(x, y, r * 0.4, x, y, r * 2.4)
  halo.addColorStop(0, color[0] + "44")
  halo.addColorStop(1, color[1] + "00")
  ctx.globalAlpha = 0.6
  ctx.beginPath()
  ctx.arc(x, y, r * 2.4, 0, Math.PI * 2)
  ctx.fillStyle = halo
  ctx.fill()

  ctx.globalAlpha = 1
}

function stepPhysics(balls, w, h) {
  for (const b of balls) {
    b.x  += b.vx
    b.y  += b.vy
    b.vx *= DAMPING
    b.vy *= DAMPING
    if (b.x < b.r || b.x > w - b.r) b.vx *= -1
    if (b.y < b.r || b.y > h - b.r) b.vy *= -1
  }

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const a = balls[i], b = balls[j]
      const dx = b.x - a.x, dy = b.y - a.y
      const d   = Math.hypot(dx, dy)
      const min = (a.r + b.r) * OVERLAP
      if (d < min) {
        const angle = Math.atan2(dy, dx)
        const f  = (min - d) * REPULSION
        const fx = Math.cos(angle) * f
        const fy = Math.sin(angle) * f
        a.vx -= fx;  a.vy -= fy
        b.vx += fx;  b.vy += fy
      }
    }
  }
}

export default function Background() {
  const canvasRef = useRef(null)
  const stateRef  = useRef({ balls: [], w: 0, h: 0 })
  const rafRef    = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext("2d")
    const state  = stateRef.current

    function getViewport() {
      const vv = window.visualViewport
      return {
        w: Math.floor(vv?.width  ?? window.innerWidth),
        h: Math.floor(vv?.height ?? window.innerHeight),
      }
    }

    function init() {
      const { w, h } = getViewport()
      canvas.width  = w
      canvas.height = h
      state.w       = w
      state.h       = h
      state.balls   = Array.from({ length: BALL_COUNT }, () => randomBall(w, h))
    }

    // Separated from loop() so onResize can call it immediately after
    // resizing the canvas — prevents the blank-frame flash
    function draw() {
      const { w, h, balls } = state
      ctx.clearRect(0, 0, w, h)
      ctx.filter = `blur(${BLUR_PX}px)`
      ctx.globalCompositeOperation = "screen"
      ctx.fillStyle = "rgba(240,255,255,0.04)"
      ctx.fillRect(0, 0, w, h)
      for (const b of balls) drawBall(ctx, b)
      ctx.globalCompositeOperation = "source-over"
      ctx.filter = "none"
    }

    function onResize() {
      const { w, h } = getViewport()
      if (w === state.w && h === state.h) return

      canvas.width  = w
      canvas.height = h
      state.w       = w
      state.h       = h

      for (const b of state.balls) {
        b.x = Math.min(Math.max(b.r, b.x), w - b.r)
        b.y = Math.min(Math.max(b.r, b.y), h - b.r)
      }

      // draw immediately so the cleared buffer is never shown
      draw()
    }

    function loop() {
      stepPhysics(state.balls, state.w, state.h)
      draw()
      rafRef.current = requestAnimationFrame(loop)
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current)
      } else {
        rafRef.current = requestAnimationFrame(loop)
      }
    }

    init()
    window.addEventListener("resize", onResize)
    window.visualViewport?.addEventListener("resize", onResize)
    document.addEventListener("visibilitychange", onVisibility)
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("resize", onResize)
      window.visualViewport?.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVisibility)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        inset:         0,
        width:         "100vw",
        height:        "100dvh",
        pointerEvents: "none",
        zIndex:        0,
      }}
    />
  )
}