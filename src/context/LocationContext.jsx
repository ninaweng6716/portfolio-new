import { createContext, useContext, useState } from "react"

const LocationContext = createContext()

export function LocationProvider({ children }) {
  const [coords, setCoords] = useState(null)
  const [loading, setLoading] = useState(false)
  const [permission, setPermission] = useState("prompt")

  const requestLocation = () => {
    setLoading(true)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })

        setPermission("granted")
        setLoading(false)
      },
      (err) => {
        if (err.code === 1) {
          setPermission("denied")
        }
        setLoading(false)
      }
    )
  }

  return (
    <LocationContext.Provider
      value={{
        coords,
        loading,
        permission,
        requestLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  return useContext(LocationContext)
}