import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07 },
  }),
};

export const Leadership = () => {
  const { data, isAdmin, reorderItem } = usePortfolio();

  const sortedLeadership = [...data.leadership].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="leadership" className="relative py-24 bg-white border-t border-slate-200">
      <SectionEditOverlay sectionTab="leadership" label="Edit Leadership & Extracurriculars" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[#B45309] font-sans mb-3">
            Institutional Governance
          </p>
          <h2 className="section-header text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Leadership & Extracurriculars
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedLeadership.map((item, index) => {
            const isGovernance = item.badge?.toLowerCase().includes('chair') ||
              item.badge?.toLowerCase().includes('director') ||
              item.badge?.toLowerCase().includes('president');

            return (
              <motion.div
                key={item.id}
                className="rounded-xl p-6 bg-white border border-slate-200 hover:border-[#1E3A8A]/30 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={index}
              >
                <div>
                  {/* Icon + badge row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`p-2 rounded-lg ${isGovernance ? 'bg-[#1E3A8A]/10' : 'bg-[#B45309]/10'}`}>
                      {isGovernance
                        ? <Shield size={18} className="text-[#1E3A8A]" />
                        : <Users size={18} className="text-[#B45309]" />
                      }
                    </div>
                    {item.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-serif font-bold text-slate-900 mb-1 leading-snug">
                    {item.role}
                  </h3>

                  <div className="text-xs font-semibold text-[#1E3A8A] mb-3">
                    {item.organization}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                    <Calendar size={11} />
                    <span>{item.period}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {isAdmin && (
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>Order: #{item.order || index + 1}</span>
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
            );
          })}
        </div>

      </div>
    </section>
  );
};
