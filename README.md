
# ✨ Mood Weather App

A visually engaging **weather-based mood app** that dynamically adapts its UI based on your local weather or allows you to manually select moods. Built with **React, TypeScript, and Tailwind CSS**, it combines smooth particle effects, glassmorphism UI, and dynamic gradients for a calm and immersive experience.

![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)
![Open-Meteo](https://img.shields.io/badge/-Open--Meteo-4FC08D?style=flat-square)

---

## ✨ Features Built

### 🎨 Mood Control System

| Mood       | Emoji | Description               | Effect                |
|-----------|-------|---------------------------|----------------------|
| Calm      | 🌊    | Peaceful ocean breeze      | Floating bubbles     |
| Energetic | ⚡    | Vibrant and dynamic        | Spark particles      |
| Focused   | 🎯    | Clear and concentrated     | Gentle particles     |
| Cozy      | 🔥    | Warm and comfortable       | Rising embers        |
| Dreamy    | ✨    | Soft and ethereal          | Twinkling stars      |
| Stormy    | ⛈️    | Intense and powerful       | Falling rain         |

---

### 🌦️ Weather Features

- **Current Weather:** Temperature, feels-like, conditions  
- **Detailed Metrics:** Humidity, wind speed, pressure, visibility, UV index  
- **24-Hour Forecast:** Hourly temperature and precipitation  
- **7-Day Forecast:** Daily highs/lows with weather icons  
- **Location Search:** Search any city worldwide  
- **Geolocation:** Auto-detect your location  

---

### 🎭 Smart Mood Adaptation

- **Auto Mode:** Mood automatically adapts to current weather  
  - ☀️ Sunny → Energetic  
  - 🌧️ Rainy → Focused  
  - ❄️ Snowy → Cozy  
  - ⛈️ Stormy → Stormy  
  - 🌙 Night → Dreamy  
- **Manual Mode:** Choose any mood you prefer  

---

### 🎨 Visual Effects

- **Particle Backgrounds:** Animated particles matching each mood  
- **Glassmorphism UI:** Beautiful frosted glass cards  
- **Dynamic Gradients:** Background colors change with mood  
- **Smooth Transitions:** 1-second color transitions between moods  

---

### 🛠️ Tech Stack

- **React + TypeScript** – component-based architecture with type safety  
- **Tailwind CSS** – styling and responsive design  
- **shadcn/ui** – ready-to-use UI components  
- **Open-Meteo API** – free weather data  
- **Canvas API** – custom particle effects  

---

### 📁 Project Files

```

/mnt/okcomputer/output/app/
├── src/
│   ├── components/
│   │   ├── ParticleBackground.tsx  # Animated particles
│   │   ├── MoodSelector.tsx        # Mood control UI
│   │   ├── LocationSearch.tsx      # City search
│   │   └── WeatherCard.tsx         # Weather display
│   ├── hooks/
│   │   ├── useWeather.ts           # Weather API hook
│   │   └── useMood.tsx             # Mood state management
│   ├── lib/
│   │   └── moods.ts                # Mood themes config
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   ├── App.tsx                     # Main app
│   └── App.css                     # Custom styles

````

---

### 🚀 How to Run

1. Clone the repository:  
```bash
git clone https://github.com/your-username/mood-weather-app.git
cd mood-weather-app
````

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open `http://localhost:3000` in your browser.

> Try it out — search for your city and play with the mood controls! The app automatically adapts the visual theme based on weather conditions, or you can manually select a mood to change the ambiance. 🎨

---

### 🌟 Possible Improvements

* Cloud sync for multi-device access
* User authentication
* More particle effect types
* Advanced weather analytics and filtering

---

### 👤 Author

**Iqra Mahfooz**
[GitHub Profile](https://github.com/your-username)

````

---



