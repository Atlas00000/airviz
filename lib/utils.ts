import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { PollutionData } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterPollutionDataByLocation(data: PollutionData[], locationFilter: string): PollutionData[] {
  if (!locationFilter.trim()) return data
  
  const filter = locationFilter.toLowerCase().trim()
  return data.filter(d => 
    d.city.toLowerCase().includes(filter) ||
    d.location.toLowerCase().includes(filter)
  )
}
