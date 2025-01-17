import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, ChartBarIcon, UserGroupIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import AgentShowcase from '../../components/Demo/AgentShowcase';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LogoScroll from '../../components/LogoScroll';

const Landing = () => {
  const features = [
    {
      icon: SparklesIcon,
      title: 'AI-Powered Intelligence',
      description: 'Our agents learn and adapt to your business needs, providing increasingly personalized service over time.',
    },
    {
      icon: ChartBarIcon,
      title: 'Performance Analytics',
      description: 'Get detailed insights into your agents\' performance and ROI with our comprehensive analytics dashboard.',
    },
    {
      icon: UserGroupIcon,
      title: 'Seamless Integration',
      description: 'Easily integrate our AI agents with your existing tools and workflows for maximum efficiency.',
    },
  ];

  const testimonials = [
    {
      content: "AI Agents has completely transformed how we handle customer service. Our response times are down 75% and customer satisfaction is up 50%.",
      name: "Sarah Chen",
      role: "Customer Success Manager at TechCorp"
    },
    {
      content: "The lead generation AI is incredible. It's like having a full-time sales team working 24/7. Our qualified leads have increased by 300%.",
      name: "Michael Rodriguez",
      role: "Sales Director at GrowthCo"
    },
    {
      content: "Employee onboarding used to take weeks of our HR team's time. With AI Agents, it's automated, consistent, and our new hires love it.",
      name: "Emily Thompson",
      role: "HR Director at InnovateCorp"
    }
  ];

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleAgentClick = (agent: any) => {
    setSelectedAgent(agent);
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-primary/5 to-indigo-400/10">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-500/30 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl -z-10"></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-6">
              Your AI Workforce
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Transform your business with our specialized AI agents. From lead generation 
              to customer service, we're revolutionizing how businesses operate.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/signup"
                className="rounded-lg bg-[#4F46E5] px-8 py-2.5 text-base font-semibold text-white hover:bg-[#4338CA] transition-all duration-200 ease-in-out hover:scale-105"
              >
                Start Free Trial
              </Link>
              <Link
                to="/meet-our-agents"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-2.5 text-base font-semibold text-primary hover:bg-gray-50 transition-all duration-200 ease-in-out hover:scale-105"
              >
                Watch Demo
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-gray-600">Always Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">4X</div>
              <div className="text-gray-600">Faster Response</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">60%</div>
              <div className="text-gray-600">Cost Reduction</div>
            </div>
          </div>

          {/* Agent Showcase */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100/50"></div>
            <AgentShowcase handleAgentClick={handleAgentClick} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Our AI Agents?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-[1.02]"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600">
              See what our customers have to say about their experience with AI Agents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 relative hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-[1.02]"
              >
                {/* Quote mark */}
                <div className="absolute top-4 right-4 text-primary/10">
                  <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-600 mb-6 text-lg">"{testimonial.content}"</p>
                
                {/* Author */}
                <div className="mt-auto">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-primary text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-8">Trusted by 1000+ businesses worldwide</p>
            <LogoScroll />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of businesses already using our AI Agents to streamline their operations and boost productivity.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200"
            >
              Start Free Trial
            </Link>
            <Link
              to="/meet-our-agents"
              className="bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-darker transition-all duration-200 border border-white/20"
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

export default Landing;
