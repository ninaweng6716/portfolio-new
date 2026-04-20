import { useState, useEffect } from 'react'
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
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
  }

  function close() {
    setVisible(false)
    setTimeout(() => {
      setRendered(false)
      setRevealed(true)
    }, 300)
  }

  // psst button — always in DOM so reveal observer catches it
  // fades out when content opens, fades back in when closed
  return (
    <div>
      <div className={`text-center transition-all duration-300 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <button
          onClick={open}
          className="relative px-5 py-2.5 rounded-xl text-white text-sm font-display font-semibold border border-white/20 overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(32,178,160,0.35)]"
          style={{
            background: 'linear-gradient(135deg, #2DD4BF 0%, #0891B2 45%, #8B5CF6 100%)',
          }}
        >
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, #5EEAD4 0%, #22D3EE 45%, #C4B5FD 100%)',
            }}
          />
          <span className="relative z-10 flex items-center gap-2">
            <span>🤫</span>
            psst… wanna see something?
          </span>
        </button>
      </div>

      {rendered && (
        <div className={`transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-ink text-2xl tracking-tight">
              Places to send near you 🧗
            </h3>
            <button
              onClick={close}
              className="text-sm font-display text-ink-2 hover:text-ink transition-colors flex items-center gap-1.5"
            >
              <span>✕</span>
              <span>Hide</span>
            </button>
          </div>

          {status === 'loading' && (
            <div className="h-[420px] rounded-2xl bg-tq-pale animate-pulse flex items-center justify-center">
              <p className="text-tq-dim font-display text-sm">Finding climbing gyms…</p>
            </div>
          )}

          {status === 'error' && (
            <div className="h-[200px] rounded-2xl border border-rule flex flex-col items-center justify-center gap-2 text-center px-6">
              <span className="text-3xl">🧗</span>
              <p className="font-display font-semibold text-ink">Climbing spots unavailable right now</p>
              <p className="text-sm text-ink-2">The service we use to find nearby climbing spots is having a moment. Check back soon!</p>
            </div>
          )}

          {status === 'empty' && (
            <div className="h-[200px] rounded-2xl border border-rule flex flex-col items-center justify-center gap-2 text-center px-6">
              <span className="text-3xl">😔</span>
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
              <div className="flex flex-col gap-3 overflow-y-auto pr-1 max-h-[300px] md:max-h-[420px]">
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
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}