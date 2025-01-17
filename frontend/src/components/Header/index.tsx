import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => {
                navigate('/');
                // Small delay to ensure route change completes before scrolling
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 50);
              }}
              className="flex-shrink-0 -ml-3 group"
            >
              <span className="text-2xl font-bold text-primary transition-colors duration-200 group-hover:text-primary-dark">
                AI Agents
              </span>
            </button>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => handleNavigation("/how-it-works")}
                className={`${
                  location.pathname === '/how-it-works'
                    ? 'text-gray-900'
                    : 'text-gray-700 hover:text-primary transition-colors'
                } text-base font-medium`}
              >
                How They Work
              </button>
              <button 
                onClick={() => handleNavigation("/meet-our-agents")}
                className={`${
                  location.pathname === '/meet-our-agents'
                    ? 'text-gray-900'
                    : 'text-gray-700 hover:text-primary transition-colors'
                } text-base font-medium`}
              >
                Meet Our Agents
              </button>
              <button 
                onClick={() => handleNavigation("/about")}
                className={`${
                  location.pathname === '/about'
                    ? 'text-gray-900'
                    : 'font-medium hover:text-primary transition-colors'
                } ${
                  isScrolled ? 'text-gray-600' : 'text-gray-800'
                }`}
              >
                About Us
              </button>
              <button 
                onClick={() => handleNavigation("/pricing")}
                className={`${
                  location.pathname === '/pricing'
                    ? 'text-gray-900'
                    : 'font-medium hover:text-primary transition-colors'
                } ${
                  isScrolled ? 'text-gray-600' : 'text-gray-800'
                }`}
              >
                Pricing
              </button>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleNavigation("/signin")}
                className="text-sm font-semibold text-gray-700 hover:text-primary transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNavigation("/signup")}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Start Free Trial
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden btn btn-ghost btn-circle"
              onClick={() => {/* Add mobile menu handler */}}
            >
              <svg 
                className="w-6 h-6 text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {/* Spacer div to prevent content from going under fixed header */}
      <div className="h-16 sm:h-20"></div>
    </>
  );
};

export default Header;
