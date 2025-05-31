import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface RainAnimationProps {
  intensity?: number;
}

const RainAnimation: React.FC<RainAnimationProps> = ({ intensity = 1 }) => {
  // Calculate number of raindrops based on intensity (1-10)
  const normalizedIntensity = Math.min(Math.max(intensity, 1), 10);
  const numberOfDrops = Math.round(normalizedIntensity * 20);
  
  const raindrops = useMemo(() => {
    return Array.from({ length: numberOfDrops }).map((_, index) => {
      const size = Math.random() * 2 + 1;
      const duration = Math.random() * 0.7 + 0.8;
      const left = `${Math.random() * 100}%`;
      const delay = Math.random() * 2;
      
      return {
        id: `drop-${index}`,
        size,
        duration,
        left,
        delay,
        height: `${Math.random() * 10 + 15}px`,
      };
    });
  }, [numberOfDrops]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: '100vh',
            opacity: [0, 1, 1, 0.8, 0.5, 0]
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: drop.left,
            top: -20,
            width: `${drop.size}px`,
            height: drop.height,
            backgroundColor: '#B3E0FF',
            borderRadius: '2px',
            filter: 'blur(0.5px)'
          }}
        />
      ))}
    </div>
  );
};

export default RainAnimation;