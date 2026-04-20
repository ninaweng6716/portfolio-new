import { useState, useEffect } from 'react'
import fetchNearbyGyms from './useNearbyGyms'
import ClimbingMap from './ClimbingMap'
import GymCard from './GymCard'

export default function ClimbingGyms({ lat, lng }) {
  const [gyms, setGyms]        = useState([])
  const [activeGym, setActive] = useState(null)
  const [status, setStatus]    = useState('loading') // loading | done | empty | error

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

  return (
    <div className="mt-16 relative">
      <h3 className="font-display font-bold text-ink text-2xl tracking-tight mb-6">
        Places to send near you 🧗
      </h3>

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
  )
}