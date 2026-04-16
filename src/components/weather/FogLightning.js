import { ctx, getTime } from './helpers'

export class FogWisp {
  constructor(canvas) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width * 1.4 - canvas.width * 0.2
    this.y = Math.random() * canvas.height
    this.baseY = this.y
    this.w = Math.random() * 220 + 120
    this.h = Math.random() * 40 + 25
    this.speed = Math.random() * 0.3 + 0.1
    this.opacity = Math.random() * 0.18 + 0.08
    this.phase = Math.random() * Math.PI * 2
  }

  update() {
    this.x += this.speed
    this.y = this.baseY + Math.sin(getTime() * 0.3 + this.phase) * 8
    if (this.x > this.canvas.width + 300) this.x = -300
  }

  draw() {
    ctx.save()
    ctx.globalAlpha = this.opacity
    const grd = ctx.createRadialGradient(
      this.x + this.w / 2, this.y, 5,
      this.x + this.w / 2, this.y, this.w * 0.7
    )
    grd.addColorStop(0, 'rgba(220,225,235,1)')
    grd.addColorStop(1, 'rgba(200,210,225,0)')
    ctx.fillStyle = grd
    ctx.beginPath()
    ctx.ellipse(this.x + this.w / 2, this.y, this.w * 0.6, this.h, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

export class Lightning {
  constructor(canvas) {
    this.canvas = canvas
    this.visible = false
    this.x = 0
    this.timer = 0
    this.nextFlash = Math.random() * 200 + 80
    this.duration = 0
    this.points = []
    this.branches = []
  }

  buildBolt(x, startY, endY) {
    const pts = [{ x, y: startY }]
    for (let i = 1; i <= 10; i++) {
      const t = i / 10
      pts.push({
        x: x + (Math.random() - 0.5) * 50,
        y: startY + (endY - startY) * t,
      })
    }
    return pts
  }

  update() {
    this.timer++
    if (!this.visible && this.timer > this.nextFlash) {
      this.visible = true
      this.timer = 0
      this.duration = Math.floor(Math.random() * 10) + 6
      this.x = Math.random() * this.canvas.width * 0.8 + this.canvas.width * 0.1
      this.points = this.buildBolt(this.x, 0, this.canvas.height * 0.65)
      const branchPt = this.points[Math.floor(this.points.length * 0.5)]
      this.branches = [this.buildBolt(branchPt.x, branchPt.y, branchPt.y + this.canvas.height * 0.2)]
      this.nextFlash = Math.random() * 280 + 100
    }
    if (this.visible && this.timer > this.duration) {
      this.visible = false
      this.timer = 0
    }
  }

  drawBolt(pts, width, alpha) {
    if (pts.length < 2) return
    ctx.save()
    // Glow pass
    ctx.globalAlpha = alpha * 0.25
    ctx.strokeStyle = '#aad0ff'
    ctx.lineWidth = width * 5
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
    ctx.stroke()
    // Core
    ctx.globalAlpha = alpha
    ctx.strokeStyle = '#fffde7'
    ctx.lineWidth = width
    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
    ctx.stroke()
    ctx.restore()
  }

  draw() {
    if (!this.visible) return
    const prog = this.timer / this.duration
    const alpha = prog < 0.3 ? prog / 0.3 : 1 - (prog - 0.3) / 0.7
    this.drawBolt(this.points, 3, alpha)
    for (const b of this.branches) this.drawBolt(b, 1.5, alpha * 0.7)
    // Flash overlay
    if (prog < 0.2) {
      ctx.save()
      ctx.globalAlpha = ((0.2 - prog) / 0.2) * 0.18
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      ctx.restore()
    }
  }
}
