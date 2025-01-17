import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface ConversationsTabProps {
  agentId: string;
  agentRole: string;
}

interface Conversation {
  id: string;
  customer: string;
  topic: string;
  timestamp: Date;
  status: 'completed' | 'ongoing' | 'scheduled';
  duration: string;
  satisfaction: number;
  summary: string;
}

const ConversationsTab: React.FC<ConversationsTabProps> = ({ agentId, agentRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Mock conversation data based on agent role
  const getConversations = () => {
    switch (agentId) {
      case 'sarah':
        return [
          {
            id: '1',
            customer: 'John Smith',
            topic: 'Emergency Tree Removal',
            timestamp: new Date('2025-01-17T10:30:00'),
            status: 'completed',
            duration: '15m',
            satisfaction: 5,
            summary: 'Customer reported fallen tree after storm. Provided emergency service quote and scheduled same-day removal.',
          },
          {
            id: '2',
            customer: 'Emily Johnson',
            topic: 'Tree Health Assessment',
            timestamp: new Date('2025-01-17T09:15:00'),
            status: 'completed',
            duration: '25m',
            satisfaction: 4,
            summary: 'Conducted virtual assessment of maple tree health. Identified early signs of disease and recommended treatment plan.',
          },
        ];
      case 'emma':
        return [
          {
            id: '1',
            customer: 'Marketing Team',
            topic: 'Q1 2025 Strategy Planning',
            timestamp: new Date('2025-01-17T11:30:00'),
            status: 'completed',
            duration: '60m',
            satisfaction: 5,
            summary: 'Led quarterly marketing strategy meeting. Outlined digital campaign initiatives, budget allocation, and growth targets for Q1 2025.',
          },
          {
            id: '2',
            customer: 'Regional Directors',
            topic: 'Market Expansion Analysis',
            timestamp: new Date('2025-01-17T09:45:00'),
            status: 'completed',
            duration: '45m',
            satisfaction: 5,
            summary: 'Presented market analysis findings for Northeast expansion. Discussed potential opportunities, competitive landscape, and resource requirements.',
          },
          {
            id: '3',
            customer: 'Content Team',
            topic: 'Content Strategy Review',
            timestamp: new Date('2025-01-17T08:15:00'),
            status: 'completed',
            duration: '30m',
            satisfaction: 4,
            summary: 'Reviewed Q4 content performance metrics and planned content calendar for upcoming quarter. Focus on SEO optimization and lead generation.',
          },
        ];
      case 'max':
        return [
          {
            id: '1',
            customer: 'Team Alpha',
            topic: 'Storm Response Coordination',
            timestamp: new Date('2025-01-17T08:30:00'),
            status: 'completed',
            duration: '45m',
            satisfaction: 5,
            summary: 'Coordinated emergency response team for multiple locations affected by recent storm. Optimized crew assignments and equipment allocation.',
          },
          {
            id: '2',
            customer: 'Crew 5',
            topic: 'Equipment Deployment',
            timestamp: new Date('2025-01-17T09:45:00'),
            status: 'completed',
            duration: '30m',
            satisfaction: 4,
            summary: 'Managed equipment deployment for large-scale commercial project. Ensured proper resource allocation and safety protocols.',
          },
        ];
      case 'alex':
        return [
          {
            id: '1',
            customer: 'Executive Team',
            topic: 'Quarterly Performance Analysis',
            timestamp: new Date('2025-01-17T13:30:00'),
            status: 'completed',
            duration: '50m',
            satisfaction: 5,
            summary: 'Presented comprehensive Q4 performance analysis, highlighting key metrics, trends, and recommendations for operational improvements.',
          },
          {
            id: '2',
            customer: 'Operations Department',
            topic: 'Resource Optimization Report',
            timestamp: new Date('2025-01-17T11:15:00'),
            status: 'completed',
            duration: '45m',
            satisfaction: 5,
            summary: 'Analyzed resource utilization patterns and provided data-driven recommendations for optimizing crew assignments and equipment usage.',
          },
          {
            id: '3',
            customer: 'Regional Managers',
            topic: 'Predictive Analysis Review',
            timestamp: new Date('2025-01-17T09:30:00'),
            status: 'completed',
            duration: '40m',
            satisfaction: 5,
            summary: 'Shared predictive analysis results for seasonal demand patterns, enabling better resource planning and scheduling decisions.',
          },
        ];
      default:
        return [];
    }
  };

  const conversations = getConversations();
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || conv.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4">
          <select
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
            <option value="scheduled">Scheduled</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <FunnelIcon className="h-5 w-5 text-gray-500" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="divide-y">
          {filteredConversations.map((conv) => (
            <div key={conv.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{conv.customer}</h3>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      {conv.timestamp.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{conv.topic}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{conv.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-500">{conv.satisfaction}/5</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">{conv.summary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {filteredConversations.length} of {conversations.length} conversations
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Previous</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ConversationsTab;
