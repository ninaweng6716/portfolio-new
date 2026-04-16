import { ctx } from './helpers'

export class CartoonyRain {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = -20 - Math.random() * 100
    this.vy = Math.random() * 6 + 8
    this.vx = -1.5
    this.size = Math.random() * 6 + 5
    this.splashing = false
    this.splashFrame = 0
    this.splashX = 0
    this.splashY = 0
    this.opacity = Math.random() * 0.4 + 0.6
  }

  update() {
    if (this.splashing) {
      this.splashFrame++
      if (this.splashFrame > 12) this.reset()
      return
    }
    this.x += this.vx
    this.y += this.vy
    if (this.y > this.canvas.height) {
      this.splashing = true
      this.splashFrame = 0
      this.splashX = this.x
      this.splashY = this.canvas.height - 4
    }
  }

  draw() {
    ctx.save()
    ctx.globalAlpha = this.opacity

    if (this.splashing) {
      const prog = this.splashFrame / 12
      ctx.strokeStyle = `rgba(120,180,230,${0.7 - prog * 0.7})`
      ctx.lineWidth = 1.5
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI - Math.PI / 2
        const len = 8 + prog * 16
        ctx.beginPath()
        ctx.moveTo(this.splashX, this.splashY)
        ctx.lineTo(
          this.splashX + Math.cos(angle) * len,
          this.splashY + Math.sin(angle) * len * 0.5
        )
        ctx.stroke()
      }
    } else {
      // Teardrop body
      ctx.fillStyle = 'rgba(100,170,240,0.85)'
      ctx.strokeStyle = 'rgba(60,120,200,0.5)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(this.x, this.y - this.size * 1.2)
      ctx.bezierCurveTo(
        this.x + this.size, this.y - this.size * 0.5,
        this.x + this.size, this.y + this.size * 0.5,
        this.x, this.y + this.size
      )
      ctx.bezierCurveTo(
        this.x - this.size, this.y + this.size * 0.5,
        this.x - this.size, this.y - this.size * 0.5,
        this.x, this.y - this.size * 1.2
      )
      ctx.fill()
      ctx.stroke()

      // Shine
      ctx.fillStyle = 'rgba(255,255,255,0.55)'
      ctx.beginPath()
      ctx.ellipse(
        this.x - this.size * 0.25,
        this.y - this.size * 0.5,
        this.size * 0.22,
        this.size * 0.35,
        -0.5, 0, Math.PI * 2
      )
      ctx.fill()
    }

    ctx.restore()
  }
}
