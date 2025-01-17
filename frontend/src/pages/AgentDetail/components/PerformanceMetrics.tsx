import React from 'react';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
  UserGroupIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const PerformanceMetrics = () => {
  return (
    <div className="space-y-6">
      {/* Time Period Selector */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-primary text-white rounded-md">Last 7 days</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Last 30 days</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Last 90 days</button>
          </div>
          <input
            type="date"
            className="rounded-md border-gray-300"
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Response Time</h3>
            <ClockIcon className="w-6 h-6 text-primary" />
          </div>
          <p className="text-3xl font-bold text-gray-900">1.2s</p>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
            <span>12% improvement</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Satisfaction</h3>
            <UserGroupIcon className="w-6 h-6 text-primary" />
          </div>
          <p className="text-3xl font-bold text-gray-900">98%</p>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
            <span>5% improvement</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Resolution Rate</h3>
            <CheckCircleIcon className="w-6 h-6 text-primary" />
          </div>
          <p className="text-3xl font-bold text-gray-900">95%</p>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
            <span>3% improvement</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Conversations</h3>
            <ChatBubbleLeftIcon className="w-6 h-6 text-primary" />
          </div>
          <p className="text-3xl font-bold text-gray-900">1,234</p>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
            <span>15% increase</span>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{'< 1 second'}</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>1-2 seconds</span>
                <span>35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>2-3 seconds</span>
                <span>15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{'> 3 seconds'}</span>
                <span>5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Satisfaction Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Satisfaction Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Very Satisfied</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 rounded-full h-2" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Satisfied</span>
                <span>20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 rounded-full h-2" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Neutral</span>
                <span>4%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 rounded-full h-2" style={{ width: '4%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Unsatisfied</span>
                <span>1%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 rounded-full h-2" style={{ width: '1%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
