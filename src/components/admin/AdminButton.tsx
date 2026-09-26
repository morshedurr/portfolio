import React from 'react';
import { Settings, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminButton: React.FC = () => {
  const { setIsAdminOpen } = usePortfolio();

  return (
    <div className="fixed bottom-6 right-6 z-40 print:hidden">
      <button
        onClick={() => setIsAdminOpen(true)}
        className="group flex items-center gap-2 px-3.5 py-2.5 bg-[#0f1e36] hover:bg-[#1e3a8a] text-white font-semibold text-xs rounded-full shadow-lg border border-slate-700 transition-all duration-150 hover:shadow-xl"
        title="Open Faculty Profile Admin Panel to edit sections and data"
      >
        <Settings size={14} className="group-hover:rotate-90 transition-transform duration-300 text-amber-300" />
        <span className="hidden sm:inline">Faculty Editor</span>
      </button>
    </div>
  );
};
