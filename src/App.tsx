import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header';
import CountrySearch from './components/CountrySearch';
import TravelResults from './components/TravelResults';
import Footer from './components/Footer';
import { CountryProvider } from './context/CountryContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CountryProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
          <Header />
          <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-12">
            <section className="pt-4 md:pt-8 lg:pt-12">
              <CountrySearch />
            </section>
            <section className="mt-6 md:mt-10">
              <TravelResults />
            </section>
          </main>
          <Footer />
        </div>
      </CountryProvider>
    </QueryClientProvider>
  );
}

export default App;