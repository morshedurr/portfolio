import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Calendar, Building2, ArrowUp, ArrowDown, ExternalLink, Maximize2, X, Image as ImageIcon } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';
import { AwardItem } from '../types/portfolio';

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
    <section id="awards" className="relative py-20 bg-white text-slate-800 border-t border-slate-200">
      <SectionEditOverlay sectionTab="awards" label="Edit Honours & Photos" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic Section Header */}
        <div className="mb-12 text-center sm:text-left border-b border-slate-200 pb-8">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase font-sans mb-2">
            <Trophy size={14} className="text-amber-700" />
            <span>Honours, Fellowships & Competitions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Honours, Awards & Achievements
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Faculty awards for innovative pedagogy, European Commission fellowship in Sweden, national case competition championships, and technology olympiads.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2">
          {[
            { id: 'all', label: 'All Honours' },
            { id: 'teaching', label: 'Faculty & Teaching' },
            { id: 'fellowship', label: 'Fellowships & Grants' },
            { id: 'case', label: 'Case Championships' },
            { id: 'tech', label: 'Tech Olympiads & Industry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeFilter === tab.id
                  ? 'bg-[#0f1e36] text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Awards Portfolio Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredAwards.map((award, index) => (
            <motion.div
              key={award.id}
              className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-2xs hover:border-slate-400 transition-all duration-200 flex flex-col justify-between group"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div>
                {/* Photo / Certificate Banner */}
                {award.imageUrl ? (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 border-b border-slate-200">
                    <img
                      src={award.imageUrl}
                      alt={award.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                    
                    {/* Category pill on image */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-slate-900 shadow-xs backdrop-blur-xs">
                        {award.category}
                      </span>
                    </div>

                    {/* Expand Photo Button */}
                    <button
                      onClick={() => setSelectedPhoto({ title: award.title, imageUrl: award.imageUrl!, org: award.organization })}
                      className="absolute top-3 right-3 p-1.5 rounded-md bg-black/60 hover:bg-black/80 text-white transition-colors"
                      title="View Certificate / Image"
                    >
                      <Maximize2 size={13} />
                    </button>

                    <div className="absolute bottom-2.5 left-3 right-3 text-white">
                      <div className="text-[11px] font-mono opacity-90">{award.date}</div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-[#faf9f6] border-b border-slate-200/80 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                      {award.category || 'Honour'}
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      {award.date}
                    </span>
                  </div>
                )}

                {/* Content Body */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 leading-snug mb-1">
                    {award.title}
                  </h3>

                  <div className="text-xs font-semibold text-academic-blue mb-3 flex items-center gap-1.5">
                    <Building2 size={13} className="text-slate-400 flex-shrink-0" />
                    <span>{award.organization}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {award.description}
                  </p>

                  {/* Verification / Daily Star Article Link */}
                  {award.credentialUrl && (
                    <div className="pt-2">
                      <a
                        href={award.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-academic-blue hover:underline"
                      >
                        <span>Read Feature / Credential</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Rearrange controls in Admin Mode */}
              {isAdmin && (
                <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 bg-slate-50/50">
                  <span>Priority: #{award.order || index + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => reorderItem('awards', award.id, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Up"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      onClick={() => reorderItem('awards', award.id, 'down')}
                      disabled={index === filteredAwards.length - 1}
                      className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Down"
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

      {/* Lightbox Modal for Certificate / Achievement Photo */}
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
              className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl border border-slate-700"
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
                  <div className="text-xs text-academic-blue font-medium">
                    {selectedPhoto.org}
                  </div>
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