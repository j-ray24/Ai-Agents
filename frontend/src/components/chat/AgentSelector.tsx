import React from 'react';

interface AgentSelectorProps {
  onSelectAgent: (agentId: string, agentName: string, agentRole: string) => void;
  onClose: () => void;
}

const agents = [
  {
    id: 'sarah',
    name: 'FTC Sarah',
    role: 'Tree Service Customer Specialist',
    image: '/agents/sarah.svg'
  },
  {
    id: 'emma',
    name: 'FTC Emma',
    role: 'Head of Marketing and Growth',
    image: '/agents/emma.svg'
  },
  {
    id: 'max',
    name: 'FTC Max',
    role: 'Operations and Crew Management Specialist',
    image: '/agents/max.svg'
  },
  {
    id: 'alex',
    name: 'FTC Alex',
    role: 'Business Intelligence Specialist',
    image: '/agents/alex.svg'
  }
];

const AgentSelector: React.FC<AgentSelectorProps> = ({ onSelectAgent, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Select an Agent</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => onSelectAgent(agent.id, agent.name, agent.role)}
              className="flex items-center space-x-4 p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <img
                src={agent.image}
                alt={agent.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                <p className="text-sm text-gray-600">{agent.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentSelector;
