import express from 'express';
import cors from 'cors';
import { getCountries, getTravelInfo, calculateBudget, getImages } from './controllers.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/countries/search', getCountries);
app.get('/api/countries/:country', getTravelInfo);
app.post('/api/budget/calculate', calculateBudget);
app.get('/api/images', getImages);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});