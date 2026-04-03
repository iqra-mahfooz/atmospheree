import { useMood } from '@/hooks/useMood';
import type { WeatherData } from '@/types';
import { weatherCodes } from '@/lib/moods';
import { Droplets, Wind, Eye, Gauge, Thermometer, Navigation } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const { currentMood } = useMood();
  const weatherInfo = weatherCodes[weather.current.weatherCode] || { label: 'Unknown', icon: '❓' };

  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className="relative z-10">
      {/* Main Weather Display */}
      <div
        className="rounded-3xl p-6 md:p-8 backdrop-blur-xl border transition-all duration-500"
        style={{
          backgroundColor: currentMood.colors.surface,
          borderColor: `${currentMood.colors.primary}40`,
        }}
      >
        {/* Location & Time */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: currentMood.colors.text }}
            >
              {weather.location.name}
            </h2>
            <p
              className="text-sm mt-1"
              style={{ color: currentMood.colors.textMuted }}
            >
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div
            className="px-4 py-2 rounded-full text-sm font-medium"
            style={{
              backgroundColor: `${currentMood.colors.primary}30`,
              color: currentMood.colors.text,
            }}
          >
            {weather.current.isDay ? '☀️ Day' : '🌙 Night'}
          </div>
        </div>

        {/* Main Temperature */}
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <span className="text-7xl md:text-9xl font-light">
              {weatherInfo.icon}
            </span>
            <div className="mt-4">
              <span
                className="text-6xl md:text-8xl font-bold"
                style={{ color: currentMood.colors.text }}
              >
                {Math.round(weather.current.temperature)}°
              </span>
              <p
                className="text-lg md:text-xl mt-2 capitalize"
                style={{ color: currentMood.colors.textMuted }}
              >
                {weatherInfo.label}
              </p>
            </div>
          </div>
        </div>

        {/* Feels Like */}
        <div className="text-center mb-8">
          <span
            className="text-sm"
            style={{ color: currentMood.colors.textMuted }}
          >
            Feels like{' '}
            <span
              className="font-semibold"
              style={{ color: currentMood.colors.accent }}
            >
              {Math.round(weather.current.feelsLike)}°
            </span>
          </span>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <DetailCard
            icon={<Droplets className="w-5 h-5" />}
            label="Humidity"
            value={`${weather.current.humidity}%`}
          />
          <DetailCard
            icon={<Wind className="w-5 h-5" />}
            label="Wind"
            value={`${Math.round(weather.current.windSpeed)} km/h`}
            subValue={getWindDirection(weather.current.windDirection)}
          />
          <DetailCard
            icon={<Gauge className="w-5 h-5" />}
            label="Pressure"
            value={`${Math.round(weather.current.pressure)} hPa`}
          />
          <DetailCard
            icon={<Eye className="w-5 h-5" />}
            label="Visibility"
            value={`${weather.current.visibility} km`}
          />
          <DetailCard
            icon={<Thermometer className="w-5 h-5" />}
            label="UV Index"
            value={weather.current.uvIndex.toString()}
          />
          <DetailCard
            icon={<Navigation className="w-5 h-5" style={{ transform: `rotate(${weather.current.windDirection}deg)` }} />}
            label="Direction"
            value={getWindDirection(weather.current.windDirection)}
          />
        </div>
      </div>

      {/* Hourly Forecast */}
      <div
        className="mt-4 rounded-3xl p-6 backdrop-blur-xl border transition-all duration-500"
        style={{
          backgroundColor: currentMood.colors.surface,
          borderColor: `${currentMood.colors.primary}40`,
        }}
      >
        <h3
          className="text-sm font-semibold uppercase tracking-wider mb-4"
          style={{ color: currentMood.colors.textMuted }}
        >
          24-Hour Forecast
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          {weather.hourly.map((hour, index) => (
            <div
              key={hour.time}
              className="flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl"
              style={{
                backgroundColor:
                  index === 0
                    ? `${currentMood.colors.primary}30`
                    : 'transparent',
              }}
            >
              <span
                className="text-xs"
                style={{ color: currentMood.colors.textMuted }}
              >
                {formatTime(hour.time)}
              </span>
              <span className="text-xl">
                {weatherCodes[hour.weatherCode]?.icon || '❓'}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: currentMood.colors.text }}
              >
                {Math.round(hour.temperature)}°
              </span>
              {hour.precipitationProbability > 0 && (
                <span
                  className="text-xs"
                  style={{ color: currentMood.colors.accent }}
                >
                  💧 {hour.precipitationProbability}%
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div
        className="mt-4 rounded-3xl p-6 backdrop-blur-xl border transition-all duration-500"
        style={{
          backgroundColor: currentMood.colors.surface,
          borderColor: `${currentMood.colors.primary}40`,
        }}
      >
        <h3
          className="text-sm font-semibold uppercase tracking-wider mb-4"
          style={{ color: currentMood.colors.textMuted }}
        >
          7-Day Forecast
        </h3>
        <div className="space-y-3">
          {weather.daily.map((day, index) => (
            <div
              key={day.date}
              className="flex items-center justify-between py-2"
              style={{
                borderBottom:
                  index < weather.daily.length - 1
                    ? `1px solid ${currentMood.colors.primary}20`
                    : 'none',
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-sm font-medium w-20"
                  style={{ color: currentMood.colors.text }}
                >
                  {index === 0
                    ? 'Today'
                    : new Date(day.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                      })}
                </span>
                <span className="text-xl">
                  {weatherCodes[day.weatherCode]?.icon || '❓'}
                </span>
              </div>
              <div className="flex items-center gap-4">
                {day.precipitationProbability > 0 && (
                  <span
                    className="text-xs"
                    style={{ color: currentMood.colors.accent }}
                  >
                    💧 {day.precipitationProbability}%
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: currentMood.colors.text }}
                  >
                    {Math.round(day.maxTemp)}°
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: currentMood.colors.textMuted }}
                  >
                    {Math.round(day.minTemp)}°
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface DetailCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ icon, label, value, subValue }) => {
  const { currentMood } = useMood();

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl"
      style={{ backgroundColor: `${currentMood.colors.primary}15` }}
    >
      <div style={{ color: currentMood.colors.accent }}>{icon}</div>
      <div>
        <p
          className="text-xs uppercase tracking-wider"
          style={{ color: currentMood.colors.textMuted }}
        >
          {label}
        </p>
        <p className="flex items-center gap-1">
          <span
            className="text-sm font-semibold"
            style={{ color: currentMood.colors.text }}
          >
            {value}
          </span>
          {subValue && (
            <span
              className="text-xs"
              style={{ color: currentMood.colors.textMuted }}
            >
              {subValue}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
