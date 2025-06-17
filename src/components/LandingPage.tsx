import React from 'react';
import { Mail, Star, Shield, Zap, ArrowRight, CheckCircle, Code, Users, Award } from 'lucide-react';
import { ContactForm } from './ContactForm';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Portfolio',
      description: 'Transform your professional emails into a stunning portfolio showcase that tells your career story.'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Professional Presentation',
      description: 'Display job offers, testimonials, and collaborations in a clean, modern interface that impresses visitors.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'API Integration',
      description: 'Seamlessly receive emails via webhook integration with services like Postmark, Mailgun, or SendGrid.'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Real-time Updates',
      description: 'Your portfolio updates automatically as new professional emails arrive, keeping your showcase current.'
    }
  ];

  const benefits = [
    'Showcase job offers and opportunities',
    'Display client testimonials and feedback',
    'Highlight speaking invitations and recognition',
    'Demonstrate collaboration requests',
    'Build credibility with potential clients',
    'Create a unique professional narrative'
  ];

  const useCases = [
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Developers & Designers',
      description: 'Show off project collaborations, job offers, and client testimonials'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Consultants & Freelancers',
      description: 'Display client feedback, project inquiries, and professional recommendations'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Speakers & Thought Leaders',
      description: 'Showcase speaking invitations, media mentions, and industry recognition'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
              <Mail className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Turn Your <span className="text-indigo-600 dark:text-indigo-400">Professional Emails</span> Into a 
            <br className="hidden sm:block" />
            <span className="text-purple-600 dark:text-purple-400">Beautiful Portfolio</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Inboxfolio automatically transforms your most impressive professional emails into a stunning, 
            public-facing portfolio. Perfect for freelancers, consultants, and professionals who want to 
            showcase job offers, testimonials, collaborations, and speaking invitations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('portfolio')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View Live Portfolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <a 
              href="#api-docs" 
              className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-indigo-200 dark:border-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              API Documentation
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Inboxfolio?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Built specifically for professionals who want to showcase their career achievements 
            and business opportunities in a compelling, automated way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-200">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="bg-white dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Perfect for Modern Professionals
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Whether you're a freelancer, consultant, or industry expert, Inboxfolio helps you 
              showcase your professional achievements automatically.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {useCases.map((useCase, index) => (
              <div key={index} className="text-center p-8 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-2xl mx-auto mb-6">
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                What You Can Showcase
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-lg text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                    <div>
                      <div className="h-3 bg-white/30 rounded w-24 mb-1"></div>
                      <div className="h-2 bg-white/20 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/20 rounded"></div>
                    <div className="h-3 bg-white/20 rounded w-4/5"></div>
                    <div className="h-3 bg-white/20 rounded w-3/5"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
                <Mail className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Section */}
      <div id="api-docs" className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Simple API Integration
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Connect your email service with a simple POST request to automatically populate your portfolio.
          </p>
          
          <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-6 text-left mb-12 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-green-400 font-mono text-sm">POST /api/emails</span>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <pre className="text-gray-300 text-sm overflow-x-auto">
{`{
  "subject": "Job Offer - Senior Developer",
  "from_email": "hr@company.com",
  "to_email": "you@example.com",
  "received_at": "2024-12-15T10:30:00Z",
  "text_body": "We'd love to offer you...",
  "html_body": "<p>We'd love to offer you...</p>"
}`}
            </pre>
          </div>

          <button 
            onClick={() => onNavigate('portfolio')}
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
          >
            Explore Live Portfolio
            <ArrowRight className="ml-3 h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Contact Form */}
      <ContactForm />
    </div>
  );
};