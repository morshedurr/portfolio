import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Building, ArrowUp, ArrowDown, UserCheck, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

export const References = () => {
  const { data, isAdmin, reorderItem } = usePortfolio();

  const sortedRefs = [...data.references].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="references" className="relative py-20 bg-white text-slate-800 border-t border-slate-200">
      <SectionEditOverlay sectionTab="references" label="Edit Academic Referees" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic Section Header */}
        <div className="mb-14 text-center sm:text-left border-b border-slate-200 pb-8">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase font-sans mb-2">
            <UserCheck size={14} className="text-academic-blue" />
            <span>Academic Endorsements & Referees</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Academic & Professional References
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Formal references from university department leadership and senior faculty assessing academic standing, research acumen, teaching effectiveness, and institutional commitment.
          </p>
        </div>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {sortedRefs.map((ref, index) => (
            <motion.div
              key={ref.id}
              className="bg-white rounded-xl p-7 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <div>
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-sans mb-1">
                    Academic Referee #{index + 1}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 leading-snug">
                    {ref.name}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-academic-blue mt-0.5">
                    {ref.role}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 flex items-start gap-1.5">
                    <Building size={13} className="text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>{ref.department}, {ref.institution}</span>
                  </div>
                </div>

                <div className="bg-[#faf9f6] p-4 rounded-lg border border-slate-200/80 mb-5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Relationship & Context:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{ref.relationship}"
                  </p>
                </div>
              </div>

              <div>
                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail size={13} className="text-academic-blue flex-shrink-0" />
                    <a
                      href={`mailto:${ref.email}`}
                      className="text-academic-blue hover:underline font-mono"
                    >
                      {ref.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone size={13} className="text-slate-400 flex-shrink-0" />
                    <span className="font-mono">{ref.phone}</span>
                  </div>
                </div>

                {isAdmin && (
                  <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>Priority: #{ref.order || index + 1}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => reorderItem('references', ref.id, 'up')}
                        disabled={index === 0}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button
                        onClick={() => reorderItem('references', ref.id, 'down')}
                        disabled={index === sortedRefs.length - 1}
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
    </section>
  );
};
