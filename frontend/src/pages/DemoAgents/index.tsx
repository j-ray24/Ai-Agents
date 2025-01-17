import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChatBubbleLeftIcon,
  SparklesIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const DemoAgents = () => {
  const navigate = useNavigate();

  const demoAgents = [
    {
      id: 'demo-sarah',
      name: 'Demo Sarah',
      role: 'Customer Service Specialist',
      description: 'Meet Sarah, our AI specialist in customer service and scheduling.',
      capabilities: [
        'Natural conversation',
        'Appointment scheduling',
        'Customer support',
        'Query handling'
      ],
      avatar: '/agents/demo-sarah.svg'
    },
    {
      id: 'demo-max',
      name: 'Demo Max',
      role: 'Operations Manager',
      description: 'Meet Max, our AI expert in operations and team management.',
      capabilities: [
        'Resource management',
        'Schedule optimization',
        'Team coordination',
        'Performance tracking'
      ],
      avatar: '/agents/demo-max.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Demo AI Agents</h1>
          <p className="text-xl text-gray-500">
            Experience the power of AI assistance with our demo agents. 
            These are simplified versions of our full-featured AI assistants.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {demoAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden"
              onClick={() => navigate(`/agents/${agent.id}`)}
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-gray-900">{agent.name}</h2>
                    <p className="text-lg text-gray-500">{agent.role}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{agent.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  {agent.capabilities.map((capability, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <SparklesIcon className="w-5 h-5 mr-2 text-primary" />
                      <span className="text-sm">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-8 py-4 bg-gray-50 border-t">
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
                  <ChatBubbleLeftIcon className="w-5 h-5 mr-2" />
                  Try Demo Chat
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-8 text-center">
          <UserGroupIcon className="w-12 h-12 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to try the full version?</h2>
          <p className="text-gray-600 mb-6">
            Get access to our complete suite of AI agents with advanced capabilities and customization options.
          </p>
          <button
            onClick={() => navigate('/calendar')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark"
          >
            Schedule a Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoAgents;
