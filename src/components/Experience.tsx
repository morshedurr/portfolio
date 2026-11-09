import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowUp, ArrowDown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08 },
  }),
};

export const Experience = () => {
  const { data, isAdmin, reorderItem } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<'all' | 'academic' | 'industry'>('all');

  const sortedExperience = [...data.workExperience].sort((a, b) => (a.order || 0) - (b.order || 0));

  const filteredExperience = sortedExperience.filter((item) => {
    if (activeFilter === 'academic') {
      return (
        item.badge?.toLowerCase().includes('faculty') ||
        item.badge?.toLowerCase().includes('academic') ||
        item.role.toLowerCase().includes('lecturer')
      );
    }
    if (activeFilter === 'industry') {
      return !(
        item.badge?.toLowerCase().includes('faculty') ||
        item.badge?.toLowerCase().includes('academic') ||
        item.role.toLowerCase().includes('lecturer')
      );
    }
    return true;
  });

  return (
    <section id="experience" className="relative py-24 bg-[#FAFAF8] border-t border-slate-200">
      <SectionEditOverlay sectionTab="experience" label="Edit Appointments" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[#B45309] font-sans mb-3">
            Professional Record
          </p>
          <h2 className="section-header text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Work Experience
          </h2>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-10">
          {[
            { id: 'all', label: 'All' },
            { id: 'academic', label: 'Academic' },
            { id: 'industry', label: 'Industry' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as 'all' | 'academic' | 'industry')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-150 ${
                activeFilter === tab.id
                  ? 'bg-[#1E3A8A] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl">
          {/* Left border line */}
          <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-px bg-slate-200" />

          <div className="space-y-8">
            {filteredExperience.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative pl-14 sm:pl-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={index}
              >
                {/* Timeline dot */}
                <div className={`absolute left-2.5 sm:left-3.5 top-5 w-4 h-4 rounded-full border-4 border-white shadow-sm z-10 ${
                  exp.isCurrent ? 'bg-emerald-500' : 'bg-[#1E3A8A]'
                }`} />

                {/* Card */}
                <div
                  className={`rounded-xl p-6 bg-white border transition-all duration-200 ${
                    exp.isCurrent
                      ? 'border-emerald-200 ring-1 ring-emerald-500/10'
                      : 'border-slate-200 hover:border-[#1E3A8A]/30'
                  }`}
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)' }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-base sm:text-lg font-serif font-bold text-[#1E3A8A]">
                          {exp.role}
                        </h3>
                        {exp.isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Present
                          </span>
                        )}
                        {exp.badge && !exp.isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                            {exp.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-[#B45309]">
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1 text-xs text-slate-500 flex-shrink-0">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 font-medium text-slate-700">
                        <Calendar size={11} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <MapPin size={11} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A] mt-1.5 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {isAdmin && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>Order: #{exp.order || index + 1}</span>
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
