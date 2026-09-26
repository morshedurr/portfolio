import React, { useRef } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { SectionId } from '../../../types/portfolio';
import { ArrowUp, ArrowDown, Eye, EyeOff, Download, Upload, RotateCcw, ShieldCheck } from 'lucide-react';

const SECTION_LABELS: Record<SectionId, string> = {
  hero: '1. Hero & Header',
  about: '2. About Me & Academic Profile',
  experience: '3. Work Experience',
  awards: '4. Awards & Honours',
  education: '5. Education & Certifications',
  projects: '6. Projects & Solutions',
  leadership: '7. Leadership & Events',
  skills: '8. Skills & Competencies',
  references: '9. Recommendations & References',
  contact: '10. Contact & Message Form'
};

export const LayoutTab: React.FC = () => {
  const {
    data,
    reorderSection,
    toggleSectionVisibility,
    exportDataToJson,
    importDataFromJson,
    resetToDefaults,
    showToast
  } = usePortfolio();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importDataFromJson(content);
        if (success && fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="pb-4 border-b border-slate-200">
        <h3 className="text-lg font-bold text-slate-900">Page Layout & Section Reordering</h3>
        <p className="text-xs text-slate-500">
          Control the exact vertical order of sections on your portfolio page and toggle section visibility.
        </p>
      </div>

      {/* Sections Reordering & Visibility List */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Section Sequence & Display Status
        </h4>

        {data.sectionsOrder.map((sectionId, index) => {
          const isVisible = data.sectionVisibility[sectionId] !== false;
          return (
            <div
              key={sectionId}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                isVisible ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-100 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center border border-indigo-100">
                  {index + 1}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  {SECTION_LABELS[sectionId] || sectionId}
                </span>
                {!isVisible && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-600">
                    Hidden
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                {/* Visibility Toggle */}
                <button
                  onClick={() => toggleSectionVisibility(sectionId)}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                    isVisible
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                  title={isVisible ? 'Hide Section' : 'Show Section'}
                >
                  {isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>

                {/* Move Up */}
                <button
                  onClick={() => reorderSection(sectionId, 'up')}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Move Section Up"
                >
                  <ArrowUp size={14} />
                </button>

                {/* Move Down */}
                <button
                  onClick={() => reorderSection(sectionId, 'down')}
                  disabled={index === data.sectionsOrder.length - 1}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Move Section Down"
                >
                  <ArrowDown size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Backup, Export & Import */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Data Backup & Portability
        </h4>
        <p className="text-xs text-slate-500">
          Your changes are automatically saved to your browser. You can also export a complete JSON file backup or import it onto another computer.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          {/* Export JSON */}
          <button
            onClick={exportDataToJson}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <Download size={14} />
            <span>Export Backup (.JSON)</span>
          </button>

          {/* Import JSON */}
          <label className="cursor-pointer px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all">
            <Upload size={14} />
            <span>Import Data (.JSON)</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Reset to Defaults */}
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ml-auto"
          >
            <RotateCcw size={14} />
            <span>Restore Resume Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
