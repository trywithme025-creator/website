
import React, { useState } from 'react';
import { Section, User } from '../types';
import { Icons } from '../constants';

interface NavbarProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  currentUser: User | null;
  onLogout: () => void;
  onLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  onNavigate, 
  isDarkMode, 
  onToggleTheme, 
  currentUser,
  onLogout,
  onLogin
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: Section.Home, label: 'Home' },
    { id: Section.Features, label: 'Features' },
    { id: Section.Community, label: 'Community' },
    { id: Section.Contact, label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${isDarkMode ? 'glass' : 'glass-light'} shadow-xl`}>
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate(Section.Home)}>
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <Icons.Shield />
            </div>
            <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-indigo-500">
              CYBERGATE
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'text-cyan-500 bg-cyan-500/10' 
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4 border-l border-slate-200 dark:border-slate-800 ml-4 pl-4">
            <button 
              onClick={onToggleTheme}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
            </button>
            
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-semibold text-slate-400">Welcome,</span>
                  <span className="text-sm font-bold">{currentUser.username}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={onLogin}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={onToggleTheme} className="p-2">
              {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-slate-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  activeSection === item.id 
                    ? 'text-cyan-500 bg-cyan-500/10 font-bold' 
                    : 'text-slate-500'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              {currentUser ? (
                <button 
                  onClick={() => { onLogout(); setIsMenuOpen(false); }}
                  className="w-full text-center px-4 py-3 rounded-xl bg-red-500/10 text-red-500 font-bold"
                >
                  Logout ({currentUser.username})
                </button>
              ) : (
                <button 
                  onClick={() => { onLogin(); setIsMenuOpen(false); }}
                  className="w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
