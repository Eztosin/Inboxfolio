import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { PortfolioPage } from './components/PortfolioPage';
import { EmailDetail } from './components/EmailDetail';
import { ErrorBoundary } from './components/ErrorBoundary';
import { DebugInfo } from './components/DebugInfo';
import { BoltBadge } from './components/BoltBadge';
import { Email } from './types/Email';

type PageType = 'home' | 'portfolio' | 'email-detail';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedEmailSlug, setSelectedEmailSlug] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
             (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  // Show debug info in development or when there are connection issues
  useEffect(() => {
    const isDev = import.meta.env.DEV;
    const isLocalhost = window.location.hostname === 'localhost';
    setShowDebug(isDev || isLocalhost || window.location.search.includes('debug=true'));
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/') {
        setCurrentPage('home');
        setSelectedEmailSlug(null);
      } else if (path === '/portfolio') {
        setCurrentPage('portfolio');
        setSelectedEmailSlug(null);
      } else if (path.startsWith('/email/')) {
        const slug = path.replace('/email/', '');
        setSelectedEmailSlug(slug);
        setCurrentPage('email-detail');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
    setSelectedEmailSlug(null);
    
    // Update URL without page reload
    const url = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', url);
  };

  const handleEmailSelect = (email: Email) => {
    setSelectedEmailSlug(email.slug);
    setCurrentPage('email-detail');
    
    // Update URL without page reload
    window.history.pushState({}, '', `/email/${email.slug}`);
  };

  const handleBackToPortfolio = () => {
    setCurrentPage('portfolio');
    setSelectedEmailSlug(null);
    window.history.pushState({}, '', '/portfolio');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
        
        {currentPage === 'home' && (
          <LandingPage onNavigate={handleNavigate} />
        )}
        
        {currentPage === 'portfolio' && (
          <PortfolioPage onEmailSelect={handleEmailSelect} />
        )}
        
        {currentPage === 'email-detail' && selectedEmailSlug && (
          <EmailDetail
            slug={selectedEmailSlug}
            onBack={handleBackToPortfolio}
          />
        )}

        {/* Bolt.new Badge - always visible */}
        <BoltBadge />

        {/* Debug Info - only show in development or when debugging */}
        {showDebug && <DebugInfo />}
      </div>
    </ErrorBoundary>
  );
}

export default App;