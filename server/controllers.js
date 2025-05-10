import { countryData, getCountryData, getCurrencyRates } from './data.js';
import axios from 'axios';

// Search countries
export const getCountries = (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.json([]);
    }
    
    const query = q.toLowerCase();
    const results = countryData
      .filter(country => country.name.toLowerCase().includes(query))
      .slice(0, 10);
      
    return res.json(results);
  } catch (error) {
    console.error('Error searching countries:', error);
    return res.status(500).json({ error: 'Failed to search countries' });
  }
};

// Get travel info for a specific country
export const getTravelInfo = (req, res) => {
  try {
    const { country } = req.params;
    const travelInfo = getCountryData(country);
    
    if (!travelInfo) {
      return res.status(404).json({ error: 'Country not found' });
    }
    
    return res.json(travelInfo);
  } catch (error) {
    console.error('Error getting travel info:', error);
    return res.status(500).json({ error: 'Failed to get travel information' });
  }
};

// Calculate travel budget
export const calculateBudget = (req, res) => {
  try {
    const { country, travelers, days, accommodation, meals, activities } = req.body;
    const countryInfo = getCountryData(country);
    
    if (!countryInfo) {
      return res.status(404).json({ error: 'Country not found' });
    }
    
    // Get currency rates
    const rates = getCurrencyRates(country);
    
    // Base costs per person per day in USD
    const costs = {
      accommodation: {
        budget: 30,
        'mid-range': 80,
        luxury: 200
      },
      meals: {
        budget: 15,
        'mid-range': 40,
        luxury: 100
      },
      activities: {
        minimal: 10,
        moderate: 30,
        extensive: 70
      },
      transportation: 20,
      miscellaneous: 15
    };
    
    // Apply country cost modifier (some countries are more expensive)
    const costModifier = countryInfo.costModifier || 1;
    
    // Calculate costs
    const accommodationCost = costs.accommodation[accommodation] * costModifier * travelers * days;
    const mealsCost = costs.meals[meals] * costModifier * travelers * days;
    const activitiesCost = costs.activities[activities] * costModifier * travelers * days;
    const transportationCost = costs.transportation * costModifier * travelers * days;
    const miscellaneousCost = costs.miscellaneous * costModifier * travelers * days;
    
    const totalUSD = accommodationCost + mealsCost + activitiesCost + transportationCost + miscellaneousCost;
    const totalPKR = totalUSD * rates.pkr;
    
    const budget = {
      total: {
        usd: Math.round(totalUSD),
        pkr: Math.round(totalPKR)
      },
      breakdown: {
        accommodation: {
          usd: Math.round(accommodationCost),
          pkr: Math.round(accommodationCost * rates.pkr)
        },
        meals: {
          usd: Math.round(mealsCost),
          pkr: Math.round(mealsCost * rates.pkr)
        },
        activities: {
          usd: Math.round(activitiesCost),
          pkr: Math.round(activitiesCost * rates.pkr)
        },
        transportation: {
          usd: Math.round(transportationCost),
          pkr: Math.round(transportationCost * rates.pkr)
        },
        miscellaneous: {
          usd: Math.round(miscellaneousCost),
          pkr: Math.round(miscellaneousCost * rates.pkr)
        }
      }
    };
    
    return res.json(budget);
  } catch (error) {
    console.error('Error calculating budget:', error);
    return res.status(500).json({ error: 'Failed to calculate budget' });
  }
};

// Get images from Pexels API
export const getImages = async (req, res) => {
  try {
    const { q, count = 6 } = req.query;
    
    // Simulate Pexels API response with sample images
    // In a real implementation, you would call the Pexels API here
    const pexelsResponse = {
      photos: [
        {
          id: '1',
          src: {
            medium: `https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&h=350`
          },
          alt: `${q} landscape 1`,
          photographer: 'Pexels Photographer 1'
        },
        {
          id: '2',
          src: {
            medium: `https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?auto=compress&cs=tinysrgb&h=350`
          },
          alt: `${q} landscape 2`,
          photographer: 'Pexels Photographer 2'
        },
        {
          id: '3',
          src: {
            medium: `https://images.pexels.com/photos/2440021/pexels-photo-2440021.jpeg?auto=compress&cs=tinysrgb&h=350`
          },
          alt: `${q} cityscape 1`,
          photographer: 'Pexels Photographer 3'
        },
        {
          id: '4',
          src: {
            medium: `https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&h=350`
          },
          alt: `${q} landmark 1`,
          photographer: 'Pexels Photographer 4'
        },
        {
          id: '5',
          src: {
            medium: `https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&h=350`
          },
          alt: `${q} culture 1`,
          photographer: 'Pexels Photographer 5'
        },
        {
          id: '6',
          src: {
            medium: `https://images.pexels.com/photos/3214958/pexels-photo-3214958.jpeg?auto=compress&cs=tinysrgb&h=350`
          },
          alt: `${q} nature 1`,
          photographer: 'Pexels Photographer 6'
        }
      ]
    };
    
    const images = pexelsResponse.photos.slice(0, Number(count)).map(photo => ({
      id: photo.id,
      url: photo.src.medium,
      alt: photo.alt,
      photographer: photo.photographer
    }));
    
    return res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    return res.status(500).json({ error: 'Failed to fetch images' });
  }
};