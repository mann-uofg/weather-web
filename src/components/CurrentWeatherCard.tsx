import React from 'react';
import { motion } from 'framer-motion';
import { CurrentWeather } from '../types';
import WeatherIcon from './WeatherIcon';
import { getWeatherType } from '../utils/weatherUtils';
import { Thermometer, Wind, Droplets } from 'lucide-react';

interface CurrentWeatherCardProps {
  currentWeather: CurrentWeather;
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ currentWeather }) => {
  const weatherType = getWeatherType(currentWeather.weather[0].main);
  
  return (
    <div className="relative overflow-hidden rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/20 to-white/10 border border-white/20 shadow-lg">
      <div className="absolute inset-0 z-0 opacity-20">
        {weatherType === 'rain' && (
          <div className="absolute inset-0 bg-primary-800/20"></div>
        )}
        {weatherType === 'clear' && (
          <div className="absolute inset-0 bg-accent-500/10"></div>
        )}
        {weatherType === 'clouds' && (
          <div className="absolute inset-0 bg-gray-500/20"></div>
        )}
        {weatherType === 'snow' && (
          <div className="absolute inset-0 bg-blue-100/20"></div>
        )}
      </div>
      
      <div className="relative z-10 p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="flex items-center gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
              className="w-24 h-24 md:w-32 md:h-32"
            >
              <WeatherIcon 
                weatherType={weatherType} 
                animate={true} 
                className="w-full h-full" 
              />
            </motion.div>
            
            <div className="text-center md:text-left">
              <h3 className="text-4xl md:text-6xl font-display font-bold">{Math.round(currentWeather.main.temp)}°C</h3>
              <p className="text-white/80 capitalize text-lg mt-2">
                {currentWeather.weather[0].description}
              </p>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-3 gap-8 w-full">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2 text-white/70">
                <Thermometer size={20} />
                <span>Feels like</span>
              </div>
              <span className="text-xl font-semibold">{Math.round(currentWeather.main.feels_like)}°C</span>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2 text-white/70">
                <Wind size={20} />
                <span>Wind</span>
              </div>
              <span className="text-xl font-semibold">{Math.round(currentWeather.wind.speed)} m/s</span>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2 text-white/70">
                <Droplets size={20} />
                <span>Humidity</span>
              </div>
              <span className="text-xl font-semibold">{currentWeather.main.humidity}%</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block md:w-1/3 text-center">
          <div className="flex flex-col items-center justify-center gap-6">
            <div>
              <div className="text-sm text-white/70 mb-2">Min / Max</div>
              <div className="flex items-center gap-4 text-2xl font-medium">
                <span>{Math.round(currentWeather.main.temp_min)}°</span>
                <span className="text-white/40">|</span>
                <span>{Math.round(currentWeather.main.temp_max)}°</span>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-white/70 mb-2">Sunrise / Sunset</div>
              <div className="flex items-center gap-4 text-lg">
                <span>
                  {new Date((currentWeather.sys.sunrise + currentWeather.timezone) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="text-white/40">|</span>
                <span>
                  {new Date((currentWeather.sys.sunset + currentWeather.timezone) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard