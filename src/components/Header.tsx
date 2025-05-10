import React from 'react';
import { Plane } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-cyan-700 via-cyan-600 to-cyan-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3 group">
            <Plane className="h-10 w-10 text-orange-400 transform group-hover:rotate-12 transition-transform duration-300" />
            <h1 className="text-3xl md:text-4xl font-bold font-montserrat tracking-tight">
              Wander<span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Nest</span>
            </h1>
          </div>
          <div className="text-lg md:text-xl font-medium font-poppins tracking-wide bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full">
            Your Ultimate Travel Companion
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;