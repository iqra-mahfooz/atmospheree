import { useMood } from '@/hooks/useMood';
import { moodThemes } from '@/lib/moods';
import type { MoodType } from '@/types';

export const MoodSelector: React.FC = () => {
  const { currentMood, setMood, isAutoMood, setIsAutoMood } = useMood();

  return (
    <div className="relative z-10">
      <div
        className="rounded-2xl p-4 backdrop-blur-xl border transition-all duration-500"
        style={{
          backgroundColor: currentMood.colors.surface,
          borderColor: `${currentMood.colors.primary}40`,
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: currentMood.colors.textMuted }}
          >
            Mood Control
          </h3>
          <button
            onClick={() => setIsAutoMood(!isAutoMood)}
            className="text-xs px-3 py-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: isAutoMood ? currentMood.colors.primary : 'transparent',
              color: isAutoMood ? '#fff' : currentMood.colors.textMuted,
              border: `1px solid ${currentMood.colors.primary}`,
            }}
          >
            {isAutoMood ? 'Auto' : 'Manual'}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(moodThemes) as MoodType[]).map((mood) => (
            <button
              key={mood}
              onClick={() => setMood(mood)}
              className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor:
                  currentMood.id === mood
                    ? moodThemes[mood].colors.primary
                    : `${moodThemes[mood].colors.primary}20`,
                color:
                  currentMood.id === mood
                    ? '#fff'
                    : moodThemes[mood].colors.text,
              }}
            >
              <span className="text-lg">{moodThemes[mood].emoji}</span>
              <span className="text-xs font-medium">{moodThemes[mood].name}</span>
            </button>
          ))}
        </div>

        <p
          className="text-xs text-center mt-3 italic"
          style={{ color: currentMood.colors.textMuted }}
        >
          {isAutoMood
            ? 'Mood adapts automatically to weather'
            : `Current mood: ${currentMood.description}`}
        </p>
      </div>
    </div>
  );
};
