// Weather Types
export interface WeatherData {
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    pressure: number;
    uvIndex: number;
    visibility: number;
    weatherCode: number;
    isDay: boolean;
  };
  daily: DailyForecast[];
  hourly: HourlyForecast[];
  location: {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
  };
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  precipitationProbability: number;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  weatherCode: number;
  precipitationProbability: number;
}

// Mood Types
export type MoodType = 'calm' | 'energetic' | 'focused' | 'cozy' | 'dreamy' | 'stormy';

export interface MoodTheme {
  id: MoodType;
  name: string;
  emoji: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
  };
  gradient: string;
  particleEffect?: string;
}

export interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}
