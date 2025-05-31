import React from 'react';
import { WeatherIconProps } from '../types';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudFog, 
  CloudDrizzle 
} from 'lucide-react';
import { motion } from 'framer-motion';

const WeatherIcon: React.FC<WeatherIconProps> = ({ weatherType, className = '', animate = false }) => {
  let Icon;
  let color = 'text-white';
  let animationProps = {};
  
  switch (weatherType) {
    case 'clear':
      Icon = Sun;
      color = 'text-accent-400';
      animationProps = animate ? {
        rotate: [0, 10, 0, -10, 0],
        scale: [1, 1.1, 1, 1.1, 1],
      } : {};
      break;
      
    case 'clouds':
      Icon = Cloud;
      color = 'text-gray-300';
      animationProps = animate ? {
        y: [0, -5, 0],
        x: [0, 3, 0, -3, 0],
      } : {};
      break;
      
    case 'rain':
      Icon = CloudRain;
      color = 'text-blue-300';
      animationProps = animate ? {
        y: [0, -3, 0],
      } : {};
      break;
      
    case 'drizzle':
      Icon = CloudDrizzle;
      color = 'text-blue-200';
      animationProps = animate ? {
        y: [0, -2, 0],
      } : {};
      break;
      
    case 'thunderstorm':
      Icon = CloudLightning;
      color = 'text-accent-300';
      animationProps = animate ? {
        scale: [1, 1.1, 1],
        opacity: [1, 0.9, 1],
      } : {};
      break;
      
    case 'snow':
      Icon = CloudSnow;
      color = 'text-blue-100';
      animationProps = animate ? {
        y: [0, -4, 0],
        rotate: [0, 5, 0, -5, 0],
      } : {};
      break;
      
    case 'mist':
    case 'fog':
    case 'haze':
      Icon = CloudFog;
      color = 'text-gray-300';
      animationProps = animate ? {
        opacity: [0.8, 1, 0.8],
      } : {};
      break;
      
    default:
      Icon = Sun;
      color = 'text-accent-400';
  }
  
  return (
    <motion.div
      animate={animate ? animationProps : {}}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className={`${className} ${color}`}
    >
      <Icon className="w-full h-full" strokeWidth={1.5} />
    </motion.div>
  );
};

export default WeatherIcon;