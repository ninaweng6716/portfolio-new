// useNearbyGyms.js
const OVERPASS_SERVERS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
]

async function queryOverpass(query) {
  for (const server of OVERPASS_SERVERS) {
    try {
      const controller = new AbortController()
      const timeout    = setTimeout(() => controller.abort(), 8000)

      const res = await fetch(server, {
        method: 'POST',
        body:   `data=${encodeURIComponent(query)}`,
        signal: controller.signal,
      })
      clearTimeout(timeout)

      if (!res.ok) continue
      return await res.json()
    } catch {
      continue // try next server
    }
  }
  throw new Error('All Overpass servers failed')
}

export default async function fetchNearbyGyms(lat, lng, radius = 15000) {
  const query = `
    [out:json];
    (
      node["sport"="climbing"](around:${radius},${lat},${lng});
      way["sport"="climbing"](around:${radius},${lat},${lng});
      node["leisure"="sports_centre"]["sport"="climbing"](around:${radius},${lat},${lng});
    );
    out center;
  `

  const data = await queryOverpass(query)

  return data.elements
    .filter(el => el.tags?.name)
    .map(el => ({
      id:      el.id,
      name:    el.tags.name,
      lat:     el.lat ?? el.center?.lat,
      lng:     el.lon ?? el.center?.lon,
      website: el.tags.website ?? el.tags['contact:website'] ?? null,
    }))
}