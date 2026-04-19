const WEATHER_CODES = {
  0: 'clear skies', 1: 'mostly clear', 2: 'partly cloudy', 3: 'overcast',
  45: 'foggy', 48: 'icy fog',
  51: 'light drizzle', 53: 'drizzle', 55: 'heavy drizzle',
  61: 'light rain', 63: 'rain', 65: 'heavy rain',
  71: 'light snow', 73: 'snow', 75: 'heavy snow', 77: 'snow grains',
  80: 'light showers', 81: 'showers', 82: 'heavy showers',
  85: 'snow showers', 86: 'heavy snow showers',
  95: 'thunderstorms', 96: 'thunderstorms', 99: 'thunderstorms',
}

export async function fetchWeather() {
  // 1. Get coordinates from browser
  const coords = await new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve(coords),
      reject,
      { timeout: 6000 }
    )
  )

  const { latitude, longitude } = coords

  // 2. Reverse geocode to get city (no key needed)
  const geoRes  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
  const geoData = await geoRes.json()
  const city    = geoData.address.city
             ?? geoData.address.town
             ?? geoData.address.village
             ?? geoData.address.county
             ?? 'your area'

  // 3. Fetch weather from Open-Meteo (no key needed)
  const weatherRes  = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=celsius`
  )
  const weatherData = await weatherRes.json()
  const temp        = Math.round(weatherData.current.temperature_2m)
  const code        = weatherData.current.weather_code
  const description = WEATHER_CODES[code] ?? 'unknown conditions'

  return { city, temp, description }
}