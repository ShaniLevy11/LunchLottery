# 🍴 בתאבון (Beteavon) - Random Restaurant Picker

> **End the "where should we eat?" debate forever!**

A modern, responsive web application that uses geolocation and the Geoapify Places API to find nearby restaurants and randomly select one for you. Perfect for indecisive friend groups, couples, or anyone who spends too much time deciding where to eat.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 📸 Screenshots

<p align="center">
  <img src="images/Screenshot 2026-01-10 211012.png" alt="Example" />
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📍 **Geolocation** | Automatically detects user's location using the Browser Geolocation API |
| 🔍 **Nearby Search** | Finds restaurants within 2km radius using Geoapify Places API |
| 🎲 **Random Selection** | Fairly picks a random restaurant from the results |
| 🗺️ **Interactive Map** | Displays results on a Leaflet map with custom markers |
| 🖼️ **Smart Images** | Shows cuisine-appropriate food images for each restaurant |
| 🌐 **RTL Support** | Full Hebrew language support with right-to-left layout |
| 📱 **Responsive Design** | Works beautifully on desktop, tablet, and mobile |
| 🎨 **Animated UI** | Smooth animations and an eye-catching gradient background |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Next-generation frontend build tool (lightning fast HMR)
- **React-Leaflet** - React components for Leaflet maps
- **CSS3** - Custom animations, gradients, and responsive design

### APIs & Services
- **Geoapify Places API** - Restaurant data and location search
- **Browser Geolocation API** - User location detection
- **OpenStreetMap** - Free map tiles via Leaflet
- **Unsplash** - High-quality food images

### Architecture Patterns
- **Custom Hooks** - `useLocation` for encapsulated geolocation logic
- **Service Layer** - Separated API calls in `/services`
- **Component-Based** - Modular, reusable React components
- **Environment Variables** - Secure API key management with `.env`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/beteavon.git
   cd beteavon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Geoapify API key:
   ```
   VITE_GEOAPIFY_API_KEY=your_api_key_here
   ```
   
   > Get a free API key at [geoapify.com](https://www.geoapify.com/)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
beteavon/
├── public/
├── src/
│   ├── components/
│   │   ├── Map.jsx              # Interactive Leaflet map
│   │   ├── RestaurantCard.jsx   # Restaurant info display
│   │   └── SpinWheel.jsx        # Loading animation
│   ├── hooks/
│   │   └── useLocation.js       # Custom geolocation hook
│   ├── services/
│   │   └── api.js               # Geoapify API integration
│   ├── App.jsx                  # Main application component
│   ├── App.css                  # Application styles
│   ├── index.css                # Global styles & animations
│   └── main.jsx                 # React entry point
├── .env.example                 # Environment template
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```



<p align="center">
  Made with ❤️ to end all food arguments
</p>
