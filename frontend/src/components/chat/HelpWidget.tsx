import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const HelpWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi! I'm Alex, your Customer Service Specialist. How can I help you today?", isUser: false }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, isUser: true }]);
      // Simulate Alex's response - in a real app, this would call your backend
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "Thanks for your message! I'm analyzing your question and will help you find the best solution.",
          isUser: false
        }]);
      }, 1000);
      setInputText('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <div className="group relative">
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:block">
            <div className="bg-white rounded-lg shadow-lg px-4 py-2 whitespace-nowrap">
              <p className="text-gray-700">Chat with me!</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-white rounded-full p-0 shadow-lg hover:shadow-xl transition-all"
          >
            <img
              src="/avatars/alex.svg"
              alt="Chat with Alex"
              className="w-16 h-16 rounded-full object-cover"
            />
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-96 max-h-[600px] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <img
                src="/avatars/alex.svg"
                alt="Alex"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">Alex</h3>
                <p className="text-sm text-gray-500">Customer Service Specialist</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={handleSend}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpWidget;
