import React from 'react';
import { motion } from 'framer-motion';
import { useCountryContext } from '../context/CountryContext';
import Attractions from './Attractions';
import TravelTips from './TravelTips';
import BudgetCalculator from './BudgetCalculator';
import ImageGallery from './ImageGallery';
import LoadingState from './LoadingState';

const TravelResults: React.FC = () => {
  const { selectedCountry, travelInfo, isLoading } = useCountryContext();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!selectedCountry || !travelInfo) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-10"
    >
      <div className="bg-gradient-to-br from-cyan-700 to-cyan-600 text-white rounded-xl shadow-md overflow-hidden">
        <div className="relative h-60 sm:h-72 md:h-80">
          <img
            src={travelInfo.country.image}
            alt={travelInfo.country.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 font-montserrat">
                {travelInfo.country.name}
              </h1>
              <p className="text-white text-opacity-90 max-w-3xl font-poppins">
                {travelInfo.country.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Attractions attractions={travelInfo.attractions} />
          <div className="mt-8">
            <ImageGallery countryName={travelInfo.country.name} />
          </div>
        </div>
        <div className="space-y-8">
          <TravelTips tips={travelInfo.travelTips} bestTimeToVisit={travelInfo.bestTimeToVisit} />
          <BudgetCalculator country={travelInfo.country.name} currency={travelInfo.currency} />
        </div>
      </div>
    </motion.div>
  );
};

export default TravelResults;