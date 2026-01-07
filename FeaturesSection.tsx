
import React from 'react';
import { Icons } from '../constants';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Advanced Encryption',
      desc: 'Military-grade end-to-end encryption for all your sensitive data pipelines.',
      icon: <Icons.Lock />,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'Global Threat Intel',
      desc: 'Real-time monitoring of zero-day vulnerabilities across the globe.',
      icon: <Icons.Globe />,
      color: 'from-indigo-500 to-violet-600'
    },
    {
      title: 'Smart Firewall',
      desc: 'AI-driven traffic analysis to prevent DDoS and SQL injection attacks.',
      icon: <Icons.Shield />,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Identity Guard',
      desc: 'Robust multi-factor authentication with biometric and hardware token support.',
      icon: <Icons.User />,
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="py-12 space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-4xl lg:text-5xl font-extrabold">Next-Gen Security <span className="text-cyan-500">Suite</span></h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Our platform integrates seamlessly into your workflow to provide invisible, unbreakable security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div key={i} className="group glass p-8 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all hover:-translate-y-2">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-cyan-500/10`}>
              {f.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-500 transition-colors">{f.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-light dark:glass rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 border border-white/10">
        <div className="lg:w-1/2 space-y-6">
          <h3 className="text-3xl font-bold">Comprehensive Protection</h3>
          <p className="text-slate-500 dark:text-slate-400">
            CyberGate isn't just a tool; it's a paradigm shift in how you handle digital assets. We leverage the latest in decentralized security to ensure no single point of failure.
          </p>
          <ul className="space-y-3">
            {['No data harvesting', 'Zero-knowledge proofs', 'Open-source transparency'].map((item, i) => (
              <li key={i} className="flex items-center space-x-3">
                <div className="text-cyan-500"><Icons.Shield /></div>
                <span className="font-semibold text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:w-1/3 w-full bg-slate-900 rounded-2xl p-6 font-mono text-xs text-cyan-400 overflow-hidden shadow-2xl">
          <div className="flex space-x-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p className="animate-pulse">$ initiating_secure_handshake...</p>
          <p className="text-slate-500 mt-1">Checking system integrity [OK]</p>
          <p className="text-slate-500">Verifying peer identity [OK]</p>
          <p className="text-white mt-1">SESSION KEY: 4f98...e1a2</p>
          <p className="text-green-400 mt-2">$ access granted. welcome to cybergate.</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
