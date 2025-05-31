import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface SnowAnimationProps {
  intensity?: number;
}

const SnowAnimation: React.FC<SnowAnimationProps> = ({ intensity = 1 }) => {
  // Calculate number of snowflakes based on intensity (1-10)
  const normalizedIntensity = Math.min(Math.max(intensity, 1), 10);
  const numberOfFlakes = Math.round(normalizedIntensity * 15);
  
  const snowflakes = useMemo(() => {
    return Array.from({ length: numberOfFlakes }).map((_, index) => {
      const size = Math.random() * 6 + 2;
      const duration = Math.random() * 15 + 10;
      const left = `${Math.random() * 100}%`;
      const delay = Math.random() * 5;
      const rotationSpeed = Math.random() * 5 + 2;
      
      return {
        id: `flake-${index}`,
        size,
        duration,
        left,
        delay,
        rotationSpeed
      };
    });
  }, [numberOfFlakes]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          initial={{ y: -20, x: 0, opacity: 0, rotate: 0 }}
          animate={{ 
            y: '105vh',
            x: [
              '0%', 
              `${Math.random() * 20 - 10}%`, 
              `${Math.random() * 20 - 10}%`, 
              `${Math.random() * 20 - 10}%`, 
              '0%'
            ],
            opacity: [0, 0.8, 0.8, 0.6, 0],
            rotate: 360
          }}
          transition={{
            duration: flake.duration,
            repeat: Infinity,
            delay: flake.delay,
            ease: 'linear',
            rotate: {
              duration: flake.rotationSpeed,
              repeat: Infinity,
              ease: 'linear'
            }
          }}
          style={{
            position: 'absolute',
            left: flake.left,
            top: -20,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            filter: 'blur(0.5px)'
          }}
        />
      ))}
    </div>
  );
};

export default SnowAnimation;