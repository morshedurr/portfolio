import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  X, User, Briefcase, Trophy, GraduationCap, Code, 
  Users, Sparkles, UserCheck, Layout, ExternalLink, Download
} from 'lucide-react';

import { ProfileTab } from './tabs/ProfileTab';
import { ExperienceTab } from './tabs/ExperienceTab';
import { AwardsTab } from './tabs/AwardsTab';
import { EducationTab } from './tabs/EducationTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { LeadershipTab } from './tabs/LeadershipTab';
import { SkillsTab } from './tabs/SkillsTab';
import { ReferencesTab } from './tabs/ReferencesTab';
import { LayoutTab } from './tabs/LayoutTab';

export const AdminPanel: React.FC = () => {
  const { isAdminOpen, setIsAdminOpen, adminTab, setAdminTab, data } = usePortfolio();

  if (!isAdminOpen) return null;

  const tabs = [
    { id: 'profile', label: 'Profile & Bio', icon: <User size={16} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={16} />, badge: data.workExperience.length },
    { id: 'awards', label: 'Awards & Honours', icon: <Trophy size={16} />, badge: data.awards.length },
    { id: 'education', label: 'Education & Certs', icon: <GraduationCap size={16} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={16} />, badge: data.projects.length },
    { id: 'leadership', label: 'Leadership & Events', icon: <Users size={16} />, badge: data.leadership.length },
    { id: 'skills', label: 'Skills & Languages', icon: <Sparkles size={16} /> },
    { id: 'references', label: 'References', icon: <UserCheck size={16} />, badge: data.references.length },
    { id: 'layout', label: 'Layout & Backup', icon: <Layout size={16} /> },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-sm print:hidden">
        
        {/* Backdrop click to close */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAdminOpen(false)}
        />

        {/* Modal Window */}
        <motion.div
          className="relative bg-white w-full max-w-5xl h-[92vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 z-10"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {/* Header Bar */}
          <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-xs">
                MRK
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-wide">Website Content Manager</h2>
                <p className="text-[11px] text-slate-400">Live Editor & Section Rearranging for {data.profile.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAdminOpen(false)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                <span>View Live Site</span>
                <ExternalLink size={13} />
              </button>
              <button
                onClick={() => setIsAdminOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close Admin Panel"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Body: Sidebar + Main Content */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto flex-shrink-0">
              {tabs.map((tab) => {
                const isActive = adminTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setAdminTab(tab.id)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                        : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {tab.icon}
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge !== undefined && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Content Panel */}
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto bg-white">
              {adminTab === 'profile' && <ProfileTab />}
              {adminTab === 'experience' && <ExperienceTab />}
              {adminTab === 'awards' && <AwardsTab />}
              {adminTab === 'education' && <EducationTab />}
              {adminTab === 'projects' && <ProjectsTab />}
              {adminTab === 'leadership' && <LeadershipTab />}
              {adminTab === 'skills' && <SkillsTab />}
              {adminTab === 'references' && <ReferencesTab />}
              {adminTab === 'layout' && <LayoutTab />}
            </div>

          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 flex-shrink-0">
            <span>Changes are automatically saved in local storage. Use Layout tab to export a JSON backup file.</span>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="px-4 py-1.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Done & Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
