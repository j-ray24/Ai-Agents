import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  highlight: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface Metric {
  value: string;
  label: string;
}

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    
    const scroll = () => {
      setScrollPosition((prev) => {
        const newPosition = prev + 1;
        if (newPosition >= maxScroll) {
          // Reset to start when reaching the end
          return 0;
        }
        return newPosition;
      });
    };

    const intervalId = setInterval(scroll, 30); // Adjust speed by changing interval

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  const metrics: Metric[] = [
    { value: '93%', label: 'Customer Satisfaction' },
    { value: '24/7', label: 'Support Available' },
    { value: '14-Day', label: 'Free Trial' },
    { value: '10k+', label: 'Active Users' },
  ];

  const plans: PricingPlan[] = [
    {
      name: 'Starter',
      monthlyPrice: 49,
      annualPrice: 39,
      period: 'month',
      description: 'Perfect for small businesses just getting started with AI',
      features: [
        'Access to Basic AI Agents',
        '1,000 AI interactions per month',
        'Email support',
        'Basic analytics',
        'API access',
      ],
      cta: 'Get Started',
      popular: false,
      highlight: 'Best for Small Teams',
    },
    {
      name: 'Professional',
      monthlyPrice: 99,
      annualPrice: 79,
      period: 'month',
      description: 'Ideal for growing businesses needing more AI capabilities',
      features: [
        'All Starter features',
        '10,000 AI interactions per month',
        'Priority support',
        'Advanced analytics',
        'Custom agent training',
        'Multiple team members',
      ],
      cta: 'Start Free Trial',
      popular: true,
      highlight: 'Most Popular',
    },
    {
      name: 'Enterprise',
      monthlyPrice: 299,
      annualPrice: 239,
      period: 'month',
      description: 'For large organizations requiring full AI automation',
      features: [
        'All Professional features',
        'Unlimited AI interactions',
        '24/7 dedicated support',
        'Custom AI model development',
        'Advanced security features',
        'SLA guarantee',
        'Custom integration support',
      ],
      cta: 'Contact Sales',
      popular: false,
      highlight: 'Ultimate Features',
    },
  ];

  const testimonials: Testimonial[] = [
    {
      quote: "The AI agents have transformed our customer service. Response times down 75%!",
      author: "Sarah Chen",
      role: "Customer Success Manager",
      company: "TechCorp",
    },
    {
      quote: "Worth every penny. The ROI was visible within the first month.",
      author: "Michael Rodriguez",
      role: "Sales Director",
      company: "GrowthCo",
    },
    {
      quote: "The custom agent training feature helped us create specialized AI agents that truly understand our industry.",
      author: "Emma Thompson",
      role: "Operations Director",
      company: "InnovateHub",
    },
    {
      quote: "Exceptional support team and the advanced security features give us peace of mind.",
      author: "David Kim",
      role: "CTO",
      company: "SecureFlow",
    },
    {
      quote: "Integration was seamless, and the impact on our workflow was immediate and positive.",
      author: "Lisa Martinez",
      role: "Product Manager",
      company: "AgileWorks",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary to-primary-dark text-white py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your business. No hidden fees.
              All plans include a 14-day free trial.
            </p>
            
            {/* Pricing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={!isAnnual ? 'font-semibold' : 'text-gray-300'}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/20 transition-colors focus:outline-none"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={isAnnual ? 'font-semibold' : 'text-gray-300'}>
                Annual <span className="text-green-400">(Save 20%)</span>
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-lg p-4 backdrop-blur-sm transform transition-all duration-300 hover:scale-105"
                >
                  <div className="text-3xl font-bold mb-2">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="container mx-auto px-4 py-16 -mt-20 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  plan.popular ? 'border-2 border-primary transform scale-105' : ''
                }`}
              >
                {plan.highlight && (
                  <div className={`absolute top-0 inset-x-0 h-1 ${plan.popular ? 'bg-primary' : 'bg-gray-200'}`} />
                )}
                <div className="p-8">
                  <div className="text-sm font-semibold text-primary mb-2">{plan.highlight}</div>
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-500 ml-2">/{plan.period}</span>
                    {isAnnual && (
                      <span className="ml-2 text-sm text-green-500">Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/yr</span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <Link
                    to="/calendar"
                    className={`block text-center py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                      plan.popular
                        ? 'bg-primary text-white hover:bg-primary-dark'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
                <div className="border-t border-gray-100 p-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start transform transition-all duration-300 hover:translate-x-2"
                      >
                        <svg
                          className={`w-5 h-5 mt-1 mr-2 ${plan.popular ? 'text-primary' : 'text-gray-400'}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
            <div className="relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-gray-100 to-transparent w-20 h-full"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-gray-100 to-transparent w-20 h-full"></div>
              <div 
                ref={scrollRef}
                className="overflow-x-auto pb-4 hide-scrollbar"
              >
                <div className="flex gap-4 min-w-max px-4">
                  {[...testimonials, ...testimonials].map((testimonial, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl w-[350px] flex flex-col"
                    >
                      <p className="text-gray-700 mb-3 flex-grow text-sm">{testimonial.quote}</p>
                      <div className="mt-auto">
                        <div className="font-semibold text-sm">{testimonial.author}</div>
                        <div className="text-xs text-gray-500">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto grid gap-8">
              <div className="transform transition-all duration-300 hover:translate-y-[-4px]">
                <h3 className="text-xl font-semibold mb-2">
                  What happens after my trial ends?
                </h3>
                <p className="text-gray-600">
                  After your 14-day trial, you'll be automatically subscribed to your
                  chosen plan. You can cancel or change plans at any time.
                </p>
              </div>
              <div className="transform transition-all duration-300 hover:translate-y-[-4px]">
                <h3 className="text-xl font-semibold mb-2">
                  Can I switch plans later?
                </h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes
                  will be prorated and reflected in your next billing cycle.
                </p>
              </div>
              <div className="transform transition-all duration-300 hover:translate-y-[-4px]">
                <h3 className="text-xl font-semibold mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and wire transfers for
                  enterprise customers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8">
              Try any plan free for 14 days. No credit card required.
            </p>
            <Link
              to="/calendar"
              className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-100"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
