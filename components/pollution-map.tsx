"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { usePollutionStore } from "@/lib/pollution-store"
import { filterPollutionDataByLocation } from "@/lib/utils"
import type { PollutantType } from "@/lib/types"

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
})

export default function PollutionMap() {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const heatmapLayersRef = useRef<Map<PollutantType, L.LayerGroup>>(new Map())
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)

  const { pollutionData, activeLayers, currentTime, windData, isAnimating, locationFilter } = usePollutionStore()

  // Filter data based on location filter
  const filteredData = filterPollutionDataByLocation(pollutionData, locationFilter)

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: [40.7128, -74.006], // NYC
      zoom: 10,
      zoomControl: false,
      attributionControl: false,
    })

    // Dark theme tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "© OpenStreetMap contributors © CARTO",
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map)

    // Add zoom control to top right
    L.control.zoom({ position: "topright" }).addTo(map)

    mapRef.current = map

    // Initialize particle canvas
    const canvas = document.createElement("canvas")
    canvas.style.position = "absolute"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "1000"
    containerRef.current.appendChild(canvas)
    particleCanvasRef.current = canvas

    // Resize canvas on map resize
    const resizeCanvas = () => {
      if (canvas && containerRef.current) {
        canvas.width = containerRef.current.offsetWidth
        canvas.height = containerRef.current.offsetHeight
      }
    }

    map.on("resize", resizeCanvas)
    resizeCanvas()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Update heatmap layers
  useEffect(() => {
    if (!mapRef.current || !filteredData.length) return

    const map = mapRef.current

    // Clear existing layers
    heatmapLayersRef.current.forEach((layer) => {
      map.removeLayer(layer)
    })
    heatmapLayersRef.current.clear()

    // Create new layers for active pollutants
    activeLayers.forEach((pollutant) => {
      const layerGroup = L.layerGroup()
      const pollutantData = filteredData.filter((d) => d.parameter === pollutant)

      pollutantData.forEach((point) => {
        const intensity = Math.min(point.value / getMaxValue(pollutant), 1)
        const color = getPollutantColor(pollutant, intensity)

        const circle = L.circleMarker([point.coordinates.latitude, point.coordinates.longitude], {
          radius: 8 + intensity * 12,
          fillColor: color,
          color: color,
          weight: 1,
          opacity: 0.8,
          fillOpacity: 0.6,
        })

        circle.bindPopup(`
          <div class="text-black">
            <strong>${pollutant.toUpperCase()}</strong><br>
            Value: ${point.value.toFixed(2)} ${getUnit(pollutant)}<br>
            Location: ${point.location}<br>
            Time: ${new Date(point.date.utc).toLocaleString()}
          </div>
        `)

        layerGroup.addLayer(circle)
      })

      heatmapLayersRef.current.set(pollutant, layerGroup)
      map.addLayer(layerGroup)
    })
  }, [filteredData, activeLayers])

  // Particle animation
  useEffect(() => {
    if (!isAnimating || !particleCanvasRef.current || !windData) return

    const canvas = particleCanvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particles: Particle[] = []
    const particleCount = 200

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update(windData)
        particle.draw(ctx)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isAnimating, windData])

  return <div ref={containerRef} className="w-full h-full relative" style={{ background: "#1a1a1a" }} />
}

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number

  constructor(width: number, height: number) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = (Math.random() - 0.5) * 2
    this.vy = (Math.random() - 0.5) * 2
    this.life = Math.random() * 100
    this.maxLife = 100
    this.size = Math.random() * 3 + 1
  }

  update(windData: any) {
    // Apply wind influence
    this.vx += windData.direction.x * 0.1
    this.vy += windData.direction.y * 0.1

    // Apply some drag
    this.vx *= 0.99
    this.vy *= 0.99

    this.x += this.vx
    this.y += this.vy
    this.life--

    // Reset particle if it dies or goes off screen
    if (this.life <= 0 || this.x < 0 || this.x > window.innerWidth || this.y < 0 || this.y > window.innerHeight) {
      this.x = Math.random() * window.innerWidth
      this.y = Math.random() * window.innerHeight
      this.life = this.maxLife
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const alpha = this.life / this.maxLife
    ctx.save()
    ctx.globalAlpha = alpha * 0.6
    ctx.fillStyle = "#ff6b6b"
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

function getPollutantColor(pollutant: PollutantType, intensity: number): string {
  const colors = {
    pm25: `hsl(${360 - intensity * 60}, 100%, ${50 + intensity * 30}%)`, // Red gradient
    o3: `hsl(${60 - intensity * 20}, 100%, ${50 + intensity * 30}%)`, // Yellow gradient
    no2: `hsl(${120 - intensity * 40}, 100%, ${50 + intensity * 30}%)`, // Green gradient
  }
  return colors[pollutant] || "#ffffff"
}

function getMaxValue(pollutant: PollutantType): number {
  const maxValues = {
    pm25: 100,
    o3: 200,
    no2: 150,
  }
  return maxValues[pollutant] || 100
}

function getUnit(pollutant: PollutantType): string {
  return "µg/m³"
}
