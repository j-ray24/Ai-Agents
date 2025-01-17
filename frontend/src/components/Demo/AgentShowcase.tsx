import React, { useState, useEffect } from 'react';
import ChatDemo from './ChatDemo';
import type { Message } from './ChatDemo';

interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  demoMessages: Message[];
}

interface Props {
  handleAgentClick?: (agent: Agent) => void;
}

const agents: Agent[] = [
  {
    id: 'ashley',
    name: 'Ashley',
    role: 'Lead Generation Agent',
    avatar: '/images/ashley.svg',
    demoMessages: [
      {
        id: 1,
        sender: 'user',
        content: "Hi, I'm interested in getting a quote for tree removal.",
        timestamp: '2:30 PM'
      },
      {
        id: 2,
        sender: 'agent',
        content: "Hello! I'd be happy to help you get a quote. Could you tell me about the tree? What's the approximate height and condition?",
        timestamp: '2:30 PM'
      },
      {
        id: 3,
        sender: 'user',
        content: "It's a large oak tree, probably about 40 feet tall. It's starting to lean towards my house which is why I want it removed.",
        timestamp: '2:31 PM'
      },
      {
        id: 4,
        sender: 'agent',
        content: "I understand your concern about the leaning tree. That definitely needs attention. A few quick questions to provide you with an accurate quote:\n\n1. Is there clear access to the tree for our equipment?\n2. Are there any power lines nearby?\n3. What's your preferred timeline for the removal?",
        timestamp: '2:31 PM'
      },
      {
        id: 5,
        sender: 'user',
        content: "Yes, there's good access from the street. There are power lines about 20 feet away. I'd like it done within the next week if possible.",
        timestamp: '2:32 PM'
      },
      {
        id: 6,
        sender: 'agent',
        content: "Thank you for those details. Based on what you've described, here's what I recommend:\n\n• Full tree removal including stump grinding\n• Special safety measures due to the power lines\n• Priority scheduling within 7 days\n\nI can have our certified arborist visit your property tomorrow for a precise quote. We have availability at 9 AM or 2 PM - which would you prefer?",
        timestamp: '2:32 PM'
      }
    ]
  },
  {
    id: 'max',
    name: 'Max',
    role: 'Customer Service Agent',
    avatar: '/images/manfasttreecarelogo.svg',
    demoMessages: [
      {
        id: 1,
        sender: 'user',
        content: "Hey, I noticed some brown spots on my newly planted trees. Should I be worried?",
        timestamp: '2:30 PM'
      },
      {
        id: 2,
        sender: 'agent',
        content: "I understand your concern about the brown spots. Let's figure this out together. When did you first notice them, and which parts of the tree are affected - leaves, branches, or trunk?",
        timestamp: '2:30 PM'
      },
      {
        id: 3,
        sender: 'user',
        content: "I noticed them yesterday. It's mainly on the leaves, and some of them are starting to curl up.",
        timestamp: '2:31 PM'
      },
      {
        id: 4,
        sender: 'agent',
        content: "Thank you for those details. A few more questions to help diagnose the issue:\n\n1. How often are you watering the trees?\n2. Have we had any extreme weather recently?\n3. Are you using any fertilizers?\n\nLeaf browning and curling could indicate several things, from water stress to fungal infection.",
        timestamp: '2:31 PM'
      },
      {
        id: 5,
        sender: 'user',
        content: "I water them every other day, and we've had a really hot week. I haven't used any fertilizer yet.",
        timestamp: '2:32 PM'
      },
      {
        id: 6,
        sender: 'agent',
        content: "Based on what you've described, this sounds like heat stress combined with possible water stress. Here's what I recommend:\n\n1. Increase watering to daily during this hot weather, preferably in the early morning\n2. Add a 2-3 inch layer of mulch around the base (keeping it away from the trunk)\n3. Consider adding a temporary shade cloth if possible\n\nWould you like me to send you our detailed care guide for newly planted trees? It includes specific watering schedules based on weather conditions.",
        timestamp: '2:32 PM'
      }
    ]
  },
  {
    id: 'sarah',
    name: 'Sarah',
    role: 'Employee Onboarding Agent',
    avatar: '/images/asianftc.svg',
    demoMessages: [
      {
        id: 1,
        sender: 'user',
        content: "Hi, I'm starting my first day as a tree care specialist next week. What should I expect?",
        timestamp: '2:30 PM'
      },
      {
        id: 2,
        sender: 'agent',
        content: "Welcome aboard! I'm here to help make your first day great. Let me walk you through what to expect and what you'll need to prepare.",
        timestamp: '2:30 PM'
      },
      {
        id: 3,
        sender: 'user',
        content: "Thanks! What time should I arrive and what should I bring?",
        timestamp: '2:31 PM'
      },
      {
        id: 4,
        sender: 'agent',
        content: "Great questions! Here's what you need to know:\n\nArrival Time: 7:30 AM at our main facility\n\nPlease bring:\n• Government-issued ID\n• Steel-toed boots\n• Weather-appropriate clothing\n• Water bottle\n\nWe'll provide:\n• All safety equipment\n• Uniform\n• Training materials\n\nYour first day will include safety orientation, team introductions, and hands-on equipment familiarization. Would you like me to send you our detailed first-day guide?",
        timestamp: '2:31 PM'
      },
      {
        id: 5,
        sender: 'user',
        content: "Yes, that would be helpful. Will I be working with a team right away?",
        timestamp: '2:32 PM'
      },
      {
        id: 6,
        sender: 'agent',
        content: "You'll be paired with our senior arborist, Mike, for your first two weeks. He's been with us for 15 years and is an excellent mentor. Your schedule will be:\n\nWeek 1:\n• Safety certification\n• Equipment training\n• Basic tree care techniques\n\nWeek 2:\n• Shadowing on real projects\n• Specialized equipment training\n• Client communication training\n\nI'll send you the guide now, along with Mike's contact information. Is there anything specific you'd like to know about the training process?",
        timestamp: '2:32 PM'
      }
    ]
  },
  {
    id: 'alex',
    name: 'Alex',
    role: 'Marketing Agent',
    avatar: '/images/whiteftc.svg',
    demoMessages: [
      {
        id: 1,
        sender: 'user',
        content: "I need help creating a marketing campaign for our spring tree care services.",
        timestamp: '2:30 PM'
      },
      {
        id: 2,
        sender: 'agent',
        content: "I'd love to help you develop a compelling spring campaign. What are your main services and target audience for this season?",
        timestamp: '2:30 PM'
      },
      {
        id: 3,
        sender: 'user',
        content: "We're focusing on pest prevention, fertilization, and pruning. Mainly targeting homeowners in suburban areas.",
        timestamp: '2:31 PM'
      },
      {
        id: 4,
        sender: 'agent',
        content: "Perfect timing for those services. Here's a suggested campaign structure:\n\nKey Message:\n\"Protect Your Trees, Enhance Your Property\"\n\nCampaign Elements:\n1. Early Bird Discount (15% off for March bookings)\n2. Free spring health assessment with any service\n3. Educational content series: 'Signs Your Trees Need Spring Care'\n\nWould you like me to elaborate on any of these elements?",
        timestamp: '2:31 PM'
      },
      {
        id: 5,
        sender: 'user',
        content: "Yes, could you expand on the educational content series? What topics should we cover?",
        timestamp: '2:32 PM'
      },
      {
        id: 6,
        sender: 'agent',
        content: "Here's a detailed content plan for the 'Signs Your Trees Need Spring Care' series:\n\nWeek 1: Visual Inspection Guide\n• Common pest indicators\n• Winter damage assessment\n• New growth patterns\n\nWeek 2: Soil Health\n• Testing methods\n• Nutrient deficiency signs\n• Mulching tips\n\nWeek 3: Pruning Benefits\n• Safety considerations\n• Aesthetic improvements\n• Growth stimulation\n\nWe can deliver this through:\n• Email newsletter\n• Social media carousel posts\n• Blog articles with expert tips\n• Short video demonstrations\n\nShall I create a detailed content calendar with posting schedules?",
        timestamp: '2:32 PM'
      }
    ]
  }
];

const AgentShowcase: React.FC<Props> = ({ handleAgentClick }) => {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAgentChange = (agent: Agent) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedAgent(agent);
      if (handleAgentClick) {
        handleAgentClick(agent);
      }
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Agent Selection Tabs */}
        <div className="flex justify-center space-x-6 mb-12">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => handleAgentChange(agent)}
              className={`group relative px-6 py-3 rounded-xl transition-all duration-300 ${
                selectedAgent.id === agent.id
                  ? 'bg-white shadow-lg scale-105'
                  : 'hover:bg-white/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className={`w-12 h-12 rounded-full transition-all duration-300 ${
                    selectedAgent.id === agent.id
                      ? 'ring-4 ring-primary/20'
                      : 'group-hover:ring-4 group-hover:ring-primary/10'
                  }`}
                />
                <div className="text-left">
                  <h4 className={`font-semibold transition-colors ${
                    selectedAgent.id === agent.id
                      ? 'text-primary'
                      : 'text-gray-700'
                  }`}>
                    {agent.name}
                  </h4>
                  <p className="text-sm text-gray-500">{agent.role}</p>
                </div>
              </div>
              {selectedAgent.id === agent.id && (
                <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary"></div>
              )}
            </button>
          ))}
        </div>

        {/* Demo Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Chat Window */}
          <div className={`transition-all duration-300 transform ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Agent Info Header */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-gray-100 p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedAgent.avatar}
                    alt={selectedAgent.name}
                    className="w-16 h-16 rounded-full ring-4 ring-white shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedAgent.name}
                    </h3>
                    <p className="text-gray-500">{selectedAgent.role}</p>
                  </div>
                </div>
              </div>

              {/* Chat Demo */}
              <div className="p-6">
                <ChatDemo
                  messages={selectedAgent.demoMessages}
                  agentName={selectedAgent.name}
                  agentRole={selectedAgent.role}
                  avatar={selectedAgent.avatar}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentShowcase;
