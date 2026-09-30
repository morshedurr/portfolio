import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Settings, LogOut, ShieldCheck, ExternalLink } from 'lucide-react';

export const AdminLiveBar: React.FC = () => {
  const { isAdmin, goToAdmin, logout } = usePortfolio();

  if (!isAdmin) return null;

  return (
    <div className="bg-[#0f172a] text-white text-xs border-b border-indigo-500/40 px-4 py-2 sticky top-0 z-50 shadow-md flex items-center justify-between font-sans print:hidden">
      <div className="flex items-center gap-2.5">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-bold text-slate-100 flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Faculty Admin Mode</span>
        </span>
        <span className="text-slate-400 hidden md:inline text-[11px]">
          • Previewing live portfolio with edit capability
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={goToAdmin}
          className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs shadow-xs transition-colors"
        >
          <Settings size={12} />
          <span>Open Admin Panel</span>
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs transition-colors border border-slate-700"
          title="Log out of admin session"
        >
          <LogOut size={12} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};
