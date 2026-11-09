import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ExternalLink, Maximize2, X, ArrowUp, ArrowDown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06 },
  }),
};

export const Achievements = () => {
  const { data, isAdmin, reorderItem } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<'all' | 'teaching' | 'fellowship' | 'case' | 'tech'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<{ title: string; imageUrl: string; org: string } | null>(null);

  const sortedAwards = [...data.awards].sort((a, b) => (a.order || 0) - (b.order || 0));

  const filteredAwards = sortedAwards.filter((award) => {
    if (activeFilter === 'teaching') return award.category.toLowerCase().includes('teaching') || award.category.toLowerCase().includes('academic');
    if (activeFilter === 'fellowship') return award.category.toLowerCase().includes('fellowship') || award.category.toLowerCase().includes('scholarship') || award.category.toLowerCase().includes('international');
    if (activeFilter === 'case') return award.category.toLowerCase().includes('case') || award.category.toLowerCase().includes('strategy');
    if (activeFilter === 'tech') return award.category.toLowerCase().includes('olympiad') || award.category.toLowerCase().includes('industry') || award.category.toLowerCase().includes('technology');
    return true;
  });

  return (
    <section id="awards" className="relative py-24 bg-white border-t border-slate-200">
      <SectionEditOverlay sectionTab="awards" label="Edit Honours & Awards" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={16} className="text-[#B45309]" />
            <p className="text-xs font-bold tracking-widest uppercase text-[#B45309] font-sans">
              Honours & Fellowships
            </p>
          </div>
          <h2 className="section-header text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Awards & Achievements
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { id: 'all', label: 'All' },
            { id: 'teaching', label: 'Faculty & Teaching' },
            { id: 'fellowship', label: 'Fellowships & Grants' },
            { id: 'case', label: 'Case Championships' },
            { id: 'tech', label: 'Tech Olympiads' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-150 ${
                activeFilter === tab.id
                  ? 'bg-[#1E3A8A] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAwards.map((award, index) => (
            <motion.div
              key={award.id}
              className="rounded-xl overflow-hidden border border-slate-200 bg-white flex flex-col group hover:-translate-y-0.5 transition-all duration-200"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={index}
            >
              {/* Image or placeholder */}
              {award.imageUrl ? (
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 border-b border-slate-200">
                  <img
                    src={award.imageUrl}
                    alt={award.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Category pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-slate-900 shadow-sm">
                      {award.category}
                    </span>
                  </div>

                  {/* Expand button */}
                  <button
                    onClick={() => setSelectedPhoto({ title: award.title, imageUrl: award.imageUrl!, org: award.organization })}
                    className="absolute top-3 right-3 p-1.5 rounded-md bg-black/60 hover:bg-black/80 text-white transition-colors"
                  >
                    <Maximize2 size={13} />
                  </button>

                  <div className="absolute bottom-2.5 left-3 text-white text-[11px] font-mono opacity-90">
                    {award.date}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gradient-to-br from-[#1E3A8A]/5 to-[#B45309]/5 border-b border-slate-200/80 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-[#B45309] border border-amber-200">
                    {award.category || 'Honour'}
                  </span>
                  <span className="font-mono text-xs text-slate-500">{award.date}</span>
                </div>
              )}

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Organization badge */}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#B45309]/10 text-[#B45309] border border-[#B45309]/20 w-fit mb-3">
                  {award.organization}
                </span>

                <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 leading-snug mb-2">
                  {award.title}
                </h3>

                {!award.imageUrl && (
                  <p className="text-xs text-slate-500 font-mono mb-2">{award.date}</p>
                )}

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">
                  {award.description}
                </p>

                {award.credentialUrl && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <a
                      href={award.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:underline"
                    >
                      <span>View Certificate</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>

              {isAdmin && (
                <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 bg-slate-50/50">
                  <span>Priority: #{award.order || index + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => reorderItem('awards', award.id, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      onClick={() => reorderItem('awards', award.id, 'down')}
                      disabled={index === filteredAwards.length - 1}
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-base leading-tight">
                    {selectedPhoto.title}
                  </h4>
                  <div className="text-xs text-[#1E3A8A] font-medium">{selectedPhoto.org}</div>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="max-h-[75vh] overflow-hidden bg-slate-950 flex items-center justify-center p-2">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="max-h-[70vh] w-auto object-contain rounded-md"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
