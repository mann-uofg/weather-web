import React from 'react';
import { motion } from 'framer-motion';

const FogAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Fog layers with different movement speeds */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gray-400/30 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration: 120,
          ease: 'linear'
        }}
        className="absolute inset-y-0 w-[200%] left-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{ filter: 'blur(8px)' }}
      />
      
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{
          repeat: Infinity,
          duration: 180,
          ease: 'linear'
        }}
        className="absolute inset-y-0 w-[200%] left-0 top-1/4 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{ filter: 'blur(12px)' }}
      />
      
      {/* Pulsing fog areas */}
      <motion.div
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: 'easeInOut'
        }}
        className="absolute left-1/4 top-1/3 w-64 h-64 rounded-full bg-white/20"
        style={{ filter: 'blur(24px)' }}
      />
      
      <motion.div
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.05, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: 'easeInOut',
          delay: 3
        }}
        className="absolute right-1/4 bottom-1/3 w-80 h-80 rounded-full bg-white/15"
        style={{ filter: 'blur(30px)' }}
      />
    </div>
  );
};

export default FogAnimation;