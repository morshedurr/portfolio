import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { WorkExperienceItem } from '../../../types/portfolio';
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown, Check, X, Building, Calendar, MapPin } from 'lucide-react';

export const ExperienceTab: React.FC = () => {
  const { data, addItem, updateItem, deleteItem, reorderItem } = usePortfolio();
  const [editingItem, setEditingItem] = useState<WorkExperienceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newBullet, setNewBullet] = useState('');

  const sortedList = [...data.workExperience].sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleStartCreate = () => {
    setEditingItem({
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      location: '',
      period: '',
      isCurrent: false,
      badge: '',
      highlights: [],
      order: sortedList.length + 1
    });
    setIsCreating(true);
    setNewBullet('');
  };

  const handleStartEdit = (item: WorkExperienceItem) => {
    setEditingItem({ ...item, highlights: [...item.highlights] });
    setIsCreating(false);
    setNewBullet('');
  };

  const handleSave = () => {
    if (!editingItem || !editingItem.role || !editingItem.company) {
      alert('Please provide at least a Role and Company name.');
      return;
    }

    if (isCreating) {
      addItem('workExperience', editingItem);
    } else {
      updateItem('workExperience', editingItem.id, editingItem);
    }

    setEditingItem(null);
    setIsCreating(false);
  };

  const addHighlightBullet = () => {
    if (!newBullet.trim() || !editingItem) return;
    setEditingItem({
      ...editingItem,
      highlights: [...editingItem.highlights, newBullet.trim()]
    });
    setNewBullet('');
  };

  const removeHighlightBullet = (index: number) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      highlights: editingItem.highlights.filter((_, idx) => idx !== index)
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Work Experience & Positions</h3>
          <p className="text-xs text-slate-500">
            Rearrange order with the arrows, edit roles, or add new career opportunities.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
        >
          <Plus size={14} /> Add New Experience
        </button>
      </div>

      {/* Editing / Creating Modal or In-line Box */}
      {editingItem && (
        <div className="p-5 rounded-2xl bg-indigo-50/50 border-2 border-indigo-200 shadow-md space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-indigo-100">
            <h4 className="text-sm font-bold text-indigo-900">
              {isCreating ? '➕ Add New Work Experience' : '✏️ Edit Work Experience'}
            </h4>
            <button
              onClick={() => setEditingItem(null)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Job Title / Role *</label>
              <input
                type="text"
                value={editingItem.role}
                onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                placeholder="e.g. Senior Lecturer / IT Director"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization *</label>
              <input
                type="text"
                value={editingItem.company}
                onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                placeholder="e.g. Daffodil International University"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={editingItem.location}
                onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                placeholder="e.g. Dhaka, Bangladesh"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Time Period</label>
              <input
                type="text"
                value={editingItem.period}
                onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                placeholder="e.g. 14/05/2026 – Present"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category Badge</label>
              <input
                type="text"
                value={editingItem.badge || ''}
                onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                placeholder="e.g. Faculty / International Remote"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={editingItem.isCurrent || false}
                  onChange={(e) => setEditingItem({ ...editingItem, isCurrent: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Currently Working Here (Active Role)</span>
              </label>
            </div>
          </div>

          {/* Bullet points manager */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Role Responsibilities & Key Achievements
            </label>
            <div className="space-y-1.5 mb-2">
              {editingItem.highlights.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-2 p-2 bg-white rounded-lg border border-slate-200 text-xs text-slate-700"
                >
                  <span className="leading-snug">• {bullet}</span>
                  <button
                    type="button"
                    onClick={() => removeHighlightBullet(idx)}
                    className="text-red-500 hover:text-red-700 flex-shrink-0"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newBullet}
                onChange={(e) => setNewBullet(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlightBullet())}
                placeholder="Type responsibility or outcome and press Add..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={addHighlightBullet}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                Add Bullet
              </button>
            </div>
          </div>

          {/* Save / Cancel buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-indigo-100">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-sm"
            >
              <Check size={14} /> Save Experience
            </button>
          </div>
        </div>
      )}

      {/* Experience list with Reorder Buttons */}
      <div className="space-y-3">
        {sortedList.map((item, index) => (
          <div
            key={item.id}
            className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-all"
          >
            {/* Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm font-bold text-slate-900">{item.role}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {item.badge}
                  </span>
                )}
                {item.isCurrent && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Current
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{item.company}</span>
                <span>•</span>
                <span>{item.period}</span>
                <span>•</span>
                <span>{item.location}</span>
                <span>•</span>
                <span>{item.highlights.length} bullet points</span>
              </div>
            </div>

            {/* Actions: Reorder + Edit + Delete */}
            <div className="flex items-center gap-1.5 flex-shrink-0 self-end sm:self-center">
              {/* Up */}
              <button
                onClick={() => reorderItem('workExperience', item.id, 'up')}
                disabled={index === 0}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Move Up"
              >
                <ArrowUp size={14} />
              </button>

              {/* Down */}
              <button
                onClick={() => reorderItem('workExperience', item.id, 'down')}
                disabled={index === sortedList.length - 1}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Move Down"
              >
                <ArrowDown size={14} />
              </button>

              {/* Edit */}
              <button
                onClick={() => handleStartEdit(item)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Edit Role"
              >
                <Edit3 size={14} />
              </button>

              {/* Delete */}
              <button
                onClick={() => {
                  if (window.confirm(`Delete ${item.role} at ${item.company}?`)) {
                    deleteItem('workExperience', item.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 transition-colors"
                title="Delete Role"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
