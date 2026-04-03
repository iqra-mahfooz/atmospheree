import { useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';
import { useMood } from '@/hooks/useMood';
import { ParticleBackground } from '@/components/ParticleBackground';
import { MoodSelector } from '@/components/MoodSelector';
import { LocationSearch } from '@/components/LocationSearch';
import { WeatherCard } from '@/components/WeatherCard';
import type { Location } from '@/types';
import { Cloud, Loader2, MapPin } from 'lucide-react';
import './App.css';

function App() {
  const { weather, loading, error, fetchWeather, getUserLocation } = useWeather();
  const { currentMood, setMoodByWeather } = useMood();

  // Get user location on mount
  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  // Update mood based on weather
  useEffect(() => {
    if (weather) {
      setMoodByWeather(weather.current.weatherCode, weather.current.isDay);
    }
  }, [weather, setMoodByWeather]);

  const handleLocationSelect = (location: Location) => {
    fetchWeather(location.latitude, location.longitude, location.name);
  };

  return (
    <div
      className="min-h-screen transition-all duration-1000"
      style={{
        background: currentMood.gradient,
      }}
    >
      {/* Particle Effects */}
      <ParticleBackground />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-xl"
              style={{
                backgroundColor: currentMood.colors.surface,
                border: `1px solid ${currentMood.colors.primary}40`,
              }}
            >
              <Cloud
                className="w-6 h-6"
                style={{ color: currentMood.colors.accent }}
              />
            </div>
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: currentMood.colors.text }}
              >
                Atmosphere
              </h1>
              <p
                className="text-xs"
                style={{ color: currentMood.colors.textMuted }}
              >
                Weather with mood
              </p>
            </div>
          </div>

          <button
            onClick={getUserLocation}
            className="flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-xl transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: currentMood.colors.surface,
              border: `1px solid ${currentMood.colors.primary}40`,
              color: currentMood.colors.text,
            }}
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">My Location</span>
          </button>
        </header>

        {/* Search & Mood Control */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <LocationSearch onLocationSelect={handleLocationSelect} />
          <MoodSelector />
        </div>

        {/* Loading State */}
        {loading && (
          <div
            className="rounded-3xl p-12 backdrop-blur-xl border flex flex-col items-center justify-center"
            style={{
              backgroundColor: currentMood.colors.surface,
              borderColor: `${currentMood.colors.primary}40`,
            }}
          >
            <Loader2
              className="w-12 h-12 animate-spin mb-4"
              style={{ color: currentMood.colors.accent }}
            />
            <p
              className="text-lg"
              style={{ color: currentMood.colors.text }}
            >
              Fetching weather data...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div
            className="rounded-3xl p-8 backdrop-blur-xl border"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              borderColor: 'rgba(239, 68, 68, 0.4)',
            }}
          >
            <p className="text-center text-red-200">{error}</p>
            <button
              onClick={getUserLocation}
              className="mt-4 mx-auto block px-6 py-2 rounded-xl bg-red-500/20 text-red-200 hover:bg-red-500/30 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Weather Display */}
        {weather && !loading && !error && (
          <WeatherCard weather={weather} />
        )}

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p
            className="text-sm"
            style={{ color: currentMood.colors.textMuted }}
          >
            Built with curiosity by Iqra Mahfooz
          </p>
          <p
            className="text-xs mt-1"
            style={{ color: `${currentMood.colors.textMuted}80` }}
          >
            Data provided by Open-Meteo
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
;
