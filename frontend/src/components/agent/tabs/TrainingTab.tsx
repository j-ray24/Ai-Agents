import React from 'react';
import {
  AcademicCapIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

interface TrainingModule {
  id: string;
  name: string;
  category: string;
  status: 'completed' | 'in-progress' | 'scheduled';
  progress: number;
  completedAt?: Date;
  score?: number;
  description: string;
}

const TrainingTab = () => {
  // Mock training data
  const trainingModules: TrainingModule[] = [
    {
      id: '1',
      name: 'Tree Disease Identification',
      category: 'Technical Skills',
      status: 'completed',
      progress: 100,
      completedAt: new Date('2025-01-17T10:00:00'),
      score: 98,
      description: 'Advanced training in identifying common tree diseases and appropriate treatment methods.',
    },
    {
      id: '2',
      name: 'Emergency Response Protocols',
      category: 'Safety',
      status: 'in-progress',
      progress: 75,
      description: 'Procedures for handling emergency tree removal situations and safety protocols.',
    },
    {
      id: '3',
      name: 'Customer Service Excellence',
      category: 'Soft Skills',
      status: 'completed',
      progress: 100,
      completedAt: new Date('2025-01-16T15:30:00'),
      score: 95,
      description: 'Best practices for customer interaction and satisfaction management.',
    },
    // Add more modules...
  ];

  const calculateOverallProgress = () => {
    const total = trainingModules.length;
    const completed = trainingModules.filter(m => m.status === 'completed').length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Training Progress</h2>
          <div className="text-sm font-medium text-primary">{calculateOverallProgress()}% Complete</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary rounded-full h-2.5 transition-all duration-500"
            style={{ width: `${calculateOverallProgress()}%` }}
          ></div>
        </div>
      </div>

      {/* Training Modules */}
      <div className="bg-white rounded-xl shadow-sm divide-y">
        {trainingModules.map((module) => (
          <div key={module.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">{module.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {module.category}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{module.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                {module.status === 'completed' && (
                  <>
                    <div className="flex items-center space-x-1">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium text-gray-900">{module.score}%</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Completed {module.completedAt?.toLocaleDateString()}
                    </div>
                  </>
                )}
                {module.status === 'in-progress' && (
                  <div className="flex items-center space-x-2">
                    <ArrowPathIcon className="h-5 w-5 text-primary animate-spin" />
                    <span className="text-sm font-medium text-primary">{module.progress}%</span>
                  </div>
                )}
                {module.status === 'scheduled' && (
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500">Scheduled</span>
                  </div>
                )}
              </div>
            </div>
            {module.status === 'in-progress' && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary rounded-full h-2 transition-all duration-500"
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Training Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm font-medium text-gray-500">Completed Modules</div>
          <div className="mt-2 flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-2xl font-semibold text-gray-900">
              {trainingModules.filter(m => m.status === 'completed').length}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm font-medium text-gray-500">Average Score</div>
          <div className="mt-2 flex items-center">
            <AcademicCapIcon className="h-5 w-5 text-primary mr-2" />
            <span className="text-2xl font-semibold text-gray-900">95%</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm font-medium text-gray-500">Hours Trained</div>
          <div className="mt-2 flex items-center">
            <ClockIcon className="h-5 w-5 text-primary mr-2" />
            <span className="text-2xl font-semibold text-gray-900">48</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingTab;
