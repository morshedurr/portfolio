import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  X, User, Briefcase, Trophy, GraduationCap, Code, 
  Users, Sparkles, UserCheck, Layout, ExternalLink, Download,
  BookOpen, Search, Shield, LogOut, Check
} from 'lucide-react';

import { ProfileTab } from './tabs/ProfileTab';
import { TeachingTab } from './tabs/TeachingTab';
import { ResearchTab } from './tabs/ResearchTab';
import { ExperienceTab } from './tabs/ExperienceTab';
import { AwardsTab } from './tabs/AwardsTab';
import { EducationTab } from './tabs/EducationTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { LeadershipTab } from './tabs/LeadershipTab';
import { SkillsTab } from './tabs/SkillsTab';
import { ReferencesTab } from './tabs/ReferencesTab';
import { LayoutTab } from './tabs/LayoutTab';
import { SecurityTab } from './tabs/SecurityTab';

export const AdminPanel: React.FC = () => {
  const { isAdminOpen, setIsAdminOpen, adminTab, setAdminTab, data, logout, goToPublic, isAdmin, login } = usePortfolio();

  if (!isAdminOpen) return null;

  const tabs = [
    { id: 'profile', label: 'Profile & Masthead', icon: <User size={15} /> },
    { id: 'teaching', label: 'Teaching & Pedagogy', icon: <BookOpen size={15} />, badge: data.teachingCourses?.length || 0 },
    { id: 'research', label: 'Research & Inquiries', icon: <Search size={15} />, badge: data.research?.length || 0 },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={15} />, badge: data.workExperience.length },
    { id: 'awards', label: 'Awards & Honours', icon: <Trophy size={15} />, badge: data.awards.length },
    { id: 'education', label: 'Education & Certs', icon: <GraduationCap size={15} /> },
    { id: 'projects', label: 'Applied Systems', icon: <Code size={15} />, badge: data.projects.length },
    { id: 'leadership', label: 'Leadership & Events', icon: <Users size={15} />, badge: data.leadership.length },
    { id: 'skills', label: 'Skills & Languages', icon: <Sparkles size={15} /> },
    { id: 'references', label: 'References', icon: <UserCheck size={15} />, badge: data.references.length },
    { id: 'layout', label: 'Layout & Backup', icon: <Layout size={15} /> },
    { id: 'security', label: 'Security & Key', icon: <Shield size={15} /> },
  ];

  const handleCloseToPublic = () => {
    setIsAdminOpen(false);
    goToPublic();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md print:hidden">
        
        {/* Backdrop click to close */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseToPublic}
        />

        {/* Modal Window */}
        <motion.div
          className="relative bg-white w-full max-w-6xl h-[94vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 z-10"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {!isAdmin ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30">
                    <Shield size={32} className="text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Admin Access</h2>
                <p className="text-center text-slate-500 mb-8 text-sm">Please enter the administrator password to edit the portfolio.</p>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const passwordInput = form.elements.namedItem('password') as HTMLInputElement;
                  login(passwordInput.value);
                }}>
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                    <input 
                      type="password" 
                      name="password"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-colors"
                      placeholder="Enter password..."
                      required
                      autoFocus
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md shadow-indigo-600/20"
                  >
                    Authenticate
                  </button>
                </form>
                <button 
                  onClick={handleCloseToPublic}
                  className="w-full mt-4 text-sm text-slate-500 hover:text-slate-800 font-medium py-2"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Header Bar */}
          <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-xs tracking-wider shadow-md shadow-indigo-600/30">
                MRK
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold tracking-wide">Faculty Administration Portal</h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                    Admin Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Content Management & Live Customization for {data.profile.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleCloseToPublic}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors border border-slate-700"
                title="View live portfolio with changes applied"
              >
                <span>Preview Live Site</span>
                <ExternalLink size={13} />
              </button>

              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-xs font-semibold text-red-300 transition-colors border border-red-800/50"
                title="Log out of administrator mode"
              >
                <LogOut size={13} />
                <span className="hidden sm:inline">Log Out</span>
              </button>

              <button
                onClick={handleCloseToPublic}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
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
              <div className="hidden md:block px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Portfolio Sections
              </div>

              {tabs.map((tab) => {
                const isActive = adminTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setAdminTab(tab.id)}
                    className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
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
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
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
              {adminTab === 'teaching' && <TeachingTab />}
              {adminTab === 'research' && <ResearchTab />}
              {adminTab === 'experience' && <ExperienceTab />}
              {adminTab === 'awards' && <AwardsTab />}
              {adminTab === 'education' && <EducationTab />}
              {adminTab === 'projects' && <ProjectsTab />}
              {adminTab === 'leadership' && <LeadershipTab />}
              {adminTab === 'skills' && <SkillsTab />}
              {adminTab === 'references' && <ReferencesTab />}
              {adminTab === 'layout' && <LayoutTab />}
              {adminTab === 'security' && <SecurityTab />}
            </div>

          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 flex-shrink-0">
            <span className="truncate">All edits automatically synchronize to local storage. Export JSON backup before clearing browser data.</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCloseToPublic}
                className="px-4 py-1.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Check size={13} />
                <span>Save & View Live Site</span>
              </button>
            </div>
            </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
