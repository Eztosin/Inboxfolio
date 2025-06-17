import React from 'react';
import { Email } from '../types/Email';
import { Calendar, User, ExternalLink } from 'lucide-react';

interface EmailCardProps {
  email: Email;
  onClick: () => void;
}

export const EmailCard: React.FC<EmailCardProps> = ({ email, onClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const extractSenderName = (email: string) => {
    const match = email.match(/^([^@]+)/);
    return match ? match[1].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : email;
  };

  const getPreviewText = (text: string, html: string) => {
    if (html) {
      // Strip HTML tags for preview
      const stripped = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      return stripped.length > 150 ? `${stripped.substring(0, 150)}...` : stripped;
    }
    return text.length > 150 ? `${text.substring(0, 150)}...` : text;
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 group overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2 flex-1 mr-4">
            {email.subject}
          </h3>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
            <ExternalLink className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <User className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="font-medium">{extractSenderName(email.from_email)}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-500 dark:text-gray-500 truncate">{email.from_email}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{formatDate(email.received_at)}</span>
          </div>
        </div>

        <div className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
          {getPreviewText(email.text_body, email.html_body)}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-400 dark:text-gray-500">
            Click to read full email
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              Read More
              <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};