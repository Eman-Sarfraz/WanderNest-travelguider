import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Calendar, Hotel, Coffee, Compass } from 'lucide-react';
import { calculateBudget } from '../utils/api';
import { useCountryContext } from '../context/CountryContext';

interface BudgetCalculatorProps {
  country: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
    rateToUSD: number;
    rateToPKR: number;
  };
}

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ country, currency }) => {
  const { budgetInput, setBudgetInput, budgetEstimate, setBudgetEstimate } = useCountryContext();
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setBudgetInput({
      ...budgetInput,
      [field]: value
    });
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    try {
      const estimate = await calculateBudget(country, budgetInput);
      setBudgetEstimate(estimate);
    } catch (error) {
      console.error('Error calculating budget:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(amount);
  };

  useEffect(() => {
    setBudgetEstimate(null);
  }, [country, setBudgetEstimate]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 font-montserrat text-gray-800 flex items-center">
        <DollarSign className="h-6 w-6 mr-2 text-green-600" /> Budget Calculator
      </h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1.5" /> Number of Travelers
            </div>
          </label>
          <input
            type="number"
            min="1"
            value={budgetInput.travelers}
            onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5" /> Duration (days)
            </div>
          </label>
          <input
            type="number"
            min="1"
            value={budgetInput.days}
            onChange={(e) => handleInputChange('days', parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
            <div className="flex items-center">
              <Hotel className="h-4 w-4 mr-1.5" /> Accommodation
            </div>
          </label>
          <select
            value={budgetInput.accommodation}
            onChange={(e) => handleInputChange('accommodation', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="budget">Budget</option>
            <option value="mid-range">Mid-range</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
            <div className="flex items-center">
              <Coffee className="h-4 w-4 mr-1.5" /> Meals
            </div>
          </label>
          <select
            value={budgetInput.meals}
            onChange={(e) => handleInputChange('meals', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="budget">Budget</option>
            <option value="mid-range">Mid-range</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
            <div className="flex items-center">
              <Compass className="h-4 w-4 mr-1.5" /> Activities
            </div>
          </label>
          <select
            value={budgetInput.activities}
            onChange={(e) => handleInputChange('activities', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="minimal">Minimal</option>
            <option value="moderate">Moderate</option>
            <option value="extensive">Extensive</option>
          </select>
        </div>
      </div>
      
      <button
        onClick={handleCalculate}
        disabled={isCalculating}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
      >
        {isCalculating ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Calculating...
          </>
        ) : (
          'Calculate Budget'
        )}
      </button>
      
      {budgetEstimate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 border-t pt-4"
        >
          <h3 className="text-lg font-semibold mb-3 font-montserrat text-gray-800">Estimated Budget</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Total (USD)</p>
              <p className="text-xl font-bold text-gray-800">
                {formatCurrency(budgetEstimate.total.usd, 'USD')}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Total (PKR)</p>
              <p className="text-xl font-bold text-gray-800">
                {formatCurrency(budgetEstimate.total.pkr, 'PKR')}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700 mb-2 font-montserrat">Breakdown:</h4>
            {Object.entries(budgetEstimate.breakdown).map(([category, amounts]) => (
              <div key={category} className="flex justify-between text-sm">
                <span className="text-gray-600 capitalize">{category}</span>
                <span className="text-gray-800 font-medium">
                  {formatCurrency(amounts.usd, 'USD')} / {formatCurrency(amounts.pkr, 'PKR')}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BudgetCalculator;