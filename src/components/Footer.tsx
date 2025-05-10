import React from 'react';
import { Plane, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0 group">
            <Plane className="h-6 w-6 text-orange-400 mr-2 transform group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xl font-semibold font-montserrat bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
              WanderNest
            </span>
          </div>
          
          <div className="text-gray-300 text-sm flex items-center backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full">
            <span>by Eman Sarfraz</span>
            <span className="ml-2">✈️</span>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-700/50 pt-4 text-sm text-gray-400 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} WanderNest. All rights reserved.</p>
          <p className="mt-1">
            Discover new destinations, plan your trips, and travel smarter.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;