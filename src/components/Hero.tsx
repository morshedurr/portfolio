import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, FileText, Download, ChevronDown, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

export const Hero = () => {
  const { data } = usePortfolio();
  const { profile } = data;
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    if (!profile.titles || profile.titles.length <= 1) return;
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % profile.titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [profile.titles]);

  const scrollDown = () => {
    const about = document.getElementById('about');
    if (about) about.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden"
      style={{ backgroundColor: '#FAFAF8' }}
    >
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(255,255,255,0.6) 0%, transparent 100%)',
        }}
      />

      <SectionEditOverlay sectionTab="profile" label="Edit Faculty Masthead" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Text Content */}
          <motion.div
            className="space-y-6 order-2 lg:order-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Pre-title badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#1E3A8A] text-xs font-semibold tracking-wide">
              <MapPin size={12} />
              <span>Daffodil International University · Bangladesh</span>
            </div>

            {/* Name */}
            <h1 className="font-serif font-bold tracking-tight text-slate-900 leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
            >
              {profile.name}
            </h1>

            {/* Animated Rotating Titles */}
            <div className="h-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={titleIndex}
                  className="text-lg font-medium text-[#B45309]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  {profile.titles?.[titleIndex] ?? 'Lecturer'}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Bio */}
            <p className="text-base text-slate-600 leading-relaxed max-w-lg">
              {profile.bio}
            </p>
            {profile.subBio && (
              <p className="text-sm text-slate-500 leading-relaxed max-w-lg">
                {profile.subBio}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1E3A8A] text-white text-sm font-semibold hover:bg-[#1E40AF] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <FileText size={15} />
                <span>View CV</span>
                <Download size={13} className="opacity-70" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-[#1E3A8A] text-[#1E3A8A] text-sm font-semibold hover:bg-[#1E3A8A] hover:text-white transition-all duration-200 hover:-translate-y-0.5"
              >
                <Mail size={15} />
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-1">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#1E3A8A] transition-colors"
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-300">·</span>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#1E3A8A] transition-colors"
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Profile Image Card */}
          <motion.div
            className="flex justify-center lg:justify-end order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative">
              {/* Gold ring / accent */}
              <div
                className="absolute -inset-2 rounded-2xl opacity-30"
                style={{
                  background: 'linear-gradient(135deg, #B45309 0%, #1E3A8A 100%)',
                  borderRadius: '1.25rem',
                }}
              />

              {/* Glass card */}
              <div
                className="relative rounded-2xl overflow-hidden border border-white/60 shadow-xl"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 20px 60px rgba(30,58,138,0.15), 0 4px 16px rgba(0,0,0,0.08)',
                }}
              >
                {/* Profile image */}
                <div className="w-72 sm:w-80 aspect-[4/5] bg-slate-100 relative overflow-hidden">
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt={profile.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#1E3A8A]/10">
                      <span className="text-6xl font-serif font-bold text-[#1E3A8A] opacity-40">MRK</span>
                    </div>
                  )}

                  {/* Erasmus+ floating badge */}
                  <div className="absolute top-4 right-4">
                    <div
                      className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-white shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #B45309, #D97706)' }}
                    >
                      Erasmus+ Scholar
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-5 py-4 border-t border-slate-100 bg-white/50">
                  <div className="text-sm font-serif font-bold text-slate-900">{profile.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Lecturer, Dept. of ITM</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 hover:text-[#1E3A8A] transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
};
