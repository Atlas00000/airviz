"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { usePollutionStore } from "@/lib/pollution-store"
import { Search, MapPin } from "lucide-react"

export function LocationSearch() {
  const { locationFilter, setLocationFilter, pollutionData } = usePollutionStore()

  // Get unique cities for suggestions
  const uniqueCities = Array.from(new Set(pollutionData.map(d => d.city))).sort()

  const handleFilterChange = (value: string) => {
    setLocationFilter(value)
  }

  return (
    <Card className="w-80 bg-black/80 backdrop-blur-sm border-gray-700 text-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Location Filter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by city..."
            value={locationFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>

        {/* Quick Filters */}
        {locationFilter === "" && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-300">Quick Filters:</div>
            <div className="flex flex-wrap gap-2">
              {uniqueCities.slice(0, 6).map((city) => (
                <button
                  key={city}
                  onClick={() => handleFilterChange(city)}
                  className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Clear Filter */}
        {locationFilter && (
          <button
            onClick={() => handleFilterChange("")}
            className="w-full px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
          >
            Clear Filter
          </button>
        )}

        {/* Results Count */}
        <div className="text-xs text-gray-400">
          {locationFilter 
            ? `Showing data for: ${locationFilter}`
            : `Showing all ${pollutionData.length} measurements`
          }
        </div>
      </CardContent>
    </Card>
  )
} 