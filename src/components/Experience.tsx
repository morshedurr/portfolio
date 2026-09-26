import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building, ArrowUp, ArrowDown, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

export const Experience = () => {
  const { data, isAdmin, reorderItem } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<'all' | 'academic' | 'industry'>('all');

  const sortedExperience = [...data.workExperience].sort((a, b) => (a.order || 0) - (b.order || 0));

  const filteredExperience = sortedExperience.filter((item) => {
    if (activeFilter === 'academic') return item.badge?.toLowerCase().includes('faculty') || item.badge?.toLowerCase().includes('academic') || item.role.toLowerCase().includes('lecturer');
    if (activeFilter === 'industry') return !(item.badge?.toLowerCase().includes('faculty') || item.badge?.toLowerCase().includes('academic') || item.role.toLowerCase().includes('lecturer'));
    return true;
  });

  return (
    <section id="experience" className="relative py-20 bg-[#faf9f6] text-slate-800 border-t border-slate-200">
      <SectionEditOverlay sectionTab="experience" label="Edit Appointments" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic Section Header */}
        <div className="mb-14 text-center sm:text-left border-b border-slate-200 pb-8">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase font-sans mb-2">
            <Briefcase size={14} className="text-academic-blue" />
            <span>Academic Appointments & Professional Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Academic & Professional Experience
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Record of university faculty teaching, departmental administration, international remote operations management, and technology leadership.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-10 border-b border-slate-200 pb-4">
          {[
            { id: 'all', label: 'All Appointments' },
            { id: 'academic', label: 'Academic & Faculty' },
            { id: 'industry', label: 'Industry & Operations' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                activeFilter === tab.id
                  ? 'bg-[#0f1e36] text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Experience Cards */}
        <div className="space-y-6 max-w-4xl">
          {filteredExperience.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`bg-white rounded-xl p-6 sm:p-7 border transition-all duration-200 shadow-2xs ${
                exp.isCurrent
                  ? 'border-blue-300 ring-1 ring-blue-500/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                      {exp.role}
                    </h3>
                    {exp.badge && (
                      <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                        exp.isCurrent 
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {exp.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-academic-blue font-semibold text-sm">
                    <Building size={14} />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1 flex-shrink-0 text-xs text-slate-500 font-mono">
                  <div className="flex items-center sm:justify-end gap-1 font-medium text-slate-700">
                    <Calendar size={12} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1 text-slate-500">
                    <MapPin size={12} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-2 mt-4 pt-3 border-t border-slate-100">
                {exp.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 size={15} className="text-academic-blue mt-0.5 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {isAdmin && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Priority: #{exp.order || index + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => reorderItem('workExperience', exp.id, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      onClick={() => reorderItem('workExperience', exp.id, 'down')}
                      disabled={index === filteredExperience.length - 1}
                      className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowDown size={12} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};