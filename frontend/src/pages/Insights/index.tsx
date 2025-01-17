import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SparklesIcon, ArrowUpIcon, ArrowDownIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const Insights = () => {
  const navigate = useNavigate();
  
  const insights = [
    {
      title: 'Customer Satisfaction Trends',
      description: 'Positive sentiment increased by 15% this month',
      trend: 'up',
      value: '+15%',
      details: 'Improvement in first response time contributed to higher satisfaction'
    },
    {
      title: 'Common Customer Queries',
      description: 'Top 3 topics: Product Features, Pricing, Technical Support',
      trend: 'neutral',
      value: '85%',
      details: 'These topics account for 85% of all queries'
    },
    {
      title: 'Agent Performance Insights',
      description: 'Response accuracy improved across all agents',
      trend: 'up',
      value: '+8%',
      details: 'New training modules showing positive impact'
    },
    {
      title: 'Peak Usage Times',
      description: 'Highest engagement between 1-3 PM EST',
      trend: 'neutral',
      value: '2PM',
      details: 'Consider adjusting agent availability for these hours'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            <span>Back</span>
          </button>
        </div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">View Insights</h1>
          <SparklesIcon className="w-8 h-8 text-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{insight.title}</h2>
              <p className="text-gray-600 mb-4">{insight.description}</p>
              
              <div className="flex items-center space-x-2 mb-3">
                {insight.trend === 'up' ? (
                  <ArrowUpIcon className="w-5 h-5 text-green-500" />
                ) : insight.trend === 'down' ? (
                  <ArrowDownIcon className="w-5 h-5 text-red-500" />
                ) : null}
                <span className={`font-semibold ${
                  insight.trend === 'up' ? 'text-green-500' : 
                  insight.trend === 'down' ? 'text-red-500' : 
                  'text-gray-600'
                }`}>
                  {insight.value}
                </span>
              </div>
              
              <p className="text-sm text-gray-500">{insight.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;
