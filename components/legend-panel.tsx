"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePollutionStore } from "@/lib/pollution-store"
import { filterPollutionDataByLocation } from "@/lib/utils"
import { Activity, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

export function LegendPanel() {
  const { activeLayers, pollutionData, locationFilter } = usePollutionStore()

  // Filter data based on location filter
  const filteredData = filterPollutionDataByLocation(pollutionData, locationFilter)

  const getAQILevel = (value: number, pollutant: string) => {
    // Simplified AQI calculation
    if (pollutant === "pm25") {
      if (value <= 12) return { level: "Good", color: "bg-green-500", icon: CheckCircle }
      if (value <= 35) return { level: "Moderate", color: "bg-yellow-500", icon: Activity }
      if (value <= 55) return { level: "Unhealthy for Sensitive", color: "bg-orange-500", icon: AlertTriangle }
      return { level: "Unhealthy", color: "bg-red-500", icon: XCircle }
    }
    return { level: "Unknown", color: "bg-gray-500", icon: Activity }
  }

  const pollutantInfo = {
    pm25: {
      name: "PM2.5",
      description: "Fine particulate matter",
      unit: "µg/m³",
      healthImpact: "Respiratory and cardiovascular effects",
    },
    o3: {
      name: "Ozone",
      description: "Ground-level ozone",
      unit: "µg/m³",
      healthImpact: "Respiratory irritation",
    },
    no2: {
      name: "Nitrogen Dioxide",
      description: "Traffic-related pollutant",
      unit: "µg/m³",
      healthImpact: "Respiratory inflammation",
    },
  }

  return (
    <Card className="w-80 bg-black/80 backdrop-blur-sm border-gray-700 text-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Air Quality Legend
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* AQI Scale */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Air Quality Index</h4>
          <div className="space-y-1">
            {[
              { range: "0-50", level: "Good", color: "bg-green-500" },
              { range: "51-100", level: "Moderate", color: "bg-yellow-500" },
              { range: "101-150", level: "Unhealthy for Sensitive", color: "bg-orange-500" },
              { range: "151-200", level: "Unhealthy", color: "bg-red-500" },
              { range: "201+", level: "Very Unhealthy", color: "bg-purple-500" },
            ].map(({ range, level, color }) => (
              <div key={range} className="flex items-center gap-2 text-xs">
                <div className={`w-4 h-2 rounded ${color}`}></div>
                <span className="w-16">{range}</span>
                <span>{level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Pollutants */}
        {activeLayers.length > 0 && (
          <div className="border-t border-gray-700 pt-4">
            <h4 className="font-medium text-sm mb-3">Active Pollutants</h4>
            <div className="space-y-3">
              {activeLayers.map((pollutant) => {
                const info = pollutantInfo[pollutant]
                const currentData = filteredData.filter((d) => d.parameter === pollutant)
                const avgValue =
                  currentData.length > 0 ? currentData.reduce((sum, d) => sum + d.value, 0) / currentData.length : 0
                const aqi = getAQILevel(avgValue, pollutant)

                return (
                  <div key={pollutant} className="bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{info.name}</span>
                      <Badge variant="outline" className={`${aqi.color} text-white border-none`}>
                        {aqi.level}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>
                        Avg: {avgValue.toFixed(1)} {info.unit}
                      </div>
                      <div>{info.description}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Data Source */}
        <div className="border-t border-gray-700 pt-4 text-xs text-gray-400">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Data Source: OpenAQ API</span>
          </div>
          <div>Updated every 15 minutes</div>
        </div>
      </CardContent>
    </Card>
  )
}
