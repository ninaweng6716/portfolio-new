export default function GymCard({ gym, active, onClick, userLat, userLng }) {
  const distance = (() => {
    const R  = 6371
    const dLat = (gym.lat - userLat) * Math.PI / 180
    const dLng = (gym.lng - userLng) * Math.PI / 180
    const a  = Math.sin(dLat/2) ** 2
             + Math.cos(userLat * Math.PI / 180)
             * Math.cos(gym.lat * Math.PI / 180)
             * Math.sin(dLng/2) ** 2
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1)
  })()

  return (
    <article
      aria-label={`${gym.name}, ${distance} kilometres away${active ? ', selected' : ''}`}
      className={`relative rounded-xl border p-4 transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-md
        ${active
          ? 'border-tq bg-tq-pale shadow-[0_4px_16px_rgba(32,178,160,0.15)]'
          : 'border-rule bg-white hover:border-tq/40'
        }`}
    >
      {/* Full card clickable overlay */}
      <button
        onClick={onClick}
        aria-pressed={active}
        className="absolute inset-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tq focus-visible:ring-offset-2"
        tabIndex={0}
      />

      {/* Content sits above the button */}
      <div className="relative z-10 pointer-events-none">
        <div className="font-display font-semibold text-ink text-sm mb-1">{gym.name}</div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-tq-dim font-medium">{distance} km away</span>

          {gym.website && (
            <a
              href={gym.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${gym.name} website, opens in new tab`}
              onClick={e => e.stopPropagation()}
              className="relative z-10 pointer-events-auto text-xs font-semibold text-tq hover:underline
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tq focus-visible:ring-offset-1"
            >
              Website <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}