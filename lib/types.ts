export type PollutantType = "pm25" | "o3" | "no2"

export interface PollutionData {
  location: string
  parameter: PollutantType
  value: number
  unit: string
  date: {
    utc: string
    local: string
  }
  coordinates: {
    latitude: number
    longitude: number
  }
  country: string
  city: string
}

export interface WindData {
  speed: number
  direction: {
    x: number
    y: number
  }
  timestamp: number
}

export interface AQILevel {
  level: string
  color: string
  range: [number, number]
  description: string
}
