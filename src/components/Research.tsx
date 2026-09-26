import React from 'react';
import { motion } from 'framer-motion';
import { Search, Database, BarChart3, LineChart, FileCheck, Layers, Cpu, Globe2, BookOpen } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditOverlay } from './admin/SectionEditOverlay';

export const Research: React.FC = () => {
  const { data } = usePortfolio();
  const researchItems = data.research || [];

  const researchInterests = [
    {
      title: "Management Information Systems (MIS)",
      description: "Enterprise systems adoption, IT-business strategic alignment, ERP/CRM architecture, and organizational technology governance.",
      icon: <Layers size={20} className="text-academic-blue" />
    },
    {
      title: "Business Analytics & Empirical Modeling",
      description: "Structural Equation Modeling (PLS-SEM), statistical data validation, survey research methodology, and executive decision dashboards.",
      icon: <BarChart3 size={20} className="text-academic-blue" />
    },
    {
      title: "Digital Transformation & E-Commerce Operations",
      description: "Multi-platform e-commerce dynamics (Amazon, Shopify, POS), consumer trust factors, and digital supply chain integration.",
      icon: <Globe2 size={20} className="text-academic-blue" />
    },
    {
      title: "Sustainable Systems & Agro-Tech Optimization",
      description: "Carbon footprint tracking architectures and digital intermediary frameworks connecting rural farmers directly to retail markets.",
      icon: <Cpu size={20} className="text-academic-blue" />
    }
  ];

  return (
    <section id="research" className="relative py-20 bg-[#faf9f6] text-slate-800 border-t border-slate-200/70">
      <SectionEditOverlay sectionTab="projects" label="Edit Research & Interests" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic Section Header */}
        <div className="mb-14 text-center sm:text-left border-b border-slate-200 pb-8">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase font-sans mb-2">
            <Search size={14} className="text-academic-blue" />
            <span>Scholarly Inquiry & Methodologies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Research Interests & Appointments
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Inquiries at the intersection of Management Information Systems (MIS), business analytics, and empirical technology adoption across academia and industry.
          </p>
        </div>

        {/* Core Research Domains */}
        <div className="mb-16">
          <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BookOpen size={20} className="text-academic-blue" />
            <span>Primary Research Focus Areas</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchInterests.map((interest, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs hover:border-slate-400 transition-all duration-200 flex items-start gap-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
              >
                <div className="p-3 rounded-lg bg-blue-50/80 border border-blue-100 flex-shrink-0 mt-0.5">
                  {interest.icon}
                </div>
                <div>
                  <h4 className="text-base font-serif font-bold text-slate-900 mb-1.5 leading-snug">
                    {interest.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {interest.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Formal Research Appointments & Field Projects */}
        <div className="mb-16">
          <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-2">
            <FileCheck size={20} className="text-academic-blue" />
            <span>Research Appointments & Institutional Inquiries</span>
          </h3>

          <div className="space-y-6">
            {researchItems.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <h4 className="text-lg font-serif font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                  <span className="text-xs font-mono text-slate-500 font-medium">
                    {item.period}
                  </span>
                </div>

                <div className="text-xs font-semibold text-academic-blue mb-3">
                  {item.institution}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Methodological & Analytical Toolkit */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="max-w-2xl mb-6">
            <h4 className="text-lg font-serif font-bold text-slate-900 mb-1">
              Methodological & Analytical Toolkit
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Quantitative and qualitative frameworks employed in empirical inquiry and business systems modeling:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-bold font-sans text-slate-500 uppercase tracking-wider mb-1">Structural Modeling</div>
              <div className="text-sm font-semibold text-slate-900">SmartPLS (PLS-SEM)</div>
              <p className="text-xs text-slate-500 mt-1">Latent construct & path coefficient analysis</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-bold font-sans text-slate-500 uppercase tracking-wider mb-1">Survey Methodology</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-900">Empirical Field Surveys</div>
              <p className="text-xs text-slate-500 mt-1">Respondent sampling & ethical research protocols</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-bold font-sans text-slate-500 uppercase tracking-wider mb-1">Business Intelligence</div>
              <div className="text-sm font-semibold text-slate-900">Power BI & Excel</div>
              <p className="text-xs text-slate-500 mt-1">Interactive data modeling & multi-source ETL</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-bold font-sans text-slate-500 uppercase tracking-wider mb-1">Computational IT</div>
              <div className="text-sm font-semibold text-slate-900">Python & SQL</div>
              <p className="text-xs text-slate-500 mt-1">Data structures, relational querying & cloud logic</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
