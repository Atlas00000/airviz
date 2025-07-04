import type { PollutionData, WindData } from "./types"

const OPENAQ_BASE_URL = "https://api.openaq.org/v2"

export async function fetchPollutionData(): Promise<PollutionData[]> {
  try {
    // Fetch data for major cities with different pollutants
    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"]
    const parameters = ["pm25", "o3", "no2"]

    const allData: PollutionData[] = []

    for (const city of cities) {
      for (const parameter of parameters) {
        try {
          const response = await fetch(
            `${OPENAQ_BASE_URL}/measurements?city=${encodeURIComponent(city)}&parameter=${parameter}&limit=10&order_by=datetime&sort=desc`,
            {
              headers: {
                Accept: "application/json",
              },
            },
          )

          if (response.ok) {
            const data = await response.json()
            if (data.results) {
              allData.push(
                ...data.results.map((item: any) => ({
                  location: item.location,
                  parameter: item.parameter,
                  value: item.value,
                  unit: item.unit,
                  date: item.date,
                  coordinates: item.coordinates || generateRandomCoordinates(city),
                  country: item.country,
                  city: item.city,
                })),
              )
            }
          }
        } catch (error) {
          console.warn(`Failed to fetch ${parameter} data for ${city}:`, error)
        }
      }
    }

    // If no real data, generate mock data
    if (allData.length === 0) {
      return generateMockData()
    }

    return allData
  } catch (error) {
    console.error("Error fetching pollution data:", error)
    return generateMockData()
  }
}

export async function fetchWindData(): Promise<WindData> {
  // Mock wind data - in a real app, you'd fetch from a weather API
  const angle = Math.random() * 2 * Math.PI
  return {
    speed: Math.random() * 10 + 5, // 5-15 m/s
    direction: {
      x: Math.cos(angle),
      y: Math.sin(angle),
    },
    timestamp: Date.now(),
  }
}

function generateRandomCoordinates(city: string) {
  const cityCoords = {
    "New York": { lat: 40.7128, lng: -74.006 },
    "Los Angeles": { lat: 34.0522, lng: -118.2437 },
    Chicago: { lat: 41.8781, lng: -87.6298 },
    Houston: { lat: 29.7604, lng: -95.3698 },
    Phoenix: { lat: 33.4484, lng: -112.074 },
  }

  const base = cityCoords[city as keyof typeof cityCoords] || cityCoords["New York"]
  return {
    latitude: base.lat + (Math.random() - 0.5) * 0.1,
    longitude: base.lng + (Math.random() - 0.5) * 0.1,
  }
}

function generateMockData(): PollutionData[] {
  const cities = [
    { name: "New York", lat: 40.7128, lng: -74.006 },
    { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
    { name: "Chicago", lat: 41.8781, lng: -87.6298 },
    { name: "Houston", lat: 29.7604, lng: -95.3698 },
    { name: "Phoenix", lat: 33.4484, lng: -112.074 },
  ]

  const parameters = ["pm25", "o3", "no2"] as const
  const data: PollutionData[] = []

  cities.forEach((city) => {
    parameters.forEach((parameter) => {
      // Generate multiple readings per city/parameter
      for (let i = 0; i < 5; i++) {
        const baseValue = {
          pm25: Math.random() * 80 + 10,
          o3: Math.random() * 150 + 20,
          no2: Math.random() * 100 + 15,
        }[parameter]

        data.push({
          location: `${city.name} Station ${i + 1}`,
          parameter,
          value: baseValue + (Math.random() - 0.5) * 20,
          unit: "µg/m³",
          date: {
            utc: new Date(Date.now() - Math.random() * 3600000).toISOString(),
            local: new Date(Date.now() - Math.random() * 3600000).toISOString(),
          },
          coordinates: {
            latitude: city.lat + (Math.random() - 0.5) * 0.1,
            longitude: city.lng + (Math.random() - 0.5) * 0.1,
          },
          country: "US",
          city: city.name,
        })
      }
    })
  })

  return data
}
