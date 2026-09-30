import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ResearchItem } from '../../../types/portfolio';
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown, Check, X, Search, FileCheck, BookOpen } from 'lucide-react';

export const ResearchTab: React.FC = () => {
  const { data, addItem, updateItem, deleteItem, reorderItem } = usePortfolio();
  const [editingItem, setEditingItem] = useState<ResearchItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const researchList = [...(data.research || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleStartCreate = () => {
    setEditingItem({
      id: `res-${Date.now()}`,
      title: '',
      institution: 'Daffodil International University',
      period: '2023 – Present',
      description: '',
      order: researchList.length + 1
    });
    setIsCreating(true);
  };

  const handleStartEdit = (item: ResearchItem) => {
    setEditingItem({ ...item });
    setIsCreating(false);
  };

  const handleSave = () => {
    if (!editingItem || !editingItem.title.trim()) {
      alert('Please provide at least a Research Title or Appointment Name.');
      return;
    }

    if (isCreating) {
      addItem('research', editingItem);
    } else {
      updateItem('research', editingItem.id, editingItem);
    }

    setEditingItem(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Research Appointments & Inquiries</h3>
          <p className="text-xs text-slate-500">
            Manage academic research appointments, empirical investigations, and scholarly inquiries.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
        >
          <Plus size={14} />
          <span>Add Research Item</span>
        </button>
      </div>

      {/* Editing Form */}
      {editingItem && (
        <div className="p-5 bg-slate-50 border-2 border-indigo-200 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h4 className="text-sm font-bold text-slate-800">
              {isCreating ? 'Add Research Appointment' : `Edit: ${editingItem.title}`}
            </h4>
            <button
              onClick={() => {
                setEditingItem(null);
                setIsCreating(false);
              }}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Research Project / Appointment Title *</label>
            <input
              type="text"
              value={editingItem.title}
              onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
              placeholder="e.g. Undergraduate Research Programme (URP) or Empirical MIS Adoption"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Institution / Research Center</label>
              <input
                type="text"
                value={editingItem.institution}
                onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                placeholder="e.g. DIU Belt Road and Research Center"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Period / Duration</label>
              <input
                type="text"
                value={editingItem.period}
                onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                placeholder="e.g. 01/07/2023 – 31/12/2023"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Methodological Scope & Description</label>
            <textarea
              rows={4}
              value={editingItem.description}
              onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
              placeholder="Detail your research design, empirical literature review, data gathering methodologies, statistical tools (PLS-SEM), and findings..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              onClick={() => {
                setEditingItem(null);
                setIsCreating(false);
              }}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Check size={14} />
              <span>Save Research Item</span>
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {researchList.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
          >
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-700">{item.institution}</span>
                <span className="text-[11px] text-slate-400">• {item.period}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0 self-end sm:self-center">
              <button
                onClick={() => reorderItem('research', item.id, 'up')}
                disabled={idx === 0}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move Up"
              >
                <ArrowUp size={13} />
              </button>
              <button
                onClick={() => reorderItem('research', item.id, 'down')}
                disabled={idx === researchList.length - 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move Down"
              >
                <ArrowDown size={13} />
              </button>
              <button
                onClick={() => handleStartEdit(item)}
                className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"
                title="Edit Item"
              >
                <Edit3 size={13} />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete research appointment "${item.title}"?`)) {
                    deleteItem('research', item.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                title="Delete Item"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}

        {researchList.length === 0 && (
          <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
            <Search size={32} className="mx-auto text-slate-300 mb-2" />
            <p className="text-xs text-slate-500 font-medium">No research items added yet.</p>
            <button
              onClick={handleStartCreate}
              className="mt-3 text-xs font-bold text-indigo-600 hover:underline"
            >
              Add your first research appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
