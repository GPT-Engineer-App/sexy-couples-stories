
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Scraper from './components/Scraper';
import AnalysisDisplay from './components/AnalysisDisplay';

function App() {
  const [scrapedData, setScrapedData] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScrapedData = (data) => {
    setScrapedData(data);
    setAnalysisResults(null);
  };

  const handleAnalysisResults = (results) => {
    setAnalysisResults(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Routes>
          <Route path="/" element={
            <div className="space-y-8">
              <header className="text-center animate-fade-in mb-12">
                <h1 className="text-4xl md:text-5xl font-display font-semibold text-neutral-900 mb-4">
                  Content <span className="text-primary-500">Insight</span>
                </h1>
                <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
                  Discover insights from web content with our elegant analysis tool. 
                  Simply enter a URL to begin exploring.
                </p>
              </header>
              
              <Scraper 
                onScrapedData={handleScrapedData} 
                onAnalysisResults={handleAnalysisResults}
                setIsLoading={setIsLoading}
                setError={setError}
              />
              
              {error && (
                <div className="card p-4 border-l-4 border-l-red-500 bg-red-50 text-red-700 animate-fade-in">
                  <p className="font-medium">Error</p>
                  <p>{error}</p>
                </div>
              )}
              
              {(scrapedData || analysisResults) && (
                <AnalysisDisplay 
                  scrapedData={scrapedData} 
                  analysisResults={analysisResults}
                  isLoading={isLoading}
                />
              )}
            </div>
          } />
        </Routes>
      </div>
      
      <footer className="mt-16 py-8 border-t border-neutral-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-neutral-500 text-sm">
          <p>Content Insight — Elegant web content analysis</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
