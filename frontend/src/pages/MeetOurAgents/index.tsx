import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MeetOurAgents: React.FC = () => {
  const agents = [
    {
      name: 'Alex',
      image: '/agents/alexplain.svg',
      role: 'Customer Service Specialist',
      description: 'Expert in handling customer inquiries and providing exceptional support.',
    },
    {
      name: 'Ashley',
      image: '/agents/ashleyplain.svg',
      role: 'Lead Generation Expert',
      description: 'Specialized in identifying and nurturing potential business opportunities.',
    },
    {
      name: 'Max',
      image: '/agents/maxplain.svg',
      role: 'HR Assistant',
      description: 'Focused on streamlining HR processes and employee relations.',
    },
    {
      name: 'Sarah',
      image: '/agents/sarahplain.svg',
      role: 'Marketing Strategist',
      description: 'Crafting engaging marketing campaigns and content strategies.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-6 pb-16 sm:pb-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Meet Our</span>
              <span className="block text-primary">AI Agents</span>
            </h1>
            <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Our specialized AI agents are here to help streamline your business operations. Each agent brings unique capabilities and expertise to handle specific business needs.
            </p>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2">
          {agents.map((agent, index) => (
            <div
              key={agent.name}
              className="agent-card relative overflow-hidden bg-white rounded-xl shadow-lg group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="aspect-w-4 aspect-h-5">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900">{agent.name}</h3>
                <p className="mt-2 text-lg font-medium text-primary">{agent.role}</p>
                <p className="mt-3 text-gray-600">{agent.description}</p>
                <Link
                  to={`/agents/${agent.name.toLowerCase().replace(' ', '-')}`}
                  className="block w-full px-6 py-3 mt-6 text-base font-medium text-white transition-colors duration-300 bg-primary rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Try {agent.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 mt-24">
        <div className="grid grid-cols-4 gap-6 mb-16">
          <Link to="/agents/api-integration" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
            <h3 className="text-xl font-semibold mb-3">API Integration</h3>
            <p className="text-gray-600">
              Connect and extend functionality with our robust API endpoints and documentation.
            </p>
          </Link>
          <Link to="/agents/multilingual" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
            <h3 className="text-xl font-semibold mb-3">Multi-language Support</h3>
            <p className="text-gray-600">
              Communicate with users in their preferred language with built-in translation.
            </p>
          </Link>
          <Link to="/agents/training" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
            <h3 className="text-xl font-semibold mb-3">Custom Training</h3>
            <p className="text-gray-600">
              Train agents on your specific data and use cases for better performance.
            </p>
          </Link>
          <Link to="/agents/analytics" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
            <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
            <p className="text-gray-600">
              Track performance and usage with detailed analytics and reporting.
            </p>
          </Link>
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-white text-center py-16 -mx-8 md:-mx-16 lg:-mx-24">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start working with our AI agents today and experience the future of business automation.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-dark hover:bg-primary-darker transition-colors duration-200"
              >
                Contact Sales
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MeetOurAgents;
