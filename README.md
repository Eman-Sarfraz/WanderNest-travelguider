# WanderNest - Your Ultimate Travel Companion 🌎✈️

WanderNest is a modern travel planning application built with React and Node.js that helps users discover destinations, plan trips, and calculate travel budgets.

## Features

- 🔍 Search and explore destinations worldwide
- 🏛️ View detailed information about attractions
- 💰 Calculate travel budgets with customizable parameters
- 📸 Browse destination photos
- 🎯 Get travel tips and best times to visit
- 💱 Currency conversion support

## Tech Stack

- Frontend:
  - React 18
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - React Query
  - Lucide React Icons

- Backend:
  - Node.js
  - Express
  - CORS
    
## APIs and Data Sources

Internal API Endpoints (server/controllers.js)
/api/countries/search — Country search functionality

/api/countries/:country — Detailed country information

/api/budget/calculate — Travel budget calculation logic

/api/images — Image gallery data

External Services (Simulated)
Currency exchange rates

Country information database

Pexels API for image retrieval
## Project Structure

```
wandernest/
├── src/
│   ├── components/      # React components
│   ├── context/        # React context providers
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   └── App.tsx         # Main application component
├── server/
│   ├── controllers.js  # API route handlers
│   ├── data.js        # Sample travel data
│   └── index.js       # Express server setup
└── public/            # Static assets
```

## Deployment

The application can be deployed to Vercel:

1. Frontend:
   - Connect your GitHub repository to Vercel
   - Set the build command to `npm run build`
   - Set the output directory to `dist`

2. Backend:
   - Deploy the server directory as a separate Node.js service
   - Update the API URL in the frontend configuration

## Author

Created by Eman Sarfraz ✨
