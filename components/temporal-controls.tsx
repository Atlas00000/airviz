"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { usePollutionStore } from "@/lib/pollution-store"
import { Clock, Calendar, FastForward, Rewind } from "lucide-react"

export function TemporalControls() {
  const { currentTime, timeRange, setCurrentTime, isTimeLapse, toggleTimeLapse, playbackSpeed, setPlaybackSpeed } =
    usePollutionStore()

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="w-80 bg-black/80 backdrop-blur-sm border-gray-700 text-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Temporal Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Time Display */}
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">Current Time</span>
          </div>
          <div className="text-lg font-mono">{formatTime(currentTime)}</div>
        </div>

        {/* Time Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Time Range</span>
            <span className="text-gray-400">24h</span>
          </div>
          <Slider
            value={[currentTime]}
            onValueChange={([value]) => setCurrentTime(value)}
            min={timeRange.start}
            max={timeRange.end}
            step={3600000} // 1 hour in milliseconds
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>{formatTime(timeRange.start)}</span>
            <span>{formatTime(timeRange.end)}</span>
          </div>
        </div>

        {/* Time Lapse Controls */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">Time Lapse</span>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTimeLapse}
              className="border-gray-600 hover:bg-gray-700 bg-transparent"
            >
              {isTimeLapse ? "Stop" : "Play"}
            </Button>
          </div>

          {/* Playback Speed */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Speed</span>
              <span className="text-gray-400">{playbackSpeed}x</span>
            </div>
            <div className="flex items-center gap-2">
              <Rewind className="w-4 h-4" />
              <Slider
                value={[playbackSpeed]}
                onValueChange={([value]) => setPlaybackSpeed(value)}
                min={0.5}
                max={4}
                step={0.5}
                className="flex-1"
              />
              <FastForward className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Quick Time Jumps */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentTime(Date.now() - 24 * 60 * 60 * 1000)}
            className="border-gray-600 hover:bg-gray-700 text-xs"
          >
            24h ago
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentTime(Date.now() - 12 * 60 * 60 * 1000)}
            className="border-gray-600 hover:bg-gray-700 text-xs"
          >
            12h ago
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentTime(Date.now())}
            className="border-gray-600 hover:bg-gray-700 text-xs"
          >
            Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
