import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Settings, Landmark, FileText, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export const Navbar = () => {
  const { data, isAdmin, goToAdmin } = usePortfolio();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 130;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', visible: data.sectionVisibility.hero !== false },
    { id: 'about', label: 'About & Bio', visible: data.sectionVisibility.about !== false },
    { id: 'teaching', label: 'Teaching', visible: data.sectionVisibility.teaching !== false },
    { id: 'research', label: 'Research', visible: data.sectionVisibility.research !== false },
    { id: 'education', label: 'Education', visible: data.sectionVisibility.education !== false },
    { id: 'experience', label: 'Appointments', visible: data.sectionVisibility.experience !== false },
    { id: 'awards', label: 'Honours', visible: data.sectionVisibility.awards !== false },
    { id: 'projects', label: 'Applied Systems', visible: data.sectionVisibility.projects !== false },
    { id: 'skills', label: 'Competencies', visible: data.sectionVisibility.skills !== false },
    { id: 'references', label: 'References', visible: data.sectionVisibility.references !== false },
    { id: 'contact', label: 'Contact', visible: data.sectionVisibility.contact !== false }
  ].filter((item) => item.visible);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Top Institutional Affiliation Header Strip */}
      <div className="bg-[#0f1e36] text-slate-300 text-[11px] py-1.5 px-4 sm:px-8 border-b border-slate-800/80 font-sans tracking-wide flex justify-between items-center">
        <div className="flex items-center gap-2 truncate">
          <Landmark size={12} className="text-amber-400 flex-shrink-0" />
          <span className="font-semibold text-slate-200">Daffodil International University</span>
          <span className="text-slate-500 hidden md:inline">•</span>
          <span className="text-slate-300 hidden md:inline">Department of Information Technology & Management</span>
          <span className="text-slate-500 hidden lg:inline">•</span>
          <span className="text-amber-300/90 hidden lg:inline">Erasmus+ KA171 Fellow (Sweden)</span>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0 text-slate-300">
          <a
            href={data.profile.website || '#'}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors hidden sm:inline-flex items-center gap-1"
          >
            <span>Faculty Profile</span>
            <ExternalLink size={10} />
          </a>
          {isAdmin && (
            <button
              onClick={goToAdmin}
              className="px-2.5 py-1 rounded bg-indigo-600/90 hover:bg-indigo-600 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              title="Open Admin Control Panel"
            >
              <Settings size={11} />
              <span>Admin Panel</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Academic Sticky Navigation Bar */}
      <nav
        className={`transition-all duration-200 ${
          scrollY > 20
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs py-2.5'
            : 'bg-[#fcfbf9]/95 backdrop-blur-sm border-b border-slate-200/70 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-11">
            
            {/* Faculty Identity Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group" 
              onClick={() => scrollToSection('home')}
            >
              <div className="w-9 h-9 rounded-md bg-[#0f1e36] text-white flex items-center justify-center font-serif font-bold text-sm tracking-wider shadow-xs group-hover:bg-[#1e3a8a] transition-colors">
                MK
              </div>
              <div>
                <span className="font-serif font-bold text-base sm:text-lg text-slate-900 tracking-tight block leading-tight group-hover:text-academic-blue transition-colors">
                  {data.profile.name}
                </span>
                <span className="text-slate-500 text-[11px] font-medium tracking-normal block leading-tight">
                  Lecturer, IT & Management
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center space-x-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-tight transition-all duration-150 ${
                    activeSection === item.id
                      ? 'text-academic-blue font-semibold bg-blue-50/80 border border-blue-200/70'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right Action: Download CV */}
            <div className="hidden sm:flex items-center space-x-2">
              <a
                href={data.profile.resumeUrl}
                download
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-150 shadow-xs"
              >
                <FileText size={13} className="text-slate-600" />
                <span>Curriculum Vitae</span>
                <Download size={12} className="text-slate-400" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex xl:hidden items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-1 shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-slate-100">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-xs font-medium ${
                      activeSection === item.id
                        ? 'text-academic-blue font-semibold bg-blue-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="pt-3 flex gap-2">
                <a
                  href={data.profile.resumeUrl}
                  download
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md bg-[#0f1e36] text-white text-xs font-medium"
                >
                  <Download size={13} /> Curriculum Vitae (PDF)
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-50"
                >
                  <Settings size={13} className="inline mr-1" /> Edit
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
