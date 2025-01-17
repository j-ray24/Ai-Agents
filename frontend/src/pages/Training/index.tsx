import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserGroupIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const Training = () => {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Train Agents</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Training Sessions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Training Sessions</h2>
              <UserGroupIcon className="w-6 h-6 text-primary" />
            </div>
            
            <div className="space-y-4">
              {/* Training Items */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900">Customer Service Basics</h3>
                <p className="text-sm text-gray-500 mt-1">Learn fundamental customer service skills and best practices</p>
                <button className="mt-3 text-primary hover:text-primary-dark">Start Training →</button>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900">Advanced Communication</h3>
                <p className="text-sm text-gray-500 mt-1">Master complex communication scenarios and conflict resolution</p>
                <button className="mt-3 text-primary hover:text-primary-dark">Start Training →</button>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900">Product Knowledge</h3>
                <p className="text-sm text-gray-500 mt-1">Deep dive into product features and technical specifications</p>
                <button className="mt-3 text-primary hover:text-primary-dark">Start Training →</button>
              </div>
            </div>
          </div>
          
          {/* Progress Tracking */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Training Progress</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Customer Service Basics</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Advanced Communication</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Product Knowledge</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;
