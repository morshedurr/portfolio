import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminLoginView: React.FC = () => {
  const { login, goToPublic } = usePortfolio();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError(true);
      return;
    }

    const success = login(password);
    if (!success) {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1329] text-white flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Return to Public Website */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between z-10 py-2">
        <button
          onClick={goToPublic}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-slate-800"
        >
          <ArrowLeft size={14} />
          <span>Return to Public Portfolio</span>
        </button>

        <div className="text-[11px] text-slate-500 font-medium hidden sm:block">
          Daffodil International University • Dept. of ITM
        </div>
      </div>

      {/* Center Login Card */}
      <div className="w-full max-w-md mx-auto my-auto z-10 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={`bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-black/50 ${
            shake ? 'animate-shake' : ''
          }`}
        >
          {/* Badge & Title */}
          <div className="text-center space-y-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 mx-auto flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <ShieldCheck size={28} className="text-white" />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Faculty Administration
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Restricted portal for Morshedur Rahman Khan
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Administrator Master Key
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Enter administrator password"
                  autoFocus
                  className={`w-full px-4 py-3.5 rounded-xl border text-sm text-white placeholder-slate-500 bg-slate-950/60 focus:outline-none transition-all pr-12 ${
                    error
                      ? 'border-red-500/80 focus:border-red-400 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-700/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && (
                <p className="mt-2 text-xs text-red-400 font-medium">
                  Invalid master key. Please verify your password.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-indigo-600/40"
            >
              <KeyRound size={15} />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          {/* Master Key Hint / Security Note */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Default password: <code className="text-indigo-400 font-mono font-semibold">morshed2026</code>
            </p>
            <p className="text-[10px] text-slate-600 mt-1">
              You can change this password at any time inside the Security tab.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-5xl mx-auto w-full text-center text-[11px] text-slate-600 z-10 py-2">
        Protected Faculty Administration Console • All modifications persist to browser local storage.
      </div>
    </div>
  );
};
