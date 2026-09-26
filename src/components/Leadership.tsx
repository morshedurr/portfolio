import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, ArrowUp, ArrowDown, Landmark, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

export const Leadership = () => {
  const { data, isAdmin, reorderItem } = usePortfolio();

  const sortedLeadership = [...data.leadership].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="leadership" className="relative py-20 bg-[#faf9f6] text-slate-800 border-t border-slate-200">
      <SectionEditOverlay sectionTab="leadership" label="Edit Academic Service" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic Section Header */}
        <div className="mb-14 text-center sm:text-left border-b border-slate-200 pb-8">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase font-sans mb-2">
            <Landmark size={14} className="text-academic-blue" />
            <span>Institutional Governance & Academic Service</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Academic Service & Leadership
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Directing departmental conferences, chairing university public diplomacy bodies, mentoring undergraduate research clubs, and managing international panels.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedLeadership.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                    {item.badge || 'Academic Service'}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    {item.period}
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-slate-900 mb-1 leading-snug">
                  {item.role}
                </h3>
                <div className="text-xs font-semibold text-academic-blue mb-3">
                  {item.organization}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {isAdmin && (
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Priority: #{item.order || index + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => reorderItem('leadership', item.id, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      onClick={() => reorderItem('leadership', item.id, 'down')}
                      disabled={index === sortedLeadership.length - 1}
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
