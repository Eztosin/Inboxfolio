import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, ExternalLink, Copy } from 'lucide-react';

export const DebugInfo: React.FC = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [healthStatus, setHealthStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [healthData, setHealthData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const url = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    setApiUrl(url);
    checkHealth(url);
  }, []);

  const checkHealth = async (url: string) => {
    try {
      setHealthStatus('loading');
      const response = await fetch(`${url}/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setHealthData(data);
      setHealthStatus('success');
    } catch (err: any) {
      setError(err.message);
      setHealthStatus('error');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const testEmailsEndpoint = async () => {
    try {
      const response = await fetch(`${apiUrl}/emails`);
      const data = await response.json();
      console.log('Emails response:', data);
      alert(`Emails endpoint test: ${response.ok ? 'SUCCESS' : 'FAILED'}\nData: ${JSON.stringify(data, null, 2)}`);
    } catch (err) {
      console.error('Emails test failed:', err);
      alert(`Emails endpoint test FAILED: ${err}`);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 max-w-md z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-white">Debug Info</h3>
        <button
          onClick={() => window.location.reload()}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 text-sm"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-3 text-sm">
        {/* Environment */}
        <div>
          <div className="font-medium text-gray-700 dark:text-gray-300">Environment:</div>
          <div className="text-gray-600 dark:text-gray-400">
            {window.location.hostname === 'localhost' ? 'Development' : 'Production'}
          </div>
        </div>

        {/* API URL */}
        <div>
          <div className="font-medium text-gray-700 dark:text-gray-300">API URL:</div>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded flex-1">
              {apiUrl}
            </code>
            <button
              onClick={() => copyToClipboard(apiUrl)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <Copy className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Health Status */}
        <div>
          <div className="font-medium text-gray-700 dark:text-gray-300">Health Check:</div>
          <div className="flex items-center gap-2">
            {healthStatus === 'loading' && (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                <span className="text-gray-600 dark:text-gray-400">Checking...</span>
              </>
            )}
            {healthStatus === 'success' && (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-green-600 dark:text-green-400">Connected</span>
              </>
            )}
            {healthStatus === 'error' && (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-red-600 dark:text-red-400">Failed</span>
              </>
            )}
          </div>
        </div>

        {/* Error Details */}
        {error && (
          <div>
            <div className="font-medium text-red-700 dark:text-red-300">Error:</div>
            <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 p-2 rounded">
              {error}
            </div>
          </div>
        )}

        {/* Health Data */}
        {healthData && (
          <div>
            <div className="font-medium text-gray-700 dark:text-gray-300">Server Info:</div>
            <div className="text-xs bg-gray-50 dark:bg-gray-700 p-2 rounded">
              <div>Status: {healthData.status}</div>
              <div>Version: {healthData.version}</div>
              <div>Environment: {healthData.environment}</div>
            </div>
          </div>
        )}

        {/* Test Buttons */}
        <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={() => checkHealth(apiUrl)}
            className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
          >
            Test Health
          </button>
          <button
            onClick={testEmailsEndpoint}
            className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
          >
            Test Emails
          </button>
          <a
            href={`${apiUrl}/health`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
          >
            Open API
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};