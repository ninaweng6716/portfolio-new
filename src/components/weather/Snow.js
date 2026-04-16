import { ctx, getTime } from './helpers'

export class CartoonySnow {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = -20
    this.vy = Math.random() * 1.5 + 0.8
    this.vx = Math.random() * 1 - 0.5
    this.rot = Math.random() * Math.PI * 2
    this.rotSpeed = (Math.random() - 0.5) * 0.03
    this.size = Math.random() * 10 + 8
    this.wobblePhase = Math.random() * Math.PI * 2
    this.opacity = Math.random() * 0.3 + 0.7
  }

  update() {
    this.x += this.vx + Math.sin(getTime() * 1.2 + this.wobblePhase) * 0.5
    this.y += this.vy
    this.rot += this.rotSpeed
    if (this.y > this.canvas.height + 20) this.reset()
  }

  draw() {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rot)

    const s = this.size

    // 6 arms
    for (let i = 0; i < 6; i++) {
      ctx.save()
      ctx.rotate((i / 6) * Math.PI * 2)
      ctx.strokeStyle = 'rgba(180,220,255,0.9)'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -s)
      ctx.stroke()
      // Side branches
      for (const [dy, len] of [[s * 0.35, s * 0.3], [s * 0.65, s * 0.22]]) {
        ctx.beginPath()
        ctx.moveTo(0, -dy)
        ctx.lineTo(len * 0.7, -dy - len * 0.5)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, -dy)
        ctx.lineTo(-len * 0.7, -dy - len * 0.5)
        ctx.stroke()
      }
      ctx.restore()
    }

    // Center dot
    ctx.fillStyle = 'rgba(220,240,255,0.95)'
    ctx.strokeStyle = 'rgba(140,190,240,0.8)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(0, 0, s * 0.22, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    ctx.restore()
  }
}
