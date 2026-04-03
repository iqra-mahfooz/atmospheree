import { useState, useCallback } from 'react';
import type { WeatherData, Location } from '@/types';

const API_BASE = 'https://api.open-meteo.com/v1';
const GEO_API = 'https://geocoding-api.open-meteo.com/v1/search';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (lat: number, lon: number, locationName?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=7`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();

      const weatherData: WeatherData = {
        current: {
          temperature: data.current.temperature_2m,
          feelsLike: data.current.apparent_temperature,
          humidity: data.current.relative_humidity_2m,
          windSpeed: data.current.wind_speed_10m,
          windDirection: data.current.wind_direction_10m,
          pressure: data.current.pressure_msl,
          uvIndex: 0, // Open-Meteo doesn't provide UV in free tier
          visibility: 10, // Approximate
          weatherCode: data.current.weather_code,
          isDay: data.current.is_day === 1,
        },
        daily: data.daily.time.map((time: string, index: number) => ({
          date: time,
          maxTemp: data.daily.temperature_2m_max[index],
          minTemp: data.daily.temperature_2m_min[index],
          weatherCode: data.daily.weather_code[index],
          precipitationProbability: data.daily.precipitation_probability_max[index],
        })),
        hourly: data.hourly.time.slice(0, 24).map((time: string, index: number) => ({
          time,
          temperature: data.hourly.temperature_2m[index],
          weatherCode: data.hourly.weather_code[index],
          precipitationProbability: data.hourly.precipitation_probability[index],
        })),
        location: {
          name: locationName || 'Unknown Location',
          country: '',
          latitude: lat,
          longitude: lon,
        },
      };

      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchLocation = useCallback(async (query: string): Promise<Location[]> => {
    if (!query.trim()) return [];

    try {
      const response = await fetch(`${GEO_API}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
      
      if (!response.ok) {
        throw new Error('Failed to search location');
      }

      const data = await response.json();
      
      if (!data.results) return [];

      return data.results.map((result: { name: string; country?: string; latitude: number; longitude: number }) => ({
        name: result.name,
        country: result.country || '',
        latitude: result.latitude,
        longitude: result.longitude,
      }));
    } catch {
      return [];
    }
  }, []);

  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude, 'Your Location');
      },
      () => {
        setError('Unable to retrieve your location');
        setLoading(false);
        // Default to Lahore, Pakistan
        fetchWeather(31.5204, 74.3587, 'Lahore');
      }
    );
  }, [fetchWeather]);

  return {
    weather,
    loading,
    error,
    fetchWeather,
    searchLocation,
    getUserLocation,
  };
};
