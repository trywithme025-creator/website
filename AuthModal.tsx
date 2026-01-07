
import React, { useState } from 'react';
import { User } from '../types';
import { Icons } from '../constants';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (activeTab === 'login') {
      if (username === 'admin' && password === 'admin') {
        onLogin({ username: 'Admin', email: 'admin@cybergate.io', avatar: '' });
      } else if (username && password) {
        // Simple demo login
        onLogin({ username, email: `${username}@example.com`, avatar: '' });
      } else {
        setError('Please enter both username and password.');
      }
    } else {
      if (username && email && password) {
        onLogin({ username, email, avatar: '' });
      } else {
        setError('All fields are required for registration.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md glass rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors">
          <Icons.Close />
        </button>

        <div className="p-8">
          <div className="flex flex-col items-center mb-8 space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Icons.Shield />
            </div>
            <h2 className="text-2xl font-extrabold text-center">Secure Gate Access</h2>
          </div>

          <div className="flex p-1 bg-slate-900 rounded-xl mb-8">
            <button 
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'login' ? 'bg-slate-800 text-cyan-400 shadow-lg' : 'text-slate-500'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'register' ? 'bg-slate-800 text-cyan-400 shadow-lg' : 'text-slate-500'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Username</label>
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                placeholder="Enter username"
              />
            </div>

            {activeTab === 'register' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="name@example.com"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl font-bold shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {activeTab === 'login' ? 'Authorize Session' : 'Create Credentials'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            By entering, you agree to our <span className="text-cyan-500 cursor-pointer">Security Protocol</span> and <span className="text-cyan-500 cursor-pointer">Terms of Conduct</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
