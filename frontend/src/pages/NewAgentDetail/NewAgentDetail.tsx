import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConversationHistory from '../../components/agent/ConversationHistory';
import PerformanceMetrics from '../../components/agent/PerformanceMetrics';
import TrainingStatus from '../../components/agent/TrainingStatus';
import CustomizationPanel from '../../components/agent/CustomizationPanel';
import IntegrationSettings from '../../components/agent/IntegrationSettings';
import {
  ChatBubbleLeftIcon,
  AcademicCapIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftIcon,
  BoltIcon,
  ClockIcon,
  DocumentTextIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export const NewAgentDetail = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'conversations', name: 'Conversations', icon: ChatBubbleLeftIcon },
    { id: 'training', name: 'Training', icon: AcademicCapIcon },
    { id: 'performance', name: 'Performance', icon: SparklesIcon },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
  ];

  // Get agent data based on agentId
  const getAgentData = () => {
    // This should be replaced with actual API call to get agent data
    return {
      name: agentId ? `${agentId.charAt(0).toUpperCase()}${agentId.slice(1)}` : 'Unknown Agent',
      role: agentId === 'sarah' ? 'Scheduling & Customer Service' : 'Operations & Crew Management',
      metrics: {
        responseTime: '1.2s',
        satisfaction: '98%',
        conversations: '1,234',
        training: '95%',
      },
      recentActivity: [
        {
          type: 'training',
          title: 'New training completed',
          description: 'Tree Disease Identification',
          time: '2 hours ago',
        },
        {
          type: 'conversation',
          title: 'Customer interaction',
          description: 'Emergency tree removal inquiry',
          time: '4 hours ago',
        },
      ],
      capabilities: [
        {
          title: 'Tree Service Expertise',
          items: [
            'Emergency response protocols',
            'Tree health assessment',
            'Service scheduling',
            'Cost estimation',
          ],
        },
        {
          title: 'Customer Service',
          items: [
            'Inquiry handling',
            'Quote generation',
            'Follow-up management',
            'Satisfaction surveys',
          ],
        },
        {
          title: 'Technical Knowledge',
          items: [
            'Equipment specifications',
            'Safety procedures',
            'Regulatory compliance',
            'Environmental guidelines',
          ],
        },
      ],
    };
  };

  const agentData = getAgentData();

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
                <p className="text-3xl font-bold text-gray-900">{agentData.metrics.responseTime}</p>
                <p className="text-sm text-gray-500 mt-2">Average response time</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Satisfaction</h3>
                  <SparklesIcon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{agentData.metrics.satisfaction}</p>
                <p className="text-sm text-gray-500 mt-2">Customer satisfaction rate</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Conversations</h3>
                  <ChatBubbleLeftIcon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{agentData.metrics.conversations}</p>
                <p className="text-sm text-gray-500 mt-2">Total conversations</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Knowledge</h3>
                  <DocumentTextIcon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{agentData.metrics.training}</p>
                <p className="text-sm text-gray-500 mt-2">Training completion</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {agentData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {activity.type === 'training' ? (
                        <BoltIcon className="w-5 h-5 text-primary" />
                      ) : (
                        <ChatBubbleLeftIcon className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {agentData.capabilities.map((capability, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{capability.title}</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {capability.items.map((item, itemIndex) => (
                        <li key={itemIndex}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
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
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={`/agents/${agentId}.svg`}
                  alt={agentData.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">{agentData.name}</h1>
                  <p className="text-sm text-gray-500">{agentData.role}</p>
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
