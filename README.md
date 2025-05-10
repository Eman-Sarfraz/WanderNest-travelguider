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

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wandernest.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev:both
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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Created by Eman Sarfraz ✨