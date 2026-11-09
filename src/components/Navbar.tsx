import React, { useState, useEffect } from 'react';
import { Menu, X, Download, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export const Navbar = () => {
  const { data } = usePortfolio();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';

      sections.forEach((section) => {
        const el = section as HTMLElement;
        const sectionTop = el.offsetTop - 130;
        const sectionHeight = el.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id') || 'home';
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', visible: data.sectionVisibility.hero !== false },
    { id: 'about', label: 'About', visible: data.sectionVisibility.about !== false },
    { id: 'teaching', label: 'Teaching', visible: data.sectionVisibility.teaching !== false },
    { id: 'research', label: 'Research', visible: data.sectionVisibility.research !== false },
    { id: 'education', label: 'Education', visible: data.sectionVisibility.education !== false },
    { id: 'experience', label: 'Experience', visible: data.sectionVisibility.experience !== false },
    { id: 'awards', label: 'Awards', visible: data.sectionVisibility.awards !== false },
    { id: 'projects', label: 'Projects', visible: data.sectionVisibility.projects !== false },
    { id: 'skills', label: 'Skills', visible: data.sectionVisibility.skills !== false },
    { id: 'references', label: 'References', visible: data.sectionVisibility.references !== false },
    { id: 'contact', label: 'Contact', visible: data.sectionVisibility.contact !== false },
  ].filter((item) => item.visible);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Main Nav */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-2.5'
            : 'bg-white/70 backdrop-blur-sm border-b border-slate-200/30 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11">

            {/* Logo / Identity */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-lg bg-navy-900 text-white flex items-center justify-center font-serif font-bold text-sm tracking-wider shadow-sm group-hover:bg-navy-800 transition-colors">
                MRK
              </div>
              <div className="hidden sm:block text-left">
                <span className="font-serif font-bold text-base text-slate-900 tracking-tight block leading-tight group-hover:text-[#1E3A8A] transition-colors">
                  {data.profile.name}
                </span>
                <span className="text-slate-500 text-[11px] font-medium block leading-tight">
                  Lecturer, IT & Management
                </span>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden xl:flex items-center gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-tight transition-all duration-150 ${
                    activeSection === item.id
                      ? 'text-[#1E3A8A] font-semibold bg-blue-50/80 border border-blue-200/70'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right: CV Download */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href={data.profile.resumeUrl}
                download
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-all duration-150 shadow-sm"
              >
                <FileText size={13} className="text-slate-500" />
                <span>Download CV</span>
                <Download size={12} className="text-slate-400" />
              </a>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex xl:hidden items-center">
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

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="xl:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 pt-3 pb-5 shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-1.5 pb-4 border-b border-slate-100">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2.5 rounded-md text-xs font-medium transition-colors ${
                      activeSection === item.id
                        ? 'text-[#1E3A8A] font-semibold bg-blue-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="pt-3">
                <a
                  href={data.profile.resumeUrl}
                  download
                  className="flex items-center justify-center gap-2 py-2.5 rounded-md bg-[#1E3A8A] text-white text-xs font-semibold w-full"
                >
                  <Download size={13} />
                  Download Curriculum Vitae
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
