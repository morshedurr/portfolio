import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { LeadershipItem } from '../../../types/portfolio';
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown, Check, X, Users } from 'lucide-react';

export const LeadershipTab: React.FC = () => {
  const { data, addItem, updateItem, deleteItem, reorderItem } = usePortfolio();
  const [editingItem, setEditingItem] = useState<LeadershipItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const sortedList = [...data.leadership].sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleStartCreate = () => {
    setEditingItem({
      id: `lead-${Date.now()}`,
      role: '',
      organization: '',
      period: '',
      badge: 'Leadership',
      description: '',
      order: sortedList.length + 1
    });
    setIsCreating(true);
  };

  const handleStartEdit = (item: LeadershipItem) => {
    setEditingItem({ ...item });
    setIsCreating(false);
  };

  const handleSave = () => {
    if (!editingItem || !editingItem.role || !editingItem.organization) {
      alert('Please provide Role and Organization.');
      return;
    }

    if (isCreating) {
      addItem('leadership', editingItem);
    } else {
      updateItem('leadership', editingItem.id, editingItem);
    }

    setEditingItem(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Leadership, Summits & Extracurricular</h3>
          <p className="text-xs text-slate-500">
            Manage your committee roles, summit organization, diplomacy clubs, and non-profit initiatives.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
        >
          <Plus size={14} /> Add Leadership Role
        </button>
      </div>

      {/* Editing / Creating Box */}
      {editingItem && (
        <div className="p-5 rounded-2xl bg-indigo-50/50 border-2 border-indigo-200 shadow-md space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-indigo-100">
            <h4 className="text-sm font-bold text-indigo-900">
              {isCreating ? '🤝 Add New Leadership Activity' : '✏️ Edit Leadership Activity'}
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Role / Position *</label>
              <input
                type="text"
                value={editingItem.role}
                onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                placeholder="e.g. Head, Registration & Communication"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Organization / Event *</label>
              <input
                type="text"
                value={editingItem.organization}
                onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                placeholder="e.g. ITM Summit / DIUMUNA / Hult Prize"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Period / Duration</label>
              <input
                type="text"
                value={editingItem.period}
                onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                placeholder="e.g. 22/05/2023 – 30/07/2025"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag</label>
              <input
                type="text"
                value={editingItem.badge || ''}
                onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                placeholder="e.g. Summit Leadership / Non-Profit"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Description & Impact</label>
              <textarea
                rows={3}
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                placeholder="Describe team size led, attendees coordinated, and outcome..."
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              ></textarea>
            </div>
          </div>

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
              <Check size={14} /> Save Leadership Role
            </button>
          </div>
        </div>
      )}

      {/* List with Reorder Buttons */}
      <div className="space-y-3">
        {sortedList.map((item, index) => (
          <div
            key={item.id}
            className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm font-bold text-slate-900">{item.role}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{item.organization}</span>
                <span>•</span>
                <span>{item.period}</span>
              </div>
            </div>

            {/* Actions: Reorder + Edit + Delete */}
            <div className="flex items-center gap-1.5 flex-shrink-0 self-end sm:self-center">
              <button
                onClick={() => reorderItem('leadership', item.id, 'up')}
                disabled={index === 0}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Move Up"
              >
                <ArrowUp size={14} />
              </button>

              <button
                onClick={() => reorderItem('leadership', item.id, 'down')}
                disabled={index === sortedList.length - 1}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Move Down"
              >
                <ArrowDown size={14} />
              </button>

              <button
                onClick={() => handleStartEdit(item)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Edit Role"
              >
                <Edit3 size={14} />
              </button>

              <button
                onClick={() => {
                  if (window.confirm(`Delete "${item.role}"?`)) {
                    deleteItem('leadership', item.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 transition-colors"
                title="Delete"
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
