import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const userIcon = L.divIcon({
  className: '',
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#14B8A6;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
  iconAnchor: [7, 7],
})

const gymIcon = L.divIcon({
  className: '',
  html: `<div style="font-size:20px;line-height:1">🧗</div>`,
  iconAnchor: [10, 20],
})

export default function ClimbingMap({ gyms, userLat, userLng, activeGym, onGymClick }) {
  const containerRef = useRef(null)
  const mapRef       = useRef(null)
  const markersRef   = useRef({})

  // Init map once
  useEffect(() => {
    if (mapRef.current) return
    const map = L.map(containerRef.current, { zoomControl: true, scrollWheelZoom: false })
      .setView([userLat, userLng], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    L.marker([userLat, userLng], { icon: userIcon })
      .addTo(map)
      .bindPopup('You are here')

    mapRef.current = map
  }, [userLat, userLng])

  // Add gym markers
  useEffect(() => {
    if (!mapRef.current) return
    gyms.forEach(gym => {
      if (markersRef.current[gym.id]) return
      const marker = L.marker([gym.lat, gym.lng], { icon: gymIcon })
        .addTo(mapRef.current)
        .bindPopup(gym.name)
        .on('click', () => onGymClick(gym))
      markersRef.current[gym.id] = marker
    })
  }, [gyms, onGymClick])

  // Pan to active gym
  useEffect(() => {
    if (!mapRef.current || !activeGym) return
    mapRef.current.flyTo([activeGym.lat, activeGym.lng], 14, { duration: 0.8 })
    markersRef.current[activeGym.id]?.openPopup()
  }, [activeGym])

  return <div ref={containerRef} className="w-full h-full rounded-xl z-10" />
}