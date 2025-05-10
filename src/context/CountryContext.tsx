import React, { createContext, useState, useContext, ReactNode } from 'react';
import { TravelInfo, BudgetInput, BudgetEstimate } from '../types';

interface CountryContextType {
  selectedCountry: string | null;
  setSelectedCountry: (country: string | null) => void;
  travelInfo: TravelInfo | null;
  setTravelInfo: (info: TravelInfo | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  budgetInput: BudgetInput;
  setBudgetInput: (input: BudgetInput) => void;
  budgetEstimate: BudgetEstimate | null;
  setBudgetEstimate: (estimate: BudgetEstimate | null) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [travelInfo, setTravelInfo] = useState<TravelInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [budgetInput, setBudgetInput] = useState<BudgetInput>({
    travelers: 1,
    days: 7,
    accommodation: 'mid-range',
    meals: 'mid-range',
    activities: 'moderate',
  });
  const [budgetEstimate, setBudgetEstimate] = useState<BudgetEstimate | null>(null);

  return (
    <CountryContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        travelInfo,
        setTravelInfo,
        isLoading,
        setIsLoading,
        budgetInput,
        setBudgetInput,
        budgetEstimate,
        setBudgetEstimate,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountryContext must be used within a CountryProvider');
  }
  return context;
};