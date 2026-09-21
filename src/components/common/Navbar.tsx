import React, { useState, useEffect } from 'react';
import { PerspectiveToggle } from './PerspectiveToggle';
import { usePerspective } from '../../context/PerspectiveContext';
import { FileText, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenResume }) => {
  const { isDesigner } = usePerspective();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'journey', label: 'Journey' },
    { id: 'lab', label: 'Lab' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#222222] shadow-2xl shadow-black/80 py-3.5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Editorial Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm tracking-[0.2em] font-medium text-[#fafafa] group-hover:text-white transition-colors">
                NEERAV
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#111111]/80 p-1.5 rounded-full border border-[#222222] backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-[13px] font-sans transition-all duration-200 ${
                    isActive
                      ? 'text-[#0a0a0a] font-medium bg-[#fafafa]'
                      : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Perspective Switcher & Quick Resume */}
          <div className="hidden sm:flex items-center gap-3">
            <PerspectiveToggle />

            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono text-[#fafafa] hover:text-white bg-[#111111] hover:bg-[#161616] border border-[#222222] hover:border-[#333333] transition-all duration-200"
              >
                <FileText className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>Resume</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <PerspectiveToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/5 border border-white/10"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-5 bg-space-950/95 border-b border-white/10 backdrop-blur-2xl">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-left ${
                  activeSection === item.id
                    ? isDesigner
                      ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                      : 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="text-xs font-mono text-slate-400">ACTIVE</span>
                )}
              </button>
            ))}

            {onOpenResume && (
              <button
                onClick={() => {
                  onOpenResume();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 mt-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-white/10 text-white border border-white/20"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
