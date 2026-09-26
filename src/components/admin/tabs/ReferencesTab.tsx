import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ReferenceItem } from '../../../types/portfolio';
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown, Check, X, UserCheck } from 'lucide-react';

export const ReferencesTab: React.FC = () => {
  const { data, addItem, updateItem, deleteItem, reorderItem } = usePortfolio();
  const [editingItem, setEditingItem] = useState<ReferenceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const sortedList = [...data.references].sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleStartCreate = () => {
    setEditingItem({
      id: `ref-${Date.now()}`,
      name: '',
      role: '',
      department: 'Department of Information Technology & Management (ITM)',
      institution: 'Daffodil International University',
      relationship: '',
      email: '',
      phone: '',
      order: sortedList.length + 1
    });
    setIsCreating(true);
  };

  const handleStartEdit = (item: ReferenceItem) => {
    setEditingItem({ ...item });
    setIsCreating(false);
  };

  const handleSave = () => {
    if (!editingItem || !editingItem.name) {
      alert('Please provide at least a Reference Name.');
      return;
    }

    if (isCreating) {
      addItem('references', editingItem);
    } else {
      updateItem('references', editingItem.id, editingItem);
    }

    setEditingItem(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Academic & Professional References</h3>
          <p className="text-xs text-slate-500">
            Manage your faculty recommendations, contact info, and reorder who appears first.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
        >
          <Plus size={14} /> Add Reference
        </button>
      </div>

      {/* Editing / Creating Box */}
      {editingItem && (
        <div className="p-5 rounded-2xl bg-indigo-50/50 border-2 border-indigo-200 shadow-md space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-indigo-100">
            <h4 className="text-sm font-bold text-indigo-900">
              {isCreating ? '👤 Add New Reference' : '✏️ Edit Reference'}
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name & Honorific *</label>
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                placeholder="e.g. Dr. Nusrat Jahan"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Academic Role / Title *</label>
              <input
                type="text"
                value={editingItem.role}
                onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                placeholder="e.g. Associate Professor and Head"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
              <input
                type="text"
                value={editingItem.department}
                onChange={(e) => setEditingItem({ ...editingItem, department: e.target.value })}
                placeholder="e.g. Department of ITM"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Institution</label>
              <input
                type="text"
                value={editingItem.institution}
                onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                placeholder="e.g. Daffodil International University"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={editingItem.email}
                onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
                placeholder="headitm@daffodilvarsity.edu.bd"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone</label>
              <input
                type="text"
                value={editingItem.phone}
                onChange={(e) => setEditingItem({ ...editingItem, phone: e.target.value })}
                placeholder="(+880) 1847334996"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Relationship / Endorsement Note</label>
              <textarea
                rows={3}
                value={editingItem.relationship}
                onChange={(e) => setEditingItem({ ...editingItem, relationship: e.target.value })}
                placeholder="Former instructor and current departmental head who has known me since 2022..."
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
              <Check size={14} /> Save Reference
            </button>
          </div>
        </div>
      )}

      {/* References List with Reorder Buttons */}
      <div className="space-y-3">
        {sortedList.map((item, index) => (
          <div
            key={item.id}
            className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm font-bold text-slate-900">{item.name}</span>
                <span className="text-xs text-indigo-600 font-semibold">• {item.role}</span>
              </div>
              <div className="text-xs text-slate-500">
                {item.institution} • {item.email} • {item.phone}
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0 self-end sm:self-center">
              <button
                onClick={() => reorderItem('references', item.id, 'up')}
                disabled={index === 0}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Move Up"
              >
                <ArrowUp size={14} />
              </button>

              <button
                onClick={() => reorderItem('references', item.id, 'down')}
                disabled={index === sortedList.length - 1}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Move Down"
              >
                <ArrowDown size={14} />
              </button>

              <button
                onClick={() => handleStartEdit(item)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Edit Reference"
              >
                <Edit3 size={14} />
              </button>

              <button
                onClick={() => {
                  if (window.confirm(`Delete reference ${item.name}?`)) {
                    deleteItem('references', item.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 transition-colors"
                title="Delete Reference"
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
