import type { MoodTheme, MoodType } from '@/types';

export const moodThemes: Record<MoodType, MoodTheme> = {
  calm: {
    id: 'calm',
    name: 'Calm',
    emoji: '🌊',
    description: 'Peaceful ocean breeze',
    colors: {
      primary: '#0EA5E9',
      secondary: '#06B6D4',
      accent: '#22D3EE',
      background: '#0C4A6E',
      surface: 'rgba(14, 165, 233, 0.15)',
      text: '#E0F2FE',
      textMuted: '#7DD3FC',
    },
    gradient: 'linear-gradient(135deg, #0C4A6E 0%, #075985 50%, #0EA5E9 100%)',
    particleEffect: 'bubbles',
  },
  energetic: {
    id: 'energetic',
    name: 'Energetic',
    emoji: '⚡',
    description: 'Vibrant and dynamic',
    colors: {
      primary: '#F59E0B',
      secondary: '#EF4444',
      accent: '#FBBF24',
      background: '#7C2D12',
      surface: 'rgba(245, 158, 11, 0.15)',
      text: '#FEF3C7',
      textMuted: '#FCD34D',
    },
    gradient: 'linear-gradient(135deg, #7C2D12 0%, #B45309 50%, #F59E0B 100%)',
    particleEffect: 'sparks',
  },
  focused: {
    id: 'focused',
    name: 'Focused',
    emoji: '🎯',
    description: 'Clear and concentrated',
    colors: {
      primary: '#10B981',
      secondary: '#14B8A6',
      accent: '#34D399',
      background: '#064E3B',
      surface: 'rgba(16, 185, 129, 0.15)',
      text: '#D1FAE5',
      textMuted: '#6EE7B7',
    },
    gradient: 'linear-gradient(135deg, #064E3B 0%, #065F46 50%, #10B981 100%)',
    particleEffect: 'particles',
  },
  cozy: {
    id: 'cozy',
    name: 'Cozy',
    emoji: '🔥',
    description: 'Warm and comfortable',
    colors: {
      primary: '#F97316',
      secondary: '#EA580C',
      accent: '#FB923C',
      background: '#431407',
      surface: 'rgba(249, 115, 22, 0.15)',
      text: '#FFEDD5',
      textMuted: '#FDBA74',
    },
    gradient: 'linear-gradient(135deg, #431407 0%, #7C2D12 50%, #F97316 100%)',
    particleEffect: 'embers',
  },
  dreamy: {
    id: 'dreamy',
    name: 'Dreamy',
    emoji: '✨',
    description: 'Soft and ethereal',
    colors: {
      primary: '#A855F7',
      secondary: '#EC4899',
      accent: '#E879F9',
      background: '#581C87',
      surface: 'rgba(168, 85, 247, 0.15)',
      text: '#FAE8FF',
      textMuted: '#E9D5FF',
    },
    gradient: 'linear-gradient(135deg, #581C87 0%, #7E22CE 50%, #EC4899 100%)',
    particleEffect: 'stars',
  },
  stormy: {
    id: 'stormy',
    name: 'Stormy',
    emoji: '⛈️',
    description: 'Intense and powerful',
    colors: {
      primary: '#6366F1',
      secondary: '#4F46E5',
      accent: '#818CF8',
      background: '#1E1B4B',
      surface: 'rgba(99, 102, 241, 0.15)',
      text: '#E0E7FF',
      textMuted: '#A5B4FC',
    },
    gradient: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',
    particleEffect: 'rain',
  },
};

export const getMoodByWeather = (weatherCode: number, isDay: boolean): MoodType => {
  // Map weather codes to moods
  if (weatherCode <= 3) {
    // Clear, partly cloudy
    return isDay ? 'energetic' : 'dreamy';
  } else if (weatherCode <= 48) {
    // Foggy
    return 'calm';
  } else if (weatherCode <= 67) {
    // Rainy
    return 'focused';
  } else if (weatherCode <= 77) {
    // Snow
    return 'cozy';
  } else if (weatherCode <= 99) {
    // Stormy
    return 'stormy';
  }
  return 'calm';
};

export const weatherCodes: Record<number, { label: string; icon: string }> = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Foggy', icon: '🌫️' },
  48: { label: 'Depositing rime fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌦️' },
  53: { label: 'Moderate drizzle', icon: '🌦️' },
  55: { label: 'Dense drizzle', icon: '🌧️' },
  61: { label: 'Slight rain', icon: '🌦️' },
  63: { label: 'Moderate rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  71: { label: 'Slight snow', icon: '🌨️' },
  73: { label: 'Moderate snow', icon: '🌨️' },
  75: { label: 'Heavy snow', icon: '❄️' },
  77: { label: 'Snow grains', icon: '🌨️' },
  80: { label: 'Slight rain showers', icon: '🌦️' },
  81: { label: 'Moderate rain showers', icon: '🌧️' },
  82: { label: 'Violent rain showers', icon: '⛈️' },
  85: { label: 'Slight snow showers', icon: '🌨️' },
  86: { label: 'Heavy snow showers', icon: '❄️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
  96: { label: 'Thunderstorm with hail', icon: '⛈️' },
  99: { label: 'Heavy thunderstorm', icon: '⛈️' },
};
