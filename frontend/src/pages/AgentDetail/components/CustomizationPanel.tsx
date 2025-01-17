import React, { useState } from 'react';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';

const CustomizationPanel = () => {
  const [knowledgeBase, setKnowledgeBase] = useState([
    {
      id: 1,
      title: 'Service Pricing Guide',
      description: 'Current pricing for all tree services',
      lastUpdated: '2 days ago',
    },
    {
      id: 2,
      title: 'Equipment Specifications',
      description: 'Details about company equipment and capabilities',
      lastUpdated: '1 week ago',
    },
    {
      id: 3,
      title: 'Safety Procedures',
      description: 'Standard safety protocols and guidelines',
      lastUpdated: '3 days ago',
    },
  ]);

  const [responseTemplates, setResponseTemplates] = useState([
    {
      id: 1,
      trigger: 'Quote Request',
      response: 'Thank you for your interest in our tree services. To provide an accurate quote...',
    },
    {
      id: 2,
      trigger: 'Emergency Service',
      response: "I understand you have an emergency situation. I'll help you get immediate assistance...",
    },
    {
      id: 3,
      trigger: 'Schedule Consultation',
      response: "I'd be happy to help schedule a consultation with our arborist...",
    },
  ]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Agent Customization</h2>

      {/* Knowledge Base */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Knowledge Base</h3>
          <button className="inline-flex items-center text-sm text-primary hover:text-primary-dark">
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Document
          </button>
        </div>
        <div className="space-y-4">
          {knowledgeBase.map((item) => (
            <div key={item.id} className="flex items-start justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                <p className="text-xs text-gray-400 mt-1">Last updated: {item.lastUpdated}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Response Templates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Response Templates</h3>
          <button className="inline-flex items-center text-sm text-primary hover:text-primary-dark">
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Template
          </button>
        </div>
        <div className="space-y-4">
          {responseTemplates.map((template) => (
            <div key={template.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-gray-900">{template.trigger}</h4>
                <button className="text-gray-400 hover:text-gray-600">
                  <PencilIcon className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">{template.response}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;
