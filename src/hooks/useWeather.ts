import { useState, useCallback } from 'react';
import weatherApi from '../api/weatherApi';
import { CurrentWeather, Forecast } from '../types';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const weatherData = await weatherApi.getCurrentWeatherByCoords(lat, lon);
      setCurrentWeather(weatherData);
      
      const forecastData = await weatherApi.getForecast(lat, lon);
      setForecast(forecastData);
    } catch (err: any) {
      console.error('Error fetching weather by coordinates:', err);
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchWeatherByQuery = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const weatherData = await weatherApi.getCurrentWeatherByQuery(query);
      setCurrentWeather(weatherData);
      
      const { lat, lon } = weatherData.coord;
      const forecastData = await weatherApi.getForecast(lat, lon);
      setForecast(forecastData);
    } catch (err: any) {
      console.error('Error fetching weather by query:', err);
      
      if (err.response?.status === 404) {
        setError('Location not found. Please check the city name and try again.');
      } else {
        setError(err.message || 'Failed to fetch weather data. Please try again.');
      }
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    currentWeather,
    forecast,
    isLoading,
    error,
    fetchWeatherByCoords,
    fetchWeatherByQuery
  };
};