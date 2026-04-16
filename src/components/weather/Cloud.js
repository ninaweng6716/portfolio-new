import { ctx, getTime } from './helpers'

export class CartoonyCloud {
  constructor(canvas, opts = {}) {
    this.canvas = canvas
    this.x = opts.x ?? Math.random() * canvas.width
    this.y = opts.y ?? Math.random() * canvas.height * 0.35 + 40
    this.baseY = this.y
    this.speed = opts.speed ?? (Math.random() * 0.4 + 0.15)
    this.scale = opts.scale ?? (Math.random() * 0.5 + 0.75)
    this.opacity = opts.opacity ?? (Math.random() * 0.2 + 0.75)
    this.phase = Math.random() * Math.PI * 2
    this.color = opts.color ?? 'white'
    this.outline = opts.outline ?? 'rgba(180,200,230,0.8)'
  }

  drawShape(cx, cy, sc) {
    const bumps = [
      { x: 0,   y: 0,   r: 28 },
      { x: 32,  y: -14, r: 36 },
      { x: 68,  y: -18, r: 30 },
      { x: 100, y: -8,  r: 26 },
      { x: 125, y: 8,   r: 22 },
      { x: -22, y: 8,   r: 20 },
    ]
    ctx.save()
    ctx.translate(cx, cy)
    ctx.scale(sc, sc)
    ctx.beginPath()
    for (const b of bumps) {
      ctx.moveTo(b.x + b.r, b.y)
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
    }
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.strokeStyle = this.outline
    ctx.lineWidth = 2.5 / sc
    ctx.stroke()
    // Shine streak
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.beginPath()
    ctx.ellipse(20, -24, 22, 7, -0.3, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  update() {
    this.x += this.speed
    this.y = this.baseY + Math.sin(getTime() * 0.5 + this.phase) * 4
    if (this.x > this.canvas.width + 200) this.x = -200
  }

  draw() {
    ctx.save()
    ctx.globalAlpha = this.opacity
    this.drawShape(this.x, this.y, this.scale)
    ctx.restore()
  }
}

export class StormCloud extends CartoonyCloud {
  constructor(canvas, opts = {}) {
    super(canvas, {
      color: '#8090a0',
      outline: '#5a6878',
      opacity: Math.random() * 0.2 + 0.8,
      scale: Math.random() * 0.4 + 1.0,
      ...opts,
    })
  }
}
