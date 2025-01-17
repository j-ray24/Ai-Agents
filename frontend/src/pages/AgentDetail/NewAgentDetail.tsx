import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChatBubbleLeftIcon,
  AcademicCapIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  ArrowLeftIcon,
  BoltIcon,
  ClockIcon,
  DocumentTextIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

// Components
import ConversationHistory from './components/ConversationHistory';
import PerformanceMetrics from './components/PerformanceMetrics';
import TrainingStatus from './components/TrainingStatus';
import IntegrationSettings from './components/IntegrationSettings';
import CustomizationPanel from './components/CustomizationPanel';

const NewAgentDetail = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'conversations', name: 'Conversations', icon: ChatBubbleLeftIcon },
    { id: 'training', name: 'Training', icon: AcademicCapIcon },
    { id: 'performance', name: 'Performance', icon: SparklesIcon },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Response Time</h3>
                  <ClockIcon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-gray-900">1.2s</p>
                <p className="text-sm text-gray-500 mt-2">Average response time</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Satisfaction</h3>
                  <UserGroupIcon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-500 mt-2">Customer satisfaction rate</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Conversations</h3>
                  <ChatBubbleLeftIcon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-gray-900">1,234</p>
                <p className="text-sm text-gray-500 mt-2">Total conversations</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Knowledge</h3>
                  <DocumentTextIcon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-gray-900">95%</p>
                <p className="text-sm text-gray-500 mt-2">Training completion</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <BoltIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New training completed</p>
                    <p className="text-xs text-gray-500">Tree Disease Identification</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <ChatBubbleLeftIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Customer interaction</p>
                    <p className="text-xs text-gray-500">Emergency tree removal inquiry</p>
                    <p className="text-xs text-gray-400">4 hours ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Capabilities */}
            <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Tree Service Expertise</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Emergency response protocols</li>
                    <li>• Tree health assessment</li>
                    <li>• Service scheduling</li>
                    <li>• Cost estimation</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Customer Service</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Inquiry handling</li>
                    <li>• Quote generation</li>
                    <li>• Follow-up management</li>
                    <li>• Satisfaction surveys</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Technical Knowledge</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Equipment specifications</li>
                    <li>• Safety procedures</li>
                    <li>• Regulatory compliance</li>
                    <li>• Environmental guidelines</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'conversations':
        return <ConversationHistory />;
      case 'training':
        return <TrainingStatus />;
      case 'performance':
        return <PerformanceMetrics />;
      case 'settings':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomizationPanel />
            <IntegrationSettings />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center mb-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                <span>Back</span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={`/agents/${agentId}plain.svg`}
                  alt={agentId}
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">{agentId}</h1>
                  <p className="text-sm text-gray-500">Tree Service AI Assistant</p>
                </div>
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                Start Conversation
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-1 py-4 border-b-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default NewAgentDetail;
