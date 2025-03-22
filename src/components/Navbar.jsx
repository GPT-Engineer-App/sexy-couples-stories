
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/70 backdrop-blur-md shadow-sm border-b border-neutral-200/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-display font-medium text-primary-500 tracking-tight">
            Content<span className="text-neutral-900">Insight</span>
          </span>
        </Link>
        
        <div className="flex items-center space-x-2">
          <Link 
            to="/" 
            className="px-4 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
          >
            Home
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
