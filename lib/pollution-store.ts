"use client"

import { create } from "zustand"
import type { PollutionData, PollutantType, WindData } from "./types"
import { fetchPollutionData, fetchWindData } from "./api"

interface PollutionStore {
  // Data
  pollutionData: PollutionData[]
  windData: WindData | null

  // UI State
  activeLayers: PollutantType[]
  isLoading: boolean
  isAnimating: boolean
  opacity: number
  locationFilter: string

  // Temporal
  currentTime: number
  timeRange: { start: number; end: number }
  isTimeLapse: boolean
  playbackSpeed: number

  // Actions
  initializeData: () => Promise<void>
  refreshData: () => Promise<void>
  toggleLayer: (layer: PollutantType) => void
  toggleAnimation: () => void
  setOpacity: (opacity: number) => void
  setCurrentTime: (time: number) => void
  toggleTimeLapse: () => void
  setPlaybackSpeed: (speed: number) => void
  setLocationFilter: (filter: string) => void
}

export const usePollutionStore = create<PollutionStore>((set, get) => ({
  // Initial state
  pollutionData: [],
  windData: null,
  activeLayers: ["pm25"],
  isLoading: false,
  isAnimating: false,
  opacity: 0.8,
  currentTime: Date.now(),
  timeRange: {
    start: Date.now() - 24 * 60 * 60 * 1000, // 24 hours ago
    end: Date.now(),
  },
  isTimeLapse: false,
  playbackSpeed: 1,
  locationFilter: "",

  // Actions
  initializeData: async () => {
    set({ isLoading: true })
    try {
      const [pollutionData, windData] = await Promise.all([fetchPollutionData(), fetchWindData()])
      set({
        pollutionData,
        windData,
        isLoading: false,
      })
    } catch (error) {
      console.error("Failed to initialize data:", error)
      set({ isLoading: false })
    }
  },

  refreshData: async () => {
    const { initializeData } = get()
    await initializeData()
  },

  toggleLayer: (layer: PollutantType) => {
    set((state) => ({
      activeLayers: state.activeLayers.includes(layer)
        ? state.activeLayers.filter((l) => l !== layer)
        : [...state.activeLayers, layer],
    }))
  },

  toggleAnimation: () => {
    set((state) => ({ isAnimating: !state.isAnimating }))
  },

  setOpacity: (opacity: number) => {
    set({ opacity })
  },

  setCurrentTime: (currentTime: number) => {
    set({ currentTime })
  },

  toggleTimeLapse: () => {
    set((state) => ({ isTimeLapse: !state.isTimeLapse }))
  },

  setPlaybackSpeed: (playbackSpeed: number) => {
    set({ playbackSpeed })
  },

  setLocationFilter: (filter: string) => {
    set({ locationFilter: filter })
  },
}))
