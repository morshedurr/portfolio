import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Shield, Key, Check, Eye, EyeOff, RotateCcw } from 'lucide-react';

export const SecurityTab: React.FC = () => {
  const { changePassword, resetPassword } = usePortfolio();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setStatusMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    const success = changePassword(newPassword);
    if (success) {
      setStatusMessage({ type: 'success', text: 'Admin master password changed successfully!' });
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset password back to the default "morshed2026"?')) {
      resetPassword();
      setStatusMessage({ type: 'success', text: 'Password reset to default (morshed2026).' });
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      {/* Top Header */}
      <div className="pb-4 border-b border-slate-200">
        <h3 className="text-lg font-bold text-slate-900">Admin Security & Access Key</h3>
        <p className="text-xs text-slate-500">
          Manage your personal master password required to access this faculty administration panel.
        </p>
      </div>

      {statusMessage && (
        <div
          className={`p-3 rounded-xl text-xs font-semibold ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Key size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Change Admin Password</h4>
            <p className="text-[11px] text-slate-500">Only you will have access to edit your portfolio</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">New Password (min 6 characters)</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setStatusMessage(null);
              }}
              placeholder="Enter new master password"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setStatusMessage(null);
            }}
            placeholder="Confirm new password"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset to default</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
          >
            <Check size={14} />
            <span>Update Password</span>
          </button>
        </div>
      </form>
    </div>
  );
};
