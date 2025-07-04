"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import { PollutionControls } from "@/components/pollution-controls"
import { TemporalControls } from "@/components/temporal-controls"
import { LegendPanel } from "@/components/legend-panel"
import { LoadingSpinner } from "@/components/loading-spinner"
import { LocationSearch } from "@/components/location-search"
import { usePollutionStore } from "@/lib/pollution-store"

// Dynamically import map to avoid SSR issues
const PollutionMap = dynamic(() => import("@/components/pollution-map"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
})

export default function AirVizApp() {
  const { initializeData, isLoading } = usePollutionStore()

  useEffect(() => {
    initializeData()
  }, [initializeData])

  return (
    <div className="h-screen w-full relative bg-gray-900 text-white overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-[1000] bg-black/80 backdrop-blur-sm border-b border-gray-700">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"></div>
            <h1 className="text-2xl font-bold">AirViz</h1>
            <span className="text-sm text-gray-400">Real-time Air Quality Visualization</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Data</span>
          </div>
        </div>
      </header>

      {/* Main Map Container */}
      <div className="absolute inset-0 pt-16">
        <PollutionMap />
      </div>

      {/* Control Panels */}
      <div className="absolute left-4 top-20 z-[1000] space-y-4">
        <LocationSearch />
        <PollutionControls />
        <TemporalControls />
      </div>

      {/* Legend Panel */}
      <div className="absolute right-4 top-20 z-[1000]">
        <LegendPanel />
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[2000] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}
