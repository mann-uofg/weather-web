import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CurrentWeather } from '../types';
import { getWeatherType } from '../utils/weatherUtils';
import RainAnimation from './weather-effects/RainAnimation';
import SnowAnimation from './weather-effects/SnowAnimation';
import ThunderAnimation from './weather-effects/ThunderAnimation';
import CloudsAnimation from './weather-effects/CloudsAnimation';
import FogAnimation from './weather-effects/FogAnimation';

interface WeatherBackgroundProps {
  weather: CurrentWeather | null;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ weather }) => {
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('day');
  const [weatherType, setWeatherType] = useState<string | null>(null);
  
  useEffect(() => {
    if (!weather) return;
    
    // Determine if it's day or night based on sunrise/sunset
    const currentTime = weather.dt;
    const sunrise = weather.sys.sunrise;
    const sunset = weather.sys.sunset;
    
    setTimeOfDay(currentTime >= sunrise && currentTime < sunset ? 'day' : 'night');
    
    // Set weather type
    setWeatherType(weather.weather[0].main.toLowerCase());
  }, [weather]);

  if (!weather) return null;
  
  const weatherMainType = getWeatherType(weather.weather[0].main);
  
  // Background colors based on weather and time of day
  let bgGradient = '';
  
  if (timeOfDay === 'day') {
    switch (weatherMainType) {
      case 'clear':
        bgGradient = 'from-blue-500 via-blue-400 to-blue-300';
        break;
      case 'clouds':
        bgGradient = 'from-blue-600 via-blue-400 to-gray-300';
        break;
      case 'rain':
      case 'drizzle':
        bgGradient = 'from-gray-700 via-gray-600 to-gray-500';
        break;
      case 'thunderstorm':
        bgGradient = 'from-gray-900 via-gray-800 to-gray-700';
        break;
      case 'snow':
        bgGradient = 'from-blue-100 via-blue-200 to-gray-100';
        break;
      case 'mist':
      case 'fog':
      case 'haze':
        bgGradient = 'from-gray-400 via-gray-300 to-gray-200';
        break;
      default:
        bgGradient = 'from-blue-500 via-blue-400 to-blue-300';
    }
  } else {
    // Night themes
    switch (weatherMainType) {
      case 'clear':
        bgGradient = 'from-blue-900 via-blue-800 to-indigo-900';
        break;
      case 'clouds':
        bgGradient = 'from-gray-900 via-gray-800 to-blue-900';
        break;
      case 'rain':
      case 'drizzle':
        bgGradient = 'from-gray-900 via-gray-800 to-gray-700';
        break;
      case 'thunderstorm':
        bgGradient = 'from-gray-950 via-gray-900 to-gray-800';
        break;
      case 'snow':
        bgGradient = 'from-blue-900 via-blue-800 to-gray-800';
        break;
      case 'mist':
      case 'fog':
      case 'haze':
        bgGradient = 'from-gray-800 via-gray-700 to-gray-600';
        break;
      default:
        bgGradient = 'from-blue-900 via-blue-800 to-indigo-900';
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`absolute inset-0 bg-gradient-to-b ${bgGradient} z-0`}
      />
      
      <AnimatePresence>
        {weatherMainType === 'rain' && (
          <motion.div
            key="rain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0"
          >
            <RainAnimation intensity={weather.rain?.['1h'] || 1} />
          </motion.div>
        )}
        
        {weatherMainType === 'snow' && (
          <motion.div
            key="snow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0"
          >
            <SnowAnimation intensity={weather.snow?.['1h'] || 1} />
          </motion.div>
        )}
        
        {weatherMainType === 'thunderstorm' && (
          <motion.div
            key="thunder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0"
          >
            <ThunderAnimation />
            <RainAnimation intensity={2} /> {/* Thunderstorms usually come with rain */}
          </motion.div>
        )}
        
        {weatherMainType === 'clouds' && (
          <motion.div
            key="clouds"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0"
          >
            <CloudsAnimation cloudiness={weather.clouds.all} />
          </motion.div>
        )}
        
        {(weatherMainType === 'mist' || weatherMainType === 'fog' || weatherMainType === 'haze') && (
          <motion.div
            key="fog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0"
          >
            <FogAnimation />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeatherBackground;