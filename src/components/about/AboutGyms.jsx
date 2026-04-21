import { lazy, Suspense } from "react"

const ClimbingGyms = lazy(() => import("../climbingGyms_temp/index.jsx"))

export default function AboutGyms({ coords }) {
  if (!coords?.lat || !coords?.lng) return null

  return (
    <Suspense fallback={null}>
      <div className="reveal">
        <ClimbingGyms lat={coords.lat} lng={coords.lng} />
      </div>
    </Suspense>
  )
}