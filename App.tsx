
import React, { useState, useEffect, useCallback } from 'react';
import { Section, User } from './types';
import Navbar from './components/Navbar';
import HomeSection from './sections/HomeSection';
import FeaturesSection from './sections/FeaturesSection';
import CommunitySection from './sections/CommunitySection';
import ContactSection from './sections/ContactSection';
import AuthModal from './components/AuthModal';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.Home);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case Section.Home:
        return <HomeSection onNavigate={setActiveSection} />;
      case Section.Features:
        return <FeaturesSection />;
      case Section.Community:
        return <CommunitySection currentUser={currentUser} onOpenAuth={() => setIsAuthModalOpen(true)} />;
      case Section.Contact:
        return <ContactSection />;
      default:
        return <HomeSection onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-30 ${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-200'}`}></div>
        <div className={`absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-30 ${isDarkMode ? 'bg-cyan-600' : 'bg-cyan-200'}`}></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar 
          activeSection={activeSection} 
          onNavigate={setActiveSection} 
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          currentUser={currentUser}
          onLogout={handleLogout}
          onLogin={() => setIsAuthModalOpen(true)}
        />
        
        <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
          {renderSection()}
        </main>

        <footer className="py-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} CyberGate Mini Project. Professional Sandbox Environment.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-cyan-500 transition-colors">Documentation</a>
            <a href="#" className="hover:text-cyan-500 transition-colors">WAF Setup</a>
            <a href="#" className="hover:text-cyan-500 transition-colors">Security Policy</a>
          </div>
        </footer>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin}
      />
    </div>
  );
};

export default App;
