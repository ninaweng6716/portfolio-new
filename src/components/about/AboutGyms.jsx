import { lazy, Suspense } from "react"

const ClimbingGyms = lazy(() => import("../climbingGyms/index.jsx"))

export default function AboutGyms({ coords }) {
  if (!coords?.lat || !coords?.lng) return null

  return (
    <Suspense
      fallback={
        <p role="status" aria-live="polite" className="section-text-sm">
          Loading nearby climbing gyms…
        </p>
      }
    >
      <section aria-label="Nearby climbing gyms" className="reveal">
        <ClimbingGyms lat={coords.lat} lng={coords.lng} />
      </section>
    </Suspense>
  )
}