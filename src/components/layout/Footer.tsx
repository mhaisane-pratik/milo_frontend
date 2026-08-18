'use client';

import React from 'react';
import { useMilo } from '@/context/MiloContext';
import { Sparkles, Instagram, MessageCircle, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useMilo();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          {/* Logo & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div
              onClick={() => navigateTo('landing')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-milo-orange to-milo-coral flex items-center justify-center text-white shadow-md shadow-milo-orange/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                MILO
              </span>
            </div>
            <p className="text-lg font-bold text-white">
              Find people. Find plans. Go together.
            </p>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              MILO is a modern social community platform designed to help people meet new friends through real-world group activities, meetups, and shared experiences in Pune.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-milo-orange text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#whatsapp"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-emerald-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <button onClick={() => navigateTo('discover')} className="hover:text-milo-orange transition-colors">
                  Discover Activities
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('dashboard')} className="hover:text-milo-orange transition-colors">
                  Featured Events
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('community')} className="hover:text-milo-orange transition-colors">
                  Community Stories
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('signup')} className="hover:text-milo-orange transition-colors">
                  Join MILO Free
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a href="#about" className="hover:text-milo-orange transition-colors">
                  About MILO
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-milo-orange transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Safety & Guidelines</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-milo-orange transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a href="#privacy" className="hover:text-milo-orange transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-milo-orange transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#code-of-conduct" className="hover:text-milo-orange transition-colors">
                  Code of Conduct
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MILO Technologies Inc. Built for real connections in Pune, India.</p>
          <p className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>for coffee drinkers, gamers, trekkers & explorers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
