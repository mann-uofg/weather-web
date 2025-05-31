import axios from 'axios';
import { CurrentWeather, Forecast } from '../types';

// Use environment variable for API key
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Check if API key is available
if (!API_KEY) {
  console.error('OpenWeather API key is not configured. Please set VITE_OPENWEATHER_API_KEY in your environment variables.');
}

const weatherApi = {
  getCurrentWeatherByCoords: async (lat: number, lon: number): Promise<CurrentWeather> => {
    if (!API_KEY) {
      throw new Error('OpenWeather API key is not configured');
    }
    
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeather API configuration.');
      }
      console.error('Error fetching current weather by coordinates:', error);
      throw error;
    }
  },

  getCurrentWeatherByQuery: async (query: string): Promise<CurrentWeather> => {
    if (!API_KEY) {
      throw new Error('OpenWeather API key is not configured');
    }
    
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: query,
          appid: API_KEY,
          units: 'metric'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeather API configuration.');
      }
      console.error('Error fetching current weather by query:', error);
      throw error;
    }
  },

  getForecast: async (lat: number, lon: number): Promise<Forecast> => {
    if (!API_KEY) {
      throw new Error('OpenWeather API key is not configured');
    }
    
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeather API configuration.');
      }
      console.error('Error fetching forecast:', error);
      throw error;
    }
  },

  getGeocoding: async (query: string): Promise<any[]> => {
    if (!API_KEY) {
      throw new Error('OpenWeather API key is not configured');
    }
    
    try {
      const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
        params: {
          q: query,
          limit: 5,
          appid: API_KEY
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeather API configuration.');
      }
      console.error('Error fetching geocoding data:', error);
      throw error;
    }
  }
};

export default weatherApi;