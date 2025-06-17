import React, { useState, useEffect } from 'react';
import { Email } from '../types/Email';
import { ArrowLeft, Calendar, User, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import { emailService } from '../services/api';
import DOMPurify from 'dompurify';

interface EmailDetailProps {
  slug: string;
  onBack: () => void;
}

export const EmailDetail: React.FC<EmailDetailProps> = ({ slug, onBack }) => {
  const [email, setEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEmail();
  }, [slug]);

  const loadEmail = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedEmail = await emailService.getEmailBySlug(slug);
      setEmail(fetchedEmail);
    } catch (err) {
      setError('Email not found or failed to load.');
      console.error('Error loading email:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    loadEmail();
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const extractSenderName = (email: string) => {
    const match = email.match(/^([^@]+)/);
    return match ? match[1].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : email;
  };

  const renderEmailContent = () => {
    if (!email) return null;

    if (email.html_body && email.html_body.trim()) {
      // Sanitize HTML content with strict settings
      const sanitizedHTML = DOMPurify.sanitize(email.html_body, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'],
        ALLOWED_ATTR: []
      });
      
      return (
        <div 
          className="prose prose-lg dark:prose-invert max-w-none
                    prose-headings:text-gray-900 dark:prose-headings:text-white
                    prose-p:text-gray-700 dark:prose-p:text-gray-300
                    prose-strong:text-gray-900 dark:prose-strong:text-white
                    prose-em:text-gray-700 dark:prose-em:text-gray-300
                    prose-ul:text-gray-700 dark:prose-ul:text-gray-300
                    prose-ol:text-gray-700 dark:prose-ol:text-gray-300
                    prose-li:text-gray-700 dark:prose-li:text-gray-300
                    prose-a:text-indigo-600 dark:prose-a:text-indigo-400
                    prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        />
      );
    }

    return (
      <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
        {email.text_body || 'No content available'}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading email..." />
      </div>
    );
  }

  if (error || !email) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full w-fit mx-auto mb-6">
            <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Email Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error || 'The email you\'re looking for doesn\'t exist or has been removed.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRetry}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              Back to Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 mb-8 group transition-colors duration-200"
          aria-label="Back to portfolio"
        >
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Portfolio
        </button>

        {/* Email Container */}
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <header className="border-b border-gray-200 dark:border-gray-700 p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              {email.subject}
            </h1>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <User className="h-5 w-5 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {extractSenderName(email.from_email)}
                  </div>
                  <div className="text-sm">
                    {email.from_email}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar className="h-5 w-5 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    Received
                  </div>
                  <div className="text-sm">
                    {formatDate(email.received_at)}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-8">
            {renderEmailContent()}
          </main>

          {/* Footer */}
          <footer className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
                This email is part of a professional portfolio showcase
              </div>
              <button
                onClick={onBack}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View More Emails
              </button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};