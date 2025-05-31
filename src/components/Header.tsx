import React from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-4 md:px-6 backdrop-blur-sm bg-gradient-to-r from-primary-900/30 to-primary-800/20">
      <div className="container mx-auto">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.05, 1, 1.05, 1] 
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <Cloud size={32} className="text-primary-200" />
            </motion.div>
            <h1 className="text-2xl font-display font-bold text-white">
              Weather<span className="text-primary-300">Scape</span>
            </h1>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

export default Header