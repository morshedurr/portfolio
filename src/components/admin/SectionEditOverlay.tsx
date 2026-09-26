import React from 'react';
import { Edit3 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface SectionEditOverlayProps {
  sectionTab: string;
  label?: string;
}

export const SectionEditOverlay: React.FC<SectionEditOverlayProps> = ({ sectionTab, label = 'Edit Section' }) => {
  const { isAdmin, openAdminToTab } = usePortfolio();

  if (!isAdmin) return null;

  return (
    <div className="absolute top-4 right-4 z-20 print:hidden">
      <button
        onClick={() => openAdminToTab(sectionTab)}
        className="flex items-center space-x-1.5 px-3 py-1 bg-slate-900/85 hover:bg-slate-900 text-slate-200 hover:text-white text-[11px] font-semibold rounded-md border border-slate-700/80 shadow-xs backdrop-blur-sm transition-colors"
        title={`Edit ${label} in Admin Panel`}
      >
        <Edit3 size={11} className="text-amber-400" />
        <span>{label}</span>
      </button>
    </div>
  );
};
