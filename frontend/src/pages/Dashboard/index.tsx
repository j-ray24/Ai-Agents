import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChatBubbleLeftIcon,
  BoltIcon,
  ChartBarIcon,
  SparklesIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import AgentSelector from '../../components/chat/AgentSelector';
import ChatPopup from '../../components/chat/ChatPopup';

type AgentActivity = {
  type: 'conversation' | 'task' | 'analysis' | 'alert';
  timestamp: string;
  description: string;
  status: 'in_progress' | 'completed' | 'scheduled';
  priority: 'high' | 'medium' | 'low';
  relatedTo?: string;
};

type Agent = {
  name: string;
  role: string;
  status: 'active' | 'learning' | 'scheduled';
  avatar: string;
  currentTask?: string;
  recentActivities: AgentActivity[];
  capabilities: string[];
  activeConversations: number;
  tasksCompleted: number;
  learningProgress: number;
};

type AgentDirectory = {
  [key: string]: Agent;
};

const aiAgents: AgentDirectory = {
  'Sarah': {
    name: 'Sarah',
    role: 'Scheduling & Customer Service',
    status: 'active',
    avatar: '/agents/sarah.svg',
    currentTask: 'Handling customer inquiry about emergency tree removal',
    capabilities: [
      'Natural conversation',
      'Appointment scheduling',
      'Customer support',
      'Emergency response'
    ],
    recentActivities: [
      {
        type: 'conversation',
        timestamp: '2 minutes ago',
        description: 'Scheduled emergency tree removal for 1234 Oak Street',
        status: 'completed',
        priority: 'high'
      },
      {
        type: 'task',
        timestamp: '15 minutes ago',
        description: 'Updated customer database with new contact information',
        status: 'completed',
        priority: 'medium'
      }
    ],
    activeConversations: 3,
    tasksCompleted: 45,
    learningProgress: 92
  },
  'Max': {
    name: 'Max',
    role: 'Operations & Crew Management',
    status: 'active',
    avatar: '/agents/max.svg',
    currentTask: 'Optimizing crew schedules for tomorrow',
    capabilities: [
      'Resource allocation',
      'Route optimization',
      'Equipment tracking',
      'Weather analysis'
    ],
    recentActivities: [
      {
        type: 'analysis',
        timestamp: '5 minutes ago',
        description: 'Rerouted Crew A due to weather conditions',
        status: 'completed',
        priority: 'high'
      },
      {
        type: 'alert',
        timestamp: 'Just now',
        description: 'Equipment maintenance alert: Chipper 1 due for service',
        status: 'in_progress',
        priority: 'medium'
      }
    ],
    activeConversations: 2,
    tasksCompleted: 38,
    learningProgress: 88
  },
  'Emma': {
    name: 'Emma',
    role: 'Marketing & Growth',
    status: 'active',
    avatar: '/agents/emma.svg',
    currentTask: 'Analyzing social media engagement patterns',
    capabilities: [
      'Social media management',
      'Content creation',
      'Lead generation',
      'Market analysis'
    ],
    recentActivities: [
      {
        type: 'task',
        timestamp: '10 minutes ago',
        description: 'Created targeted ad campaign for storm season',
        status: 'completed',
        priority: 'medium'
      },
      {
        type: 'analysis',
        timestamp: '1 hour ago',
        description: 'Generated monthly marketing performance report',
        status: 'completed',
        priority: 'medium'
      }
    ],
    activeConversations: 1,
    tasksCompleted: 52,
    learningProgress: 94
  },
  'Alex': {
    name: 'Alex',
    role: 'Business Intelligence',
    status: 'learning',
    avatar: '/agents/alex.svg',
    currentTask: 'Learning from recent customer feedback patterns',
    capabilities: [
      'Data analysis',
      'Trend prediction',
      'Performance tracking',
      'Business insights'
    ],
    recentActivities: [
      {
        type: 'analysis',
        timestamp: '30 minutes ago',
        description: 'Identified emerging service demand in North District',
        status: 'completed',
        priority: 'medium'
      },
      {
        type: 'task',
        timestamp: '2 hours ago',
        description: 'Updated Q1 revenue projections',
        status: 'completed',
        priority: 'high'
      }
    ],
    activeConversations: 0,
    tasksCompleted: 41,
    learningProgress: 86
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [showSignOut, setShowSignOut] = useState(false);
  const [showAgentSelector, setShowAgentSelector] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<{
    id: string;
    name: string;
    role: string;
  } | null>(null);

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const navigateToAgent = (agentName: string) => {
    navigate(`/dashboard/company-agents/ftc-${agentName.toLowerCase()}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'learning': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'conversation': return ChatBubbleLeftIcon;
      case 'task': return CheckCircleIcon;
      case 'analysis': return ChartBarIcon;
      case 'alert': return BoltIcon;
      default: return SparklesIcon;
    }
  };

  const handleStartConversation = () => {
    setShowAgentSelector(true);
  };

  const handleSelectAgent = (agentId: string, agentName: string, agentRole: string) => {
    setSelectedAgent({ id: agentId, name: agentName, role: agentRole });
    setShowAgentSelector(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-primary">Fast Tree Care</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, James Ray</span>
              <button
                onClick={() => setShowSignOut(!showSignOut)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-8xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {Object.entries(aiAgents).map(([key, agent]) => (
            <div
              key={key}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden"
              onClick={() => navigateToAgent(key)}
            >
              {/* Agent Header */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                      <img 
                        src={agent.avatar} 
                        alt={`${agent.name} avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-2xl font-bold text-gray-900">{agent.name}</h3>
                      <p className="text-lg text-gray-500">{agent.role}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </span>
                </div>

                {/* Current Task */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Current Task</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{agent.currentTask || 'No active task'}</p>
                  </div>
                </div>

                {/* Agent Stats */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Active Conversations</p>
                    <p className="text-2xl font-bold text-gray-900">{agent.activeConversations}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Tasks Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{agent.tasksCompleted}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Learning Progress</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-gray-900 mr-2">{agent.learningProgress}%</p>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary rounded-full h-2"
                            style={{ width: `${agent.learningProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Recent Activity</h4>
                  <div className="space-y-4">
                    {agent.recentActivities.slice(0, 3).map((activity, index) => {
                      const Icon = getActivityIcon(activity.type);
                      return (
                        <div key={index} className="flex items-start bg-gray-50 rounded-lg p-4">
                          <div className={`p-2 rounded-lg ${
                            activity.priority === 'high' ? 'bg-red-100' :
                            activity.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                          }`}>
                            <Icon className="w-6 h-6 text-gray-700" />
                          </div>
                          <div className="ml-4 flex-1">
                            <p className="text-gray-700">{activity.description}</p>
                            <p className="text-sm text-gray-500 mt-1">{activity.timestamp}</p>
                          </div>
                          <span className={`text-sm font-medium ${
                            activity.priority === 'high' ? 'text-red-600' :
                            activity.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {activity.priority}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <div className="px-8 py-4 bg-gray-50 hover:bg-gray-100">
                <button className="w-full flex items-center justify-center text-primary font-medium">
                  <span>View Detailed Analytics</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <button 
            onClick={handleStartConversation}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col items-center">
              <ChatBubbleLeftIcon className="w-8 h-8 text-primary mb-2" />
              <span className="text-sm font-medium text-gray-600">Start Conversation</span>
            </div>
          </button>
          <button 
            onClick={() => navigate('/training')}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col items-center">
              <UserCircleIcon className="w-8 h-8 text-primary mb-2" />
              <span className="text-sm font-medium text-gray-600">Train Agents</span>
            </div>
          </button>
          <button 
            onClick={() => navigate('/insights')}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col items-center">
              <SparklesIcon className="w-8 h-8 text-primary mb-2" />
              <span className="text-sm font-medium text-gray-600">View Insights</span>
            </div>
          </button>
          <button 
            onClick={() => navigate('/analytics')}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col items-center">
              <ChartBarIcon className="w-8 h-8 text-primary mb-2" />
              <span className="text-sm font-medium text-gray-600">Analytics</span>
            </div>
          </button>
        </div>
      </main>

      {/* Sign Out Modal */}
      {showSignOut && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sign Out</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to sign out?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowSignOut(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Agent Selector Modal */}
      {showAgentSelector && (
        <AgentSelector
          onSelectAgent={handleSelectAgent}
          onClose={() => setShowAgentSelector(false)}
        />
      )}

      {/* Chat Popup */}
      {selectedAgent && (
        <ChatPopup
          agentName={selectedAgent.name}
          agentImage={`/agents/${selectedAgent.id}.svg`}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
