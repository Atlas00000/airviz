"use client"

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-red-500 rounded-full animate-spin animation-delay-150"></div>
      </div>
      <div className="text-center">
        <div className="text-lg font-semibold text-white">Loading Air Quality Data</div>
        <div className="text-sm text-gray-400">Fetching real-time pollution measurements...</div>
      </div>
    </div>
  )
}
