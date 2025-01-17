import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChatBubbleLeftIcon,
  UserCircleIcon,
  ArrowLeftIcon,
  DocumentTextIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const DemoAgentDetail = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();

  const getDemoAgentData = () => {
    const demoAgents = {
      'demo-sarah': {
        name: 'Demo Sarah',
        role: 'Customer Service Specialist',
        description: 'A friendly AI assistant specializing in customer service and scheduling.',
        capabilities: [
          'Natural conversation handling',
          'Appointment scheduling',
          'Customer inquiry response',
          'Basic problem resolution'
        ],
        avatar: '/agents/demo-sarah.svg'
      },
      'demo-max': {
        name: 'Demo Max',
        role: 'Operations Manager',
        description: 'An efficient AI assistant focused on operations and team management.',
        capabilities: [
          'Resource allocation',
          'Schedule optimization',
          'Team coordination',
          'Performance tracking'
        ],
        avatar: '/agents/demo-max.svg'
      }
    };

    return demoAgents[agentId as keyof typeof demoAgents];
  };

  const agent = getDemoAgentData();

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Demo Agent Not Found</h2>
          <button
            onClick={() => navigate('/meet-our-agents')}
            className="mt-4 text-primary hover:text-primary-dark"
          >
            Back to Demo Agents
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/meet-our-agents')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Demo Agents
          </button>

          <div className="flex items-center space-x-8">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{agent.name}</h1>
              <p className="text-xl text-gray-500">{agent.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600">{agent.description}</p>
          </div>

          {/* Capabilities */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Capabilities</h2>
            <ul className="space-y-3">
              {agent.capabilities.map((capability, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <SparklesIcon className="w-5 h-5 mr-3 text-primary" />
                  {capability}
                </li>
              ))}
            </ul>
          </div>

          {/* Demo Chat */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Try a Demo Conversation</h2>
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="space-y-4 mb-4">
                <div className="flex items-start space-x-3">
                  <UserCircleIcon className="w-8 h-8 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Hello! I'd like to learn more about your services.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <img src={agent.avatar} alt="" className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Hi there! I'm {agent.name}, and I'd be happy to tell you about our services. 
                      Please note that this is a demo conversation to showcase our AI capabilities. 
                      For real assistance, please sign up and chat with our active agents.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border-gray-300 focus:ring-primary focus:border-primary"
                  disabled
                />
                <button
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  onClick={() => navigate('/calendar')}
                >
                  Try Full Version
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoAgentDetail;
