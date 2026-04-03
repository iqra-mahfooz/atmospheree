import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { useMood } from '@/hooks/useMood';
import type { Location } from '@/types';
import { useWeather } from '@/hooks/useWeather';

interface LocationSearchProps {
  onLocationSelect: (location: Location) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { currentMood } = useMood();
  const { searchLocation } = useWeather();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (query.trim()) {
        setIsSearching(true);
        const locations = await searchLocation(query);
        setResults(locations);
        setIsOpen(locations.length > 0);
        setIsSearching(false);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, searchLocation]);

  const handleSelect = (location: Location) => {
    onLocationSelect(location);
    setQuery(location.name);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative z-20">
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300"
        style={{
          backgroundColor: currentMood.colors.surface,
          borderColor: `${currentMood.colors.primary}40`,
        }}
      >
        <MapPin
          className="w-5 h-5 flex-shrink-0"
          style={{ color: currentMood.colors.accent }}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && results.length > 0 && setIsOpen(true)}
          placeholder="Search location..."
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: currentMood.colors.text }}
        />
        {isSearching ? (
          <Loader2
            className="w-5 h-5 animate-spin flex-shrink-0"
            style={{ color: currentMood.colors.textMuted }}
          />
        ) : (
          <Search
            className="w-5 h-5 flex-shrink-0"
            style={{ color: currentMood.colors.textMuted }}
          />
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-2xl backdrop-blur-xl border overflow-hidden shadow-2xl"
          style={{
            backgroundColor: currentMood.colors.surface,
            borderColor: `${currentMood.colors.primary}40`,
          }}
        >
          {results.map((location, index) => (
            <button
              key={`${location.name}-${location.latitude}-${index}`}
              onClick={() => handleSelect(location)}
              className="w-full px-4 py-3 text-left transition-all duration-200 hover:brightness-110 flex items-center gap-3"
              style={{
                borderBottom:
                  index < results.length - 1
                    ? `1px solid ${currentMood.colors.primary}20`
                    : 'none',
              }}
            >
              <MapPin
                className="w-4 h-4 flex-shrink-0"
                style={{ color: currentMood.colors.accent }}
              />
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: currentMood.colors.text }}
                >
                  {location.name}
                </p>
                {location.country && (
                  <p
                    className="text-xs"
                    style={{ color: currentMood.colors.textMuted }}
                  >
                    {location.country}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
