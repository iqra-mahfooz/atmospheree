import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { MoodType, MoodTheme } from '@/types';
import { moodThemes, getMoodByWeather } from '@/lib/moods';

interface MoodContextType {
  currentMood: MoodTheme;
  setMood: (mood: MoodType) => void;
  setMoodByWeather: (weatherCode: number, isDay: boolean) => void;
  isAutoMood: boolean;
  setIsAutoMood: (auto: boolean) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentMood, setCurrentMood] = useState<MoodTheme>(moodThemes.calm);
  const [isAutoMood, setIsAutoMood] = useState(true);

  const setMood = useCallback((mood: MoodType) => {
    setCurrentMood(moodThemes[mood]);
    setIsAutoMood(false);
  }, []);

  const setMoodByWeatherCallback = useCallback((weatherCode: number, isDay: boolean) => {
    if (isAutoMood) {
      const moodType = getMoodByWeather(weatherCode, isDay);
      setCurrentMood(moodThemes[moodType]);
    }
  }, [isAutoMood]);

  return (
    <MoodContext.Provider
      value={{
        currentMood,
        setMood,
        setMoodByWeather: setMoodByWeatherCallback,
        isAutoMood,
        setIsAutoMood,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};
