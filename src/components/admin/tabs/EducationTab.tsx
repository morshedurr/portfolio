import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { EducationItem, CertificationItem } from '../../../types/portfolio';
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown, Check, X, GraduationCap, Award } from 'lucide-react';

export const EducationTab: React.FC = () => {
  const { data, addItem, updateItem, deleteItem, reorderItem } = usePortfolio();

  // Education state
  const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);
  const [isCreatingEdu, setIsCreatingEdu] = useState(false);

  // Cert state
  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [isCreatingCert, setIsCreatingCert] = useState(false);

  const sortedEdu = [...data.education].sort((a, b) => (a.order || 0) - (b.order || 0));
  const sortedCerts = [...data.certifications].sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleSaveEdu = () => {
    if (!editingEdu || !editingEdu.degree || !editingEdu.institution) {
      alert('Degree and Institution are required.');
      return;
    }
    if (isCreatingEdu) {
      addItem('education', editingEdu);
    } else {
      updateItem('education', editingEdu.id, editingEdu);
    }
    setEditingEdu(null);
    setIsCreatingEdu(false);
  };

  const handleSaveCert = () => {
    if (!editingCert || !editingCert.name || !editingCert.issuer) {
      alert('Certification Name and Issuer are required.');
      return;
    }
    if (isCreatingCert) {
      addItem('certifications', editingCert);
    } else {
      updateItem('certifications', editingCert.id, editingCert);
    }
    setEditingCert(null);
    setIsCreatingCert(false);
  };

  return (
    <div className="space-y-10">
      
      {/* ================= SECTION 1: EDUCATION DEGREES ================= */}
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap size={18} className="text-indigo-600" />
              <span>Higher Education & Degrees</span>
            </h3>
            <p className="text-xs text-slate-500">Manage university degrees, exchange programs, GPA, and rankings.</p>
          </div>
          <button
            onClick={() => {
              setEditingEdu({
                id: `edu-${Date.now()}`,
                degree: '',
                institution: '',
                location: '',
                period: '',
                cgpa: '',
                rank: '',
                eqfLevel: 'EQF Level 6',
                badge: '',
                description: '',
                order: sortedEdu.length + 1
              });
              setIsCreatingEdu(true);
            }}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
          >
            <Plus size={13} /> Add Degree
          </button>
        </div>

        {/* Edit / Create Form for Education */}
        {editingEdu && (
          <div className="p-4 rounded-xl bg-indigo-50/60 border-2 border-indigo-200 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-indigo-900">
                {isCreatingEdu ? '➕ Add Education Degree' : '✏️ Edit Degree'}
              </h4>
              <button onClick={() => setEditingEdu(null)} className="text-slate-400 hover:text-slate-600">
                <X size={15} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Degree Title *</label>
                <input
                  type="text"
                  value={editingEdu.degree}
                  onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                  placeholder="e.g. BSc in Information Technology & Management"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Institution Name *</label>
                <input
                  type="text"
                  value={editingEdu.institution}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  placeholder="e.g. Daffodil International University"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editingEdu.location}
                  onChange={(e) => setEditingEdu({ ...editingEdu, location: e.target.value })}
                  placeholder="e.g. Dhaka, Bangladesh"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Period</label>
                <input
                  type="text"
                  value={editingEdu.period}
                  onChange={(e) => setEditingEdu({ ...editingEdu, period: e.target.value })}
                  placeholder="e.g. 01/01/2022 – 15/03/2026"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">CGPA / Grade</label>
                <input
                  type="text"
                  value={editingEdu.cgpa || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, cgpa: e.target.value })}
                  placeholder="e.g. 3.90 / 4.00"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class Rank / Honor</label>
                <input
                  type="text"
                  value={editingEdu.rank || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, rank: e.target.value })}
                  placeholder="e.g. Ranked 4th in the programme"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Badge</label>
                <input
                  type="text"
                  value={editingEdu.badge || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, badge: e.target.value })}
                  placeholder="e.g. Fully Funded Scholarship"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">EQF Level</label>
                <input
                  type="text"
                  value={editingEdu.eqfLevel || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, eqfLevel: e.target.value })}
                  placeholder="e.g. EQF level 6"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingEdu.description}
                  onChange={(e) => setEditingEdu({ ...editingEdu, description: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-indigo-100">
              <button
                type="button"
                onClick={() => setEditingEdu(null)}
                className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdu}
                className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg flex items-center gap-1"
              >
                <Check size={13} /> Save Degree
              </button>
            </div>
          </div>
        )}

        {/* Education List */}
        <div className="space-y-2.5">
          {sortedEdu.map((item, index) => (
            <div
              key={item.id}
              className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">{item.degree}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500">
                  {item.institution} • {item.period} {item.cgpa ? `• CGPA: ${item.cgpa}` : ''}
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => reorderItem('education', item.id, 'up')}
                  disabled={index === 0}
                  className="p-1 rounded bg-slate-100 hover:bg-indigo-100 text-slate-600 disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  onClick={() => reorderItem('education', item.id, 'down')}
                  disabled={index === sortedEdu.length - 1}
                  className="p-1 rounded bg-slate-100 hover:bg-indigo-100 text-slate-600 disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown size={13} />
                </button>
                <button
                  onClick={() => {
                    setEditingEdu({ ...item });
                    setIsCreatingEdu(false);
                  }}
                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                  title="Edit"
                >
                  <Edit3 size={13} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete ${item.degree}?`)) {
                      deleteItem('education', item.id);
                    }
                  }}
                  className="p-1 rounded bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SECTION 2: PROFESSIONAL CERTIFICATIONS ================= */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <div className="flex justify-between items-center pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award size={18} className="text-indigo-600" />
              <span>Professional Certifications</span>
            </h3>
            <p className="text-xs text-slate-500">AWS Certified Solutions Architect, PMI Agile, etc.</p>
          </div>
          <button
            onClick={() => {
              setEditingCert({
                id: `cert-${Date.now()}`,
                name: '',
                issuer: '',
                issueDate: new Date().getFullYear().toString(),
                badge: '',
                description: '',
                order: sortedCerts.length + 1
              });
              setIsCreatingCert(true);
            }}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
          >
            <Plus size={13} /> Add Certification
          </button>
        </div>

        {/* Edit / Create Form for Certifications */}
        {editingCert && (
          <div className="p-4 rounded-xl bg-purple-50/60 border-2 border-purple-200 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-purple-900">
                {isCreatingCert ? '➕ Add Certification' : '✏️ Edit Certification'}
              </h4>
              <button onClick={() => setEditingCert(null)} className="text-slate-400 hover:text-slate-600">
                <X size={15} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Certification Name *</label>
                <input
                  type="text"
                  value={editingCert.name}
                  onChange={(e) => setEditingCert({ ...editingCert, name: e.target.value })}
                  placeholder="e.g. AWS Certified Solutions Architect – Associate"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Issuing Body / Organization *</label>
                <input
                  type="text"
                  value={editingCert.issuer}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  placeholder="e.g. Amazon Web Services (AWS) / PMI"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Issue Date</label>
                <input
                  type="text"
                  value={editingCert.issueDate}
                  onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                  placeholder="e.g. 17/09/2026 or 2024"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Domain Badge</label>
                <input
                  type="text"
                  value={editingCert.badge || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, badge: e.target.value })}
                  placeholder="e.g. Cloud Architecture / Agile"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingCert.description || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-purple-100">
              <button
                type="button"
                onClick={() => setEditingCert(null)}
                className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCert}
                className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg flex items-center gap-1"
              >
                <Check size={13} /> Save Certification
              </button>
            </div>
          </div>
        )}

        {/* Certifications List */}
        <div className="space-y-2.5">
          {sortedCerts.map((item, index) => (
            <div
              key={item.id}
              className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">{item.name}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500">
                  {item.issuer} • {item.issueDate}
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => reorderItem('certifications', item.id, 'up')}
                  disabled={index === 0}
                  className="p-1 rounded bg-slate-100 hover:bg-purple-100 text-slate-600 disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  onClick={() => reorderItem('certifications', item.id, 'down')}
                  disabled={index === sortedCerts.length - 1}
                  className="p-1 rounded bg-slate-100 hover:bg-purple-100 text-slate-600 disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown size={13} />
                </button>
                <button
                  onClick={() => {
                    setEditingCert({ ...item });
                    setIsCreatingCert(false);
                  }}
                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                  title="Edit"
                >
                  <Edit3 size={13} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete ${item.name}?`)) {
                      deleteItem('certifications', item.id);
                    }
                  }}
                  className="p-1 rounded bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
