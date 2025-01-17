import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl font-bold mb-8 leading-tight">
                Transforming Business <br />Through AI Innovation
              </h1>
              <p className="text-xl leading-relaxed mb-12 opacity-90">
                We're a team of AI experts, engineers, and visionaries dedicated to making 
                artificial intelligence accessible and impactful for businesses worldwide. 
                Our intelligent agents are designed to transform how companies operate, 
                making AI technology not just powerful, but practical and easy to use.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-4xl mb-4">🌟</div>
                  <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                  <p className="opacity-90">
                    To democratize AI technology and make it accessible to businesses of all sizes
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                  <p className="opacity-90">
                    Creating intelligent agents that transform how businesses operate
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-4xl mb-4">💫</div>
                  <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                  <p className="opacity-90">
                    Innovation, accessibility, and excellence in everything we do
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2">
                <div className="text-primary text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-4">Innovation</h3>
                <p className="text-gray-600">
                  Pushing the boundaries of what's possible with AI through continuous innovation
                  and research
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2">
                <div className="text-primary text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold mb-4">Accessibility</h3>
                <p className="text-gray-600">
                  Making advanced AI technology accessible and user-friendly for businesses
                  of all sizes
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2">
                <div className="text-primary text-4xl mb-4">💡</div>
                <h3 className="text-xl font-semibold mb-4">Excellence</h3>
                <p className="text-gray-600">
                  Delivering the highest quality AI solutions with unmatched reliability
                  and performance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <div className="text-5xl font-bold text-primary mb-3">500+</div>
                <div className="text-gray-600 text-lg">Clients Served</div>
              </div>
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <div className="text-5xl font-bold text-primary mb-3">50M+</div>
                <div className="text-gray-600 text-lg">AI Interactions</div>
              </div>
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <div className="text-5xl font-bold text-primary mb-3">99.9%</div>
                <div className="text-gray-600 text-lg">Uptime</div>
              </div>
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <div className="text-5xl font-bold text-primary mb-3">24/7</div>
                <div className="text-gray-600 text-lg">Support</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
