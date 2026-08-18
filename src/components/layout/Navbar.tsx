'use client';

import React, { useState, useEffect } from 'react';
import { useMilo } from '@/context/MiloContext';
import { Sparkles, Menu, X, ArrowRight, Compass, Users, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { navigateTo, setIsLoginModalOpen } = useMilo();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-3.5 shadow-sm'
          : 'bg-white/60 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* MILO Logo */}
        <div
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-milo-orange to-milo-coral flex items-center justify-center text-white shadow-md shadow-milo-orange/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">
              MILO
            </span>
            <span className="text-[10px] font-bold text-milo-orange uppercase tracking-wider">
              Pune Community
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-700">
          <button
            onClick={() => navigateTo('discover')}
            className="hover:text-milo-orange transition-colors flex items-center gap-1.5"
          >
            <span>Discover</span>
          </button>
          <button
            onClick={() => scrollToSection('activities')}
            className="hover:text-milo-orange transition-colors"
          >
            Activities
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-milo-orange transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('community')}
            className="hover:text-milo-orange transition-colors"
          >
            Community
          </button>
          <button
            onClick={() => scrollToSection('safety')}
            className="hover:text-milo-orange transition-colors"
          >
            Safety
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigateTo('login')}
            className="text-sm font-bold text-slate-800 hover:text-milo-orange px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Log in
          </button>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-milo-orange hover:bg-milo-orange-hover text-white font-bold text-sm shadow-md shadow-milo-orange/25 transition-all hover:scale-[1.03] flex items-center gap-2 cursor-pointer"
          >
            <span>Join MILO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-slate-100 text-slate-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl"
          >
            <div className="flex flex-col space-y-3 font-semibold text-slate-800 text-base">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('discover');
                }}
                className="flex items-center gap-3 py-2 text-left hover:text-milo-orange"
              >
                <Compass className="w-5 h-5 text-milo-orange" />
                <span>Discover Activities</span>
              </button>
              <button
                onClick={() => scrollToSection('activities')}
                className="flex items-center gap-3 py-2 text-left hover:text-milo-orange"
              >
                <Sparkles className="w-5 h-5 text-milo-coral" />
                <span>Activities</span>
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="flex items-center gap-3 py-2 text-left hover:text-milo-orange"
              >
                <HelpCircle className="w-5 h-5 text-milo-purple" />
                <span>How It Works</span>
              </button>
              <button
                onClick={() => scrollToSection('community')}
                className="flex items-center gap-3 py-2 text-left hover:text-milo-orange"
              >
                <Users className="w-5 h-5 text-emerald-500" />
                <span>Community</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('login');
                }}
                className="w-full py-3 rounded-2xl border border-slate-200 font-bold text-slate-800 text-center"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full py-3 rounded-2xl bg-milo-orange text-white font-bold text-center shadow-md shadow-milo-orange/20"
              >
                Join MILO Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
