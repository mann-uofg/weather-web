import React from 'react';
import { motion } from 'framer-motion';
import { CurrentWeather } from '../types';
import { 
  Wind, 
  Droplets, 
  EyeIcon, 
  Gauge, 
  CloudRain, 
  CloudSnow, 
  Clock 
} from 'lucide-react';

interface WeatherDetailsProps {
  currentWeather: CurrentWeather;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ currentWeather }) => {
  const detailsItems = [
    {
      icon: <Wind className="w-5 h-5 text-primary-300" />,
      label: 'Wind Speed',
      value: `${currentWeather.wind.speed} m/s`,
      subValue: `Direction: ${currentWeather.wind.deg}°`
    },
    {
      icon: <Droplets className="w-5 h-5 text-primary-300" />,
      label: 'Humidity',
      value: `${currentWeather.main.humidity}%`
    },
    {
      icon: <Gauge className="w-5 h-5 text-primary-300" />,
      label: 'Pressure',
      value: `${currentWeather.main.pressure} hPa`
    },
    {
      icon: <EyeIcon className="w-5 h-5 text-primary-300" />,
      label: 'Visibility',
      value: `${(currentWeather.visibility / 1000).toFixed(1)} km`
    },
    {
      icon: <CloudRain className="w-5 h-5 text-primary-300" />,
      label: 'Rain',
      value: currentWeather.rain?.['1h'] ? `${currentWeather.rain['1h']} mm` : 'None',
      condition: !!currentWeather.rain?.['1h']
    },
    {
      icon: <CloudSnow className="w-5 h-5 text-primary-300" />,
      label: 'Snow',
      value: currentWeather.snow?.['1h'] ? `${currentWeather.snow['1h']} mm` : 'None',
      condition: !!currentWeather.snow?.['1h']
    },
    {
      icon: <Clock className="w-5 h-5 text-primary-300" />,
      label: 'Local Time',
      value: new Date((currentWeather.dt + currentWeather.timezone) * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  ];

  return (
    <div className="rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 overflow-hidden">
      <h3 className="text-lg font-semibold p-4 border-b border-white/10">Weather Details</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {detailsItems.filter(item => item.condition !== false).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2">
              {item.icon}
              <span className="text-sm text-white/70">{item.label}</span>
            </div>
            <div className="font-medium text-lg">{item.value}</div>
            {item.subValue && <div className="text-xs text-white/60 mt-1">{item.subValue}</div>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails