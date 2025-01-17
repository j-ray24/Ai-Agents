import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, ChartBarIcon, UserGroupIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import AgentShowcase from './Demo/AgentShowcase';
import Header from './Header';
import Footer from './Footer';
import LogoScroll from './LogoScroll';

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
      title: 'Team Collaboration',
      description: 'Seamlessly integrate AI agents with your human team for enhanced productivity and customer satisfaction.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero section */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Transform Your Business with AI Agents
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Empower your team with intelligent AI agents that handle customer service, sales, and operations.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/demo"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Try Demo
                </Link>
                <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy Faster</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to deploy AI agents
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Get your AI agents up and running in minutes, not months. Our platform provides everything you need for success.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.title} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature.title}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
