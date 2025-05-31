import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-900 to-primary-700 flex flex-col items-center justify-center text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div 
          className="flex items-center justify-center gap-4 mb-8"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              opacity: [1, 0.8, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.5, 1]
            }}
          >
            <Sun size={30} className="text-accent-400" />
          </motion.div>
          
          <motion.div
            animate={{
              y: [0, -8, 0],
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.5, 1],
              delay: 0.3
            }}
          >
            <Cloud size={40} className="text-primary-200" />
          </motion.div>
          
          <motion.div
            animate={{
              y: [0, -12, 0],
              opacity: [1, 0.9, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.5, 1],
              delay: 0.6
            }}
          >
            <CloudRain size={35} className="text-blue-300" />
          </motion.div>
        </motion.div>
        
        <h1 className="text-3xl font-display font-bold mb-2">
          Weather<span className="text-primary-300">Scape</span>
        </h1>
        
        <p className="text-primary-100 mb-8">Loading your weather information...</p>
        
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="w-12 h-12 border-t-4 border-primary-300 border-solid rounded-full animate-spin mx-auto"
        />
      </motion.div>
    </div>
  );
};

export default LoadingScreen;