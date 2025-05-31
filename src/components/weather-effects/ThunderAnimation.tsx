import React from 'react';
import { motion } from 'framer-motion';

const ThunderAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0, 0.7, 0, 0, 0, 0.9, 0] 
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatDelay: Math.random() * 5 + 5,
          times: [0, 0.2, 0.21, 0.23, 0.35, 0.65, 0.66, 0.68]
        }}
        className="absolute inset-0 bg-yellow-100"
      />
      
      {/* Lightning bolt shapes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0, 1, 0, 0, 0, 0.8, 0] 
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatDelay: Math.random() * 5 + 5,
          times: [0, 0.2, 0.21, 0.23, 0.35, 0.65, 0.66, 0.68]
        }}
        className="absolute left-[40%] top-0 w-[3px] h-[40vh] bg-yellow-200 transform rotate-12"
        style={{ filter: 'blur(3px)' }}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0, 0, 0, 0, 0, 1, 0] 
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatDelay: Math.random() * 5 + 5,
          times: [0, 0.2, 0.21, 0.23, 0.35, 0.65, 0.66, 0.68]
        }}
        className="absolute left-[70%] top-0 w-[2px] h-[30vh] bg-yellow-200 transform -rotate-3"
        style={{ filter: 'blur(2px)' }}
      />
    </div>
  );
};

export default ThunderAnimation;