import { ctx, getTime, wobble } from './helpers'

export class Sun {
  constructor(canvas) {
    this.x = canvas.width * 0.82
    this.y = canvas.height * 0.15
    this.r = 52
    this.rayCount = 12
  }

  update() {}

  draw() {
    const cx = this.x
    const cy = wobble(this.y, 6, 0.4)
    const r = this.r
    const time = getTime()

    // Glow
    const grd = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 2.2)
    grd.addColorStop(0, 'rgba(255,230,80,0.35)')
    grd.addColorStop(1, 'rgba(255,200,0,0)')
    ctx.fillStyle = grd
    ctx.beginPath()
    ctx.arc(cx, cy, r * 2.2, 0, Math.PI * 2)
    ctx.fill()

    // Rays
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(time * 0.3)
    for (let i = 0; i < this.rayCount; i++) {
      const angle = (i / this.rayCount) * Math.PI * 2
      const inner = r + 10
      const outer = r + 22 + Math.sin(time * 1.5 + i) * 5
      ctx.strokeStyle = '#FFD700'
      ctx.lineWidth = 4
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner)
      ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer)
      ctx.stroke()
    }
    ctx.restore()

    // Body
    ctx.fillStyle = '#FFE234'
    ctx.strokeStyle = '#F5A800'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // Eyes
    ctx.fillStyle = '#7B4F00'
    ctx.beginPath()
    ctx.ellipse(cx - 14, cy - 10, 5, 6, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(cx + 14, cy - 10, 5, 6, 0, 0, Math.PI * 2)
    ctx.fill()

    // Eye shine
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(cx - 12, cy - 12, 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(cx + 16, cy - 12, 2, 0, Math.PI * 2)
    ctx.fill()

    // Smile
    ctx.strokeStyle = '#7B4F00'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.arc(cx, cy + 5, 16, 0.2, Math.PI - 0.2)
    ctx.stroke()

    // Blush
    ctx.fillStyle = 'rgba(255,140,80,0.35)'
    ctx.beginPath()
    ctx.ellipse(cx - 24, cy + 8, 10, 6, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(cx + 24, cy + 8, 10, 6, 0, 0, Math.PI * 2)
    ctx.fill()
  }
}
