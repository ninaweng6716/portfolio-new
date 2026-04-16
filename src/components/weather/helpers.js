// Shared canvas context and time reference — set once in Background.jsx
export let ctx = null
export let getTime = null

export function init(canvasCtx, timeFn) {
  ctx = canvasCtx
  getTime = timeFn
}

export function wobble(base, amp, freq, offset = 0) {
  return base + Math.sin(getTime() * freq + offset) * amp
}
