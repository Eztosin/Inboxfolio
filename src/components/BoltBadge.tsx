import React from 'react';
import { Zap, ExternalLink } from 'lucide-react';

export const BoltBadge: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <a
        href="https://bolt.new"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm font-medium"
      >
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 animate-pulse" />
          <span>Built with Bolt.new</span>
          <ExternalLink className="h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
        </div>
      </a>
    </div>
  );
};