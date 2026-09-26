import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { AwardItem } from '../../../types/portfolio';
import { fileToDataUrl } from '../../../utils/imageUtils';
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown, Check, X, Trophy, Upload, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

export const AwardsTab: React.FC = () => {
  const { data, addItem, updateItem, deleteItem, reorderItem, showToast } = usePortfolio();
  const [editingItem, setEditingItem] = useState<AwardItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const sortedList = [...data.awards].sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleStartCreate = () => {
    setEditingItem({
      id: `award-${Date.now()}`,
      title: '',
      organization: '',
      date: new Date().getFullYear().toString(),
      category: 'Excellence Award',
      description: '',
      imageUrl: '',
      credentialUrl: '',
      order: sortedList.length + 1
    });
    setIsCreating(true);
  };

  const handleStartEdit = (item: AwardItem) => {
    setEditingItem({ ...item });
    setIsCreating(false);
  };

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    try {
      setIsUploading(true);
      const dataUrl = await fileToDataUrl(file, 1200, 0.85);
      setEditingItem({ ...editingItem, imageUrl: dataUrl });
      showToast('Achievement image uploaded successfully!');
    } catch (err) {
      console.error(err);
      showToast('Failed to upload image file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    if (!editingItem || !editingItem.title || !editingItem.organization) {
      alert('Please provide at least an Award Title and Organization.');
      return;
    }

    if (isCreating) {
      addItem('awards', editingItem);
      showToast(`Achievement "${editingItem.title}" created!`);
    } else {
      updateItem('awards', editingItem.id, editingItem);
      showToast(`Achievement "${editingItem.title}" updated!`);
    }

    setEditingItem(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Honours, Awards & Achievements</h3>
          <p className="text-xs text-slate-500">
            Add honours, upload certificate or event photos for each achievement, and reorder items.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-3.5 py-2 bg-[#0f1e36] hover:bg-[#1e3a8a] text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
        >
          <Plus size={14} /> Add New Achievement
        </button>
      </div>

      {/* Editing / Creating Box */}
      {editingItem && (
        <div className="p-5 rounded-2xl bg-[#faf9f6] border-2 border-amber-200 shadow-md space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-amber-100">
            <h4 className="text-sm font-bold text-amber-900 flex items-center gap-1.5">
              <Trophy size={16} className="text-amber-600" />
              <span>{isCreating ? 'Add New Achievement' : 'Edit Achievement'}</span>
            </h4>
            <button
              onClick={() => setEditingItem(null)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Award / Honour Title *</label>
              <input
                type="text"
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                placeholder="e.g. Award for Innovative Teaching Practices & Creative Initiatives"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Awarding Organization *</label>
              <input
                type="text"
                value={editingItem.organization}
                onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                placeholder="e.g. Daffodil International University / European Commission"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Date / Year</label>
              <input
                type="text"
                value={editingItem.date}
                onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                placeholder="e.g. Summer 2026 or 05/08/2025"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category Badge</label>
              <input
                type="text"
                value={editingItem.category}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                placeholder="e.g. Teaching Excellence / Case Championship / International Grant"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Verification / News / Credential Link (Optional)</label>
              <input
                type="url"
                value={editingItem.credentialUrl || ''}
                onChange={(e) => setEditingItem({ ...editingItem, credentialUrl: e.target.value })}
                placeholder="e.g. https://www.thedailystar.net/... or certificate link"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Achievement Image Upload Section */}
            <div className="sm:col-span-2 p-3.5 bg-white rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <ImageIcon size={14} className="text-amber-600" />
                <span>Achievement Certificate or Event Photo</span>
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Image Preview */}
                <div className="w-28 h-20 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0 relative group">
                  {editingItem.imageUrl ? (
                    <>
                      <img
                        src={editingItem.imageUrl}
                        alt="Achievement Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setEditingItem({ ...editingItem, imageUrl: '' })}
                        className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-bold transition-opacity"
                        title="Remove Image"
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <div className="text-center p-2 text-slate-400">
                      <ImageIcon size={22} className="mx-auto mb-1 opacity-50" />
                      <span className="text-[10px] block">No Photo</span>
                    </div>
                  )}
                </div>

                {/* Upload or URL Controls */}
                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-colors">
                      <Upload size={13} />
                      <span>{isUploading ? 'Uploading...' : 'Upload Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFile}
                        className="hidden"
                        disabled={isUploading}
                      />
                    </label>
                    <span className="text-[11px] text-slate-400">or paste image URL:</span>
                  </div>

                  <input
                    type="url"
                    value={editingItem.imageUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                    placeholder="https://... image URL (certificates, stage photos, medals)"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Description & Significance</label>
              <textarea
                rows={3}
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                placeholder="Describe the recognition, criteria, project or competition evaluated, and faculty/industry impact..."
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-amber-100">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 bg-[#0f1e36] hover:bg-[#1e3a8a] text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-sm"
            >
              <Check size={14} /> Save Achievement
            </button>
          </div>
        </div>
      )}

      {/* Awards list with Reorder Buttons and Thumbnail previews */}
      <div className="space-y-3">
        {sortedList.map((item, index) => (
          <div
            key={item.id}
            className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-all"
          >
            <div className="flex items-start gap-3.5">
              {/* Photo Thumbnail if present */}
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-16 h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-12 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 flex-shrink-0">
                  <Trophy size={18} />
                </div>
              )}

              {/* Info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{item.title}</span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                    {item.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">{item.organization}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                  {item.imageUrl && (
                    <span className="text-emerald-700 text-[11px] font-semibold flex items-center gap-1">
                      <ImageIcon size={11} /> Has Image
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions: Reorder + Edit + Delete */}
            <div className="flex items-center gap-1.5 flex-shrink-0 self-end sm:self-center">
              <button
                onClick={() => reorderItem('awards', item.id, 'up')}
                disabled={index === 0}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Move Up"
              >
                <ArrowUp size={14} />
              </button>

              <button
                onClick={() => reorderItem('awards', item.id, 'down')}
                disabled={index === sortedList.length - 1}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Move Down"
              >
                <ArrowDown size={14} />
              </button>

              <button
                onClick={() => handleStartEdit(item)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Edit Award & Image"
              >
                <Edit3 size={14} />
              </button>

              <button
                onClick={() => {
                  if (window.confirm(`Delete "${item.title}"?`)) {
                    deleteItem('awards', item.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 transition-colors"
                title="Delete Award"
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
