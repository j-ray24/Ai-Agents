import React from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {/* Logo */}
          <button
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-shrink-0 -ml-3 group"
          >
            <span className="text-2xl font-bold text-primary transition-colors duration-200 group-hover:text-primary-dark">
              AI Agents
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;
