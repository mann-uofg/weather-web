import { WeatherType } from '../types';

export const getWeatherType = (weatherMain: string): WeatherType => {
  const lowerCaseWeather = weatherMain.toLowerCase();
  
  switch (lowerCaseWeather) {
    case 'clear':
      return 'clear';
    case 'clouds':
      return 'clouds';
    case 'rain':
      return 'rain';
    case 'drizzle':
      return 'drizzle';
    case 'thunderstorm':
      return 'thunderstorm';
    case 'snow':
      return 'snow';
    case 'mist':
      return 'mist';
    case 'smoke':
      return 'smoke';
    case 'haze':
      return 'haze';
    case 'dust':
      return 'dust';
    case 'fog':
      return 'fog';
    case 'sand':
      return 'sand';
    case 'ash':
      return 'ash';
    case 'squall':
      return 'squall';
    case 'tornado':
      return 'tornado';
    default:
      return 'clear';
  }
};

export const getTemperatureColor = (temp: number): string => {
  if (temp <= -10) return 'text-blue-900';
  if (temp <= 0) return 'text-blue-700';
  if (temp <= 10) return 'text-blue-500';
  if (temp <= 20) return 'text-green-500';
  if (temp <= 25) return 'text-yellow-500';
  if (temp <= 30) return 'text-orange-500';
  return 'text-red-500';
};

export const getWindDirection = (degrees: number): string => {
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 
    'E', 'ESE', 'SE', 'SSE', 
    'S', 'SSW', 'SW', 'WSW', 
    'W', 'WNW', 'NW', 'NNW'
  ];
  
  const index = Math.round((degrees % 360) / 22.5);
  return directions[index % 16];
};