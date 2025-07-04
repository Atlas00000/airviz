import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AirViz - Real-time Air Quality Visualization',
  description: 'Interactive air quality data visualization with real-time pollution monitoring',
  generator: 'AirViz',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
