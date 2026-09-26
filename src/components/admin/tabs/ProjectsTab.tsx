import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ProjectItem } from '../../../types/portfolio';
import { fileToDataUrl } from '../../../utils/imageUtils';
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown, Check, X, Upload, ExternalLink, Code } from 'lucide-react';

export const ProjectsTab: React.FC = () => {
  const { data, addItem, updateItem, deleteItem, reorderItem, showToast } = usePortfolio();
  const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const sortedList = [...data.projects].sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleStartCreate = () => {
    setEditingItem({
      id: `proj-${Date.now()}`,
      title: '',
      role: 'Project Initiator & Developer',
      description: '',
      demoUrl: '',
      githubUrl: '',
      imageUrl: '',
      tags: ['React', 'Web App'],
      order: sortedList.length + 1
    });
    setIsCreating(true);
    setTagInput('');
  };

  const handleStartEdit = (item: ProjectItem) => {
    setEditingItem({ ...item, tags: [...item.tags] });
    setIsCreating(false);
    setTagInput('');
  };

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    try {
      setIsUploading(true);
      const dataUrl = await fileToDataUrl(file, 1000, 0.85);
      setEditingItem({ ...editingItem, imageUrl: dataUrl });
      showToast('Project image uploaded!');
    } catch (err) {
      console.error(err);
      showToast('Failed to upload image.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    if (!editingItem || !editingItem.title) {
      alert('Project Title is required.');
      return;
    }

    if (isCreating) {
      addItem('projects', editingItem);
    } else {
      updateItem('projects', editingItem.id, editingItem);
    }

    setEditingItem(null);
    setIsCreating(false);
  };

  const addTag = () => {
    if (!tagInput.trim() || !editingItem) return;
    if (!editingItem.tags.includes(tagInput.trim())) {
      setEditingItem({
        ...editingItem,
        tags: [...editingItem.tags, tagInput.trim()]
      });
    }
    setTagInput('');
  };

  const removeTag = (tagToRemove: string) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      tags: editingItem.tags.filter((t) => t !== tagToRemove)
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Projects & Web Applications</h3>
          <p className="text-xs text-slate-500">
            Showcase technical applications, upload screenshots, provide demo links, and rearrange order.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
        >
          <Plus size={14} /> Add New Project
        </button>
      </div>

      {/* Editing / Creating Box */}
      {editingItem && (
        <div className="p-5 rounded-2xl bg-indigo-50/50 border-2 border-indigo-200 shadow-md space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-indigo-100">
            <h4 className="text-sm font-bold text-indigo-900">
              {isCreating ? '💡 Add New Project' : '✏️ Edit Project'}
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Project Title *</label>
              <input
                type="text"
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                placeholder="e.g. GreenTrack – Carbon Footprint Monitoring Web App"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Role</label>
              <input
                type="text"
                value={editingItem.role}
                onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                placeholder="e.g. Project Initiator & AI-Assisted Developer"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Live Demo / App URL</label>
              <input
                type="text"
                value={editingItem.demoUrl || ''}
                onChange={(e) => setEditingItem({ ...editingItem, demoUrl: e.target.value })}
                placeholder="https://greentrack-gd.vercel.app/"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">GitHub / Code URL</label>
              <input
                type="text"
                value={editingItem.githubUrl || ''}
                onChange={(e) => setEditingItem({ ...editingItem, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            {/* Image upload / URL */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Project Image / Thumbnail</label>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={editingItem.imageUrl || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                  placeholder="Paste image URL or upload file..."
                  className="flex-1 w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
                <label className="cursor-pointer px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 flex-shrink-0">
                  <Upload size={13} />
                  <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                  <input type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
                </label>
              </div>
              {editingItem.imageUrl && (
                <div className="mt-2 h-28 w-48 rounded-lg overflow-hidden border border-slate-300 bg-slate-100">
                  <img src={editingItem.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
              <textarea
                rows={3}
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                placeholder="Describe project purpose, technologies used, problem solved, and deployment..."
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              ></textarea>
            </div>

            {/* Tags */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Technologies / Tags</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {editingItem.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white border border-slate-300 text-xs font-medium text-slate-800"
                  >
                    <span>{tag}</span>
                    <button type="button" onClick={() => removeTag(tag)} className="text-red-500 hover:text-red-700">
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="e.g. Next.js, Python, AWS"
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-semibold"
                >
                  Add Tag
                </button>
              </div>
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
              <Check size={14} /> Save Project
            </button>
          </div>
        </div>
      )}

      {/* Projects List with Reorder Buttons */}
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
                <span className="text-sm font-bold text-slate-900">{item.title}</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700">
                  {item.role}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                {item.demoUrl && (
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    <span>{item.demoUrl}</span>
                    <ExternalLink size={11} />
                  </a>
                )}
                <span>•</span>
                <span>{item.tags.join(', ')}</span>
              </div>
            </div>

            {/* Actions: Reorder + Edit + Delete */}
            <div className="flex items-center gap-1.5 flex-shrink-0 self-end sm:self-center">
              <button
                onClick={() => reorderItem('projects', item.id, 'up')}
                disabled={index === 0}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Move Up"
              >
                <ArrowUp size={14} />
              </button>

              <button
                onClick={() => reorderItem('projects', item.id, 'down')}
                disabled={index === sortedList.length - 1}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Move Down"
              >
                <ArrowDown size={14} />
              </button>

              <button
                onClick={() => handleStartEdit(item)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Edit Project"
              >
                <Edit3 size={14} />
              </button>

              <button
                onClick={() => {
                  if (window.confirm(`Delete project "${item.title}"?`)) {
                    deleteItem('projects', item.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 transition-colors"
                title="Delete Project"
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
