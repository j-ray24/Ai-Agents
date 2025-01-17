import React from 'react';
import {
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const ConversationHistory = () => {
  const conversations = [
    {
      id: 1,
      customer: 'John Smith',
      topic: 'Emergency Tree Removal',
      status: 'Completed',
      time: '2 hours ago',
      satisfaction: 5,
      preview: 'I have a fallen tree blocking my driveway...',
    },
    {
      id: 2,
      customer: 'Sarah Johnson',
      topic: 'Tree Trimming Quote',
      status: 'In Progress',
      time: '1 hour ago',
      satisfaction: 4,
      preview: 'I need a quote for trimming three large oak trees...',
    },
    // Add more conversations as needed
  ];

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
        <div className="flex space-x-4">
          <select className="rounded-md border-gray-300">
            <option>All Conversations</option>
            <option>Completed</option>
            <option>In Progress</option>
          </select>
          <select className="rounded-md border-gray-300">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div className="flex-1 max-w-sm ml-4">
          <input
            type="search"
            placeholder="Search conversations..."
            className="w-full rounded-md border-gray-300"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="bg-white rounded-xl shadow-sm divide-y">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="p-6 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <UserCircleIcon className="w-10 h-10 text-gray-400" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {conversation.customer}
                  </h3>
                  <p className="text-sm text-gray-500">{conversation.topic}</p>
                  <p className="text-sm text-gray-600 mt-1">{conversation.preview}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {conversation.status}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {conversation.time}
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircleIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i < conversation.satisfaction
                          ? 'text-primary'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-sm p-4">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">10</span> of{' '}
              <span className="font-medium">97</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationHistory;
