
import React from 'react';
import { Section } from '../types';
import { Icons } from '../constants';

interface HomeSectionProps {
  onNavigate: (section: Section) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-24 py-12">
      {/* Hero */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 text-xs font-bold tracking-widest uppercase animate-pulse">
            <Icons.Shield />
            <span>Encrypted Environment 3.0</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
            Secure Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-600">Digital Realm</span> With Confidence.
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg lg:text-xl max-w-2xl">
            CyberGate provides next-generation threat detection, community-driven vulnerability research, and iron-clad data protection in a sleek, modern interface.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button 
              onClick={() => onNavigate(Section.Features)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all text-lg"
            >
              Explore Features
            </button>
            <button 
              onClick={() => onNavigate(Section.Community)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-lg"
            >
              Join Community
            </button>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          <div className="relative z-10 p-4 rounded-3xl bg-slate-950/20 backdrop-blur-xl border border-white/10 shadow-2xl">
             <div className="aspect-square w-full max-w-[500px] flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-white/5 relative group">
                {/* Abstract Cyber Graphic */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="w-48 h-48 rounded-full bg-cyan-500/20 blur-3xl animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="relative">
                      <div className="text-cyan-500 opacity-40 animate-spin-slow">
                        <svg width="240" height="240" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
                          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10,5" />
                        </svg>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center text-cyan-400">
                        <Icons.Lock />
                      </div>
                   </div>
                </div>
                {/* Animated Lines */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-scan"></div>
             </div>
          </div>
          {/* Decorative stats card */}
          <div className="absolute -bottom-6 -left-6 z-20 glass p-6 rounded-2xl border border-white/10 hidden md:block">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500/20 rounded-xl text-green-500">
                <Icons.Shield />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">STATUS</p>
                <p className="font-bold text-green-400">ENCRYPTED</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
