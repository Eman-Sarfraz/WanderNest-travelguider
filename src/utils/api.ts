import axios from 'axios';
import { TravelInfo, BudgetInput, BudgetEstimate } from '../types';

const API_URL = '/api';

export const searchCountries = async (query: string) => {
  if (!query || query.length < 2) return [];
  try {
    const response = await axios.get(`${API_URL}/countries/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching countries:', error);
    return [];
  }
};

export const getTravelInfo = async (country: string): Promise<TravelInfo> => {
  try {
    const response = await axios.get(`${API_URL}/countries/${country}`);
    return response.data;
  } catch (error) {
    console.error('Error getting travel info:', error);
    throw error;
  }
};

export const calculateBudget = async (country: string, budgetInput: BudgetInput): Promise<BudgetEstimate> => {
  try {
    const response = await axios.post(`${API_URL}/budget/calculate`, {
      country,
      ...budgetInput,
    });
    return response.data;
  } catch (error) {
    console.error('Error calculating budget:', error);
    throw error;
  }
};

export const getImages = async (query: string, count: number = 6) => {
  try {
    const response = await axios.get(`${API_URL}/images?q=${query}&count=${count}`);
    return response.data;
  } catch (error) {
    console.error('Error getting images:', error);
    return [];
  }
};