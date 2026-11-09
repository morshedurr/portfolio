import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, GraduationCap, Globe2, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export const About = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <section id="about" className="relative py-24 bg-white border-t border-slate-200">
      <SectionEditOverlay sectionTab="profile" label="Edit Academic Profile" />

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
            Academic Profile
          </p>
          <h2 className="section-header text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            About Me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: Bio + Expertise */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>{profile.bio}</p>
              {profile.subBio && (
                <p className="text-slate-500 text-sm">{profile.subBio}</p>
              )}
            </div>

            {/* Key Expertise */}
            {profile.keyExpertise && profile.keyExpertise.length > 0 && (
              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 font-sans">
                  Key Expertise
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {profile.keyExpertise.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 font-medium"
                    >
                      <CheckCircle size={15} className="text-[#1E3A8A] mt-0.5 flex-shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right: Stats Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
          >
            {/* Glassmorphism Stats Card */}
            <div
              className="rounded-2xl p-6 sm:p-8 border border-white/60"
              style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 8px 32px rgba(30,58,138,0.08), 0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              <h3 className="font-serif font-bold text-slate-900 text-lg mb-6">
                Academic Highlights
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* CGPA */}
                <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap size={18} className="text-[#1E3A8A]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">
                      CGPA
                    </span>
                  </div>
                  <div className="text-2xl font-serif font-bold text-slate-900">3.90</div>
                  <div className="text-xs text-slate-500 mt-1">Out of 4.00</div>
                </div>

                {/* Rank */}
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={18} className="text-[#B45309]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">
                      Rank
                    </span>
                  </div>
                  <div className="text-2xl font-serif font-bold text-slate-900">4th</div>
                  <div className="text-xs text-slate-500 mt-1">In graduating cohort</div>
                </div>

                {/* Erasmus+ */}
                <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe2 size={18} className="text-emerald-700" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">
                      Fellowship
                    </span>
                  </div>
                  <div className="text-base font-serif font-bold text-slate-900 leading-tight">Erasmus+</div>
                  <div className="text-xs text-slate-500 mt-1">KA171 Scholar, Sweden</div>
                </div>

                {/* Experience */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">
                      Experience
                    </span>
                  </div>
                  <div className="text-2xl font-serif font-bold text-slate-900">3+</div>
                  <div className="text-xs text-slate-500 mt-1">Years in academia</div>
                </div>
              </div>

              {/* Tagline */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  "{profile.academicSpotlight?.description || 'Dedicated to bridging enterprise management, cloud systems, and academic research.'}"
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
