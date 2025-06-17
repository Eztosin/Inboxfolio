import React, { useState, useEffect } from 'react';
import { Email } from '../types/Email';
import { EmailCard } from './EmailCard';
import { LoadingSpinner } from './LoadingSpinner';
import { Search, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { emailService } from '../services/api';

interface PortfolioPageProps {
  onEmailSelect: (email: Email) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onEmailSelect }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    loadEmails();
  }, [retryCount]);

  const loadEmails = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedEmails = await emailService.getAllEmails();
      setEmails(fetchedEmails);
    } catch (err) {
      const isLocalhost = window.location.hostname === 'localhost';
      const errorMessage = isLocalhost 
        ? 'Failed to load emails. Make sure the backend server is running on port 3001.'
        : 'Backend API not configured. Please deploy the backend server and update the API URL in environment variables.';
      
      setError(errorMessage);
      console.error('Error loading emails:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const filteredEmails = emails.filter(email => {
    const searchLower = searchQuery.toLowerCase();
    return (
      email.subject.toLowerCase().includes(searchLower) ||
      email.from_email.toLowerCase().includes(searchLower) ||
      email.text_body.toLowerCase().includes(searchLower) ||
      (email.html_body && email.html_body.toLowerCase().includes(searchLower))
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading your portfolio..." />
      </div>
    );
  }

  if (error) {
    const isLocalhost = window.location.hostname === 'localhost';
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full w-fit mx-auto mb-6">
            <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {isLocalhost ? 'Backend Server Not Running' : 'Backend Not Configured'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          
          {!isLocalhost && (
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Deployment Instructions
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
                Your frontend is deployed, but you need to deploy the backend API separately.
              </p>
              <a 
                href="https://railway.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
              >
                Deploy Backend on Railway
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRetry}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </button>
            
            {isLocalhost && (
              <div className="text-sm text-gray-500 dark:text-gray-400 self-center">
                Run: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">npm run dev</code>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Portfolio
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            A curated collection of professional emails showcasing career opportunities, 
            client testimonials, and collaborative projects. Each email represents a milestone 
            in my professional journey.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search emails, senders, or content..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search emails"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery ? (
              <>Showing {filteredEmails.length} of {emails.length} emails matching "{searchQuery}"</>
            ) : (
              <>Showing {emails.length} professional emails</>
            )}
          </p>
        </div>

        {/* Email Grid */}
        {filteredEmails.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEmails.map((email) => (
              <EmailCard
                key={email.id}
                email={email}
                onClick={() => onEmailSelect(email)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {searchQuery ? 'No emails found' : 'No emails yet'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery 
                  ? 'Try adjusting your search criteria to find what you\'re looking for.'
                  : 'Professional emails will appear here once they\'re received via the API.'
                }
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};