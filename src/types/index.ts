export interface Country {
  name: string;
  code: string;
  image: string;
  description: string;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  country: string;
}

export interface TravelTip {
  category: 'culture' | 'visa' | 'safety' | 'weather' | 'transportation';
  title: string;
  description: string;
  icon: string;
}

export interface TravelInfo {
  country: Country;
  attractions: Attraction[];
  travelTips: TravelTip[];
  currency: {
    code: string;
    name: string;
    symbol: string;
    rateToUSD: number;
    rateToPKR: number;
  };
  bestTimeToVisit: {
    months: string[];
    description: string;
  };
}

export interface BudgetInput {
  travelers: number;
  days: number;
  accommodation: 'budget' | 'mid-range' | 'luxury';
  meals: 'budget' | 'mid-range' | 'luxury';
  activities: 'minimal' | 'moderate' | 'extensive';
}

export interface BudgetEstimate {
  total: {
    usd: number;
    pkr: number;
  };
  breakdown: {
    accommodation: { usd: number; pkr: number; };
    meals: { usd: number; pkr: number; };
    activities: { usd: number; pkr: number; };
    transportation: { usd: number; pkr: number; };
    miscellaneous: { usd: number; pkr: number; };
  };
}