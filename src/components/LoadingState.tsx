import React from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0, -10, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop"
        }}
        className="mb-6"
      >
        <Plane className="h-16 w-16 text-cyan-600" />
      </motion.div>
      
      <h3 className="text-xl font-medium text-gray-800 mb-2 font-montserrat">
        Packing your travel information...
      </h3>
      
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
        />
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-6 text-gray-600 text-center max-w-md"
      >
        We're gathering attractions, travel tips, and the latest information for your destination.
      </motion.p>
    </div>
  );
};

export default LoadingState;