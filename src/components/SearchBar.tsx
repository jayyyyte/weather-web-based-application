import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onUseLocation: () => void;
}

export function SearchBar({ onSearch, onUseLocation }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 shadow-xl">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-4 py-3 bg-white/20 text-white placeholder-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all"
        >
          Search
        </button>
        <button
          onClick={onUseLocation}
          className="px-6 py-3 bg-green-500/80 hover:bg-green-500 text-white rounded-xl font-semibold transition-all flex items-center gap-2 justify-center"
        >
          <MapPin className="w-5 h-5" />
          My Location
        </button>
      </div>
    </div>
  );
}