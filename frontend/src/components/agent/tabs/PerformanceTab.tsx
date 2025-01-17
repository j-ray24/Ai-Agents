import React from 'react';
import {
  ChartBarIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
  UserGroupIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';

// Mock data for charts
const performanceData = {
  responseTime: {
    current: 1.2,
    trend: -0.3,
    history: [1.8, 1.6, 1.4, 1.3, 1.2, 1.2, 1.2],
  },
  satisfaction: {
    current: 98,
    trend: 2,
    history: [94, 95, 96, 97, 98, 98, 98],
  },
  accuracy: {
    current: 95,
    trend: 1,
    history: [92, 93, 94, 94, 95, 95, 95],
  },
  conversations: {
    daily: 45,
    weekly: 315,
    monthly: 1234,
    trend: 5,
  },
};

const PerformanceTab = () => {
  const renderTrendIndicator = (trend: number) => {
    const Icon = trend >= 0 ? ArrowUpIcon : ArrowDownIcon;
    const color = trend >= 0 ? 'text-green-500' : 'text-red-500';
    return (
      <div className={`flex items-center ${color}`}>
        <Icon className="h-4 w-4 mr-1" />
        <span className="text-sm font-medium">{Math.abs(trend)}%</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium text-gray-500">Response Time</span>
            </div>
            {renderTrendIndicator(performanceData.responseTime.trend)}
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">{performanceData.responseTime.current}s</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <UserGroupIcon className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium text-gray-500">Satisfaction</span>
            </div>
            {renderTrendIndicator(performanceData.satisfaction.trend)}
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">{performanceData.satisfaction.current}%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ChartBarIcon className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium text-gray-500">Accuracy</span>
            </div>
            {renderTrendIndicator(performanceData.accuracy.trend)}
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">{performanceData.accuracy.current}%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ChatBubbleLeftIcon className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium text-gray-500">Daily Conversations</span>
            </div>
            {renderTrendIndicator(performanceData.conversations.trend)}
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">{performanceData.conversations.daily}</span>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-2 gap-6">
        {/* Response Time Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time Trend</h3>
          <div className="h-64 flex items-end space-x-2">
            {performanceData.responseTime.history.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-primary rounded-t"
                style={{ height: `${(value / 2) * 100}%` }}
              ></div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <span>7 days ago</span>
            <span>Today</span>
          </div>
        </div>

        {/* Satisfaction Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Satisfaction Trend</h3>
          <div className="h-64 flex items-end space-x-2">
            {performanceData.satisfaction.history.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-green-500 rounded-t"
                style={{ height: `${value}%` }}
              ></div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <span>7 days ago</span>
            <span>Today</span>
          </div>
        </div>
      </div>

      {/* Conversation Analytics */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Conversation Analytics</h3>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="text-sm font-medium text-gray-500">Daily Average</div>
            <div className="mt-2 text-2xl font-semibold text-gray-900">
              {performanceData.conversations.daily}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Weekly Total</div>
            <div className="mt-2 text-2xl font-semibold text-gray-900">
              {performanceData.conversations.weekly}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Monthly Total</div>
            <div className="mt-2 text-2xl font-semibold text-gray-900">
              {performanceData.conversations.monthly}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTab;
