import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onLocationDetected?: (coords: { lat: number; lon: number }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, onSubmit, onLocationDetected }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClearSearch = () => {
    setSearchQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="w-full max-w-2xl mx-auto mt-6"
    >
      <form 
        onSubmit={onSubmit}
        className={`relative group ${isFocused ? 'ring-2 ring-primary-400' : ''}`}
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="w-5 h-5 text-gray-300" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full pl-12 pr-28 py-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all duration-300"
          placeholder="Search for a city..."
        />
        
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-24 flex items-center pr-4 text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
        
        <button
          type="button"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                // Now using the position parameter to pass coordinates to parent
                if (onLocationDetected) {
                  onLocationDetected({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                  });
                }
              }, (error) => {
                // Handle geolocation errors
                console.error("Error getting location:", error.message);
              });
            }
          }}
          className="absolute right-16 inset-y-0 flex items-center pr-4 text-gray-300 hover:text-white"
          title="Use current location"
        >
          <MapPin className="w-5 h-5" />
        </button>
        
        {/* Added search button */}
        <button
          type="submit"
          className="absolute right-0 inset-y-0 px-4 bg-primary-600 hover:bg-primary-700 rounded-r-xl flex items-center justify-center text-white transition-colors"
          title="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  );
};

export default SearchBar;