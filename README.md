# 🌬️ AirViz - Real-time Air Quality Visualization

<div align="center">

![AirViz Logo](https://img.shields.io/badge/AirViz-Real--time%20Air%20Quality-blue?style=for-the-badge&logo=leaflet)
![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

**Interactive air quality data visualization with real-time pollution monitoring**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [Docker](#-docker) • [Development](#-development)

</div>

---

## 📊 Project Overview

AirViz is a modern, interactive web application that provides real-time visualization of air quality data across major cities. Built with Next.js 15 and TypeScript, it offers an intuitive interface for monitoring pollution levels, analyzing trends, and understanding environmental health impacts.

### 🎯 Key Capabilities

- **Real-time Data Visualization**: Live air quality data from OpenAQ API
- **Interactive Mapping**: Leaflet-based maps with pollution heatmaps
- **Multi-pollutant Monitoring**: PM2.5, Ozone (O₃), and Nitrogen Dioxide (NO₂)
- **Location-based Filtering**: Search and filter data by city or location
- **Temporal Analysis**: Time-lapse visualization and historical data viewing
- **Responsive Design**: Works seamlessly on desktop and mobile devices

---

## ✨ Features

### 🗺️ Interactive Map Visualization
- **Dark-themed maps** with pollution heatmaps
- **Real-time data points** with color-coded intensity
- **Clickable markers** with detailed pollution information
- **Wind particle animations** for atmospheric flow visualization

### 🔍 Location Search & Filtering
- **Smart search** by city name or location
- **Quick filter buttons** for major cities
- **Real-time filtering** with instant map updates
- **Results counter** showing filtered data counts

### 📈 Pollution Controls
- **Layer toggles** for different pollutants
- **Opacity controls** for visualization customization
- **Animation controls** for particle effects
- **Data refresh** functionality

### ⏰ Temporal Controls
- **Time slider** for historical data viewing
- **Time-lapse playback** with adjustable speed
- **Quick time jumps** (24h ago, 12h ago, now)
- **Current time display** with formatted timestamps

### 📊 Legend & Analytics
- **AQI color scale** with health impact levels
- **Active pollutant displays** with average values
- **Health impact descriptions** for each pollutant
- **Data source attribution** and update frequency

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5.8** - Type-safe development
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Zustand** - Lightweight state management

### Mapping & Visualization
- **Leaflet** - Interactive maps
- **Canvas API** - Particle animations
- **CSS Animations** - Smooth transitions

### UI Components
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icons
- **Class Variance Authority** - Component variants

### Development Tools
- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Docker** - Containerization

---

## 🚀 Installation

### Prerequisites
- Node.js 20+ 
- pnpm (recommended) or npm
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd airviz
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📖 Usage Guide

### 🗺️ Map Navigation
- **Zoom**: Use mouse wheel or zoom controls
- **Pan**: Click and drag to move around the map
- **Markers**: Click on pollution points for detailed information

### 🔍 Location Filtering
1. Use the **Location Filter** panel on the left
2. Type a city name or location
3. Use **Quick Filters** for major cities
4. Click **Clear Filter** to reset

### 📊 Pollution Controls
1. **Toggle Layers**: Switch between PM2.5, Ozone, and NO₂
2. **Adjust Opacity**: Use the slider for layer transparency
3. **Animation**: Toggle particle effects
4. **Refresh Data**: Get latest measurements

### ⏰ Time Controls
1. **Time Slider**: Drag to view historical data
2. **Time-lapse**: Click play/pause for animated viewing
3. **Speed Control**: Adjust playback speed (0.5x - 4x)
4. **Quick Jumps**: Use preset time buttons

---

## 🐳 Docker

### Build and Run with Docker

```bash
# Build the Docker image
docker build -t airviz .

# Run the container
docker run -p 3000:3000 airviz
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Docker Compose (Optional)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  airviz:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

Run with:
```bash
docker-compose up -d
```

---

## 🏗️ Development

### Project Structure
```
airviz/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main application page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── pollution-map.tsx # Interactive map component
│   ├── location-search.tsx # Location filtering
│   └── ...               # Other feature components
├── lib/                  # Utilities and configurations
│   ├── api.ts           # API functions
│   ├── pollution-store.ts # Zustand store
│   ├── types.ts         # TypeScript definitions
│   └── utils.ts         # Utility functions
├── hooks/               # Custom React hooks
├── styles/              # Additional stylesheets
└── public/              # Static assets
```

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Type checking
npx tsc --noEmit  # Check TypeScript types
```

### Environment Variables

Create a `.env.local` file for local development:

```env
# API Configuration (optional - uses mock data by default)
NEXT_PUBLIC_OPENAQ_API_URL=https://api.openaq.org/v2
```

---

## 📊 Data Sources

### OpenAQ API
AirViz integrates with the [OpenAQ API](https://docs.openaq.org/) to provide real-time air quality data from monitoring stations worldwide.

**Supported Pollutants:**
- **PM2.5** - Fine particulate matter (≤2.5 μm)
- **O₃** - Ground-level ozone
- **NO₂** - Nitrogen dioxide

### Mock Data
When API data is unavailable, the application generates realistic mock data for demonstration purposes.

---

## 🎨 Design System

### Color Palette
- **Primary**: Dark theme with blue accents
- **Pollution Colors**: 
  - PM2.5: Red gradient
  - Ozone: Yellow gradient  
  - NO₂: Green gradient
- **AQI Levels**: Green (Good) → Yellow (Moderate) → Orange (Unhealthy) → Red (Very Unhealthy)

### Typography
- **Font**: System fonts (Arial, Helvetica, sans-serif)
- **Weights**: Regular, Medium, Semibold, Bold
- **Sizes**: Responsive scaling with Tailwind CSS

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add TypeScript types for new features
- Include proper error handling
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenAQ** for providing air quality data
- **Leaflet** for the mapping library
- **shadcn/ui** for the component library
- **Vercel** for Next.js framework

---

<div align="center">

**Made with ❤️ for environmental awareness**

[Report Bug](https://github.com/your-repo/airviz/issues) • [Request Feature](https://github.com/your-repo/airviz/issues) • [Star on GitHub](https://github.com/your-repo/airviz)

</div> 