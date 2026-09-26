import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { SkillItem, LanguageItem } from '../../../types/portfolio';
import { Plus, Trash2, Check, Sparkles, Languages } from 'lucide-react';

export const SkillsTab: React.FC = () => {
  const { data, updateItem, showToast } = usePortfolio();

  const [techSkills, setTechSkills] = useState<SkillItem[]>([...data.technicalSkills]);
  const [softSkills, setSoftSkills] = useState<SkillItem[]>([...data.softSkills]);
  const [langs, setLangs] = useState<LanguageItem[]>([...data.languages]);

  const [newTechName, setNewTechName] = useState('');
  const [newTechLevel, setNewTechLevel] = useState(85);

  const [newSoftName, setNewSoftName] = useState('');
  const [newSoftLevel, setNewSoftLevel] = useState(90);

  const handleSaveAll = () => {
    // Save to context
    data.technicalSkills = techSkills;
    data.softSkills = softSkills;
    data.languages = langs;
    showToast('Skills and Languages updated!');
  };

  const addTechSkill = () => {
    if (!newTechName.trim()) return;
    const updated = [...techSkills, { name: newTechName.trim(), level: Number(newTechLevel) }];
    setTechSkills(updated);
    data.technicalSkills = updated;
    setNewTechName('');
    showToast('Technical skill added');
  };

  const removeTechSkill = (index: number) => {
    const updated = techSkills.filter((_, idx) => idx !== index);
    setTechSkills(updated);
    data.technicalSkills = updated;
    showToast('Skill removed');
  };

  const addSoftSkill = () => {
    if (!newSoftName.trim()) return;
    const updated = [...softSkills, { name: newSoftName.trim(), level: Number(newSoftLevel) }];
    setSoftSkills(updated);
    data.softSkills = updated;
    setNewSoftName('');
    showToast('Soft skill added');
  };

  const removeSoftSkill = (index: number) => {
    const updated = softSkills.filter((_, idx) => idx !== index);
    setSoftSkills(updated);
    data.softSkills = updated;
    showToast('Skill removed');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Skills & Languages Management</h3>
          <p className="text-xs text-slate-500">
            Adjust proficiency percentages, add competencies, and manage languages.
          </p>
        </div>
        <button
          onClick={handleSaveAll}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
        >
          <Check size={14} /> Save All Skills
        </button>
      </div>

      {/* Technical Skills */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles size={16} className="text-indigo-600" />
          <span>Technical Skills & Proficiency Bars</span>
        </h4>

        <div className="space-y-3">
          {techSkills.map((skill, index) => (
            <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => {
                  const updated = [...techSkills];
                  updated[index].name = e.target.value;
                  setTechSkills(updated);
                  data.technicalSkills = updated;
                }}
                className="flex-1 px-2.5 py-1 text-xs rounded border border-slate-300 font-medium"
              />
              <div className="flex items-center gap-2 w-48">
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={skill.level}
                  onChange={(e) => {
                    const updated = [...techSkills];
                    updated[index].level = Number(e.target.value);
                    setTechSkills(updated);
                    data.technicalSkills = updated;
                  }}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <span className="text-xs font-bold text-indigo-600 w-9 text-right">{skill.level}%</span>
              </div>
              <button
                type="button"
                onClick={() => removeTechSkill(index)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Add new tech skill */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-200">
          <input
            type="text"
            value={newTechName}
            onChange={(e) => setNewTechName(e.target.value)}
            placeholder="New technical skill (e.g. Next.js, Docker)"
            className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="10"
              max="100"
              value={newTechLevel}
              onChange={(e) => setNewTechLevel(Number(e.target.value))}
              className="w-16 px-2 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-center font-bold"
            />
            <span className="text-xs text-slate-500">%</span>
            <button
              type="button"
              onClick={addTechSkill}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Plus size={13} /> Add
            </button>
          </div>
        </div>
      </div>

      {/* Soft & Pedagogical Skills */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles size={16} className="text-purple-600" />
          <span>Soft, Pedagogy & Management Strengths</span>
        </h4>

        <div className="space-y-3">
          {softSkills.map((skill, index) => (
            <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => {
                  const updated = [...softSkills];
                  updated[index].name = e.target.value;
                  setSoftSkills(updated);
                  data.softSkills = updated;
                }}
                className="flex-1 px-2.5 py-1 text-xs rounded border border-slate-300 font-medium"
              />
              <div className="flex items-center gap-2 w-48">
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={skill.level}
                  onChange={(e) => {
                    const updated = [...softSkills];
                    updated[index].level = Number(e.target.value);
                    setSoftSkills(updated);
                    data.softSkills = updated;
                  }}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <span className="text-xs font-bold text-purple-600 w-9 text-right">{skill.level}%</span>
              </div>
              <button
                type="button"
                onClick={() => removeSoftSkill(index)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Add new soft skill */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-200">
          <input
            type="text"
            value={newSoftName}
            onChange={(e) => setNewSoftName(e.target.value)}
            placeholder="New soft/leadership skill"
            className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="10"
              max="100"
              value={newSoftLevel}
              onChange={(e) => setNewSoftLevel(Number(e.target.value))}
              className="w-16 px-2 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-center font-bold"
            />
            <span className="text-xs text-slate-500">%</span>
            <button
              type="button"
              onClick={addSoftSkill}
              className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Plus size={13} /> Add
            </button>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Languages size={16} className="text-indigo-600" />
          <span>Languages</span>
        </h4>

        <div className="space-y-3">
          {langs.map((lang, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-white p-3 rounded-xl border border-slate-200">
              <input
                type="text"
                value={lang.name}
                onChange={(e) => {
                  const updated = [...langs];
                  updated[index].name = e.target.value;
                  setLangs(updated);
                  data.languages = updated;
                }}
                className="px-2.5 py-1 text-xs rounded border border-slate-300 font-bold"
              />
              <input
                type="text"
                value={lang.level}
                onChange={(e) => {
                  const updated = [...langs];
                  updated[index].level = e.target.value;
                  setLangs(updated);
                  data.languages = updated;
                }}
                className="px-2.5 py-1 text-xs rounded border border-slate-300"
              />
              <input
                type="text"
                value={lang.proficiencyNote || ''}
                onChange={(e) => {
                  const updated = [...langs];
                  updated[index].proficiencyNote = e.target.value;
                  setLangs(updated);
                  data.languages = updated;
                }}
                placeholder="Notes / CEFR"
                className="px-2.5 py-1 text-xs rounded border border-slate-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
