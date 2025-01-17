import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  DocumentTextIcon,
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  XMarkIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  DocumentIcon,
  EnvelopeIcon,
  PhoneIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface ChannelMetric {
  volume: number;
  avgResponseTime: string;
  satisfaction: number;
  common: string[];
}

interface Performance {
  metrics: {
    responseTime: string;
    satisfactionRate: number;
    conversionsRate: number;
    learningProgress: number;
  };
  summary: {
    totalInteractions: number;
    avgResponseTime: string;
    satisfactionRate: string;
    resolutionRate: string;
    activeChats: number;
  };
  trends: {
    daily: {
      dates: string[];
      interactions: number[];
      responseTime: number[];
      satisfaction: number[];
    };
    weekly: {
      weeks: string[];
      interactions: number[];
      responseTime: number[];
      satisfaction: number[];
    };
  };
  channelMetrics: {
    [key: string]: ChannelMetric;
  };
  topIssues: Array<{
    category: string;
    volume: number;
    avgResolutionTime: string;
  }>;
  peakHours: Array<{
    hour: string;
    volume: number;
  }>;
  skills: Array<{
    name: string;
    score: number;
  }>;
}

interface LearningTopic {
  topic: string;
  progress: number;
  lastUpdated: string;
  status: string;
}

interface Insight {
  type: string;
  title: string;
  description: string;
  impact: string;
  timestamp: string;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: string;
  description: string;
  capabilities: string[];
  expertise: Array<{
    area: string;
    level: number;
  }>;
  performance: Performance;
  recentActivities: Array<{
    id: number;
    type: string;
    user: string;
    status: string;
    topic: string;
    time: string;
    duration: string;
    satisfaction: number;
    details: {
      timeline: Array<{
        time: string;
        action: string;
        actor: string;
      }>;
      conversation: Array<{
        speaker: string;
        message: string;
      }>;
      resolution: string;
      attachments: string[];
    };
  }>;
  learningTopics: LearningTopic[];
  insights: Insight[];
  recentConversations: Array<{
    customer: string;
    message: string;
    time: string;
  }>;
}

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  context?: string;
}

interface ConversationMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: string;
}

interface ConversationStep {
  explanation: string;
  messages: ConversationMessage[];
}

interface SampleConversation {
  id: string;
  title: string;
  description: string;
  steps: ConversationStep[];
}

interface LearningTopicData {
  title: string;
  progress: number;
}

interface AgentData {
  about: string;
  capabilities: string[];
  learningTopics: LearningTopicData[];
  metrics: {
    responseTime: string;
    totalInteractions: number;
    satisfactionRate: number;
  };
}

const getAgentSpecificData = (agentId: string): AgentData => {
  const agentData = {
    alex: {
      about: "Expert in handling customer inquiries and providing exceptional support across multiple channels. Specialized in resolving complex customer issues with empathy and efficiency.",
      capabilities: [
        "Product returns and exchanges",
        "Shipping and delivery support",
        "Account management",
        "Technical troubleshooting",
        "Payment processing"
      ],
      learningTopics: [
        { title: "Advanced Customer Service Skills", progress: 85 },
        { title: "Product Knowledge Training", progress: 92 },
        { title: "Conflict Resolution", progress: 78 },
        { title: "Technical Support Fundamentals", progress: 88 }
      ],
      metrics: {
        responseTime: "< 1 minute",
        totalInteractions: 15243,
        satisfactionRate: 96
      }
    },
    ashley: {
      about: "Specialized in identifying and nurturing potential business opportunities. Expert in qualifying leads, conducting needs assessments, and driving conversion through strategic follow-ups.",
      capabilities: [
        "Lead qualification",
        "Sales pipeline management",
        "Market research",
        "Business needs analysis",
        "ROI calculation"
      ],
      learningTopics: [
        { title: "Advanced Sales Techniques", progress: 92 },
        { title: "Market Analysis", progress: 85 },
        { title: "CRM Management", progress: 95 },
        { title: "Business Development Strategy", progress: 88 }
      ],
      metrics: {
        responseTime: "< 2 hours",
        totalInteractions: 8756,
        satisfactionRate: 94
      }
    },
    max: {
      about: "Experienced HR Assistant specializing in employee relations, workplace policies, and HR processes. Dedicated to fostering a positive work environment and ensuring compliance with company policies.",
      capabilities: [
        "Policy guidance",
        "Employee relations",
        "Benefits administration",
        "Onboarding support",
        "HR documentation"
      ],
      learningTopics: [
        { title: "Employment Law Updates", progress: 90 },
        { title: "Conflict Resolution", progress: 85 },
        { title: "Benefits Administration", progress: 88 },
        { title: "HR Best Practices", progress: 92 }
      ],
      metrics: {
        responseTime: "< 5 minutes",
        totalInteractions: 12567,
        satisfactionRate: 97
      }
    },
    sarah: {
      about: "Creative marketing strategist specializing in digital campaigns and brand development. Expert in social media management, content creation, and marketing analytics.",
      capabilities: [
        "Campaign strategy",
        "Content optimization",
        "Social media management",
        "Marketing analytics",
        "Brand development"
      ],
      learningTopics: [
        { title: "Digital Marketing Trends", progress: 95 },
        { title: "SEO Optimization", progress: 88 },
        { title: "Content Strategy", progress: 92 },
        { title: "Marketing Analytics", progress: 87 }
      ],
      metrics: {
        responseTime: "< 15 minutes",
        totalInteractions: 9845,
        satisfactionRate: 95
      }
    }
  };

  return agentData[agentId as keyof typeof agentData] || agentData.alex;
};

const getSampleConversations = (agentId: string): SampleConversation[] => {
  const conversations: Record<string, SampleConversation[]> = {
    alex: [
      {
        id: '1',
        title: 'Product Return Request',
        description: 'See how Alex handles a customer\'s request to return a defective product with care and efficiency.',
        steps: [
          {
            explanation: 'Customer initiates contact about a defective product',
            messages: [
              {
                id: '1',
                text: "Hi, I received my order yesterday but the product is damaged. I'd like to return it.",
                sender: 'user' as const,
                timestamp: new Date().toISOString()
              },
              {
                id: '2',
                text: "I'm very sorry to hear about the damaged product. I'll help you process the return right away. Could you please provide your order number?",
                sender: 'agent' as const,
                timestamp: new Date().toISOString()
              }
            ]
          }
        ]
      }
    ],
    ashley: [
      {
        id: '1',
        title: 'Lead Qualification Call',
        description: 'Watch how Ashley qualifies a potential enterprise client and identifies their specific needs.',
        steps: [
          {
            explanation: 'Initial contact and need assessment',
            messages: [
              {
                id: '1',
                text: "Hi Ashley, I saw your enterprise solutions presentation and I'm interested in learning more about how it could help our company scale our operations.",
                sender: 'user' as const,
                timestamp: new Date().toISOString()
              },
              {
                id: '2',
                text: "Thank you for your interest! I'd love to learn more about your company's specific needs. Could you tell me about your current operational challenges and what scale of growth you're targeting?",
                sender: 'agent' as const,
                timestamp: new Date().toISOString()
              }
            ]
          },
          {
            explanation: 'Gathering specific requirements',
            messages: [
              {
                id: '3',
                text: "We're currently handling about 1000 transactions daily but expect to triple that in the next year. Our main challenge is maintaining service quality as we scale.",
                sender: 'user' as const,
                timestamp: new Date().toISOString()
              },
              {
                id: '4',
                text: "I understand your concern about maintaining quality during rapid growth. Our enterprise solution has helped similar companies scale successfully. Would you be interested in seeing a demo of how our automated quality management system handles high transaction volumes?",
                sender: 'agent' as const,
                timestamp: new Date().toISOString()
              }
            ]
          }
        ]
      },
      {
        id: '2',
        title: 'ROI Analysis Discussion',
        description: 'See how Ashley helps a prospect understand the potential return on investment.',
        steps: [
          {
            explanation: 'Initial ROI inquiry',
            messages: [
              {
                id: '1',
                text: "Your solution looks promising, but I need to justify the cost to my management team. Can you help me understand the ROI?",
                sender: 'user' as const,
                timestamp: new Date().toISOString()
              },
              {
                id: '2',
                text: "I'll help you build a compelling ROI analysis. Based on your current operational costs, let's calculate potential savings in three key areas: time, resources, and error reduction. Could you share your current monthly operational expenses?",
                sender: 'agent' as const,
                timestamp: new Date().toISOString()
              }
            ]
          }
        ]
      },
      {
        id: '3',
        title: 'Implementation Planning',
        description: 'Learn how Ashley guides a client through the implementation process.',
        steps: [
          {
            explanation: 'Discussing implementation timeline',
            messages: [
              {
                id: '1',
                text: "We're ready to move forward, but I'm concerned about the implementation impact on our daily operations.",
                sender: 'user' as const,
                timestamp: new Date().toISOString()
              },
              {
                id: '2',
                text: "I completely understand your concern. Let me walk you through our phased implementation approach that minimizes operational disruption. We typically start with a pilot program in one department. Would you like to see our standard implementation timeline?",
                sender: 'agent' as const,
                timestamp: new Date().toISOString()
              }
            ]
          }
        ]
      }
    ],
    max: [
      {
        id: '1',
        title: 'Benefits Inquiry',
        description: 'See how Max handles an employee\'s inquiry about benefits.',
        steps: [
          {
            explanation: 'Initial contact and benefits review',
            messages: [
              {
                id: '1',
                text: "Hi, I need help understanding our health insurance options.",
                sender: 'user' as const,
                timestamp: new Date().toISOString()
              },
              {
                id: '2',
                text: "I'll walk you through our available plans. Are you looking for individual or family coverage?",
                sender: 'agent' as const,
                timestamp: new Date().toISOString()
              }
            ]
          },
          {
            explanation: 'Options explanation',
            messages: [
              {
                id: '3',
                text: "Family coverage, please.",
                sender: 'user' as const,
                timestamp: new Date().toISOString()
              },
              {
                id: '4',
                text: "I'll explain our family plan options and their respective benefits.",
                sender: 'agent' as const,
                timestamp: new Date().toISOString()
              }
            ]
          }
        ]
      },
      {
        id: '2',
        title: 'Performance Review Process',
        description: 'Watch how Max guides a manager through the performance review process.',
        steps: [
          {
            explanation: 'Initial contact and process explanation',
            messages: [
              {
                id: '1',
                text: "Hi, I need guidance on conducting performance reviews.",
                sender: 'user' as const,
                timestamp: new Date().toISOString()
              },
              {
                id: '2',
                text: "I'll guide you through our review process and best practices.",
                sender: 'agent' as const,
                timestamp: new Date().toISOString()
              }
            ]
          },
          {
            explanation: 'Templates sharing',
            messages: [
              {
                id: '3',
                text: "What templates should I use?",
                sender: 'user' as const,
                timestamp: new Date().toISOString()
              },
              {
                id: '4',
                text: "I'll share our standard templates and evaluation criteria.",
                sender: 'agent' as const,
                timestamp: new Date().toISOString()
              }
            ]
          }
        ]
      }
    ],
    sarah: [
      {
        id: '1',
        title: 'Campaign Strategy',
        description: 'See how Sarah develops a campaign strategy.',
        steps: [
          {
            explanation: 'Initial contact and objective definition',
            messages: [
              {
                id: '1',
                text: "We need a strategy for our Q1 product launch.",
                sender: 'user' as const,
                timestamp: new Date().toISOString()
              },
              {
                id: '2',
                text: "Let's define your target audience and campaign objectives. What are your primary goals for this launch?",
                sender: 'agent' as const,
                timestamp: new Date().toISOString()
              }
            ]
          },
          {
            explanation: 'Strategy development and timeline setting',
            messages: [
              {
                id: '3',
                text: "We're targeting small business owners.",
                sender: 'user' as const,
                timestamp: new Date().toISOString()
              },
              {
                id: '4',
                text: "I've drafted a multi-channel approach focusing on LinkedIn and email marketing. Let me outline the timeline and key performance indicators.",
                sender: 'agent' as const,
                timestamp: new Date().toISOString()
              }
            ]
          }
        ]
      },
      {
        id: '2',
        title: 'Content Optimization',
        description: 'Watch how Sarah optimizes content for better search engine ranking.',
        steps: [
          {
            explanation: 'Initial contact and content analysis',
            messages: [
              {
                id: '1',
                text: "Our blog posts aren't ranking well in search results.",
                sender: 'user' as const,
                timestamp: new Date().toISOString()
              },
              {
                id: '2',
                text: "I'll analyze your content and provide SEO recommendations. Please share your most recent posts.",
                sender: 'agent' as const,
                timestamp: new Date().toISOString()
              }
            ]
          },
          {
            explanation: 'SEO recommendations and implementation',
            messages: [
              {
                id: '3',
                text: "Focus on our product feature articles.",
                sender: 'user' as const,
                timestamp: new Date().toISOString()
              },
              {
                id: '4',
                text: "I've identified key optimization opportunities and keyword gaps. Let me guide you through the implementation process.",
                sender: 'agent' as const,
                timestamp: new Date().toISOString()
              }
            ]
          }
        ]
      }
    ]
  };

  return conversations[agentId as keyof typeof conversations] || conversations.alex;
};

const getDemoActivities = (agentId: string) => {
  const activities = {
    ashley: [
      {
        id: 1,
        user: 'Enterprise Lead 1',
        type: 'chat',
        status: 'active',
        topic: 'ROI Analysis Discussion',
        time: 'Just now',
        duration: '15m',
        satisfaction: 98,
        details: {
          timeline: [
            { time: '0:00', action: 'Chat initiated', actor: 'user' },
            { time: '2:00', action: 'ROI calculator shared', actor: 'agent' },
            { time: '8:00', action: 'Cost analysis completed', actor: 'agent' },
            { time: '15:00', action: 'Follow-up scheduled', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'We need to evaluate the ROI of implementing your solution.' },
            { speaker: 'agent', message: 'I can help you with that. Let\'s start by looking at your current operational costs.' },
            { speaker: 'user', message: 'We spend about $50k monthly on manual processes.' },
            { speaker: 'agent', message: 'Based on those numbers, our solution could reduce costs by 40%. Let me show you the breakdown.' }
          ],
          resolution: 'ROI analysis completed - Projected 40% cost reduction',
          attachments: ['ROI_Analysis.pdf', 'Cost_Comparison.pdf']
        }
      },
      {
        id: 2,
        user: 'Startup Lead 2',
        type: 'email',
        status: 'completed',
        topic: 'Product Demo Follow-up',
        time: '2 minutes ago',
        duration: '25m',
        satisfaction: 95,
        details: {
          timeline: [
            { time: '0:00', action: 'Email received', actor: 'user' },
            { time: '5:00', action: 'Demo recap sent', actor: 'agent' },
            { time: '15:00', action: 'Pricing proposal prepared', actor: 'agent' },
            { time: '25:00', action: 'Next steps outlined', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'Thanks for the demo yesterday. Could you send more details about the enterprise features?' },
            { speaker: 'agent', message: 'I\'ll prepare a comprehensive overview of our enterprise capabilities and scaling options.' },
            { speaker: 'user', message: 'Great, particularly interested in the API integration capabilities.' },
            { speaker: 'agent', message: 'I\'ve attached our API documentation and a custom implementation guide for your tech stack.' }
          ],
          resolution: 'Demo follow-up completed with technical documentation provided',
          attachments: ['Enterprise_Features.pdf', 'API_Documentation.pdf']
        }
      },
      {
        id: 3,
        user: 'Corporate Lead 3',
        type: 'call',
        status: 'completed',
        topic: 'Needs Assessment Call',
        time: '15 minutes ago',
        duration: '30m',
        satisfaction: 97,
        details: {
          timeline: [
            { time: '0:00', action: 'Call started', actor: 'user' },
            { time: '10:00', action: 'Requirements gathered', actor: 'agent' },
            { time: '20:00', action: 'Solution presented', actor: 'agent' },
            { time: '30:00', action: 'Next steps planned', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'We need to streamline our customer onboarding process.' },
            { speaker: 'agent', message: 'Could you walk me through your current onboarding workflow?' },
            { speaker: 'user', message: 'It takes about 2 weeks and involves multiple manual steps.' },
            { speaker: 'agent', message: 'Our automation suite could reduce that to 2-3 days. Let me show you how.' }
          ],
          resolution: 'Completed needs assessment and proposed automation solution',
          attachments: ['Onboarding_Analysis.pdf', 'Solution_Proposal.pdf']
        }
      },
      {
        id: 4,
        user: 'SMB Lead 4',
        type: 'chat',
        status: 'active',
        topic: 'Pricing Negotiation',
        time: '30 minutes ago',
        duration: '20m',
        satisfaction: 96,
        details: {
          timeline: [
            { time: '0:00', action: 'Chat initiated', actor: 'user' },
            { time: '5:00', action: 'Pricing discussed', actor: 'agent' },
            { time: '15:00', action: 'Custom package created', actor: 'agent' },
            { time: '20:00', action: 'Proposal sent', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'The enterprise plan is a bit out of our budget range.' },
            { speaker: 'agent', message: 'Let\'s explore a custom package that fits your needs and budget.' },
            { speaker: 'user', message: 'What features could we get within $2000/month?' },
            { speaker: 'agent', message: 'I\'ve created a tailored package with core features and flexible scaling options.' }
          ],
          resolution: 'Custom pricing package created within client\'s budget',
          attachments: ['Custom_Proposal.pdf', 'Feature_Comparison.pdf']
        }
      },
      {
        id: 5,
        user: 'Enterprise Lead 5',
        type: 'email',
        status: 'completed',
        topic: 'Implementation Planning',
        time: '1 hour ago',
        duration: '45m',
        satisfaction: 99,
        details: {
          timeline: [
            { time: '0:00', action: 'Email received', actor: 'user' },
            { time: '15:00', action: 'Timeline drafted', actor: 'agent' },
            { time: '30:00', action: 'Resources allocated', actor: 'agent' },
            { time: '45:00', action: 'Plan finalized', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'We\'re ready to move forward. What\'s the implementation process?' },
            { speaker: 'agent', message: 'I\'ll create a detailed implementation plan tailored to your organization.' },
            { speaker: 'user', message: 'How long will the full rollout take?' },
            { speaker: 'agent', message: 'I\'ve outlined a 6-week implementation timeline with minimal disruption.' }
          ],
          resolution: 'Implementation plan created with 6-week timeline',
          attachments: ['Implementation_Plan.pdf', 'Timeline.pdf']
        }
      }
    ],
    alex: [
      {
        id: 1,
        type: 'chat',
        user: 'Demo User 1',
        status: 'active',
        topic: 'Product Return Inquiry',
        time: 'Just now',
        duration: '5m',
        satisfaction: 98,
        details: {
          timeline: [
            { time: '0:00', action: 'Chat initiated', actor: 'user' },
            { time: '1:00', action: 'Initial response', actor: 'agent' },
            { time: '2:30', action: 'Return policy explained', actor: 'agent' },
            { time: '4:00', action: 'Return label generated', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'Hi, I need to return a product I purchased last week.' },
            { speaker: 'agent', message: 'Hello! I\'d be happy to help you with your return. Could you please provide your order number?' },
            { speaker: 'user', message: 'Yes, it\'s ORDER-123456' },
            { speaker: 'agent', message: 'Thank you! I can see your order for the wireless headphones. What\'s the reason for the return?' },
            { speaker: 'user', message: 'Oh, I see. Can you explain how that\'s calculated?' },
            { speaker: 'agent', message: 'I understand the issue. I\'ve generated a return label for you. Would you like me to walk you through some troubleshooting steps first?' }
          ],
          resolution: 'In progress - Generating return label and offering technical support',
          attachments: ['Return_Label_123456.pdf', 'Troubleshooting_Steps.pdf']
        }
      },
      {
        id: 2,
        type: 'email',
        user: 'Demo User 2',
        status: 'completed',
        topic: 'Account Access Issue',
        time: '2 minutes ago',
        duration: '12m',
        satisfaction: 95,
        details: {
          timeline: [
            { time: '0:00', action: 'Email received', actor: 'user' },
            { time: '1:30', action: 'Security verification', actor: 'agent' },
            { time: '5:00', action: 'Account recovered', actor: 'agent' },
            { time: '12:00', action: 'Follow-up sent', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'I\'m locked out of my account and can\'t reset my password.' },
            { speaker: 'agent', message: 'I\'ll help you regain access. First, let\'s verify your identity. Can you confirm your registered email?' },
            { speaker: 'user', message: 'user@example.com' },
            { speaker: 'agent', message: 'Perfect. I\'ve sent a verification code to your backup email.' },
            { speaker: 'user', message: 'Got it, the code is 123456' },
            { speaker: 'agent', message: 'Thanks! Your account has been recovered. I\'ve sent you instructions for setting up 2FA for better security.' }
          ],
          resolution: 'Account access restored and security measures enhanced',
          attachments: ['Security_Guidelines.pdf']
        }
      },
      {
        id: 3,
        type: 'phone',
        user: 'Demo User 3',
        status: 'completed',
        topic: 'Billing Question',
        time: '15 minutes ago',
        duration: '8m',
        satisfaction: 100,
        details: {
          timeline: [
            { time: '0:00', action: 'Call received', actor: 'user' },
            { time: '1:00', action: 'Account verified', actor: 'agent' },
            { time: '3:00', action: 'Billing explained', actor: 'agent' },
            { time: '8:00', action: 'Issue resolved', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'I see an extra charge on my bill this month.' },
            { speaker: 'agent', message: 'I\'ll look into that for you. Can you confirm the last 4 digits of your account?' },
            { speaker: 'user', message: '4321' },
            { speaker: 'agent', message: 'I see the charge you\'re referring to. This was actually a pro-rated adjustment from your recent plan upgrade.' },
            { speaker: 'user', message: 'Oh, I see. Can you explain how that\'s calculated?' },
            { speaker: 'agent', message: 'Of course! Let me break down the calculation for you...' }
          ],
          resolution: 'Billing inquiry resolved - Explained pro-rated charges',
          attachments: ['Billing_Explanation.pdf']
        }
      },
      {
        id: 4,
        type: 'chat',
        user: 'Demo User 4',
        status: 'active',
        topic: 'Feature Request',
        time: '30 minutes ago',
        duration: '15m',
        satisfaction: 97,
        details: {
          timeline: [
            { time: '0:00', action: 'Chat initiated', actor: 'user' },
            { time: '1:00', action: 'Feature discussion', actor: 'agent' },
            { time: '10:00', action: 'Feedback recorded', actor: 'agent' },
            { time: '15:00', action: 'Ticket created', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'I have a suggestion for a new feature.' },
            { speaker: 'agent', message: 'I\'d love to hear your idea! What feature would you like to see?' },
            { speaker: 'user', message: 'It would be great to have dark mode support.' },
            { speaker: 'agent', message: 'That\'s a fantastic suggestion! Many users would benefit from this. Let me document this request.' },
            { speaker: 'user', message: 'Thanks! When might this be implemented?' },
            { speaker: 'agent', message: 'I\'ve created a feature request ticket. Our product team reviews these weekly. I\'ll send you updates via email.' }
          ],
          resolution: 'Feature request documented and escalated to product team',
          attachments: ['Feature_Request_Form.pdf']
        }
      },
      {
        id: 5,
        type: 'email',
        user: 'Demo User 5',
        status: 'completed',
        topic: 'Integration Setup',
        time: '1 hour ago',
        duration: '45m',
        satisfaction: 96,
        details: {
          timeline: [
            { time: '0:00', action: 'Email received', actor: 'user' },
            { time: '5:00', action: 'Technical review', actor: 'agent' },
            { time: '25:00', action: 'Integration configured', actor: 'agent' },
            { time: '45:00', action: 'Testing completed', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'Need help setting up the API integration with our CRM.' },
            { speaker: 'agent', message: 'I\'ll guide you through the integration process. Which CRM are you using?' },
            { speaker: 'user', message: 'We\'re using Salesforce Enterprise.' },
            { speaker: 'agent', message: 'Perfect. I\'ve prepared a custom configuration guide. Let\'s start with the API credentials.' },
            { speaker: 'user', message: 'Great, where do I find those?' },
            { speaker: 'agent', message: 'I\'ve attached a step-by-step guide. Let\'s go through it together.' }
          ],
          resolution: 'Integration successfully configured and tested',
          attachments: ['Integration_Guide.pdf', 'API_Documentation.pdf']
        }
      },
      {
        id: 6,
        type: 'phone',
        user: 'Demo User 6',
        status: 'completed',
        topic: 'Service Upgrade',
        time: '2 hours ago',
        duration: '20m',
        satisfaction: 99,
        details: {
          timeline: [
            { time: '0:00', action: 'Call received', actor: 'user' },
            { time: '5:00', action: 'Plan comparison', actor: 'agent' },
            { time: '15:00', action: 'Upgrade processed', actor: 'agent' },
            { time: '20:00', action: 'Confirmation sent', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'I\'d like to upgrade my current plan.' },
            { speaker: 'agent', message: 'I\'ll help you find the best plan for your needs. What features are you looking for?' },
            { speaker: 'user', message: 'We need more user seats and advanced analytics.' },
            { speaker: 'agent', message: 'Based on your needs, I recommend our Enterprise plan. It includes unlimited seats and full analytics suite.' },
            { speaker: 'user', message: 'That sounds perfect. How do we proceed?' },
            { speaker: 'agent', message: 'I\'ll process the upgrade now. You\'ll have immediate access to all new features.' }
          ],
          resolution: 'Successfully upgraded to Enterprise plan',
          attachments: ['Upgrade_Confirmation.pdf', 'Enterprise_Features.pdf']
        }
      },
      {
        id: 7,
        type: 'chat',
        user: 'Demo User 7',
        status: 'active',
        topic: 'Technical Support',
        time: '3 hours ago',
        duration: '25m',
        satisfaction: 94,
        details: {
          timeline: [
            { time: '0:00', action: 'Chat initiated', actor: 'user' },
            { time: '5:00', action: 'Issue diagnosis', actor: 'agent' },
            { time: '15:00', action: 'Solution implemented', actor: 'agent' },
            { time: '25:00', action: 'Verification', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'The dashboard isn\'t loading properly.' },
            { speaker: 'agent', message: 'I\'ll help you resolve this. What browser and version are you using?' },
            { speaker: 'user', message: 'Chrome version 108.0.5359.124' },
            { speaker: 'agent', message: 'Thanks. I\'ve identified the issue. Let\'s clear your browser cache first.' },
            { speaker: 'user', message: 'Done. What\'s next?' },
            { speaker: 'agent', message: 'Great! Now let\'s try accessing the dashboard again with these specific settings...' }
          ],
          resolution: 'Dashboard access restored after cache clear and settings adjustment',
          attachments: ['Troubleshooting_Steps.pdf']
        }
      },
      {
        id: 8,
        type: 'email',
        user: 'Demo User 8',
        status: 'completed',
        topic: 'Custom Report Request',
        time: '4 hours ago',
        duration: '35m',
        satisfaction: 98,
        details: {
          timeline: [
            { time: '0:00', action: 'Email received', actor: 'user' },
            { time: '10:00', action: 'Requirements gathered', actor: 'agent' },
            { time: '25:00', action: 'Report generated', actor: 'agent' },
            { time: '35:00', action: 'Delivery and explanation', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'Need a custom report for Q4 performance metrics.' },
            { speaker: 'agent', message: 'I\'ll help create that report. What specific metrics would you like to include?' },
            { speaker: 'user', message: 'Response times, resolution rates, and customer satisfaction trends.' },
            { speaker: 'agent', message: 'I\'ll prepare a comprehensive report with those metrics. Would you like weekly or monthly breakdowns?' },
            { speaker: 'user', message: 'Weekly would be great.' },
            { speaker: 'agent', message: 'Perfect. I\'ve generated the report with weekly breakdowns and included visualization charts.' }
          ],
          resolution: 'Custom report delivered with requested metrics and visualizations',
          attachments: ['Q4_Performance_Report.pdf', 'Metrics_Glossary.pdf']
        }
      }
    ],
    max: [
      {
        id: 1,
        user: 'Employee 1',
        type: 'chat',
        status: 'active',
        topic: 'Benefits Inquiry',
        time: 'Just now',
        duration: '20m',
        satisfaction: 98,
        details: {
          timeline: [
            { time: '0:00', action: 'Chat initiated', actor: 'user' },
            { time: '5:00', action: 'Benefits reviewed', actor: 'agent' },
            { time: '10:00', action: 'Options explained', actor: 'agent' },
            { time: '20:00', action: 'Documentation shared', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'I need help understanding our health insurance options.' },
            { speaker: 'agent', message: 'I\'ll walk you through our available plans. Are you looking for individual or family coverage?' },
            { speaker: 'user', message: 'Family coverage, please.' },
            { speaker: 'agent', message: 'I\'ll explain our family plan options and their respective benefits.' }
          ],
          resolution: 'Benefits options explained and enrollment guide provided',
          attachments: ['Benefits_Guide.pdf', 'Enrollment_Form.pdf']
        }
      },
      {
        id: 2,
        user: 'Manager 2',
        type: 'call',
        status: 'completed',
        topic: 'Performance Review Process',
        time: '2 minutes ago',
        duration: '35m',
        satisfaction: 97,
        details: {
          timeline: [
            { time: '0:00', action: 'Call started', actor: 'user' },
            { time: '10:00', action: 'Process explained', actor: 'agent' },
            { time: '25:00', action: 'Templates shared', actor: 'agent' },
            { time: '35:00', action: 'Questions addressed', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'I need guidance on conducting performance reviews.' },
            { speaker: 'agent', message: 'I\'ll guide you through our review process and best practices.' },
            { speaker: 'user', message: 'What templates should I use?' },
            { speaker: 'agent', message: 'I\'ll share our standard templates and evaluation criteria.' }
          ],
          resolution: 'Performance review process explained and templates provided',
          attachments: ['Review_Templates.pdf', 'Best_Practices.pdf']
        }
      },
      {
        id: 3,
        user: 'New Hire 3',
        type: 'email',
        status: 'completed',
        topic: 'Onboarding Process',
        time: '15 minutes ago',
        duration: '40m',
        satisfaction: 99,
        details: {
          timeline: [
            { time: '0:00', action: 'Email received', actor: 'user' },
            { time: '15:00', action: 'Documents prepared', actor: 'agent' },
            { time: '30:00', action: 'Process explained', actor: 'agent' },
            { time: '40:00', action: 'Setup completed', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'Starting next week, what do I need to prepare?' },
            { speaker: 'agent', message: 'I\'ll help you with the onboarding process. Let\'s start with required documentation.' },
            { speaker: 'user', message: 'What documents do I need?' },
            { speaker: 'agent', message: 'I\'ve prepared a checklist of required documents and next steps.' }
          ],
          resolution: 'Onboarding process initiated and documents collected',
          attachments: ['Onboarding_Checklist.pdf', 'Employee_Handbook.pdf']
        }
      },
      {
        id: 4,
        user: 'Employee 4',
        type: 'chat',
        status: 'active',
        topic: 'Leave Request',
        time: '30 minutes ago',
        duration: '25m',
        satisfaction: 96,
        details: {
          timeline: [
            { time: '0:00', action: 'Chat initiated', actor: 'user' },
            { time: '8:00', action: 'Policy reviewed', actor: 'agent' },
            { time: '15:00', action: 'Request processed', actor: 'agent' },
            { time: '25:00', action: 'Approval confirmed', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'How do I submit a leave request?' },
            { speaker: 'agent', message: 'I\'ll help you with the leave request process. What type of leave are you planning?' },
            { speaker: 'user', message: 'I need two weeks of vacation next month.' },
            { speaker: 'agent', message: 'I\'ll guide you through submitting the request in our system.' }
          ],
          resolution: 'Leave request submitted and processed',
          attachments: ['Leave_Policy.pdf', 'Request_Form.pdf']
        }
      },
      {
        id: 5,
        user: 'Department Head 5',
        type: 'email',
        status: 'completed',
        topic: 'Policy Update',
        time: '1 hour ago',
        duration: '50m',
        satisfaction: 98,
        details: {
          timeline: [
            { time: '0:00', action: 'Email received', actor: 'user' },
            { time: '15:00', action: 'Policies reviewed', actor: 'agent' },
            { time: '35:00', action: 'Updates drafted', actor: 'agent' },
            { time: '50:00', action: 'Communication prepared', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'We need to update our remote work policy.' },
            { speaker: 'agent', message: 'I\'ll help draft the policy updates. What changes are needed?' },
            { speaker: 'user', message: 'We\'re implementing a hybrid work model.' },
            { speaker: 'agent', message: 'I\'ll prepare a comprehensive policy update and communication plan.' }
          ],
          resolution: 'Policy updated and communication plan created',
          attachments: ['Updated_Policy.pdf', 'Communication_Plan.pdf']
        }
      }
    ],
    sarah: [
      {
        id: 1,
        user: 'Marketing Team 1',
        type: 'chat',
        status: 'active',
        topic: 'Campaign Strategy',
        time: 'Just now',
        duration: '30m',
        satisfaction: 97,
        details: {
          timeline: [
            { time: '0:00', action: 'Chat initiated', actor: 'user' },
            { time: '10:00', action: 'Strategy outlined', actor: 'agent' },
            { time: '20:00', action: 'KPIs defined', actor: 'agent' },
            { time: '30:00', action: 'Timeline set', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'We need a strategy for our Q1 product launch.' },
            { speaker: 'agent', message: 'Let\'s define your target audience and campaign objectives.' },
            { speaker: 'user', message: 'We\'re targeting small business owners.' },
            { speaker: 'agent', message: 'I\'ve drafted a multi-channel approach focusing on LinkedIn and email marketing.' }
          ],
          resolution: 'Campaign strategy developed with clear KPIs and timeline',
          attachments: ['Campaign_Strategy.pdf', 'Timeline.pdf']
        }
      },
      {
        id: 2,
        user: 'Content Team 2',
        type: 'email',
        status: 'completed',
        topic: 'Content Optimization',
        time: '2 minutes ago',
        duration: '25m',
        satisfaction: 95,
        details: {
          timeline: [
            { time: '0:00', action: 'Email received', actor: 'user' },
            { time: '8:00', action: 'Content analyzed', actor: 'agent' },
            { time: '15:00', action: 'SEO recommendations', actor: 'agent' },
            { time: '25:00', action: 'Report delivered', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'Our blog posts aren\'t ranking well in search results.' },
            { speaker: 'agent', message: 'I\'ll analyze your content and provide SEO recommendations.' },
            { speaker: 'user', message: 'Focus on our product feature articles.' },
            { speaker: 'agent', message: 'I\'ve identified key optimization opportunities and keyword gaps.' }
          ],
          resolution: 'Content optimization plan delivered with SEO recommendations',
          attachments: ['SEO_Analysis.pdf', 'Content_Guidelines.pdf']
        }
      },
      {
        id: 3,
        user: 'Social Media Team 3',
        type: 'call',
        status: 'completed',
        topic: 'Social Strategy',
        time: '15 minutes ago',
        duration: '40m',
        satisfaction: 98,
        details: {
          timeline: [
            { time: '0:00', action: 'Call started', actor: 'user' },
            { time: '15:00', action: 'Channels reviewed', actor: 'agent' },
            { time: '30:00', action: 'Strategy developed', actor: 'agent' },
            { time: '40:00', action: 'Plan presented', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'We need to improve our social media engagement.' },
            { speaker: 'agent', message: 'Let\'s review your current metrics and target audience.' },
            { speaker: 'user', message: 'Instagram has been our main focus.' },
            { speaker: 'agent', message: 'I recommend expanding to TikTok given your target demographic.' }
          ],
          resolution: 'Social media strategy updated with focus on video content',
          attachments: ['Social_Strategy.pdf', 'Content_Calendar.pdf']
        }
      },
      {
        id: 4,
        user: 'Brand Team 4',
        type: 'chat',
        status: 'active',
        topic: 'Brand Guidelines',
        time: '30 minutes ago',
        duration: '35m',
        satisfaction: 96,
        details: {
          timeline: [
            { time: '0:00', action: 'Chat initiated', actor: 'user' },
            { time: '10:00', action: 'Brand review', actor: 'agent' },
            { time: '25:00', action: 'Guidelines updated', actor: 'agent' },
            { time: '35:00', action: 'Document shared', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'We need to update our brand guidelines for digital.' },
            { speaker: 'agent', message: 'I\'ll help adapt the guidelines for various platforms.' },
            { speaker: 'user', message: 'Include specifications for social media.' },
            { speaker: 'agent', message: 'I\'ve added detailed specs for each platform and use case.' }
          ],
          resolution: 'Updated brand guidelines with digital specifications',
          attachments: ['Brand_Guidelines.pdf', 'Asset_Library.pdf']
        }
      },
      {
        id: 5,
        user: 'Analytics Team 5',
        type: 'email',
        status: 'completed',
        topic: 'Performance Report',
        time: '1 hour ago',
        duration: '45m',
        satisfaction: 99,
        details: {
          timeline: [
            { time: '0:00', action: 'Email received', actor: 'user' },
            { time: '15:00', action: 'Data analyzed', actor: 'agent' },
            { time: '30:00', action: 'Report created', actor: 'agent' },
            { time: '45:00', action: 'Insights shared', actor: 'agent' }
          ],
          conversation: [
            { speaker: 'user', message: 'Need a comprehensive report on Q4 marketing performance.' },
            { speaker: 'agent', message: 'I\'ll analyze the data across all channels and campaigns.' },
            { speaker: 'user', message: 'Please include ROI for each channel.' },
            { speaker: 'agent', message: 'Report complete with ROI analysis and recommendations.' }
          ],
          resolution: 'Q4 marketing performance report with channel-specific insights',
          attachments: ['Performance_Report.pdf', 'ROI_Analysis.pdf']
        }
      }
    ]
  };

  return activities[agentId as keyof typeof activities] || activities.alex;
};

const AgentDetail = () => {
  const { agentId = 'alex' } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [isDemoChat, setIsDemoChat] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{
    id: string;
    sender: 'user' | 'agent';
    text: string;
    timestamp: string;
  }>>([]);
  const [chatState, setChatState] = useState<{
    stage: 'greeting' | 'conversation';
    context?: string;
  }>({ stage: 'greeting' });
  const [input, setInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Get agent-specific data
  const agentData = getAgentSpecificData(agentId);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: DocumentTextIcon },
    { id: 'sample-conversations', name: 'Sample Conversations', icon: ChatBubbleLeftIcon },
    { id: 'learning', name: 'Learning & Training', icon: AcademicCapIcon },
    { id: 'insights', name: 'Insights', icon: ArrowTrendingUpIcon },
    { id: 'performance', name: 'Performance', icon: ChartBarIcon },
  ].map((tab) => ({
    ...tab,
    href: tab.name.toLowerCase().replace(/ /g, '-'),
  }));

  const handleActivityClick = (id: number) => {
    setSelectedActivity(selectedActivity === id ? null : id);
  };

  const getActivityDetails = (activity: any) => {
    return (
      <div className="mt-4 space-y-4">
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
          <div className="space-y-2">
            {activity.details.timeline.map((item: any, index: number) => (
              <div key={index} className="flex items-center text-sm">
                <span className="text-gray-500 w-16">{item.time}</span>
                <span className={`ml-2 ${item.actor === 'agent' ? 'text-primary' : 'text-gray-600'}`}>
                  {item.action}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-2">Conversation</h4>
          <div className="space-y-3">
            {activity.details.conversation.map((msg: any, index: number) => (
              <div key={index} className={`flex ${msg.speaker === 'agent' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  msg.speaker === 'agent' 
                    ? 'bg-primary/10 text-primary'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-2">Resolution</h4>
          <p className="text-sm text-gray-600">{activity.details.resolution}</p>
        </div>

        {activity.details.attachments && activity.details.attachments.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-2">Attachments</h4>
            <div className="flex flex-wrap gap-2">
              {activity.details.attachments.map((attachment: string, index: number) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  <DocumentIcon className="h-4 w-4 mr-1" />
                  {attachment}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleTalkToMeClick = () => {
    setIsChatOpen(true);
    setChatState({ stage: 'greeting' });
    const welcomeMessage = getWelcomeMessage(agentId);
    setMessages([{
      id: '1',
      sender: 'agent' as const,
      text: welcomeMessage,
      timestamp: new Date().toISOString()
    }]);
  };

  const getWelcomeMessage = (agentId: string): string => {
    switch (agentId) {
      case 'sarah':
        return `Hi! I'm Sarah, your marketing strategist. I specialize in developing effective marketing campaigns and content strategies. How can I help you optimize your marketing efforts today?`;
      case 'alex':
        return `Hello! I'm Alex, your customer service specialist. I'm here to help resolve any issues or answer questions you might have about our products and services. What can I assist you with?`;
      case 'ashley':
        return `Hi there! I'm Ashley, your lead generation expert. I can help you identify and qualify potential business opportunities. What kind of leads are you looking to generate?`;
      case 'max':
        return `Hello! I'm Max, your HR assistant. I'm here to help with employee relations, HR processes, and workplace policies. What HR-related matter can I help you with today?`;
      default:
        return `Hello! I'm ${formatName(agentId)}. How can I assist you today?`;
    }
  };

  const getAgentResponse = (userMessage: string, agentId: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    let response = '';
    
    if (chatState.stage === 'greeting') {
      if (lowercaseMessage.includes('help') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('hello')) {
        setChatState({ stage: 'conversation' });
        return getInitialQuestion(agentId);
      }
      setChatState({ stage: 'conversation', context: extractTopic(lowercaseMessage) });
    }

    switch (agentId) {
      case 'sarah':
        response = handleMarketingQuery(lowercaseMessage, chatState);
        break;
      case 'alex':
        response = handleCustomerServiceQuery(lowercaseMessage, chatState);
        break;
      case 'ashley':
        response = handleLeadGenQuery(lowercaseMessage, chatState);
        break;
      case 'max':
        response = handleHRQuery(lowercaseMessage, chatState);
        break;
      default:
        response = handleGeneralQuery(lowercaseMessage, chatState);
    }

    return response;
  };

  const extractTopic = (message: string): string => {
    const topics = ['marketing', 'campaign', 'customer', 'service', 'lead', 'sales', 'hr', 'employee'];
    return topics.find(topic => message.includes(topic)) || '';
  };

  const getInitialQuestion = (agentId: string): string => {
    switch (agentId) {
      case 'sarah':
        return "I'd love to help with your marketing needs. Could you tell me what specific marketing goals you're looking to achieve?";
      case 'alex':
        return "I'm here to help resolve any issues. What specific challenge or question can I address for you today?";
      case 'ashley':
        return "I can help you generate quality leads. What industry or market segment are you targeting?";
      case 'max':
        return "I'm ready to assist with any HR-related matters. What specific topic would you like to discuss?";
      default:
        return "What specific assistance are you looking for today?";
    }
  };

  const handleMarketingQuery = (message: string, context: typeof chatState): string => {
    if (context.stage === 'conversation') {
      if (message.includes('campaign')) {
        return "I can help you design an effective campaign. What's your target audience and primary campaign objective?";
      } else if (message.includes('content')) {
        return "Content strategy is crucial. What type of content are you currently producing, and what are your goals?";
      } else if (message.includes('social media')) {
        return "Let's optimize your social media presence. Which platforms are you currently using, and what's your main challenge?";
      }
    }
    return "Could you provide more details about your marketing objectives?";
  };

  const handleCustomerServiceQuery = (message: string, context: typeof chatState): string => {
    if (context.stage === 'conversation') {
      if (message.includes('problem') || message.includes('issue')) {
        return "I'll help resolve this issue. When did you first notice this problem, and what steps have you already taken?";
      } else if (message.includes('question')) {
        return "I'm happy to answer your questions. What specific information are you looking for?";
      }
    }
    return "Could you provide more details about your concern?";
  };

  const handleLeadGenQuery = (message: string, context: typeof chatState): string => {
    if (context.stage === 'conversation') {
      if (message.includes('leads')) {
        return "Let's find you quality leads. What's your ideal customer profile, and what's your current lead generation process?";
      } else if (message.includes('sales')) {
        return "I can help optimize your sales pipeline. What's your current conversion rate, and where do you see the biggest challenges?";
      }
    }
    return "Could you tell me more about your lead generation goals?";
  };

  const handleHRQuery = (message: string, context: typeof chatState): string => {
    if (context.stage === 'conversation') {
      if (message.includes('policy')) {
        return "I can help clarify our policies. Which specific policy area would you like to learn more about?";
      } else if (message.includes('benefits')) {
        return "I'll help you understand our benefits package. Are you interested in health insurance, retirement plans, or other benefits?";
      } else if (message.includes('leave') || message.includes('vacation')) {
        return "I can assist with leave requests. Would you like to know about our leave policy or submit a request?";
      } else if (message.includes('onboarding')) {
        return "I'll help guide you through our onboarding process. Are you a new employee or a hiring manager?";
      }
    }
    return "What specific HR information can I help you with?";
  };

  const handleGeneralQuery = (message: string, context: typeof chatState): string => {
    if (message.includes('thank')) {
      return "You're welcome! Is there anything else you'd like to know?";
    } else if (message.includes('bye') || message.includes('goodbye')) {
      return "Thank you for chatting with me! If you need any further assistance, don't hesitate to ask.";
    }
    return "I understand you're interested in this topic. Could you provide more specific details about what you'd like to know?";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: 'user' as const,
      text: input.trim(),
      timestamp: '2025-01-16T16:46:52-06:00'
    };
    setMessages(prev => [...prev, newMessage]);
    setInput('');

    const agentResponse = {
      id: (Date.now() + 1).toString(),
      sender: 'agent' as const,
      text: getAgentResponse(input.trim(), agentId),
      timestamp: '2025-01-16T16:46:52-06:00'
    };
    setMessages(prev => [...prev, agentResponse]);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatName = (id: string) => {
    return id.charAt(0).toUpperCase() + id.slice(1);
  };

  const mapLearningTopics = (topics: LearningTopicData[]): LearningTopic[] => {
    return topics.map(topic => ({
      topic: topic.title,
      progress: topic.progress,
      lastUpdated: '2 hours ago',
      status: topic.progress === 100 ? 'Completed' : 'In Progress'
    }));
  };

  const agent: Agent = {
    id: agentId,
    name: formatName(agentId),
    role: agentId === 'sarah' ? 'Marketing Strategist' :
          agentId === 'alex' ? 'Customer Service Specialist' :
          agentId === 'ashley' ? 'Lead Generation Expert' :
          agentId === 'max' ? 'HR Assistant' : 'AI Agent',
    avatar: `/agents/${agentId}plain.svg`,
    status: 'Demo Mode',
    description: agentData.about,
    expertise: [
      { area: 'Customer Support', level: 98 },
      { area: 'Technical Knowledge', level: 92 },
      { area: 'Problem Resolution', level: 95 },
      { area: 'Communication', level: 97 },
      { area: 'Multi-tasking', level: 94 }
    ],
    performance: {
      metrics: {
        responseTime: agentData.metrics.responseTime,
        satisfactionRate: agentData.metrics.satisfactionRate,
        conversionsRate: 82,
        learningProgress: 92,
      },
      summary: {
        totalInteractions: agentData.metrics.totalInteractions,
        avgResponseTime: '28 seconds',
        satisfactionRate: '96%',
        resolutionRate: '92%',
        activeChats: 3,
      },
      trends: {
        daily: {
          dates: ['Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15', 'Jan 16'],
          interactions: [145, 132, 151, 142, 138, 149, 143],
          responseTime: [32, 29, 27, 28, 26, 30, 28],
          satisfaction: [94, 95, 96, 95, 97, 96, 96]
        },
        weekly: {
          weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          interactions: [980, 1020, 990, 1050],
          responseTime: [30, 28, 27, 28],
          satisfaction: [94, 95, 96, 96]
        }
      },
      channelMetrics: {
        chat: {
          volume: 45,
          avgResponseTime: '25s',
          satisfaction: 97,
          common: ['Product Support', 'Technical Issues', 'Feature Requests']
        },
        email: {
          volume: 35,
          avgResponseTime: '2h',
          satisfaction: 94,
          common: ['Account Management', 'Billing Inquiries', 'Integration Help']
        },
        phone: {
          volume: 20,
          avgResponseTime: '45s',
          satisfaction: 96,
          common: ['Complex Issues', 'Upgrades', 'Urgent Support']
        }
      },
      topIssues: [
        { category: 'Technical Support', volume: 35, avgResolutionTime: '15m' },
        { category: 'Account Access', volume: 25, avgResolutionTime: '12m' },
        { category: 'Billing', volume: 20, avgResolutionTime: '10m' },
        { category: 'Feature Requests', volume: 15, avgResolutionTime: '20m' },
        { category: 'Integration', volume: 5, avgResolutionTime: '45m' }
      ],
      peakHours: [
        { hour: '9AM', volume: 12 },
        { hour: '10AM', volume: 15 },
        { hour: '11AM', volume: 18 },
        { hour: '12PM', volume: 14 },
        { hour: '1PM', volume: 13 },
        { hour: '2PM', volume: 16 },
        { hour: '3PM', volume: 17 },
        { hour: '4PM', volume: 15 },
        { hour: '5PM', volume: 11 }
      ],
      skills: [
        { name: 'Problem Resolution', score: 95 },
        { name: 'Technical Knowledge', score: 92 },
        { name: 'Communication', score: 97 },
        { name: 'Efficiency', score: 94 },
        { name: 'Customer Satisfaction', score: 96 }
      ]
    },
    recentActivities: getDemoActivities(agentId),
    capabilities: agentData.capabilities,
    recentConversations: [
      {
        customer: 'Demo User 1',
        message: 'I need help with setting up my new device.',
        time: 'Just now'
      },
      {
        customer: 'Demo User 2',
        message: 'Could you explain the new features in the latest update?',
        time: '2 minutes ago'
      },
      {
        customer: 'Demo User 3',
        message: 'Thanks for helping me resolve the billing issue!',
        time: '15 minutes ago'
      }
    ],
    learningTopics: mapLearningTopics(agentData.learningTopics),
    insights: [
      {
        type: 'trend',
        title: 'Response Time Improvement',
        description: 'Average response time decreased by 15% this week',
        impact: 'Positive',
        timestamp: '2 hours ago'
      },
      {
        type: 'pattern',
        title: 'Common Customer Issues',
        description: 'Most frequent inquiries relate to account access',
        impact: 'Neutral',
        timestamp: '1 day ago'
      },
      {
        type: 'recommendation',
        title: 'Knowledge Base Update',
        description: 'Suggested updates to FAQ based on recent queries',
        impact: 'Positive',
        timestamp: '4 hours ago'
      }
    ]
  };

  const sampleConversations = getSampleConversations(agentId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <button
              onClick={() => navigate('/meet-our-agents')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Agents
            </button>
            
            <div className="mt-4">
              <div className="flex items-center">
                <div className="w-48 h-48 bg-primary/10 rounded-xl flex items-center justify-center overflow-hidden">
                  <img 
                    src={agent.avatar}
                    alt={`${agent.name} avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
                  <p className="text-gray-500">{agent.role}</p>
                </div>
              </div>
              
              <div className="mt-6 flex items-center space-x-4">
                <button
                  onClick={handleTalkToMeClick}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
                  Talk To Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      ${activeTab === tab.id
                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
                    `}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* About */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 mb-6">{agent.description}</p>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Response Time</span>
                      <span className="font-medium">{agent.performance.metrics.responseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Satisfaction Rate</span>
                      <span className="font-medium">{`${agent.performance.metrics.satisfactionRate}%`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Resolution Rate</span>
                      <span className="font-medium">{`${agent.performance.metrics.conversionsRate}%`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Learning Progress</span>
                      <span className="font-medium">{`${agent.performance.metrics.learningProgress}%`}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Chats</span>
                      <span className="font-medium">{agent.performance.summary.activeChats}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interactions</span>
                      <span className="font-medium">{agent.performance.summary.totalInteractions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Capabilities</h3>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {agent.capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">{capability}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Expertise Levels</h3>
              <div className="space-y-4">
                {agent.expertise.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">{skill.area}</span>
                      <span className="font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        style={{ width: `${skill.level}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demo Activities */}
            <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Demo Activities</h2>
              <div className="space-y-4">
                {agent.recentActivities.map((activity) => (
                  <div key={activity.id}>
                    <div 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => handleActivityClick(activity.id)}
                    >
                      <div className="flex items-center space-x-4">
                        {activity.type === 'chat' && <ChatBubbleLeftIcon className="h-6 w-6 text-blue-500" />}
                        {activity.type === 'email' && <EnvelopeIcon className="h-6 w-6 text-purple-500" />}
                        {activity.type === 'phone' && <PhoneIcon className="h-6 w-6 text-green-500" />}
                        {activity.type === 'call' && <PhoneIcon className="h-6 w-6 text-green-500" />}
                        <div>
                          <div className="font-medium">{activity.user}</div>
                          <div className="text-sm text-gray-500">{activity.topic}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {activity.status === 'active' ? (
                            <span className="text-green-600">● Active</span>
                          ) : (
                            <span className="text-gray-500">Completed</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                    
                    {/* Expandable Details Section */}
                    {selectedActivity === activity.id && (
                      <div className="mt-2 bg-white rounded-lg border p-4 animate-fadeIn">
                        {getActivityDetails(activity)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Performance Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-medium">{agent.performance.metrics.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Satisfaction Rate</span>
                  <span className="font-medium">{`${agent.performance.metrics.satisfactionRate}%`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Resolution Rate</span>
                  <span className="font-medium">{`${agent.performance.metrics.conversionsRate}%`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Learning Progress</span>
                  <span className="font-medium">{`${agent.performance.metrics.learningProgress}%`}</span>
                </div>
              </div>
            </div>

            {/* Top Issues */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Top Issues</h4>
              <div className="space-y-4">
                {agent.performance.topIssues && agent.performance.topIssues.map((issue, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <h4 className="text-base font-medium text-gray-900 capitalize">{issue.category}</h4>
                      <p className="text-sm text-gray-500">{`${issue.volume} cases`}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{issue.avgResolutionTime}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Assessment */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Skills Assessment</h4>
              <div className="space-y-4">
                {agent.performance.skills && agent.performance.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                      <span className="text-sm text-gray-500">{`${skill.score}%`}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Peak Hours Activity */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Peak Hours Activity</h4>
              <div className="space-y-2">
                {agent.performance.peakHours && agent.performance.peakHours.map((hourData, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-16 text-sm text-gray-500">{hourData.hour}</span>
                    <div className="flex-1">
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(hourData.volume / 20) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-16 text-right text-sm text-gray-500">{`${hourData.volume} chats`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sample-conversations' && (
          <div className="mt-6">
            <div className="bg-white shadow sm:rounded-lg">
              {!selectedConversation ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
                  {sampleConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500 cursor-pointer"
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-gray-900">{conversation.title}</h3>
                        <p className="text-sm text-gray-500">{conversation.description}</p>
                        <span className="text-xs text-indigo-600">Click to view conversation →</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  <button
                    type="button"
                    onClick={() => setSelectedConversation(null)}
                    className="mb-4 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    ← Back to Sample Conversations
                  </button>
                  <div className="divide-y divide-gray-200">
                    {sampleConversations
                      .find((conv) => conv.id === selectedConversation)
                      ?.steps.map((step, index) => (
                        <div key={index} className="py-4">
                          {step.explanation && (
                            <div className="mb-3 text-sm text-gray-500 bg-gray-50 p-2 rounded">
                              {step.explanation}
                            </div>
                          )}
                          <div className="space-y-4">
                            {step.messages.map((message) => (
                              <div
                                key={message.id}
                                className={`flex ${
                                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                              >
                                <div
                                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                                    message.sender === 'user'
                                      ? 'bg-indigo-600 text-white'
                                      : 'bg-gray-100 text-gray-900'
                                  }`}
                                >
                                  <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                                  <div
                                    className={`text-xs mt-1 ${
                                      message.sender === 'user'
                                        ? 'text-indigo-200'
                                        : 'text-gray-500'
                                    }`}
                                  >
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <div className="space-y-6">
            {agent.learningTopics.map((topic, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{topic.topic}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    topic.status === 'In Progress' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {topic.status}
                  </span>
                </div>
                <div className="relative">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                    <div
                      style={{ width: `${topic.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span>{topic.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            {agent.insights.map((insight, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg ${
                    insight.impact === 'Positive' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <SparklesIcon className={`w-6 h-6 ${
                      insight.impact === 'Positive' ? 'text-green-700' : 'text-yellow-700'
                    }`} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{insight.title}</h3>
                    <p className="mt-1 text-gray-600">{insight.description}</p>
                    <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      insight.impact === 'Positive' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {insight.impact} impact
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isChatOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsChatOpen(false);
                          setMessages([]);
                        }}
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="flex flex-col h-[500px]">
                      <div className="flex-1 overflow-y-auto">
                        <div className="space-y-4">
                          {messages.map((message, index) => (
                            <div
                              key={index}
                              className={`flex ${
                                message.sender === 'user' ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              <div
                                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                                  message.sender === 'user'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 text-gray-900'
                                }`}
                              >
                                <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 border-t border-gray-200 pt-4">
                        <form onSubmit={handleSubmit} className="flex space-x-4">
                          <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            Send
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Total Interactions</h3>
                <p className="text-2xl font-bold text-gray-900">{agent.performance.summary.totalInteractions.toLocaleString()}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Avg Response Time</h3>
                <p className="text-2xl font-bold text-gray-900">{agent.performance.summary.avgResponseTime}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Satisfaction Rate</h3>
                <p className="text-2xl font-bold text-gray-900">{agent.performance.summary.satisfactionRate}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Resolution Rate</h3>
                <p className="text-2xl font-bold text-gray-900">{agent.performance.summary.resolutionRate}</p>
              </div>
            </div>

            {/* Channel Performance */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Channel Performance</h3>
              <div className="space-y-4">
                {Object.entries(agent.performance.channelMetrics).map(([channel, metrics]) => (
                  <div key={channel} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-base font-medium text-gray-900 capitalize">{channel}</h4>
                      <span className="text-sm text-gray-500">{metrics.volume} interactions</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Response Time</span>
                        <p className="font-medium">{metrics.avgResponseTime}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Satisfaction</span>
                        <p className="font-medium">{`${metrics.satisfaction}%`}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Issues */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Top Issues</h4>
              <div className="space-y-4">
                {agent.performance.topIssues && agent.performance.topIssues.map((issue, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <h4 className="text-base font-medium text-gray-900 capitalize">{issue.category}</h4>
                      <p className="text-sm text-gray-500">{`${issue.volume} cases`}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{issue.avgResolutionTime}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Skills Assessment</h4>
              <div className="space-y-4">
                {agent.performance.skills && agent.performance.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                      <span className="text-sm text-gray-500">{`${skill.score}%`}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Peak Hours */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Peak Hours Activity</h4>
              <div className="space-y-2">
                {agent.performance.peakHours && agent.performance.peakHours.map((hourData, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-16 text-sm text-gray-500">{hourData.hour}</span>
                    <div className="flex-1">
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(hourData.volume / 20) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-16 text-right text-sm text-gray-500">{`${hourData.volume} chats`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDetail;
