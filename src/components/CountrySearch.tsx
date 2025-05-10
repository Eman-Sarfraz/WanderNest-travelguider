import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, MapPin } from 'lucide-react';
import { searchCountries, getTravelInfo } from '../utils/api';
import { Country } from '../types';
import { useCountryContext } from '../context/CountryContext';

const CountrySearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Country[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setSelectedCountry, setTravelInfo, setIsLoading } = useCountryContext();

  useEffect(() => {
    const handleSearch = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }
      
      const countries = await searchCountries(query);
      setResults(countries);
      setIsDropdownOpen(countries.length > 0);
    };

    const debounce = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCountry = async (country: Country) => {
    setQuery(country.name);
    setIsDropdownOpen(false);
    setSelectedCountry(country.name);
    setIsLoading(true);
    
    try {
      const travelInfo = await getTravelInfo(country.name);
      setTravelInfo(travelInfo);
    } catch (error) {
      console.error('Error fetching travel info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 font-montserrat">
          Discover Your Next Adventure
        </h2>
        <p className="text-gray-600 font-poppins">
          Enter a country name to explore destinations, travel tips, and budget insights
        </p>
      </motion.div>
      
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a country..."
            className="w-full p-4 pl-12 pr-4 rounded-lg border-2 border-cyan-200 focus:border-cyan-500 focus:outline-none shadow-sm transition-all duration-200 font-poppins"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <SearchIcon className="h-6 w-6" />
          </div>
        </div>
        
        {isDropdownOpen && results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto"
          >
            {results.map((country) => (
              <div
                key={country.code}
                onClick={() => handleSelectCountry(country)}
                className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <MapPin className="h-5 w-5 text-cyan-500 mr-2" />
                <div>
                  <div className="font-medium text-gray-800">{country.name}</div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CountrySearch;