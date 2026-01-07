
import React, { useState } from 'react';
import { ContactFormData } from '../types';
import { Icons } from '../constants';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="py-12 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl lg:text-5xl font-extrabold">Get In <span className="text-cyan-500">Touch</span></h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Have questions about our security infrastructure or want to report a vulnerability? Our team is available 24/7.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-6 p-6 glass rounded-2xl border border-white/5">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500">
              <Icons.Globe />
            </div>
            <div>
              <p className="text-sm text-slate-500">Global HQ</p>
              <p className="font-bold">San Francisco, CA</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 p-6 glass rounded-2xl border border-white/5">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
              <Icons.Shield />
            </div>
            <div>
              <p className="text-sm text-slate-500">Emergency Support</p>
              <p className="font-bold">support@cybergate.io</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass p-8 lg:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
        {isSuccess ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-2xl font-bold">Encrypted Message Sent</h3>
            <p className="text-slate-400">We've received your inquiry and our agents will respond shortly.</p>
            <button onClick={() => setIsSuccess(false)} className="text-cyan-500 font-bold hover:underline">Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full bg-slate-900/50 border ${errors.name ? 'border-red-500' : 'border-slate-800'} rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition-all`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full bg-slate-900/50 border ${errors.email ? 'border-red-500' : 'border-slate-800'} rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition-all`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-400">Subject</label>
              <input 
                type="text" 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                placeholder="Vulnerability Report"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-400">Message</label>
              <textarea 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className={`w-full bg-slate-900/50 border ${errors.message ? 'border-red-500' : 'border-slate-800'} rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition-all h-32 resize-none`}
                placeholder="How can we help?"
              />
              {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Initialize Contact</span>
                  <Icons.Lock />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactSection;
