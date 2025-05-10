import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TravelTip } from '../types';
import { Calendar, AlertCircle, Import as Passport, Globe, Bus, ChevronDown, ChevronUp } from 'lucide-react';

interface TravelTipsProps {
  tips: TravelTip[];
  bestTimeToVisit: {
    months: string[];
    description: string;
  };
}

const categoryIcons = {
  culture: <Globe className="h-5 w-5" />,
  visa: <Passport className="h-5 w-5" />,
  safety: <AlertCircle className="h-5 w-5" />,
  weather: <Calendar className="h-5 w-5" />,
  transportation: <Bus className="h-5 w-5" />
};

const categoryColors = {
  culture: 'bg-purple-100 text-purple-800',
  visa: 'bg-blue-100 text-blue-800',
  safety: 'bg-red-100 text-red-800',
  weather: 'bg-green-100 text-green-800',
  transportation: 'bg-amber-100 text-amber-800'
};

const TravelTips: React.FC<TravelTipsProps> = ({ tips, bestTimeToVisit }) => {
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const toggleTip = (title: string) => {
    if (expandedTip === title) {
      setExpandedTip(null);
    } else {
      setExpandedTip(title);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 font-montserrat text-gray-800 flex items-center">
        <span className="mr-2">✈️</span> Travel Tips
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-800 font-montserrat">
          <Calendar className="h-5 w-5 mr-2 text-green-600" /> Best Time to Visit
        </h3>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex flex-wrap gap-2 mb-2">
            {bestTimeToVisit.months.map((month) => (
              <span 
                key={month} 
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {month}
              </span>
            ))}
          </div>
          <p className="text-gray-700 font-poppins text-sm">{bestTimeToVisit.description}</p>
        </div>
      </div>

      <div className="space-y-3">
        {tips.map((tip) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div 
              className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleTip(tip.title)}
            >
              <div className="flex items-center">
                <span className={`p-1.5 rounded-md mr-3 ${categoryColors[tip.category]}`}>
                  {categoryIcons[tip.category]}
                </span>
                <h3 className="font-medium text-gray-800 font-montserrat">{tip.title}</h3>
              </div>
              {expandedTip === tip.title ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
            
            {expandedTip === tip.title && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 py-3 border-t border-gray-200 bg-gray-50"
              >
                <p className="text-gray-600 font-poppins">{tip.description}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TravelTips;