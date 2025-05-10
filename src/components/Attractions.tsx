import React from 'react';
import { motion } from 'framer-motion';
import { Attraction } from '../types';
import { MapPin } from 'lucide-react';

interface AttractionsProps {
  attractions: Attraction[];
}

const Attractions: React.FC<AttractionsProps> = ({ attractions }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 font-montserrat text-gray-800 flex items-center">
        <span className="mr-2">🏛️</span> Top Attractions
      </h2>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {attractions.map((attraction) => (
          <motion.div
            key={attraction.id}
            variants={item}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/3">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="h-48 sm:h-full w-full object-cover"
                />
              </div>
              <div className="sm:w-2/3 p-4">
                <h3 className="text-xl font-semibold mb-2 font-montserrat text-gray-800">
                  {attraction.name}
                </h3>
                <div className="flex items-center text-gray-500 mb-2 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{attraction.location}</span>
                </div>
                <p className="text-gray-600 font-poppins">
                  {attraction.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Attractions;