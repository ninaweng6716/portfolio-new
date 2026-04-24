import { useState, useEffect } from 'react'

export default function LoadingScreen({ ready }) {
  const [visible, setVisible]   = useState(true)
  const [rendered, setRendered] = useState(true)

  useEffect(() => {
    if (!ready) return
    setVisible(false)
    const t = setTimeout(() => setRendered(false), 500)
    return () => clearTimeout(t)
  }, [ready])

  if (!rendered) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={visible ? "Loading page content" : undefined}
      aria-hidden={!visible}
      className={`fixed inset-0 z-[100] bg-bg flex items-center justify-center
        transition-opacity duration-500 ease-in-out
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        className="flex items-center gap-2.5 font-display font-bold text-ink text-lg tracking-tight"
        aria-hidden="true"
      >
        <span className="w-2 h-2 rounded-full bg-tq animate-blink" />
        <span className="animate-pulse">Loading…</span>
      </div>
    </div>
  )
}