import React from 'react';
import { motion } from 'framer-motion';
import { ForecastItem } from '../types';
import WeatherIcon from './WeatherIcon';
import { getWeatherType } from '../utils/weatherUtils';
import { formatDay } from '../utils/dateUtils';

interface ForecastListProps {
  forecasts: ForecastItem[];
  timezone: number;
}

const ForecastList: React.FC<ForecastListProps> = ({ forecasts, timezone }) => {
  return (
    <div className="rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 overflow-hidden">
      <h3 className="text-lg font-semibold p-4 border-b border-white/10">5-Day Forecast</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-x divide-white/10">
        {forecasts.map((forecast, index) => {
          const weatherType = getWeatherType(forecast.weather[0].main);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 flex flex-col items-center ${index === 0 ? 'bg-white/5' : ''}`}
            >
              <div className="text-sm font-medium mb-3">
                {formatDay(forecast.dt, timezone)}
              </div>
              
              <WeatherIcon weatherType={weatherType} className="w-14 h-14 my-3" animate />
              
              <div className="mt-3 text-center">
                <div className="text-2xl font-semibold">{Math.round(forecast.main.temp)}°C</div>
                <div className="text-sm text-white/70 capitalize mt-1">{forecast.weather[0].description}</div>
              </div>
              
              <div className="mt-4 flex items-center justify-between w-full text-sm text-white/60">
                <span>{Math.round(forecast.main.temp_min)}°</span>
                <span className="mx-2">|</span>
                <span>{Math.round(forecast.main.temp_max)}°</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastList