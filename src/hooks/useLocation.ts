import { useState, useCallback } from 'react';
import weatherApi from '../api/weatherApi';
import { Location } from '../types';

export const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const getLocation = useCallback(async () => {
    setIsLoadingLocation(true);
    setLocationError(null);
    
    try {
      // Try to get location from browser geolocation API
      if (navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000, // Increased timeout to 10 seconds
            maximumAge: 0
          });
        });
        
        const { latitude, longitude } = position.coords;
        setCurrentLocation({
          lat: latitude,
          lon: longitude
        });
      } else {
        throw new Error('Geolocation is not supported by this browser.');
      }
    } catch (err: any) {
      console.error('Error getting location:', err);
      
      // Set a default location (New York) if geolocation fails
      setCurrentLocation({
        lat: 40.7128,
        lon: -74.0060,
        name: 'New York',
        country: 'US'
      });
      
      if (err.code === 1) { // Permission denied
        setLocationError('Location access was denied. Using default location.');
      } else if (err.code === 3) { // Timeout
        setLocationError('Location request timed out. Using default location.');
      } else {
        setLocationError('Could not get your location. Using default location.');
      }
    } finally {
      setIsLoadingLocation(false);
    }
  }, []);

  const searchLocation = useCallback(async (query: string) => {
    setIsLoadingLocation(true);
    setLocationError(null);
    
    try {
      const geocodingResults = await weatherApi.getGeocoding(query);
      
      if (geocodingResults && geocodingResults.length > 0) {
        const firstResult = geocodingResults[0];
        setCurrentLocation({
          lat: firstResult.lat,
          lon: firstResult.lon,
          name: firstResult.name,
          country: firstResult.country
        });
      } else {
        throw new Error('Location not found');
      }
    } catch (err) {
      console.error('Error searching location:', err);
      setLocationError('Could not find the location. Please try a different query.');
    } finally {
      setIsLoadingLocation(false);
    }
  }, []);

  return {
    currentLocation,
    isLoadingLocation,
    locationError,
    getLocation,
    searchLocation
  };
};