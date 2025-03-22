
import React, { useState } from 'react';
import ContentVisualizer from './ContentVisualizer';

const AnalysisDisplay = ({ scrapedData, analysisResults, isLoading }) => {
  const [activeTab, setActiveTab] = useState('scraped');
  
  if (!scrapedData && !analysisResults) return null;
  
  return (
    <div className="card p-6 md:p-8 animate-fade-in max-w-4xl mx-auto">
      <div className="flex border-b border-neutral-200 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'scraped'
              ? 'text-primary-500 border-b-2 border-primary-500'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
          onClick={() => setActiveTab('scraped')}
        >
          Scraped Data
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'analysis'
              ? 'text-primary-500 border-b-2 border-primary-500'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
          onClick={() => setActiveTab('analysis')}
          disabled={!analysisResults}
        >
          Analysis
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'visualization'
              ? 'text-primary-500 border-b-2 border-primary-500'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
          onClick={() => setActiveTab('visualization')}
          disabled={!analysisResults}
        >
          Visualization
        </button>
      </div>
      
      {isLoading ? (
        <div className="py-12 text-center">
          <div className="inline-block p-3 rounded-full bg-primary-100 text-primary-600 animate-pulse-slow mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-neutral-800 mb-2">Processing data...</h3>
          <p className="text-neutral-600">
            We're analyzing the content and preparing insights for you.
          </p>
        </div>
      ) : (
        <>
          {activeTab === 'scraped' && scrapedData && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-neutral-900">Website Information</h3>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <p className="text-neutral-700"><span className="font-medium">URL:</span> {scrapedData.url}</p>
                  <p className="text-neutral-700"><span className="font-medium">Title:</span> {scrapedData.title}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-neutral-900">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {scrapedData.categories.map((category, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-neutral-900">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {scrapedData.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-neutral-900">Content Samples</h3>
                <div className="space-y-3">
                  {scrapedData.stories.map((story, index) => (
                    <div key={index} className="p-4 border border-neutral-200 rounded-lg bg-white">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-neutral-900">{story.title}</h4>
                          <p className="text-sm text-neutral-500 mt-1">Type: {story.type}</p>
                        </div>
                        <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs">
                          {story.categories[0]}
                        </span>
                      </div>
                      <p className="mt-2 text-neutral-700">{story.excerpt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'analysis' && analysisResults && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-neutral-900">Content Analysis</h3>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <p className="text-neutral-700">{analysisResults.summary}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-neutral-900">Primary Themes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisResults.themes.map((theme, index) => (
                    <div key={index} className="p-4 border border-neutral-200 rounded-lg bg-white">
                      <h4 className="font-medium text-neutral-800">{theme.name}</h4>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-neutral-200 rounded-full h-2.5">
                          <div 
                            className="bg-primary-500 h-2.5 rounded-full" 
                            style={{ width: `${theme.relevance}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-neutral-600">{theme.relevance}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-neutral-900">Content Style</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(analysisResults.contentStyle).map(([key, value], index) => (
                    <div key={index} className="p-4 border border-neutral-200 rounded-lg bg-white">
                      <h4 className="font-medium text-neutral-800 capitalize">{key}</h4>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-neutral-200 rounded-full h-2.5">
                          <div 
                            className="bg-primary-400 h-2.5 rounded-full" 
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-neutral-600">{value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-neutral-900">Recommended Content Ideas</h3>
                <div className="space-y-3">
                  {analysisResults.contentIdeas.map((idea, index) => (
                    <div key={index} className="p-4 border border-neutral-200 rounded-lg bg-white">
                      <div className="flex items-start gap-3">
                        <div className="text-primary-500 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral-800">{idea.title}</h4>
                          <p className="text-sm text-neutral-600 mt-1">{idea.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'visualization' && analysisResults && (
            <ContentVisualizer analysisResults={analysisResults} />
          )}
        </>
      )}
    </div>
  );
};

export default AnalysisDisplay;
