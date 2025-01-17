import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

// Analytics data
const analyticsData = {
  overview: {
    totalConversations: 2847,
    activeUsers: 892,
    avgResponseTime: '1.2s',
    satisfactionRate: '96%',
    completionRate: '98%',
    monthlyGrowth: '24%'
  },
  agentPerformance: [
    {
      name: 'Sarah',
      conversations: 982,
      avgResponseTime: '0.8s',
      satisfaction: '98%',
      completionRate: '99%',
      topSkills: ['Customer Service', 'Scheduling', 'Emergency Response']
    },
    {
      name: 'Max',
      conversations: 845,
      avgResponseTime: '1.1s',
      satisfaction: '97%',
      completionRate: '98%',
      topSkills: ['Operations', 'Resource Management', 'Route Optimization']
    },
    {
      name: 'Emma',
      conversations: 634,
      avgResponseTime: '1.3s',
      satisfaction: '95%',
      completionRate: '97%',
      topSkills: ['Marketing', 'Social Media', 'Content Creation']
    },
    {
      name: 'Alex',
      conversations: 386,
      avgResponseTime: '1.6s',
      satisfaction: '94%',
      completionRate: '96%',
      topSkills: ['Data Analysis', 'Business Intelligence', 'Trend Prediction']
    }
  ],
  monthlyTrends: {
    conversations: [2100, 2300, 2500, 2847],
    satisfaction: [92, 94, 95, 96],
    responseTime: [1.8, 1.5, 1.3, 1.2],
    completion: [95, 96, 97, 98]
  }
};

const Analytics = () => {
  const navigate = useNavigate();

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Conversations</h3>
              <ChatBubbleLeftIcon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.totalConversations}</p>
            <p className="text-sm text-gray-500 mt-2">+{analyticsData.overview.monthlyGrowth} this month</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
              <UserGroupIcon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.activeUsers}</p>
            <p className="text-sm text-gray-500 mt-2">Currently engaging with agents</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Avg Response Time</h3>
              <ClockIcon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.avgResponseTime}</p>
            <p className="text-sm text-gray-500 mt-2">Across all conversations</p>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Agent Performance</h2>
          <div className="space-y-6">
            {analyticsData.agentPerformance.map((agent) => (
              <div key={agent.name} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {agent.topSkills.map((skill) => (
                        <span key={skill} className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Conversations</p>
                    <p className="text-xl font-semibold text-gray-900">{agent.conversations}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Response Time</p>
                    <p className="text-lg font-semibold text-gray-900">{agent.avgResponseTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Satisfaction</p>
                    <p className="text-lg font-semibold text-gray-900">{agent.satisfaction}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Completion Rate</p>
                    <p className="text-lg font-semibold text-gray-900">{agent.completionRate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly Trends</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Conversations</h3>
              <div className="flex items-end space-x-1 h-32">
                {analyticsData.monthlyTrends.conversations.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-primary/80 rounded-t"
                    style={{ height: `${(value / 3000) * 100}%` }}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Satisfaction (%)</h3>
              <div className="flex items-end space-x-1 h-32">
                {analyticsData.monthlyTrends.satisfaction.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-green-500/80 rounded-t"
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Response Time (s)</h3>
              <div className="flex items-end space-x-1 h-32">
                {analyticsData.monthlyTrends.responseTime.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-blue-500/80 rounded-t"
                    style={{ height: `${(value / 2) * 100}%` }}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Completion (%)</h3>
              <div className="flex items-end space-x-1 h-32">
                {analyticsData.monthlyTrends.completion.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-yellow-500/80 rounded-t"
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-4 text-sm text-gray-500">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
