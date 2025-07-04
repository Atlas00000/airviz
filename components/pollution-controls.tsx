"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { usePollutionStore } from "@/lib/pollution-store"
import type { PollutantType } from "@/lib/types"
import { Play, Pause, RotateCcw } from "lucide-react"

export function PollutionControls() {
  const { activeLayers, toggleLayer, isAnimating, toggleAnimation, opacity, setOpacity, refreshData } =
    usePollutionStore()

  const pollutants: { type: PollutantType; label: string; color: string; icon: string }[] = [
    { type: "pm25", label: "PM2.5", color: "bg-red-500", icon: "🔥" },
    { type: "o3", label: "Ozone", color: "bg-yellow-500", icon: "🟡" },
    { type: "no2", label: "NO₂", color: "bg-green-500", icon: "🟢" },
  ]

  return (
    <Card className="w-80 bg-black/80 backdrop-blur-sm border-gray-700 text-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          Pollution Layers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Layer Toggles */}
        <div className="space-y-3">
          {pollutants.map(({ type, label, color, icon }) => (
            <div key={type} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">{icon}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${color}`}></div>
                  <span className="font-medium">{label}</span>
                </div>
              </div>
              <Switch checked={activeLayers.includes(type)} onCheckedChange={() => toggleLayer(type)} />
            </div>
          ))}
        </div>

        {/* Animation Controls */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">Particle Animation</span>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAnimation}
              className="border-gray-600 hover:bg-gray-700 bg-transparent"
            >
              {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Opacity Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Layer Opacity</span>
            <span className="text-sm text-gray-400">{Math.round(opacity * 100)}%</span>
          </div>
          <Slider
            value={[opacity]}
            onValueChange={([value]) => setOpacity(value)}
            max={1}
            min={0.1}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Refresh Data */}
        <Button
          onClick={refreshData}
          variant="outline"
          className="w-full border-gray-600 hover:bg-gray-700 bg-transparent"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Refresh Data
        </Button>
      </CardContent>
    </Card>
  )
}
