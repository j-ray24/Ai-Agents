import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';

const HowTheyWork = () => {
  const features = [
    {
      icon: CpuChipIcon,
      title: 'Advanced AI Technology',
      description: 'Our agents are powered by cutting-edge AI models, enabling them to understand context, learn from interactions, and provide intelligent responses.',
    },
    {
      icon: ClockIcon,
      title: '24/7 Availability',
      description: 'AI agents work around the clock, ensuring your business never misses an opportunity and providing instant responses at any time.',
    },
    {
      icon: ChatBubbleBottomCenterTextIcon,
      title: 'Natural Conversations',
      description: 'Experience human-like interactions with our AI agents, who maintain context and provide relevant, personalized responses.',
    },
    {
      icon: ChartBarIcon,
      title: 'Performance Analytics',
      description: 'Track your agents\' performance with detailed analytics, measuring response times, satisfaction rates, and conversion metrics.',
    },
    {
      icon: BoltIcon,
      title: 'Instant Deployment',
      description: 'Get started immediately with pre-trained agents that can be customized to your specific business needs and workflows.',
    },
    {
      icon: UserGroupIcon,
      title: 'Seamless Collaboration',
      description: 'AI agents work alongside your team, handling routine tasks while escalating complex issues to human staff when needed.',
    },
  ];

  const workflowSteps = [
    {
      number: '01',
      title: 'Select Your Agent',
      description: 'Choose from our specialized AI agents designed for specific business functions: Lead Generation, Customer Service, Employee Onboarding, or Marketing.',
    },
    {
      number: '02',
      title: 'Customize & Train',
      description: 'Tailor the agent to your business needs with custom knowledge, brand voice, and specific workflows. Our agents learn from each interaction to improve over time.',
    },
    {
      number: '03',
      title: 'Deploy & Monitor',
      description: 'Launch your AI agent across your preferred channels and track its performance through our comprehensive analytics dashboard.',
    },
    {
      number: '04',
      title: 'Scale & Optimize',
      description: 'As your business grows, easily scale your AI workforce and optimize their performance based on real-time insights and feedback.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              How Our AI Agents Work
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Discover how our AI agents combine cutting-edge technology with practical business solutions to transform your operations and boost productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Getting Started is Easy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-[1.02]"
              >
                <div className="text-4xl font-bold text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            Advanced AI Technology
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Our AI agents are built on cutting-edge technology, ensuring reliable, secure, and intelligent interactions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-[1.02]">
              <h3 className="text-lg font-semibold mb-4 text-primary">Natural Language Processing</h3>
              <p className="text-gray-600">Advanced language models that understand context, sentiment, and intent for more natural conversations.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-[1.02]">
              <h3 className="text-lg font-semibold mb-4 text-primary">Machine Learning</h3>
              <p className="text-gray-600">Continuous learning from interactions to improve responses and adapt to your business needs.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-[1.02]">
              <h3 className="text-lg font-semibold mb-4 text-primary">Security & Privacy</h3>
              <p className="text-gray-600">Enterprise-grade security with data encryption and compliance with privacy regulations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Get answers to common questions about our AI agents and how they can help your business.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-[1.02] hover:bg-white">
              <h3 className="text-lg font-semibold mb-2">How quickly can I get started?</h3>
              <p className="text-gray-600">Our pre-trained agents can be deployed within minutes. Custom training typically takes 1-2 days.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-[1.02] hover:bg-white">
              <h3 className="text-lg font-semibold mb-2">Can agents integrate with my existing tools?</h3>
              <p className="text-gray-600">Yes, our agents integrate seamlessly with popular CRM, helpdesk, and communication platforms.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-[1.02] hover:bg-white">
              <h3 className="text-lg font-semibold mb-2">How do agents handle complex issues?</h3>
              <p className="text-gray-600">Agents are trained to recognize complex cases and seamlessly escalate them to human team members.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-[1.02] hover:bg-white">
              <h3 className="text-lg font-semibold mb-2">What about data privacy?</h3>
              <p className="text-gray-600">We maintain strict data privacy standards with encryption and compliance with GDPR, CCPA, and other regulations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Transform your business operations today with our intelligent AI agents.
          </p>
          <div className="flex items-center justify-center gap-x-6">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-2.5 text-base font-semibold text-primary hover:bg-gray-50 transition-all duration-200 ease-in-out hover:scale-105"
            >
              Start Free Trial
            </Link>
            <Link
              to="/demo"
              className="rounded-lg bg-[#4F46E5] px-8 py-2.5 text-base font-semibold text-white hover:bg-[#4338CA] transition-all duration-200 ease-in-out hover:scale-105"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowTheyWork;
