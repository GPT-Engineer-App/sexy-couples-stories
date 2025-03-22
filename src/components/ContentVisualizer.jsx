
import React, { useState } from 'react';

const ContentVisualizer = ({ analysisResults }) => {
  const [activeView, setActiveView] = useState('themeMap');
  
  const renderThemeMap = () => {
    return (
      <div className="animate-fade-in">
        <div className="mb-4">
          <p className="text-neutral-600">
            This visualization shows the relationship between different themes and how they connect across the content.
          </p>
        </div>
        
        <div className="relative h-[400px] rounded-lg border border-neutral-200 bg-white p-4 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {analysisResults.themes.map((theme, index) => {
              // Create a unique position for each theme bubble
              const angle = (index / analysisResults.themes.length) * Math.PI * 2;
              const radius = 150 * (0.6 + (theme.relevance / 100) * 0.4);
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              
              const size = 16 + (theme.relevance / 5);
              
              return (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-200 bg-primary-100 flex items-center justify-center text-primary-800 font-medium transition-all duration-500 hover:bg-primary-200 cursor-pointer"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${size}%`,
                    height: `${size * 1.1}%`,
                    zIndex: Math.floor(theme.relevance / 10),
                  }}
                >
                  <span className="text-center text-xs md:text-sm p-1">
                    {theme.name}
                  </span>
                </div>
              );
            })}
            
            {/* Connection lines between themes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              {analysisResults.themes.flatMap((theme, i) => 
                analysisResults.themes.slice(i + 1).map((otherTheme, j) => {
                  const angle1 = (i / analysisResults.themes.length) * Math.PI * 2;
                  const radius1 = 150 * (0.6 + (theme.relevance / 100) * 0.4);
                  const x1 = 50 + radius1 * Math.cos(angle1);
                  const y1 = 50 + radius1 * Math.sin(angle1);
                  
                  const angle2 = ((i + j + 1) / analysisResults.themes.length) * Math.PI * 2;
                  const radius2 = 150 * (0.6 + (otherTheme.relevance / 100) * 0.4);
                  const x2 = 50 + radius2 * Math.cos(angle2);
                  const y2 = 50 + radius2 * Math.sin(angle2);
                  
                  // Only draw lines between related themes
                  const isRelated = Math.random() > 0.6; // In a real app, we'd use actual relationship data
                  if (!isRelated) return null;
                  
                  return (
                    <line
                      key={`${i}-${j}`}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke="#e0f0fe"
                      strokeWidth="1"
                      strokeDasharray="4 2"
                    />
                  );
                })
              ).filter(Boolean)}
            </svg>
          </div>
        </div>
      </div>
    );
  };
  
  const renderContentStyle = () => {
    return (
      <div className="animate-fade-in">
        <div className="mb-4">
          <p className="text-neutral-600">
            This radar chart shows the distribution of different writing styles present in the content.
          </p>
        </div>
        
        <div className="relative h-[400px] rounded-lg border border-neutral-200 bg-white p-4 flex items-center justify-center">
          <div className="relative w-full max-w-[300px] h-[300px]">
            {/* Radar background circles */}
            {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
              <div 
                key={i}
                className="absolute rounded-full border border-neutral-200"
                style={{
                  top: `${50 - 50 * scale}%`,
                  left: `${50 - 50 * scale}%`,
                  width: `${100 * scale}%`,
                  height: `${100 * scale}%`,
                }}
              ></div>
            ))}
            
            {/* Radar lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {Object.entries(analysisResults.contentStyle).map(([key, value], index) => {
                const angle = (index / Object.keys(analysisResults.contentStyle).length) * Math.PI * 2;
                const radius = 50;
                const x = 50 + radius * Math.cos(angle - Math.PI / 2);
                const y = 50 + radius * Math.sin(angle - Math.PI / 2);
                
                return (
                  <line
                    key={index}
                    x1="50"
                    y1="50"
                    x2={x}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                );
              })}
            </svg>
            
            {/* Radar data area */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <polygon
                points={Object.entries(analysisResults.contentStyle).map(([key, value], index) => {
                  const angle = (index / Object.keys(analysisResults.contentStyle).length) * Math.PI * 2;
                  const radius = (value / 100) * 50;
                  const x = 50 + radius * Math.cos(angle - Math.PI / 2);
                  const y = 50 + radius * Math.sin(angle - Math.PI / 2);
                  return `${x},${y}`;
                }).join(' ')}
                fill="rgba(12, 141, 228, 0.2)"
                stroke="#0c8de4"
                strokeWidth="2"
              />
            </svg>
            
            {/* Labels */}
            {Object.entries(analysisResults.contentStyle).map(([key, value], index) => {
              const angle = (index / Object.keys(analysisResults.contentStyle).length) * Math.PI * 2;
              const labelRadius = 58;
              const x = 50 + labelRadius * Math.cos(angle - Math.PI / 2);
              const y = 50 + labelRadius * Math.sin(angle - Math.PI / 2);
              
              return (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-neutral-600"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    textAlign: 'center',
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
              );
            })}
            
            {/* Data points */}
            {Object.entries(analysisResults.contentStyle).map(([key, value], index) => {
              const angle = (index / Object.keys(analysisResults.contentStyle).length) * Math.PI * 2;
              const radius = (value / 100) * 50;
              const x = 50 + radius * Math.cos(angle - Math.PI / 2);
              const y = 50 + radius * Math.sin(angle - Math.PI / 2);
              
              return (
                <div
                  key={`point-${index}`}
                  className="absolute h-3 w-3 bg-primary-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  
  const renderCategoryDistribution = () => {
    return (
      <div className="animate-fade-in">
        <div className="mb-4">
          <p className="text-neutral-600">
            This visualization shows the distribution of content across different categories.
          </p>
        </div>
        
        <div className="h-[400px] rounded-lg border border-neutral-200 bg-white p-6 flex flex-col">
          <div className="flex-1 flex items-end">
            {analysisResults.categoryDistribution.map((category, index) => (
              <div 
                key={index}
                className="flex flex-col items-center justify-end flex-1 group"
              >
                <div className="text-xs text-neutral-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {category.percentage}%
                </div>
                <div 
                  className="w-full max-w-[50px] bg-primary-400 rounded-t-lg mx-1 transition-all hover:bg-primary-500"
                  style={{ 
                    height: `${category.percentage * 3}px`,
                    backgroundColor: `rgba(12, 141, 228, ${0.4 + (category.percentage / 100) * 0.6})`,
                  }}
                ></div>
                <div className="text-xs font-medium mt-2 text-center w-full truncate px-1">
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            activeView === 'themeMap'
              ? 'bg-primary-100 text-primary-700'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
          onClick={() => setActiveView('themeMap')}
        >
          Theme Map
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            activeView === 'contentStyle'
              ? 'bg-primary-100 text-primary-700'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
          onClick={() => setActiveView('contentStyle')}
        >
          Content Style
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            activeView === 'categoryDistribution'
              ? 'bg-primary-100 text-primary-700'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
          onClick={() => setActiveView('categoryDistribution')}
        >
          Category Distribution
        </button>
      </div>
      
      {activeView === 'themeMap' && renderThemeMap()}
      {activeView === 'contentStyle' && renderContentStyle()}
      {activeView === 'categoryDistribution' && renderCategoryDistribution()}
    </div>
  );
};

export default ContentVisualizer;
