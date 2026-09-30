import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { TeachingCourseItem } from '../../../types/portfolio';
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown, Check, X, BookOpen, GraduationCap, Award } from 'lucide-react';

export const TeachingTab: React.FC = () => {
  const { data, addItem, updateItem, deleteItem, reorderItem } = usePortfolio();
  const [editingItem, setEditingItem] = useState<TeachingCourseItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newTopic, setNewTopic] = useState('');

  const courses = [...(data.teachingCourses || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleStartCreate = () => {
    setEditingItem({
      id: `course-${Date.now()}`,
      code: '',
      title: '',
      department: 'Department of Information Technology & Management',
      institution: 'Daffodil International University',
      term: 'Summer 2026 – Present',
      level: 'Undergraduate',
      description: '',
      topics: [],
      order: courses.length + 1
    });
    setIsCreating(true);
    setNewTopic('');
  };

  const handleStartEdit = (course: TeachingCourseItem) => {
    setEditingItem({ ...course, topics: [...(course.topics || [])] });
    setIsCreating(false);
    setNewTopic('');
  };

  const handleSave = () => {
    if (!editingItem || !editingItem.title.trim()) {
      alert('Please provide at least a Course Title.');
      return;
    }

    if (isCreating) {
      addItem('teachingCourses', editingItem);
    } else {
      updateItem('teachingCourses', editingItem.id, editingItem);
    }

    setEditingItem(null);
    setIsCreating(false);
  };

  const addTopic = () => {
    if (!newTopic.trim() || !editingItem) return;
    setEditingItem({
      ...editingItem,
      topics: [...(editingItem.topics || []), newTopic.trim()]
    });
    setNewTopic('');
  };

  const removeTopic = (index: number) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      topics: editingItem.topics.filter((_, idx) => idx !== index)
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Teaching & Course Instruction</h3>
          <p className="text-xs text-slate-500">
            Manage undergraduate courses, syllabi descriptions, course codes, and pedagogical modules.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
        >
          <Plus size={14} />
          <span>Add Course</span>
        </button>
      </div>

      {/* Editing Form Modal / Inline Box */}
      {editingItem && (
        <div className="p-5 bg-slate-50 border-2 border-indigo-200 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h4 className="text-sm font-bold text-slate-800">
              {isCreating ? 'Add New Academic Course' : `Edit Course: ${editingItem.title}`}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Course Code</label>
              <input
                type="text"
                value={editingItem.code || ''}
                onChange={(e) => setEditingItem({ ...editingItem, code: e.target.value })}
                placeholder="e.g. ITM 311 or MGT 101"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Level / Student Year</label>
              <input
                type="text"
                value={editingItem.level || ''}
                onChange={(e) => setEditingItem({ ...editingItem, level: e.target.value })}
                placeholder="e.g. Undergraduate (3rd Year)"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Course Title *</label>
            <input
              type="text"
              value={editingItem.title}
              onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
              placeholder="e.g. Management Information Systems (MIS)"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Department</label>
              <input
                type="text"
                value={editingItem.department}
                onChange={(e) => setEditingItem({ ...editingItem, department: e.target.value })}
                placeholder="Department of Information Technology & Management"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Institution</label>
              <input
                type="text"
                value={editingItem.institution}
                onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                placeholder="Daffodil International University"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Term / Period</label>
            <input
              type="text"
              value={editingItem.term || ''}
              onChange={(e) => setEditingItem({ ...editingItem, term: e.target.value })}
              placeholder="e.g. Summer 2026 – Present"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Course Description & Pedagogical Scope</label>
            <textarea
              rows={3}
              value={editingItem.description}
              onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
              placeholder="Provide a comprehensive synopsis of the course content, pedagogical methods, and learning objectives..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          {/* Topics & Key Modules */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Key Modules / Topics Covered</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTopic();
                  }
                }}
                placeholder="Type a topic (e.g. Cloud & Information Infrastructure) and press Add"
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={addTopic}
                className="px-3 py-1.5 bg-slate-800 text-white text-xs font-semibold rounded-lg hover:bg-slate-900"
              >
                Add Topic
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-2">
              {(editingItem.topics || []).map((topic, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-700"
                >
                  <span>{topic}</span>
                  <button
                    type="button"
                    onClick={() => removeTopic(idx)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
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
              <span>Save Course</span>
            </button>
          </div>
        </div>
      )}

      {/* Courses List */}
      <div className="space-y-3">
        {courses.map((course, idx) => (
          <div
            key={course.id || idx}
            className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
          >
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                {course.code && (
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                    {course.code}
                  </span>
                )}
                <span className="text-xs font-medium text-indigo-600">{course.level}</span>
                {course.term && <span className="text-[11px] text-slate-400">• {course.term}</span>}
              </div>
              <h4 className="text-sm font-bold text-slate-900">{course.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {course.description}
              </p>
              {course.topics && course.topics.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {course.topics.slice(0, 4).map((top, tIdx) => (
                    <span key={tIdx} className="text-[10px] bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded border border-slate-100">
                      {top}
                    </span>
                  ))}
                  {course.topics.length > 4 && (
                    <span className="text-[10px] text-slate-400">+{course.topics.length - 4} more</span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0 self-end sm:self-center">
              <button
                onClick={() => reorderItem('teachingCourses', course.id, 'up')}
                disabled={idx === 0}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move Up"
              >
                <ArrowUp size={13} />
              </button>
              <button
                onClick={() => reorderItem('teachingCourses', course.id, 'down')}
                disabled={idx === courses.length - 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move Down"
              >
                <ArrowDown size={13} />
              </button>
              <button
                onClick={() => handleStartEdit(course)}
                className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"
                title="Edit Course"
              >
                <Edit3 size={13} />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete course "${course.title}"?`)) {
                    deleteItem('teachingCourses', course.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                title="Delete Course"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}

        {courses.length === 0 && (
          <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
            <BookOpen size={32} className="mx-auto text-slate-300 mb-2" />
            <p className="text-xs text-slate-500 font-medium">No courses added yet.</p>
            <button
              onClick={handleStartCreate}
              className="mt-3 text-xs font-bold text-indigo-600 hover:underline"
            >
              Add your first course
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
