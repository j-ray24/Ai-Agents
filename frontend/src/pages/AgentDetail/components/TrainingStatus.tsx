import React from 'react';
import {
  AcademicCapIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const TrainingStatus = () => {
  const trainingModules = [
    {
      id: 1,
      name: 'Tree Service Fundamentals',
      progress: 100,
      status: 'completed',
      lastUpdated: '2 days ago',
      topics: [
        'Basic Tree Biology',
        'Common Tree Diseases',
        'Tree Risk Assessment',
        'Emergency Response Protocols',
      ],
    },
    {
      id: 2,
      name: 'Customer Service Excellence',
      progress: 85,
      status: 'in-progress',
      lastUpdated: '1 day ago',
      topics: [
        'Communication Best Practices',
        'Handling Customer Concerns',
        'Service Scheduling',
        'Quote Generation',
      ],
    },
    {
      id: 3,
      name: 'Safety and Compliance',
      progress: 60,
      status: 'in-progress',
      lastUpdated: '3 hours ago',
      topics: [
        'OSHA Requirements',
        'Equipment Safety',
        'Site Safety Protocols',
        'Emergency Procedures',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Training Progress</h2>
            <p className="text-sm text-gray-500">Overall completion: 82%</p>
          </div>
          <AcademicCapIcon className="w-8 h-8 text-primary" />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary rounded-full h-3 transition-all duration-500"
            style={{ width: '82%' }}
          ></div>
        </div>
      </div>

      {/* Training Modules */}
      <div className="grid grid-cols-1 gap-6">
        {trainingModules.map((module) => (
          <div key={module.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{module.name}</h3>
                <div className="flex items-center mt-1 space-x-4">
                  <span className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    Updated {module.lastUpdated}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    module.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {module.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-primary">{module.progress}%</span>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className={`rounded-full h-2 transition-all duration-500 ${
                  module.status === 'completed' ? 'bg-green-500' : 'bg-primary'
                }`}
                style={{ width: `${module.progress}%` }}
              ></div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Topics Covered:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {module.topics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <DocumentTextIcon className="w-4 h-4 mr-2 text-gray-400" />
                    {topic}
                  </div>
                ))}
              </div>
            </div>

            {module.status !== 'completed' && (
              <button className="mt-4 inline-flex items-center text-primary hover:text-primary-dark">
                <BookOpenIcon className="w-4 h-4 mr-1" />
                Continue Training
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Suggested Training */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Training</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-900">Advanced Tree Care</h4>
            <p className="text-sm text-gray-500 mt-1">Learn about specialized tree maintenance techniques</p>
            <button className="mt-3 text-primary hover:text-primary-dark">Start Training →</button>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-900">Storm Damage Response</h4>
            <p className="text-sm text-gray-500 mt-1">Emergency protocols for storm-related tree damage</p>
            <button className="mt-3 text-primary hover:text-primary-dark">Start Training →</button>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-900">Customer Communication</h4>
            <p className="text-sm text-gray-500 mt-1">Advanced techniques for client interaction</p>
            <button className="mt-3 text-primary hover:text-primary-dark">Start Training →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingStatus;
