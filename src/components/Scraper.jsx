
import React, { useState } from 'react';
import { analyzeContent } from '../utils/analysisService';

const Scraper = ({ onScrapedData, onAnalysisResults, setIsLoading, setError }) => {
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url) {
      setError('Please enter a URL');
      return;
    }
    
    try {
      setError(null);
      setIsSubmitting(true);
      setIsLoading(true);
      
      // Mock the scraping process since we can't do actual scraping in the frontend
      const mockScrapedData = mockScrapeData(url);
      onScrapedData(mockScrapedData);
      
      // Analyze the mock data
      const analysisResults = await analyzeContent(mockScrapedData);
      onAnalysisResults(analysisResults);
    } catch (error) {
      console.error('Scraping error:', error);
      setError('Failed to scrape content. Please check the URL and try again.');
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  // Mock function to simulate scraping data
  const mockScrapeData = (url) => {
    // Simulate website content scraping based on the URL
    if (url.includes('badgirlsbible.com')) {
      return {
        url: url,
        title: "Bad Girls Bible",
        categories: [
          "Relationships",
          "Intimacy",
          "Communication",
          "Dating",
          "Marriage"
        ],
        tags: [
          "advice",
          "tips",
          "guides",
          "communication",
          "connection",
          "romance"
        ],
        stories: [
          {
            title: "How We Rekindled Our Romance After 10 Years",
            excerpt: "After a decade together, we found new ways to connect and bring back the spark...",
            categories: ["Relationships", "Intimacy", "Marriage"],
            type: "personal story"
          },
          {
            title: "Breaking the Communication Barrier",
            excerpt: "Learning to express needs openly transformed our relationship in unexpected ways...",
            categories: ["Communication", "Relationships"],
            type: "advice"
          },
          {
            title: "Dating After Divorce: Sarah's Journey",
            excerpt: "When Sarah found herself single after 15 years of marriage, she had to relearn the dating landscape...",
            categories: ["Dating", "Relationships"],
            type: "personal story"
          }
        ],
        contentSamples: [
          "Communication is the foundation of every healthy relationship. When partners can express their needs openly...",
          "Creating moments of genuine connection doesn't always require grand gestures. Sometimes it's the small daily rituals...",
          "Maintaining independence while building a partnership creates the balance many couples struggle to find..."
        ]
      };
    } else {
      // Generic data for any other URL
      return {
        url: url,
        title: "Website Content",
        categories: ["General", "Miscellaneous"],
        tags: ["content", "web", "article"],
        stories: [
          {
            title: "Sample Article",
            excerpt: "This is a placeholder for scraped content...",
            categories: ["General"],
            type: "article"
          }
        ],
        contentSamples: [
          "This is a placeholder for actual content that would be scraped from the website."
        ]
      };
    }
  };

  return (
    <div className="card p-6 md:p-8 animate-slide-up max-w-4xl mx-auto">
      <h2 className="text-2xl font-display font-medium mb-6 text-neutral-900">
        Analyze Web Content
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-neutral-700 mb-1">
            Website URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              id="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input-field flex-1"
              required
            />
            <button 
              type="submit" 
              className="btn-primary flex items-center justify-center min-w-[120px]"
              disabled={isSubmitting || !url}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  Analyzing
                  <span className="loading-dots">
                    <div></div>
                    <div></div>
                    <div></div>
                  </span>
                </span>
              ) : 'Analyze'}
            </button>
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            Enter the full URL including https://
          </p>
        </div>
        
        <div className="text-sm text-neutral-600 bg-neutral-50 p-4 rounded-lg border border-neutral-200 mt-4">
          <p className="font-medium text-neutral-800 mb-1">Note:</p>
          <p>
            For demonstration purposes, this app simulates scraping content from badgirlsbible.com.
            In a production environment, we would need a backend service to handle actual web scraping.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Scraper;
