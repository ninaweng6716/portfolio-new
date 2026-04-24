import { useState, useEffect, useRef } from 'react'
import fetchNearbyGyms from './useNearbyGyms'
import ClimbingMap from './ClimbingMap'
import GymCard from './GymCard'

export default function ClimbingGyms({ lat, lng }) {
  const [gyms, setGyms]         = useState([])
  const [activeGym, setActive]  = useState(null)
  const [status, setStatus]     = useState('loading')
  const [revealed, setRevealed] = useState(true)
  const [visible, setVisible]   = useState(false)
  const [rendered, setRendered] = useState(false)

  const openButtonRef  = useRef(null)
  const closeButtonRef = useRef(null)
  const panelRef       = useRef(null)

  useEffect(() => {
    if (!lat || !lng) { setStatus('error'); return }
    fetchNearbyGyms(lat, lng)
      .then(results => {
        setGyms(results)
        setActive(results[0] ?? null)
        setStatus(results.length ? 'done' : 'empty')
      })
      .catch(() => setStatus('error'))
  }, [lat, lng])

  function open() {
    setRevealed(false)
    setRendered(true)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setVisible(true)
      closeButtonRef.current?.focus()
    }))
  }

  function close() {
    setVisible(false)
    setTimeout(() => {
      setRendered(false)
      setRevealed(true)
      openButtonRef.current?.focus()
    }, 300)
  }

  return (
    <div>
      {/* Open button */}
      <div
        aria-hidden={!revealed}
        className={`text-center transition-all duration-300 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      >
        <button
          ref={openButtonRef}
          onClick={open}
          aria-expanded={rendered && visible}
          aria-controls="climbing-gyms-panel"
          className="btn-gradient group"
        >
          <span className="relative z-10 flex items-center gap-2">
            Click me if you love to climb!
          </span>
        </button>
      </div>

      {/* Panel */}
      {rendered && (
        <div
          id="climbing-gyms-panel"
          ref={panelRef}
          aria-hidden={!visible}
          className={`transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="h3-portfolio">
              Places to send near you <span aria-hidden="true">🧗</span>
            </h3>
            <button
              ref={closeButtonRef}
              onClick={close}
              aria-label="Hide climbing gyms"
              className="text-sm font-display text-ink-2 hover:text-ink transition-colors flex items-center gap-1.5
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tq focus-visible:ring-offset-2"
            >
              <span aria-hidden="true">✕</span>
              <span>Hide</span>
            </button>
          </div>

          {status === 'loading' && (
            <div
              role="status"
              aria-live="polite"
              aria-label="Finding climbing gyms near you"
              className="h-[420px] rounded-2xl bg-tq-pale animate-pulse flex items-center justify-center"
            >
              <p className="text-tq-dim font-display text-sm" aria-hidden="true">Finding climbing gyms…</p>
            </div>
          )}

          {status === 'error' && (
            <div
              role="alert"
              className="h-[200px] rounded-2xl border border-rule flex flex-col items-center justify-center gap-2 text-center px-6"
            >
              <span aria-hidden="true" className="text-3xl">🧗</span>
              <p className="font-display font-semibold text-ink">Climbing spots unavailable right now</p>
              <p className="text-sm text-ink-2">The service to find nearby climbing spots is having a moment. Check back soon!</p>
            </div>
          )}

          {status === 'empty' && (
            <div
              role="status"
              className="h-[200px] rounded-2xl border border-rule flex flex-col items-center justify-center gap-2 text-center px-6"
            >
              <span aria-hidden="true" className="text-3xl">😔</span>
              <p className="font-display font-semibold text-ink">No climbing spots found near you</p>
              <p className="text-sm text-ink-2">Looks like you might have to travel a little further to find a wall.</p>
            </div>
          )}

          {status === 'done' && (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-5">
              <div className="h-[300px] md:h-[420px] rounded-xl overflow-hidden">
                <ClimbingMap
                  gyms={gyms}
                  userLat={lat}
                  userLng={lng}
                  activeGym={activeGym}
                  onGymClick={setActive}
                />
              </div>
              <nav
                aria-label="Nearby climbing gyms"
                className="flex flex-col gap-3 overflow-y-auto pr-1 max-h-[300px] md:max-h-[420px]"
              >
                {gyms.map(gym => (
                  <GymCard
                    key={gym.id}
                    gym={gym}
                    active={activeGym?.id === gym.id}
                    onClick={() => setActive(gym)}
                    userLat={lat}
                    userLng={lng}
                  />
                ))}
              </nav>
            </div>
          )}
        </div>
      )}
    </div>
  )
}