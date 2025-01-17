import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  CheckIcon,
} from '@heroicons/react/24/outline';
import ConversationsTab from '../../components/agent/tabs/ConversationsTab';
import TrainingTab from '../../components/agent/tabs/TrainingTab';
import PerformanceTab from '../../components/agent/tabs/PerformanceTab';
import SettingsTab from '../../components/agent/tabs/SettingsTab';
import ChatPopup from '../../components/chat/ChatPopup';

const CompanyAgentDetail = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('overview');
  const [showActivityDetails, setShowActivityDetails] = React.useState<string | null>(null);
  const [showChat, setShowChat] = React.useState(false);

  // Mock data for the agents
  const agentData = {
    'sarah': {
      name: 'FTC Sarah',
      role: 'Tree Service Customer Specialist',
      metrics: {
        responseTime: '1.2s',
        satisfaction: '98%',
        conversations: '1,234',
        training: '95%',
      },
      recentActivity: [
        {
          id: '1',
          type: 'training',
          title: 'New training completed',
          description: 'Tree Disease Identification',
          time: '2 hours ago',
          details: 'Completed advanced training module on identifying common tree diseases and appropriate treatment methods. Achieved a score of 98%.',
        },
        {
          id: '2',
          type: 'conversation',
          title: 'Customer interaction',
          description: 'Emergency tree removal inquiry',
          time: '4 hours ago',
          details: 'Assisted customer with fallen tree emergency. Provided immediate quote and coordinated same-day service. Customer satisfaction rating: 5/5.',
        },
        {
          id: '3',
          type: 'performance',
          title: 'Performance milestone',
          description: 'Achieved 98% satisfaction rate',
          time: '1 day ago',
          details: 'Maintained consistent high performance in customer satisfaction over the past 30 days, with particularly strong scores in response time and solution accuracy.',
        },
      ],
      capabilities: {
        treeService: [
          'Emergency Response',
          'Tree Health Assessment',
          'Species Identification',
          'Risk Assessment',
        ],
        customerService: [
          'Scheduling',
          'Quote Generation',
          'Follow-up Management',
          'Client Education',
        ],
        technical: [
          'Report Generation',
          'Photo Analysis',
          'Treatment Planning',
          'Growth Prediction',
        ],
      },
    },
    'emma': {
      name: 'FTC Emma',
      role: 'Head of Marketing and Growth',
      metrics: {
        responseTime: '1.2s',
        satisfaction: '97%',
        conversations: '1,876',
        training: '96%',
      },
      recentActivity: [
        {
          id: '1',
          type: 'training',
          title: 'Marketing Strategy Update',
          description: 'Digital Marketing Campaign Planning',
          time: '1 hour ago',
          details: 'Developed comprehensive Q1 2025 marketing strategy focusing on market expansion and brand awareness.',
        },
        {
          id: '2',
          type: 'conversation',
          title: 'Growth Analysis',
          description: 'Market Expansion Strategy',
          time: '3 hours ago',
          details: 'Analyzed market trends and competitor data to identify key growth opportunities in the Northeast region.',
        },
        {
          id: '3',
          type: 'performance',
          title: 'Campaign Success',
          description: 'Q4 Marketing Results',
          time: '1 day ago',
          details: 'Achieved 45% increase in qualified leads through targeted digital marketing campaigns and content strategy.',
        },
      ],
      capabilities: {
        treeService: [
          'Market Analysis',
          'Brand Development',
          'Industry Positioning',
          'Service Marketing',
        ],
        customerService: [
          'Lead Generation',
          'Campaign Management',
          'Content Strategy',
          'Brand Communication',
        ],
        technical: [
          'Marketing Analytics',
          'SEO Optimization',
          'Digital Campaign Tools',
          'Growth Metrics',
        ],
      },
    },
    'max': {
      name: 'FTC Max',
      role: 'Operations and Crew Management Specialist',
      metrics: {
        responseTime: '1.5s',
        satisfaction: '96%',
        conversations: '1,245',
        training: '98%',
      },
      recentActivity: [
        {
          id: '1',
          type: 'training',
          title: 'New certification',
          description: 'Advanced Crew Management',
          time: '3 hours ago',
          details: 'Completed certification in advanced crew management and operational efficiency optimization.',
        },
        {
          id: '2',
          type: 'conversation',
          title: 'Operations update',
          description: 'Coordinated emergency response team',
          time: '5 hours ago',
          details: 'Successfully coordinated multiple crew deployments for post-storm cleanup operations.',
        },
        {
          id: '3',
          type: 'performance',
          title: 'Performance milestone',
          description: 'Improved crew efficiency by 30%',
          time: '2 days ago',
          details: 'Implemented new scheduling system resulting in significant improvement in crew response times and resource utilization.',
        },
      ],
      capabilities: {
        treeService: [
          'Crew Scheduling',
          'Emergency Response Management',
          'Resource Allocation',
          'Safety Protocol Implementation',
        ],
        customerService: [
          'Team Coordination',
          'Client Site Management',
          'Service Quality Assurance',
          'Operational Communication',
        ],
        technical: [
          'Equipment Management',
          'Logistics Planning',
          'Performance Tracking',
          'Safety Compliance',
        ],
      },
    },
    'alex': {
      name: 'FTC Alex',
      role: 'Business Intelligence Specialist',
      metrics: {
        responseTime: '1.3s',
        satisfaction: '98%',
        conversations: '1,234',
        training: '99%',
      },
      recentActivity: [
        {
          id: '1',
          type: 'training',
          title: 'Advanced Analytics',
          description: 'Predictive Modeling Certification',
          time: '4 hours ago',
          details: 'Completed advanced certification in predictive analytics and machine learning for business forecasting.',
        },
        {
          id: '2',
          type: 'conversation',
          title: 'Data Analysis',
          description: 'Regional Performance Insights',
          time: '6 hours ago',
          details: 'Generated comprehensive analysis of regional performance metrics, identifying key growth opportunities and operational efficiencies.',
        },
        {
          id: '3',
          type: 'performance',
          title: 'BI Implementation',
          description: 'New Dashboard Launch',
          time: '1 day ago',
          details: 'Successfully launched new business intelligence dashboard, improving data visibility and decision-making across departments.',
        },
      ],
      capabilities: {
        treeService: [
          'Performance Analytics',
          'Service Optimization',
          'Resource Utilization',
          'Trend Analysis',
        ],
        customerService: [
          'Data Visualization',
          'Reporting Automation',
          'KPI Monitoring',
          'Insight Generation',
        ],
        technical: [
          'Predictive Modeling',
          'Database Management',
          'Statistical Analysis',
          'Business Analytics',
        ],
      },
    },
  };

  const agentIdWithoutPrefix = agentId?.replace('ftc-', '') || 'sarah';

  const agent = agentData[agentIdWithoutPrefix as keyof typeof agentData];
  
  if (!agent) {
    return <div>Agent not found</div>;
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'conversations', name: 'Conversations', icon: ChatBubbleLeftIcon },
    { id: 'training', name: 'Training', icon: AcademicCapIcon },
    { id: 'performance', name: 'Performance', icon: SparklesIcon },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-medium text-gray-500">Response Time</h3>
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">{agent.metrics.responseTime}</span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2">
                  <SparklesIcon className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-medium text-gray-500">Satisfaction</h3>
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">{agent.metrics.satisfaction}</span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2">
                  <ChatBubbleLeftIcon className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-medium text-gray-500">Conversations</h3>
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">{agent.metrics.conversations}</span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2">
                  <AcademicCapIcon className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-medium text-gray-500">Training</h3>
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">{agent.metrics.training}</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {agent.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="relative p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => setShowActivityDetails(activity.id)}
                    onMouseEnter={() => setShowActivityDetails(activity.id)}
                    onMouseLeave={() => setShowActivityDetails(null)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                      </div>
                      <span className="text-sm text-gray-400">{activity.time}</span>
                    </div>
                    {showActivityDetails === activity.id && (
                      <div className="absolute z-10 left-0 right-0 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                        <p className="text-sm text-gray-600">{activity.details}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tree Service Expertise</h3>
                <ul className="space-y-3">
                  {agent.capabilities.treeService.map((capability, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Service</h3>
                <ul className="space-y-3">
                  {agent.capabilities.customerService.map((capability, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Knowledge</h3>
                <ul className="space-y-3">
                  {agent.capabilities.technical.map((capability, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      case 'conversations':
        return (
          <ConversationsTab 
            agentId={agentIdWithoutPrefix}
            agentRole={agent.role}
          />
        );
      case 'training':
        return <TrainingTab />;
      case 'performance':
        return <PerformanceTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={`/agents/${agentIdWithoutPrefix}.svg`}
                alt={agent.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{agent.name}</h1>
                <p className="text-gray-600">{agent.role}</p>
              </div>
            </div>
            <button 
              onClick={() => setShowChat(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Start Conversation
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm
                      ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>

      {/* Chat Popup */}
      {showChat && (
        <ChatPopup
          agentName={agent.name}
          agentImage={`/agents/${agentIdWithoutPrefix}.svg`}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default CompanyAgentDetail;
