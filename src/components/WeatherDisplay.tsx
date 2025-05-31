import React from 'react';
import { motion } from 'framer-motion';
import { CurrentWeather, Forecast } from '../types';
import CurrentWeatherCard from './CurrentWeatherCard';
import WeatherDetails from './WeatherDetails';
import ForecastList from './ForecastList';
import { formatDate } from '../utils/dateUtils';

interface WeatherDisplayProps {
  currentWeather: CurrentWeather | null;
  forecast: Forecast | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ currentWeather, forecast }) => {
  if (!currentWeather) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-lg text-white/70">Search for a location to see the weather</p>
      </div>
    );
  }

  const dailyForecasts = forecast?.list.filter((item, index) => {
    const date = new Date(item.dt * 1000);
    return date.getHours() >= 12 && date.getHours() < 15;
  }).slice(0, 5);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex-1 mt-8 flex flex-col gap-6 max-w-7xl mx-auto px-4"
    >
      <motion.div variants={item}>
        <div className="text-center mb-2">
          <h2 className="text-2xl font-display font-bold">{currentWeather.name}, {currentWeather.sys.country}</h2>
          <p className="text-white/70 text-sm">{formatDate(currentWeather.dt, currentWeather.timezone)}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item} className="space-y-6">
          <CurrentWeatherCard currentWeather={currentWeather} />
          <WeatherDetails currentWeather={currentWeather} />
        </motion.div>

        <motion.div variants={item} className="space-y-6">
          {dailyForecasts && dailyForecasts.length > 0 && (
            <ForecastList forecasts={dailyForecasts} timezone={forecast?.city.timezone || 0} />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WeatherDisplay