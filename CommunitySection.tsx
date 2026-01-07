
import React, { useState, useEffect } from 'react';
import { User, Comment } from '../types';
import { Icons } from '../constants';

interface CommunitySectionProps {
  currentUser: User | null;
  onOpenAuth: () => void;
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ currentUser, onOpenAuth }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [lastPostTime, setLastPostTime] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem('comments');
    if (saved) {
      setComments(JSON.parse(saved));
    } else {
      // Seed initial data
      const initial: Comment[] = [
        { id: '1', username: 'Admin', content: 'Welcome to the CyberGate community! Discuss security trends here.', timestamp: Date.now() - 10000000 },
        { id: '2', username: 'SecExplorer', content: 'Does anyone have tips for setting up a WAF for small sites?', timestamp: Date.now() - 5000000 }
      ];
      setComments(initial);
      localStorage.setItem('comments', JSON.stringify(initial));
    }
  }, []);

  const sanitizeInput = (str: string) => {
    return str.replace(/<[^>]*>?/gm, '').trim();
  };

  const handlePostComment = () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    const sanitized = sanitizeInput(newComment);
    if (!sanitized) {
      setError('Comment cannot be empty.');
      return;
    }

    // Basic rate limiting (30 seconds between posts)
    const now = Date.now();
    if (now - lastPostTime < 30000) {
      setError(`Please wait ${Math.ceil((30000 - (now - lastPostTime)) / 1000)}s before posting again.`);
      return;
    }

    const comment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      username: currentUser.username,
      content: sanitized,
      timestamp: now
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    setNewComment('');
    setError(null);
    setLastPostTime(now);
  };

  return (
    <div className="py-12 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold">Community <span className="text-indigo-500">Pulse</span></h2>
        <p className="text-slate-500">Connect with other security researchers and enthusiasts.</p>
      </div>

      <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-500">
            <Icons.User />
          </div>
          <div className="flex-grow">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={currentUser ? "Share your security insights..." : "Sign in to join the conversation"}
              disabled={!currentUser}
              className="w-full bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all resize-none h-32"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm font-medium animate-shake">{error}</p>}

        <div className="flex justify-end">
          {currentUser ? (
            <button
              onClick={handlePostComment}
              className="px-8 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all shadow-lg shadow-cyan-500/10"
            >
              Post Comment
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-8 py-3 rounded-xl bg-slate-800 text-slate-400 font-bold transition-all"
            >
              Sign In to Post
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex space-x-4">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 shrink-0">
              <Icons.User />
            </div>
            <div className="flex-grow space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-500">{comment.username}</span>
                <span className="text-xs text-slate-500 font-mono">
                  {new Date(comment.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed break-words">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunitySection;
