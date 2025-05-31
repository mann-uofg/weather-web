import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface CloudsAnimationProps {
  cloudiness: number; // 0-100 from API
}

const CloudsAnimation: React.FC<CloudsAnimationProps> = ({ cloudiness }) => {
  // Calculate number of clouds based on cloudiness percentage
  const normalizedCloudiness = Math.min(Math.max(cloudiness, 0), 100);
  const numberOfClouds = Math.round(normalizedCloudiness / 10) + 2;
  
  const clouds = useMemo(() => {
    return Array.from({ length: numberOfClouds }).map((_, index) => {
      const scale = Math.random() * 0.5 + 0.5;
      const duration = Math.random() * 30 + 80;
      const top = `${Math.random() * 60}%`;
      const delay = Math.random() * 40;
      const opacity = Math.random() * 0.3 + 0.1;
      
      return {
        id: `cloud-${index}`,
        scale,
        duration,
        top,
        delay,
        opacity
      };
    });
  }, [numberOfClouds]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ 
            x: '100vw',
            opacity: cloud.opacity
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            delay: cloud.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: cloud.top,
            scale: cloud.scale,
          }}
        >
          <div className="relative w-32 h-12">
            <div className="absolute top-0 left-4 w-16 h-16 bg-white rounded-full opacity-80 blur-md"></div>
            <div className="absolute top-1 left-12 w-20 h-14 bg-white rounded-full opacity-90 blur-md"></div>
            <div className="absolute top-2 left-0 w-12 h-12 bg-white rounded-full opacity-70 blur-md"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CloudsAnimation;