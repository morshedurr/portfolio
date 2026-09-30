import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, X, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const LoginModal: React.FC = () => {
  const { login } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      setIsOpen(false);
      setPassword('');
      setError(false);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 px-4 py-3 bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-semibold rounded-2xl shadow-2xl backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-slate-900/40 print:hidden"
        title="Admin Login"
      >
        <Lock size={14} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="hidden sm:inline">Admin</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm print:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className={`bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 ${shake ? 'animate-shake' : ''}`}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative px-8 pt-8 pb-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <ShieldCheck size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Admin Access</h2>
                    <p className="text-xs text-slate-500">Enter your password to edit content</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError(false);
                      }}
                      placeholder="Enter admin password"
                      autoFocus
                      className={`w-full px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all duration-200 outline-none pr-12 ${
                        error
                          ? 'border-red-300 bg-red-50/50 text-red-900 placeholder-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                          : 'border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 focus:bg-white'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 font-medium"
                    >
                      Incorrect password. Please try again.
                    </motion.p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm font-bold rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 hover:from-slate-800 hover:to-slate-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Lock size={14} />
                  <span>Sign In</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
