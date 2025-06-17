import React from 'react';
import { Mail, Github, ExternalLink, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="h-8 w-8 text-indigo-400" />
              <span className="text-2xl font-bold">Inboxfolio</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Transform your professional emails into a beautiful portfolio showcase. 
              Perfect for freelancers, consultants, and professionals.
            </p>
            
            {/* Built with Bolt Badge */}
            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm font-medium mb-4"
            >
              <Zap className="h-4 w-4" />
              <span>Built with Bolt.new</span>
              <ExternalLink className="h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#api-docs" className="text-gray-300 hover:text-white transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="/portfolio" className="text-gray-300 hover:text-white transition-colors">
                  View Portfolio
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/yourusername/inboxfolio" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://bolt.new" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <Zap className="h-4 w-4" />
                  Bolt.new
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Inboxfolio. Built with ❤️ using Bolt.new
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Powered by:</span>
              <a
                href="https://bolt.new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium"
              >
                <Zap className="h-4 w-4" />
                Bolt.new
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};