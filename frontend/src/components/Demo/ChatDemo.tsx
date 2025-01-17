import React, { useState, useEffect, useRef } from 'react';

export interface Message {
  id: number;
  sender: 'user' | 'agent';
  content: string;
  timestamp: string;
}

export interface ChatDemoProps {
  messages: Message[];
  agentName: string;
  agentRole: string;
  avatar: string;
}

const ChatDemo: React.FC<ChatDemoProps> = ({
  messages,
  agentName,
  agentRole,
  avatar,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset demo when agent changes
  useEffect(() => {
    setCurrentStep(0);
    setIsTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    startDemo();
  }, [messages]); // This will run when messages array changes (i.e., when switching agents)

  // Remove scroll to top effect
  // useEffect(() => {
  //   if (messagesContainerRef.current) {
  //     messagesContainerRef.current.scrollTop = 0;
  //   }
  // }, [messages]);

  // Remove scroll to bottom effect
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const startDemo = () => {
    let step = 0;
    const showNextMessage = () => {
      if (step < messages.length - 1) {
        setIsTyping(true);
        typingTimeoutRef.current = setTimeout(() => {
          step++;
          setCurrentStep(step);
          setIsTyping(false);
          showNextMessage();
        }, 2000);
      }
    };
    showNextMessage();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const restartDemo = () => {
    setCurrentStep(0);
    setIsTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    startDemo();
  };

  return (
    <div className="bg-[#ffffff] rounded-2xl overflow-hidden shadow-lg">
      {/* Chat Header */}
      <div className="bg-gradient-to-b from-gray-100 to-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={avatar}
              alt={agentName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {agentName}
              </h3>
              <p className="text-sm text-gray-500">{agentRole}</p>
            </div>
          </div>
          <button
            onClick={restartDemo}
            className="btn btn-ghost btn-sm"
          >
            Restart Demo
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={messagesContainerRef}
        className="p-4 space-y-2 min-h-[400px] max-h-[500px] overflow-y-auto"
        style={{
          backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%)',
        }}
      >
        {messages.slice(0, currentStep).map((message, index) => {
          const isUser = message.sender === 'user';
          const showAvatar = index === 0 || 
            (messages[index - 1]?.sender !== message.sender);
          const isLastInGroup = index === messages.length - 1 || 
            messages[index + 1]?.sender !== message.sender;
          
          return (
            <div
              key={message.id}
              className={`flex items-end space-x-2 ${
                isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              {!isUser && showAvatar ? (
                <img 
                  src={avatar} 
                  alt={agentName} 
                  className="w-6 h-6 rounded-full mb-1"
                />
              ) : (
                <div className="w-6 h-6" />
              )}

              {/* Message Content */}
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                  isUser
                    ? 'bg-[#0b93f6] text-white rounded-br-lg'
                    : 'bg-[#e9e9eb] text-black rounded-bl-lg'
                } ${
                  !isLastInGroup ? 'mb-1' : 'mb-3'
                }`}
              >
                <p className="text-[15px] leading-tight whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="flex items-center space-x-2">
            <img 
              src={avatar}
              alt={`${agentName} avatar`}
              className="w-6 h-6 rounded-full bg-white object-cover"
            />
            <div className="flex items-center space-x-2 bg-white rounded-lg p-4 shadow-md">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Demo Mode - Watch the conversation unfold..."
            disabled
            className="flex-1 rounded-full border border-gray-200 px-4 py-2 bg-gray-50 text-gray-400"
          />
          <button
            className="px-4 py-2 text-[#0b93f6] font-semibold disabled:opacity-50"
            disabled
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const demoMessages: Message[] = [
  {
    id: 1,
    sender: 'user',
    content: "Hi, I'm interested in getting a quote for tree removal. I have a large oak tree that needs to be taken down.",
    timestamp: '2:30 PM'
  },
  {
    id: 2,
    sender: 'agent',
    content: "Hello! I'm Ashley, the Lead Generation AI for Fast Tree Care. I'd be happy to help you get a quote. Could you tell me the approximate height of the oak tree and its location on your property?",
    timestamp: '2:30 PM'
  },
  {
    id: 3,
    sender: 'user',
    content: "It's probably about 30 feet tall and it's in my backyard, close to the fence.",
    timestamp: '2:31 PM'
  },
  {
    id: 4,
    sender: 'agent',
    content: "Thank you for those details. For safety and accurate pricing, I'll need a few more pieces of information: \n1. Is there easy access to the backyard? \n2. Are there any power lines nearby? \n3. What's your address for a site evaluation?",
    timestamp: '2:31 PM'
  },
  {
    id: 5,
    sender: 'user',
    content: "Yes, there's a gate to the backyard. No power lines nearby. My address is 123 Oak Street.",
    timestamp: '2:32 PM'
  },
  {
    id: 6,
    sender: 'agent',
    content: "Perfect! I've collected all the necessary information. I'll forward this to Sam, our lead arborist, who will prepare a detailed quote for you. Can I get your name and preferred contact number?",
    timestamp: '2:32 PM'
  },
  {
    id: 7,
    sender: 'user',
    content: "I'm John Smith, and my number is 555-0123.",
    timestamp: '2:33 PM'
  },
  {
    id: 8,
    sender: 'agent',
    content: "Thank you, John! I'm sending all the details to Sam now.",
    timestamp: '2:33 PM'
  },
  {
    id: 9,
    sender: 'agent',
    content: "→ Forwarding to Sam: Lead #247\nCustomer: John Smith\nPhone: 555-0123\nService: Oak tree removal (30ft)\nLocation: 123 Oak Street\nDetails: Backyard location, gate access available, no power lines\nQualification: High priority",
    timestamp: '2:33 PM'
  },
  {
    id: 10,
    sender: 'agent',
    content: "Thanks, Ashley! I'll contact John within the next hour with a detailed quote.",
    timestamp: '2:34 PM'
  },
  {
    id: 11,
    sender: 'agent',
    content: "Great news, John! Sam will be reaching out to you within the next hour with a detailed quote. Is there anything else you'd like to know about our tree removal services?",
    timestamp: '2:34 PM'
  }
];

const App = () => {
  return (
    <ChatDemo 
      messages={demoMessages} 
      avatar="/images/ashley.svg" 
      agentName="Ashley" 
      agentRole="Lead Generation AI"
    />
  );
};

export default ChatDemo;
