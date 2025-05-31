import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import debounce from 'lodash.debounce';
import Header from './components/Header';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';
import WeatherBackground from './components/WeatherBackground';
import LoadingScreen from './components/LoadingScreen';
import { useWeather } from './hooks/useWeather';
import { useLocation } from './hooks/useLocation';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const { currentLocation, getLocation, isLoadingLocation, locationError } = useLocation();
  const { 
    currentWeather, 
    forecast, 
    isLoading: isLoadingWeather, 
    error, 
    fetchWeatherByCoords, 
    fetchWeatherByQuery 
  } = useWeather();
  
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        await getLocation();
        setIsInitialLoad(false);
      } catch (error) {
        console.error('Error during initialization:', error);
        setIsInitialLoad(false);
      }
    };

    initApp();
  }, [getLocation]);

  useEffect(() => {
    if (currentLocation && currentLocation.lat && currentLocation.lon) {
      fetchWeatherByCoords(currentLocation.lat, currentLocation.lon);
    }
  }, [currentLocation, fetchWeatherByCoords]);

  // Replace the existing handleSearchQueryChange with this debounced version
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        fetchWeatherByQuery(query);
      }
    }, 500),
    [fetchWeatherByQuery]
  );

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };
  
  const handleSubmitSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await fetchWeatherByQuery(searchQuery);
    }
  };

  const isLoading = isInitialLoad || isLoadingLocation || isLoadingWeather;

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-white">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <WeatherBackground weather={currentWeather} />
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 min-h-screen flex flex-col"
          >
            <Header />
            
            <main className="flex-1 container mx-auto px-4 py-6 flex flex-col">
              <SearchBar 
                searchQuery={searchQuery} 
                setSearchQuery={handleSearchQueryChange} 
                onSubmit={handleSubmitSearch}
                onLocationDetected={(coords) => {
                  fetchWeatherByCoords(coords.lat, coords.lon);
                }} 
              />
              
              {locationError && !error && (
                <div className="mt-8 text-center">
                  <p className="text-amber-400 bg-amber-950/70 px-4 py-3 rounded-lg inline-block backdrop-blur-sm">
                    {locationError}
                  </p>
                </div>
              )}
              
              {error ? (
                <div className="mt-8 text-center">
                  <p className="text-error-400 bg-error-950/70 px-4 py-3 rounded-lg inline-block backdrop-blur-sm">
                    {error}
                  </p>
                </div>
              ) : (
                <WeatherDisplay 
                  currentWeather={currentWeather} 
                  forecast={forecast}
                />
              )}
            </main>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default App;