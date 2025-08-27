// components/chatbot/SearchBox.tsx
'use client';

import { useState, KeyboardEvent } from 'react';

interface SearchBoxProps {
  onSearch: (searchTerm: string) => void;
  loading: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && !loading) {
      onSearch(searchTerm.trim());
      setSearchTerm(''); // Clear input after search
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            placeholder="Search categories (e.g., Food, Accommodation, Activity...)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent disabled:bg-gray-100 
                     disabled:cursor-not-allowed"
          />
          
          {/* Search Icon */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !searchTerm.trim()}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 
                   text-white rounded-lg transition-colors duration-200 
                   disabled:cursor-not-allowed font-medium"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {/* Helper Text */}
      <p className="text-sm text-gray-500 mt-2">
        Search for categories like: Accommodation, Food, Activity, Places, Transport, etc.
      </p>
    </div>
  );
};

export default SearchBox;